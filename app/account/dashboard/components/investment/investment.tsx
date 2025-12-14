"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/store/supabase";
import { useAppStore } from "@/app/store/useApp";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

type Plan = {
  id: string;
  name: string;
  description: string;
  interest_rate: number;
  duration_months: number;
  min_amount?: number;
  max_amount?: number;
};

// Email sending function
const sendInvestmentEmail = async (
  amount: number,
  planName: string,
  newBalance: number,
  duration: number,
  interestRate: number,
  email: string
) => {
  if (!email) return;

  const totalReturn = amount + amount * (interestRate / 100) * (duration / 12);
  const profit = totalReturn - amount;

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
      .returns { background:#e3f2fd; color:#1565c0; padding:12px; border-radius:4px; margin:15px 0; }
    </style>
  </head>
  <body>
    <div class="receipt">
      <div class="header">
        <h2>Citibank Investments</h2>
        <p>Investment Confirmation</p>
      </div>

      <div class="content">
        <div class="success">✓ INVESTMENT SUCCESSFUL</div>

        <div class="row"><span>Plan:</span><span>${planName}</span></div>
        <div class="row"><span>Investment Amount:</span><span>$${amount.toFixed(
          2
        )}</span></div>
        <div class="row"><span>Duration:</span><span>${duration} months</span></div>
        <div class="row"><span>Interest Rate:</span><span>${interestRate}%</span></div>

        <div class="returns">
          <div class="row"><span>Expected Profit:</span><span>+$${profit.toFixed(
            2
          )}</span></div>
          <div class="row"><span>Total Return:</span><span>$${totalReturn.toFixed(
            2
          )}</span></div>
        </div>

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
      subject: `Investment Confirmation - $${amount.toFixed(2)} in ${planName}`,
      html,
    }),
  });
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
    if (!selectedPlan || !user?.id || !user?.email) return;
    const balance = user?.accountBalance ?? 0;
    const investAmount = parseFloat(investmentAmount);

    if (isNaN(investAmount) || investAmount <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    if (selectedPlan.min_amount && investAmount < selectedPlan.min_amount) {
      toast.error(
        `Minimum investment is $${selectedPlan.min_amount.toLocaleString()}`
      );
      return;
    }

    if (selectedPlan.max_amount && investAmount > selectedPlan.max_amount) {
      toast.error(
        `Maximum investment is $${selectedPlan.max_amount.toLocaleString()}`
      );
      return;
    }

    if (investAmount > balance) {
      toast.error("Insufficient balance.");
      return;
    }

    setInvesting(true);

    try {
      const { data: investmentData, error: investError } = await supabase
        .from("user_investments")
        .insert({
          user_id: user.id,
          plan_id: selectedPlan.id,
          amount: investAmount,
          status: "active",
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (investError) {
        console.error("Investment insert error:", investError);
        toast.error("Failed to record investment.");
        return;
      }

      const newBalance = balance - investAmount;
      const { error: balanceError } = await supabase
        .from("citisignup")
        .update({ account_balance: newBalance })
        .eq("id", user.id);

      if (balanceError) {
        console.error("Balance update error:", balanceError);
        toast.error("Failed to update balance.");
        return;
      }

      const transactionData = {
        user_id: user.id,
        type: "investment",
        amount: investAmount,
        description: `Invested in ${selectedPlan.name}`,
        status: "success",
        category: "investment",
        recipient: "Investment Account",
        sender: "Main Account",
        reference:
          "INV" +
          Date.now() +
          Math.random().toString(36).substr(2, 9).toUpperCase(),
        created_at: new Date().toISOString(),
      };

      const { error: txError } = await supabase
        .from("transactions")
        .insert(transactionData);

      if (txError) {
        console.warn("Transaction logging issue:", txError);
      }

      try {
        await sendInvestmentEmail(
          investAmount,
          selectedPlan.name,
          newBalance,
          selectedPlan.duration_months,
          selectedPlan.interest_rate,
          user.email
        );
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // Don't fail the operation if email fails
      }

      useAppStore.setState((prev: any) => ({
        user: {
          ...prev.user,
          accountBalance: newBalance,
        },
      }));

      toast.success("Investment successful! Email confirmation sent.");

      setIsModalOpen(false);
      setInvestmentAmount("");
      setSelectedPlan(null);
    } catch (error: any) {
      console.error("Investment error:", error);
      toast.error(error.message || "Failed to complete investment");
    } finally {
      setInvesting(false);
    }
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
        <div className="flex justify-between">
          <Link
            href="/account/dashboard"
            className="bg-blue-500 flex items-center rounded-full px-4 py-2"
          >
            <IoArrowBack size={18} />
            Dashboard
          </Link>
          <Link href="/invest-part/myInvestment" className="text-blue-700">
            View Made investments
          </Link>
        </div>
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
                    <div className="bg-blue-100 text-blue-800 w-full text-sm flex flex-row font-semibold px-3 py-1 rounded-full">
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

        {isModalOpen && selectedPlan && (
          <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform animate-scale-in">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Invest in {selectedPlan.name}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={investing}
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
                    <span>Available: ${BAL?.toLocaleString()}</span>
                    <span>
                      Min: ${(selectedPlan.min_amount || 5000).toLocaleString()}
                    </span>
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
                    `Invest $${parseFloat(
                      investmentAmount || "0"
                    ).toLocaleString()}`
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
