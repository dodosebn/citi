"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/store/supabase";
import { useAppStore } from "@/app/store/useApp";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";

type Plan = {
  id: string;
  name: string;
  description: string;
  interest_rate: number;
  duration_months: number;
  min_amount?: number;
  max_amount?: number;
};

export default function InvestmentsPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [investing, setInvesting] = useState(false);
  const { user } = useAppStore();
  const BAL = user?.accountBalance;

  useEffect(() => {
    const fetchPlans = async () => {
      const { data, error } = await supabase
        .from("investment_plans")
        .select("*");
      if (error) console.error(error);
      else setPlans(data || []);
      setLoading(false);
    };
    fetchPlans();
  }, []);

  const handleInvestClick = (plan: Plan) => {
    setSelectedPlan(plan);
    setInvestmentAmount(plan.min_amount?.toString() || "10000");
    setIsModalOpen(true);
  };

const handleInvest = async () => {
  if (!selectedPlan) return;
  const balance = user?.accountBalance ?? 0;
  const investAmount = parseFloat(investmentAmount);

  if (isNaN(investAmount) || investAmount <= 0) {
    toast.error("Please enter a valid amount.");
    return;
  }

  if (investAmount > balance) {
    toast.error("Insufficient balance.");
    return;
  }

  setInvesting(true);

  // Step 1: Insert investment first
  const { error: investError } = await supabase.from("user_investments").insert([
    {
      user_id: user?.id,
      plan_id: selectedPlan.id,
      amount: investAmount,
      status: "active",
      created_at: new Date().toISOString(),
    },
  ]);

  if (investError) {
    console.error("Investment insert error:", investError);
    toast.error("Failed to record investment.");
    setInvesting(false);
    return;
  }

  // Step 2: Update balance
  const newBalance = balance - investAmount;
  const { error: balanceError } = await supabase
    .from("citisignup")
    .update({ account_balance: newBalance })
    .eq("id", user?.id);

  if (balanceError) {
    console.error("Balance update error:", balanceError);
    toast.error("Failed to update balance.");
    setInvesting(false);
    return;
  }

  // Step 3: Record transaction (SILENTLY - no error toast)
  const { error: txError } = await supabase.from("transactions").insert({
    user_id: user?.id,
    type: "investment",
    amount: investAmount,
    description: `Invested in ${selectedPlan.name}`,
    status: "success",
    created_at: new Date().toISOString(),
  });

  if (txError) {
    console.warn("Transaction logging issue (non-critical):", txError);
    // NO TOAST ERROR HERE - transaction logging is secondary
  }

  // Update local state
  useAppStore.setState((prev: any) => ({
    user: {
      ...prev.user,
      accountBalance: newBalance,
    },
  }));

  toast.success("Investment successful ✅");

  setInvesting(false);
  setIsModalOpen(false);
  setInvestmentAmount("");
};
  const calculateReturns = (
    amount: number,
    interestRate: number,
    duration: number
  ) => {
    const returns = amount * (interestRate / 100) * (duration / 12);
    return returns;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href='/account/dashboard/myInvestment' className="text-blue-700">View Made investments</Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Investment Plans
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our carefully curated investment plans designed to help
            you grow your wealth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const sampleReturns = calculateReturns(
              10000,
              plan.interest_rate,
              plan.duration_months
            );

            return (
              <div
                key={plan.id}
                className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      {plan.name}
                    </h3>
                    <div
                      className="bg-blue-100 text-blue-800 w-full text-sm flex flex-row font-semibold px-3 py-1 rounded-full"
                    >
                      {plan.interest_rate}% ROI
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Duration</span>
                      <span className="font-semibold">
                        {plan.duration_months} months
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        Min. Investment
                      </span>
                      <span className="font-semibold">
                        ${(plan.min_amount || 5000).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        Sample Returns
                      </span>
                      <span className="font-semibold text-green-600">
                        +$
                        {sampleReturns.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleInvestClick(plan)}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Invest Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Investment Modal */}
        {isModalOpen && selectedPlan && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform animate-scale-in">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Invest in {selectedPlan.name}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Interest Rate:</span>
                      <p className="font-semibold text-blue-700">
                        {selectedPlan.interest_rate}%
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Duration:</span>
                      <p className="font-semibold">
                        {selectedPlan.duration_months} months
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Investment Amount ($)
                  </label>
                  <input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    min={selectedPlan.min_amount || 0}
                    max={selectedPlan.max_amount}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter amount"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>
                      Min: ${(selectedPlan.min_amount || 5000).toLocaleString()}
                    </span>
                    {selectedPlan.max_amount && (
                      <span>
                        Max: ${selectedPlan.max_amount.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                {investmentAmount && !isNaN(parseFloat(investmentAmount)) && (
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">
                      Estimated Returns
                    </h4>
                    <div className="text-sm text-green-700">
                      <p>
                        Total Return: $
                        {(
                          parseFloat(investmentAmount) +
                          calculateReturns(
                            parseFloat(investmentAmount),
                            selectedPlan.interest_rate,
                            selectedPlan.duration_months
                          )
                        ).toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </p>
                      <p>
                        Profit: +$
                        {calculateReturns(
                          parseFloat(investmentAmount),
                          selectedPlan.interest_rate,
                          selectedPlan.duration_months
                        ).toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-400 transition-colors"
                  disabled={investing}
                >
                  Cancel
                </button>
                <button
                  onClick={handleInvest}
                  disabled={investing}
                  className="flex-1 bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {investing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    `Invest $${parseFloat(investmentAmount).toLocaleString()}`
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer position="bottom-center" autoClose={3000} />
    </div>
  );
}
