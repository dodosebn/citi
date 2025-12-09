"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/store/supabase";
import { useAppStore } from "@/app/store/useApp";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaPiggyBank,
  FaArrowUp,
  FaArrowDown,
  FaChartLine,
  FaHistory,
  FaClock,
  FaCalendarAlt,
  FaPercentage,
  FaDollarSign,
  FaWallet,
  FaLock,
  FaUnlock
} from "react-icons/fa";

type SavingsPlan = {
  id: string;
  name: string;
  description: string;
  interest_rate: number;
  min_amount: number;
  max_amount?: number;
  withdrawal_fee: number;
  min_duration_days: number;
  created_at?: string;
};

type UserSaving = {
  id: string;
  plan_id: string;
  amount: number;
  interest_earned: number;
  total_balance: number;
  status: string;
  start_date: string;
  last_interest_date: string;
  withdrawal_date?: string;
  created_at?: string;
  savings_plans?: SavingsPlan;
  days_since_start?: number;
};

export default function SavingsPage() {
  const [plans, setPlans] = useState<SavingsPlan[]>([]);
  const [userSavings, setUserSavings] = useState<UserSaving[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<SavingsPlan | null>(null);
  const [savingsAmount, setSavingsAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [selectedSavingId, setSelectedSavingId] = useState<string | null>(null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<"plans" | "my-savings">("plans");
  
  const { user } = useAppStore();
  const balance = user?.accountBalance ?? 0;

  useEffect(() => {
    fetchSavingsData();
  }, [user?.id]);

  const fetchSavingsData = async () => {
    try {
      setLoading(true);
      
      // Fetch savings plans
      const { data: plansData, error: plansError } = await supabase
        .from("savings_plans")
        .select("*")
        .order("interest_rate", { ascending: false });

      if (plansError) throw plansError;
      setPlans(plansData || []);

      // Fetch user savings if logged in
      if (user?.id) {
        const { data: savingsData, error: savingsError } = await supabase
          .from("user_savings")
          .select(`
            *,
            savings_plans (*)
          `)
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (savingsError) throw savingsError;

        // Calculate days since start
        const enrichedSavings = (savingsData || []).map(saving => {
          const startDate = new Date(saving.start_date);
          const today = new Date();
          const daysDiff = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
          
          return {
            ...saving,
            days_since_start: daysDiff
          };
        });

        setUserSavings(enrichedSavings);
      }
    } catch (error) {
      console.error("Error fetching savings data:", error);
      toast.error("Failed to load savings data");
    } finally {
      setLoading(false);
    }
  };

  const calculateProjectedInterest = (amount: number, rate: number, days: number = 365) => {
    return (amount * (rate / 100) * days) / 365;
  };

  const handleSaveClick = (plan: SavingsPlan) => {
    setSelectedPlan(plan);
    setSavingsAmount(plan.min_amount.toString());
    setIsSaveModalOpen(true);
  };

  const handleWithdrawClick = (saving: UserSaving) => {
    setSelectedSavingId(saving.id);
    setWithdrawAmount(saving.total_balance.toString());
    setIsWithdrawModalOpen(true);
  };

  const generateReference = () => {
    return 'SAV' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const handleSaveMoney = async () => {
    if (!selectedPlan || !user?.id) return;

    const amount = parseFloat(savingsAmount);
    const minAmount = selectedPlan.min_amount || 0;

    if (isNaN(amount) || amount < minAmount) {
      toast.error(`Minimum amount is $${minAmount.toLocaleString()}`);
      return;
    }

    if (selectedPlan.max_amount && amount > selectedPlan.max_amount) {
      toast.error(`Maximum amount is $${selectedPlan.max_amount.toLocaleString()}`);
      return;
    }

    if (amount > balance) {
      toast.error("Insufficient balance");
      return;
    }

    setProcessing(true);

    try {
      // 1. Insert into user_savings
      const { data: savingData, error: saveError } = await supabase
        .from("user_savings")
        .insert({
          user_id: user.id,
          plan_id: selectedPlan.id,
          amount: amount,
          total_balance: amount,
          status: 'active'
        })
        .select()
        .single();

      if (saveError) throw saveError;

      // 2. Deduct from user balance
      const newBalance = balance - amount;
      const { error: balanceError } = await supabase
        .from("citisignup")
        .update({ account_balance: newBalance })
        .eq("id", user.id);

      if (balanceError) throw balanceError;

      // 3. Record transaction - Use "debit" type for saving money (money leaving main account)
      const transactionData = {
        user_id: user.id,
        type: "debit", // Using "debit" for money going out of main account
        amount: amount,
        description: `Savings deposit to ${selectedPlan.name}`,
        status: "completed",
        category: "savings",
        recipient: "Savings Account",
        sender: "Main Account",
        reference: generateReference(),
        created_at: new Date().toISOString()
      };

      const { error: txError } = await supabase
        .from("transactions")
        .insert(transactionData);

      if (txError) throw txError;

      // 4. Record savings transaction
      await supabase
        .from("savings_transactions")
        .insert({
          user_id: user.id,
          savings_id: savingData.id,
          type: "deposit",
          amount: amount,
          description: "Initial deposit",
          balance_before: 0,
          balance_after: amount,
          status: "completed"
        });

      // Update local state
      useAppStore.setState((prev: any) => ({
        user: {
          ...prev.user,
          accountBalance: newBalance,
        },
      }));

      toast.success(`$${amount.toLocaleString()} saved successfully!`);
      
      // Refresh data
      await fetchSavingsData();
      setIsSaveModalOpen(false);
      setSavingsAmount("");

    } catch (error: any) {
      console.error("Save error:", error);
      toast.error(error.message || "Failed to save money");
    } finally {
      setProcessing(false);
    }
  };

  const handleWithdrawMoney = async () => {
    if (!selectedSavingId || !user?.id) return;

    const saving = userSavings.find(s => s.id === selectedSavingId);
    if (!saving) {
      toast.error("Savings account not found");
      return;
    }

    const withdrawAmt = parseFloat(withdrawAmount);
    const maxWithdraw = saving.total_balance;

    if (isNaN(withdrawAmt) || withdrawAmt <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (withdrawAmt > maxWithdraw) {
      toast.error(`Maximum withdrawal is $${maxWithdraw.toLocaleString()}`);
      return;
    }

    setProcessing(true);

    try {
      const plan = saving.savings_plans;
      let penaltyFee = 0;
      let netWithdrawal = withdrawAmt;

      // Check for early withdrawal penalty
      if (plan && saving.days_since_start && saving.days_since_start < plan.min_duration_days) {
        penaltyFee = (withdrawAmt * plan.withdrawal_fee) / 100;
        netWithdrawal = withdrawAmt - penaltyFee;
        toast.warning(`Early withdrawal penalty: $${penaltyFee.toFixed(2)}`);
      }

      // 1. Update user_savings
      const newBalance = saving.total_balance - withdrawAmt;
      const isFullWithdrawal = newBalance <= 0;
      
      const { error: updateError } = await supabase
        .from("user_savings")
        .update({
          total_balance: newBalance,
          status: isFullWithdrawal ? 'withdrawn' : 'active',
          withdrawal_date: isFullWithdrawal ? new Date().toISOString() : null
        })
        .eq("id", selectedSavingId);

      if (updateError) throw updateError;

      // 2. Add to user balance
      const currentUserBalance = user?.accountBalance ?? 0;
      const newUserBalance = currentUserBalance + netWithdrawal;
      
      const { error: balanceError } = await supabase
        .from("citisignup")
        .update({ account_balance: newUserBalance })
        .eq("id", user.id);

      if (balanceError) throw balanceError;

      // 3. Record transaction - Use "credit" type for withdrawal (money coming into main account)
      const transactionData = {
        user_id: user.id,
        type: "credit", // Using "credit" for money coming into main account
        amount: netWithdrawal,
        description: `Savings withdrawal${penaltyFee > 0 ? ` (penalty: $${penaltyFee.toFixed(2)})` : ''}`,
        status: "completed",
        category: "savings",
        recipient: "Main Account",
        sender: "Savings Account",
        reference: generateReference(),
        created_at: new Date().toISOString()
      };

      const { error: txError } = await supabase
        .from("transactions")
        .insert(transactionData);

      if (txError) throw txError;

      // 4. Record savings transaction
      await supabase
        .from("savings_transactions")
        .insert({
          user_id: user.id,
          savings_id: selectedSavingId,
          type: "withdrawal",
          amount: withdrawAmt,
          description: penaltyFee > 0 ? `Withdrawal with penalty of $${penaltyFee.toFixed(2)}` : "Withdrawal",
          balance_before: saving.total_balance,
          balance_after: newBalance,
          status: "completed"
        });

      // Update local state
      useAppStore.setState((prev: any) => ({
        user: {
          ...prev.user,
          accountBalance: newUserBalance,
        },
      }));

      toast.success(`$${netWithdrawal.toLocaleString()} withdrawn successfully!`);
      
      // Refresh data
      await fetchSavingsData();
      setIsWithdrawModalOpen(false);
      setWithdrawAmount("");
      setSelectedSavingId(null);

    } catch (error: any) {
      console.error("Withdrawal error:", error);
      toast.error(error.message || "Failed to withdraw money");
    } finally {
      setProcessing(false);
    }
  };

  const getTotalSavings = () => {
    return userSavings
      .filter(s => s.status === 'active')
      .reduce((sum, saving) => sum + saving.total_balance, 0);
  };

  const getTotalInterestEarned = () => {
    return userSavings.reduce((sum, saving) => sum + saving.interest_earned, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading savings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Savings</h1>
              <p className="text-gray-600 mt-2">
                Save money securely and earn interest over time
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center text-gray-500 mb-2">
                    <FaWallet className="mr-2" />
                    <span className="text-sm">Available Balance</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    ${balance.toLocaleString()}
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center text-gray-500 mb-2">
                    <FaPiggyBank className="mr-2" />
                    <span className="text-sm">Total Savings</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    ${getTotalSavings().toLocaleString()}
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center text-gray-500 mb-2">
                    <FaChartLine className="mr-2" />
                    <span className="text-sm">Interest Earned</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    +${getTotalInterestEarned().toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("plans")}
                className={`
                  py-2 px-1 border-b-2 font-medium text-sm flex items-center
                  ${activeTab === "plans"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
              >
                <FaPiggyBank className="mr-2" />
                Savings Plans
              </button>
              <button
                onClick={() => setActiveTab("my-savings")}
                className={`
                  py-2 px-1 border-b-2 font-medium text-sm flex items-center
                  ${activeTab === "my-savings"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
              >
                <FaHistory className="mr-2" />
                My Savings
                <span className="ml-2 py-0.5 px-2 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                  {userSavings.length}
                </span>
              </button>
            </nav>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === "plans" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const projectedInterest = calculateProjectedInterest(10000, plan.interest_rate);
              
              return (
                <div
                  key={plan.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-900">
                        {plan.name}
                      </h3>
                      <div className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                        {plan.interest_rate}% APY
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {plan.description}
                    </p>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 flex items-center">
                          <FaDollarSign className="mr-2" />
                          Min. Deposit
                        </span>
                        <span className="font-semibold">
                          ${plan.min_amount.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 flex items-center">
                          <FaClock className="mr-2" />
                          Min. Duration
                        </span>
                        <span className="font-semibold">
                          {plan.min_duration_days} days
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 flex items-center">
                          <FaPercentage className="mr-2" />
                          Withdrawal Fee
                        </span>
                        <span className="font-semibold">
                          {plan.withdrawal_fee}%
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 flex items-center">
                          <FaChartLine className="mr-2" />
                          Sample Earnings
                        </span>
                        <span className="font-semibold text-green-600">
                          +${projectedInterest.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSaveClick(plan)}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Start Saving
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            {userSavings.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FaPiggyBank className="text-3xl text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No savings yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Start saving to earn interest on your money
                </p>
                <button
                  onClick={() => setActiveTab("plans")}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FaArrowUp className="mr-2" />
                  Start Saving
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {userSavings.map((saving) => {
                  const plan = saving.savings_plans;
                  const isEarlyWithdrawal = saving.days_since_start && plan && saving.days_since_start < plan.min_duration_days;
                  const projectedInterest = calculateProjectedInterest(saving.amount, plan?.interest_rate || 0);

                  return (
                    <div
                      key={saving.id}
                      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
                    >
                      <div className="p-6">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">
                              {plan?.name || "Savings Account"}
                            </h3>
                            <div className="flex items-center mt-1">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                saving.status === 'active' 
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {saving.status === 'active' ? (
                                  <FaLock className="mr-2" />
                                ) : (
                                  <FaUnlock className="mr-2" />
                                )}
                                {saving.status.charAt(0).toUpperCase() + saving.status.slice(1)}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900">
                              ${saving.total_balance.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-500">
                              Current Balance
                            </div>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-blue-50 rounded-lg p-3">
                            <div className="text-sm text-blue-600 font-medium">Principal</div>
                            <div className="text-lg font-bold text-gray-900">
                              ${saving.amount.toLocaleString()}
                            </div>
                          </div>
                          <div className="bg-green-50 rounded-lg p-3">
                            <div className="text-sm text-green-600 font-medium">Interest Earned</div>
                            <div className="text-lg font-bold text-gray-900">
                              +${saving.interest_earned.toLocaleString()}
                            </div>
                          </div>
                          <div className="bg-purple-50 rounded-lg p-3">
                            <div className="text-sm text-purple-600 font-medium">Interest Rate</div>
                            <div className="text-lg font-bold text-gray-900">
                              {plan?.interest_rate || 0}%
                            </div>
                          </div>
                          <div className="bg-orange-50 rounded-lg p-3">
                            <div className="text-sm text-orange-600 font-medium">Days Active</div>
                            <div className="text-lg font-bold text-gray-900">
                              {saving.days_since_start || 0}
                            </div>
                          </div>
                        </div>

                        {/* Early withdrawal warning */}
                        {isEarlyWithdrawal && (
                          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-center text-yellow-800">
                              <FaClock className="mr-2" />
                              <span className="text-sm font-medium">
                                Early withdrawal penalty: {plan?.withdrawal_fee}%
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Dates */}
                        <div className="border-t border-gray-100 pt-4 mb-6">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center text-gray-600">
                              <FaCalendarAlt className="mr-2 text-gray-400" />
                              <div>
                                <div className="font-medium">Started</div>
                                <div>{new Date(saving.start_date).toLocaleDateString()}</div>
                              </div>
                            </div>
                            {saving.withdrawal_date && (
                              <div className="flex items-center text-gray-600">
                                <FaCalendarAlt className="mr-2 text-gray-400" />
                                <div>
                                  <div className="font-medium">Withdrawn</div>
                                  <div>{new Date(saving.withdrawal_date).toLocaleDateString()}</div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        {saving.status === 'active' && (
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleWithdrawClick(saving)}
                              className="flex-1 bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                            >
                              <FaArrowDown className="mr-2" />
                              Withdraw
                            </button>
                            <button
                              onClick={() => {
                                // Add more money to this savings
                                toast.info("Add more money feature coming soon!");
                              }}
                              className="flex-1 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                            >
                              <FaArrowUp className="mr-2" />
                              Add More
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Save Money Modal */}
        {isSaveModalOpen && selectedPlan && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform animate-scale-in">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Save Money
                </h3>
                <button
                  onClick={() => setIsSaveModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={processing}
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Plan:</span>
                      <p className="font-semibold text-blue-700">{selectedPlan.name}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Interest Rate:</span>
                      <p className="font-semibold">{selectedPlan.interest_rate}% APY</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount to Save ($)
                  </label>
                  <input
                    type="number"
                    value={savingsAmount}
                    onChange={(e) => setSavingsAmount(e.target.value)}
                    min={selectedPlan.min_amount}
                    max={selectedPlan.max_amount || balance}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter amount"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Available: ${balance.toLocaleString()}</span>
                    <span>Min: ${selectedPlan.min_amount.toLocaleString()}</span>
                  </div>
                </div>

                {savingsAmount && !isNaN(parseFloat(savingsAmount)) && (
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">
                      Projected Earnings (1 Year)
                    </h4>
                    <div className="text-sm text-green-700">
                      <p>
                        Interest Earned: +$
                        {calculateProjectedInterest(parseFloat(savingsAmount), selectedPlan.interest_rate).toFixed(2)}
                      </p>
                      <p>
                        Total Value: $
                        {(parseFloat(savingsAmount) + calculateProjectedInterest(parseFloat(savingsAmount), selectedPlan.interest_rate)).toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsSaveModalOpen(false)}
                  className="flex-1 bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-400 transition-colors"
                  disabled={processing}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveMoney}
                  disabled={processing}
                  className="flex-1 bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {processing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    `Save $${parseFloat(savingsAmount || '0').toLocaleString()}`
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Withdraw Money Modal */}
        {isWithdrawModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform animate-scale-in">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Withdraw Money
                </h3>
                <button
                  onClick={() => setIsWithdrawModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={processing}
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount to Withdraw ($)
                  </label>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter amount"
                  />
                  <div className="text-xs text-gray-500 mt-2">
                    Maximum available: ${userSavings.find(s => s.id === selectedSavingId)?.total_balance.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsWithdrawModalOpen(false)}
                  className="flex-1 bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-400 transition-colors"
                  disabled={processing}
                >
                  Cancel
                </button>
                <button
                  onClick={handleWithdrawMoney}
                  disabled={processing}
                  className="flex-1 bg-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {processing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    `Withdraw $${parseFloat(withdrawAmount || '0').toLocaleString()}`
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}