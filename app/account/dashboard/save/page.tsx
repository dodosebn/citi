"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/store/supabase";
import { useAppStore } from "@/app/store/useApp";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Wallent from "./saveComp/wallent";
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
  FaUnlock,
  FaTrash,
  FaExclamationTriangle
} from "react-icons/fa";
import DeleteModal from "./saveComp/deleteModal";
import Loading from "./saveComp/loading";
import SaveOverLay from "./saveComp/saveOverLay";

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

// Email sending functions
const sendSaveEmail = async (amount: number, newBalance: number, planName: string, email: string) => {
  if (!email) return;

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <style>
      body { background:#f5f7fa; padding:20px; font-family:Arial, sans-serif; }
      .receipt { max-width:600px; margin:auto; background:#fff; border:1px solid #1a237e; border-radius:8px; overflow:hidden; }
      .header { background:#1a237e; color:#fff; text-align:center; padding:20px; }
      .content { padding:25px; }
      .row { display:flex; justify-content:space-between; border-bottom:1px dashed #ddd; padding:10px 0; }
      .total { font-size:18px; font-weight:bold; padding:15px 0; margin:20px 0; border-top:2px solid #333; border-bottom:2px solid #333; }
      .success { background:#e8f5e9; color:#2e7d32; padding:12px; text-align:center; border-left:4px solid #4caf50; margin-bottom:20px; }
      .footer { text-align:center; font-size:12px; color:#666; margin-top:20px; }
    </style>
  </head>
  <body>
    <div class="receipt">
      <div class="header">
        <h2>Citibank Savings</h2>
        <p>Deposit Confirmation</p>
      </div>

      <div class="content">
        <div class="success">✓ SAVING SUCCESSFUL</div>

        <div class="row"><span>Plan:</span><span>${planName}</span></div>
        <div class="row"><span>Amount Saved:</span><span>$${amount.toFixed(2)}</span></div>

        <div class="total">
          <span>New Balance:</span>
          <span>$${newBalance.toFixed(2)}</span>
        </div>

        <div class="footer">
          <p>This is an automated email. Generated: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;

  await fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: email,
      subject: `You've Saved $${amount.toFixed(2)} in ${planName}`,
      html,
    }),
  });
};

const sendWithdrawEmail = async (withdrawAmount: number, netAmount: number, newBalance: number, planName: string, email: string, penalty: number = 0) => {
  if (!email) return;

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <style>
      body { background:#f5f7fa; padding:20px; font-family:Arial, sans-serif; }
      .receipt { max-width:600px; margin:auto; background:#fff; border:1px solid #1a237e; border-radius:8px; overflow:hidden; }
      .header { background:#1a237e; color:#fff; text-align:center; padding:20px; }
      .content { padding:25px; }
      .row { display:flex; justify-content:space-between; border-bottom:1px dashed #ddd; padding:10px 0; }
      .total { font-size:18px; font-weight:bold; padding:15px 0; margin:20px 0; border-top:2px solid #333; border-bottom:2px solid #333; }
      .success { background:#fff3e0; color:#f57c00; padding:12px; text-align:center; border-left:4px solid #ff9800; margin-bottom:20px; }
      .footer { text-align:center; font-size:12px; color:#666; margin-top:20px; }
    </style>
  </head>
  <body>
    <div class="receipt">
      <div class="header">
        <h2>Citibank Savings</h2>
        <p>Withdrawal Confirmation</p>
      </div>

      <div class="content">
        <div class="success">✓ WITHDRAWAL SUCCESSFUL</div>

        <div class="row"><span>Plan:</span><span>${planName}</span></div>
        <div class="row"><span>Amount Requested:</span><span>$${withdrawAmount.toFixed(2)}</span></div>
        ${penalty > 0 ? `<div class="row"><span>Penalty Fee:</span><span>$${penalty.toFixed(2)}</span></div>` : ''}
        <div class="row"><span>Net Amount Credited:</span><span>$${netAmount.toFixed(2)}</span></div>

        <div class="total">
          <span>New Balance:</span>
          <span>$${newBalance.toFixed(2)}</span>
        </div>

        <div class="footer">
          <p>This is an automated email. Generated: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;

  await fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: email,
      subject: `You've Withdrawn $${netAmount.toFixed(2)} from ${planName}`,
      html,
    }),
  });
};

const sendDeleteEmail = async (refundAmount: number, penalty: number, newBalance: number, planName: string, email: string) => {
  if (!email) return;

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <style>
      body { background:#f5f7fa; padding:20px; font-family:Arial, sans-serif; }
      .receipt { max-width:600px; margin:auto; background:#fff; border:1px solid #1a237e; border-radius:8px; overflow:hidden; }
      .header { background:#1a237e; color:#fff; text-align:center; padding:20px; }
      .content { padding:25px; }
      .row { display:flex; justify-content:space-between; border-bottom:1px dashed #ddd; padding:10px 0; }
      .total { font-size:18px; font-weight:bold; padding:15px 0; margin:20px 0; border-top:2px solid #333; border-bottom:2px solid #333; }
      .notice { background:#ffebee; color:#c62828; padding:12px; text-align:center; border-left:4px solid #f44336; margin-bottom:20px; }
      .footer { text-align:center; font-size:12px; color:#666; margin-top:20px; }
    </style>
  </head>
  <body>
    <div class="receipt">
      <div class="header">
        <h2>Citibank Savings</h2>
        <p>Account Closure Confirmation</p>
      </div>

      <div class="content">
        <div class="notice">⚠ ACCOUNT CLOSED</div>

        <div class="row"><span>Plan:</span><span>${planName}</span></div>
        ${penalty > 0 ? `<div class="row"><span>Early Closure Penalty:</span><span>$${penalty.toFixed(2)}</span></div>` : ''}
        <div class="row"><span>Refund Amount:</span><span>$${refundAmount.toFixed(2)}</span></div>

        <div class="total">
          <span>New Account Balance:</span>
          <span>$${newBalance.toFixed(2)}</span>
        </div>

        <div class="footer">
          <p>This is an automated email. Generated: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;

  await fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: email,
      subject: `Savings Account Closed - $${refundAmount.toFixed(2)} Refunded`,
      html,
    }),
  });
};

export default function SavingsPage() {
  const [plans, setPlans] = useState<SavingsPlan[]>([]);
  const [userSavings, setUserSavings] = useState<UserSaving[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<SavingsPlan | null>(null);
  const [savingsAmount, setSavingsAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [selectedSavingId, setSelectedSavingId] = useState<string | null>(null);
  const [savingToDelete, setSavingToDelete] = useState<UserSaving | null>(null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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
      
      const { data: plansData, error: plansError } = await supabase
        .from("savings_plans")
        .select("*")
        .order("interest_rate", { ascending: false });

      if (plansError) throw plansError;
      setPlans(plansData || []);

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

  const handleDeleteClick = (saving: UserSaving) => {
    setSavingToDelete(saving);
    setIsDeleteModalOpen(true);
  };

  const generateReference = () => {
    return 'SAV' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const handleSaveMoney = async () => {
    if (!selectedPlan || !user?.id || !user?.email) return;

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

      // 3. Record transaction
      const transactionData = {
        user_id: user.id,
        type: "debit",
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

      // 5. Send email confirmation
      try {
        await sendSaveEmail(amount, newBalance, selectedPlan.name, user.email);
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // Don't fail the whole operation if email fails
      }

      // Update local state
      useAppStore.setState((prev: any) => ({
        user: {
          ...prev.user,
          accountBalance: newBalance,
        },
      }));

      toast.success(`$${amount.toLocaleString()} saved successfully! Email confirmation sent.`);
      
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
    if (!selectedSavingId || !user?.id || !user?.email) return;

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
      const newSavingsBalance = saving.total_balance - withdrawAmt;
      const isFullWithdrawal = newSavingsBalance <= 0;
      
      const { error: updateError } = await supabase
        .from("user_savings")
        .update({
          total_balance: newSavingsBalance,
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

      // 3. Record transaction
      const transactionData = {
        user_id: user.id,
        type: "credit",
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
          balance_after: newSavingsBalance,
          status: "completed"
        });

      // 5. Send email confirmation
      try {
        await sendWithdrawEmail(withdrawAmt, netWithdrawal, newUserBalance, plan?.name || "Savings Account", user.email, penaltyFee);
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // Don't fail the whole operation if email fails
      }

      // Update local state
      useAppStore.setState((prev: any) => ({
        user: {
          ...prev.user,
          accountBalance: newUserBalance,
        },
      }));

      toast.success(`$${netWithdrawal.toLocaleString()} withdrawn successfully! Email confirmation sent.`);
      
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

  const handleDeleteSavings = async () => {
    if (!savingToDelete || !user?.id || !user?.email) return;

    const saving = savingToDelete;
    setProcessing(true);

    try {
      const plan = saving.savings_plans;
      let penaltyFee = 0;
      let refundAmount = saving.total_balance;

      // Check for early withdrawal penalty if deleting before minimum duration
      if (plan && saving.days_since_start && saving.days_since_start < plan.min_duration_days) {
        penaltyFee = (saving.total_balance * plan.withdrawal_fee) / 100;
        refundAmount = saving.total_balance - penaltyFee;
        toast.warning(`Early deletion penalty applied: $${penaltyFee.toFixed(2)}`);
      }

      // 1. FIRST delete related savings_transactions
      const { error: deleteTransactionsError } = await supabase
        .from("savings_transactions")
        .delete()
        .eq("savings_id", saving.id);

      if (deleteTransactionsError) {
        console.error("Error deleting transactions:", deleteTransactionsError);
        throw new Error("Failed to delete related transactions. Please try again.");
      }

      // 2. THEN delete from user_savings
      const { error: deleteError } = await supabase
        .from("user_savings")
        .delete()
        .eq("id", saving.id);

      if (deleteError) throw deleteError;

      // 3. Add refund to user balance
      const currentUserBalance = user?.accountBalance ?? 0;
      const newUserBalance = currentUserBalance + refundAmount;
      
      const { error: balanceError } = await supabase
        .from("citisignup")
        .update({ account_balance: newUserBalance })
        .eq("id", user.id);

      if (balanceError) throw balanceError;

      // 4. Record transaction for refund
      const transactionData = {
        user_id: user.id,
        type: "credit",
        amount: refundAmount,
        description: `Savings account deletion${penaltyFee > 0 ? ` (penalty: $${penaltyFee.toFixed(2)})` : ''}`,
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

      // 5. Send email confirmation
      try {
        await sendDeleteEmail(refundAmount, penaltyFee, newUserBalance, plan?.name || "Savings Account", user.email);
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // Don't fail the whole operation if email fails
      }

      // Update local state
      useAppStore.setState((prev: any) => ({
        user: {
          ...prev.user,
          accountBalance: newUserBalance,
        },
      }));

      toast.success(`Savings account deleted. $${refundAmount.toLocaleString()} refunded to your balance. Email confirmation sent.`);
      
      // Refresh data
      await fetchSavingsData();
      setIsDeleteModalOpen(false);
      setSavingToDelete(null);

    } catch (error: any) {
      console.error("Delete error:", error);
      toast.error(error.message || "Failed to delete savings account");
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
    <Loading />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Savings</h1>
              <p className="text-gray-600 mt-2">
                Save money securely and earn interest over time
              </p>
            </div>

            <Wallent balance={balance} getTotalSavings={getTotalSavings}
             getTotalInterestEarned={getTotalInterestEarned} />
          </div>
        </div>

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
                        <div className="flex gap-3 flex-wrap">
                          {saving.status === 'active' && (
                            <>
                              <button
                                onClick={() => handleWithdrawClick(saving)}
                                className="flex-1 bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                              >
                                <FaArrowDown className="mr-2" />
                                Withdraw
                              </button>
                        
                            </>
                          )}
                          <button
                            onClick={() => handleDeleteClick(saving)}
                            className="flex-1 bg-red-100 text-red-700 font-semibold py-2 px-4 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center"
                          >
                            <FaTrash className="mr-2" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

     <SaveOverLay  isSaveModalOpen={isSaveModalOpen}
  setIsSaveModalOpen={setIsSaveModalOpen}
  selectedPlan={selectedPlan}
  savingsAmount={savingsAmount}
  setSavingsAmount={setSavingsAmount}
  balance={balance}
  processing={processing}
  handleSaveMoney={handleSaveMoney}
  calculateProjectedInterest={calculateProjectedInterest}
  />

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
<DeleteModal  isDeleteModalOpen={isDeleteModalOpen}
  savingToDelete={savingToDelete}
  setIsDeleteModalOpen={  setIsDeleteModalOpen}
  processing={ processing}
  handleDeleteSavings={handleDeleteSavings}/>

      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}