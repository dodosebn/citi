"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/store/supabase";
import { useAppStore } from "@/app/store/useApp";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { FaArrowLeft, FaChartLine, FaClock, FaCheckCircle, FaTimesCircle, FaCalendarAlt, FaDollarSign } from "react-icons/fa";

type Investment = {
  id: string;
  plan_id: string;
  amount: number;
  status: "active" | "completed" | "cancelled";
  created_at: string;
  updated_at?: string;
  investment_plans?: {
    name: string;
    interest_rate: number;
    duration_months: number;
    description: string;
  };
  calculated_returns?: number;
  maturity_date?: string;
  days_remaining?: number;
};

export default function MyInvestmentsPage() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalReturns, setTotalReturns] = useState(0);
  const [activeTab, setActiveTab] = useState<"all" | "active" | "completed">("all");
  const { user } = useAppStore();

  useEffect(() => {
    if (user?.id) {
      fetchInvestments();
    }
  }, [user?.id]);

  const fetchInvestments = async () => {
    try {
      setLoading(true);
      
      const { data: investmentsData, error } = await supabase
        .from("user_investments")
        .select(`
          *,
          investment_plans (*)
        `)
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const enrichedInvestments = investmentsData?.map((inv: any) => {
        const plan = inv.investment_plans;
        const createdDate = new Date(inv.created_at);
        const maturityDate = new Date(createdDate);
        maturityDate.setMonth(maturityDate.getMonth() + (plan?.duration_months || 0));
        
        const today = new Date();
        const daysRemaining = Math.max(0, Math.ceil((maturityDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
        
        const calculatedReturns = plan ? 
          inv.amount * (plan.interest_rate / 100) * (plan.duration_months / 12) : 0;

        return {
          ...inv,
          calculated_returns: calculatedReturns,
          maturity_date: maturityDate.toISOString(),
          days_remaining: daysRemaining
        };
      }) || [];

      setInvestments(enrichedInvestments);

      const totalInv = enrichedInvestments.reduce((sum: number, inv: Investment) => sum + inv.amount, 0);
      const totalRet = enrichedInvestments.reduce((sum: number, inv: any) => sum + (inv.calculated_returns || 0), 0);
      
      setTotalInvestment(totalInv);
      setTotalReturns(totalRet);

    } catch (error) {
      console.error("Error fetching investments:", error);
      toast.error("Failed to load investments");
    } finally {
      setLoading(false);
    }
  };

  const filteredInvestments = investments.filter(inv => {
    if (activeTab === "all") return true;
    return inv.status === activeTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <FaClock className="mr-2" />;
      case "completed": return <FaCheckCircle className="mr-2" />;
      case "cancelled": return <FaTimesCircle className="mr-2" />;
      default: return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateProgress = (createdAt: string, durationMonths: number) => {
    const start = new Date(createdAt);
    const now = new Date();
    const end = new Date(start);
    end.setMonth(end.getMonth() + durationMonths);
    
    const totalDuration = end.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    
    if (elapsed <= 0) return 0;
    if (elapsed >= totalDuration) return 100;
    
    return Math.round((elapsed / totalDuration) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your investments...</p>
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
              <h1 className="text-3xl font-bold text-gray-900">My Investments</h1>
              <p className="text-gray-600 mt-2">
                Track and manage your investment portfolio
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center text-gray-500 mb-2">
                    <FaDollarSign className="mr-2" />
                    <span className="text-sm">Total Invested</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    ${totalInvestment.toLocaleString()}
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center text-gray-500 mb-2">
                    <FaChartLine className="mr-2" />
                    <span className="text-sm">Expected Returns</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    +${totalReturns.toLocaleString()}
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
              {[
                { key: "all", label: "All Investments", count: investments.length },
                { key: "active", label: "Active", count: investments.filter(i => i.status === "active").length },
                { key: "completed", label: "Completed", count: investments.filter(i => i.status === "completed").length }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`
                    py-2 px-1 border-b-2 font-medium text-sm flex items-center
                    ${activeTab === tab.key
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }
                  `}
                >
                  {tab.label}
                  <span className={`
                    ml-2 py-0.5 px-2 rounded-full text-xs font-semibold
                    ${activeTab === tab.key
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-600"
                    }
                  `}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Investments Grid */}
        {filteredInvestments.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FaChartLine className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No investments found
            </h3>
            <p className="text-gray-500 mb-6">
              {activeTab === "all" 
                ? "You haven't made any investments yet."
                : `You don't have any ${activeTab} investments.`
              }
            </p>
            <Link
              href="/invest-part/investment"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Start Investing
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredInvestments.map((investment) => (
              <div
                key={investment.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {investment.investment_plans?.name || "Unknown Plan"}
                      </h3>
                      <div className="flex items-center mt-1">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(investment.status)}`}>
                          {getStatusIcon(investment.status)}
                          {investment.status.charAt(0).toUpperCase() + investment.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        ${investment.amount.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        Invested
                      </div>
                    </div>
                  </div>

                  {/* Plan Details */}
                  <p className="text-gray-600 mb-6 line-clamp-2">
                    {investment.investment_plans?.description || "No description available"}
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="text-sm text-blue-600 font-medium">Interest Rate</div>
                      <div className="text-lg font-bold text-gray-900">
                        {investment.investment_plans?.interest_rate || 0}%
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="text-sm text-green-600 font-medium">Expected Returns</div>
                      <div className="text-lg font-bold text-gray-900">
                        +${investment.calculated_returns?.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <div className="text-sm text-purple-600 font-medium">Duration</div>
                      <div className="text-lg font-bold text-gray-900">
                        {investment.investment_plans?.duration_months || 0} months
                      </div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-3">
                      <div className="text-sm text-orange-600 font-medium">Days Left</div>
                      <div className="text-lg font-bold text-gray-900">
                        {investment.days_remaining || 0}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Investment Progress</span>
                      <span>
                        {calculateProgress(
                          investment.created_at,
                          investment.investment_plans?.duration_months || 0
                        )}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${calculateProgress(
                            investment.created_at,
                            investment.investment_plans?.duration_months || 0
                          )}%`
                        }}
                      />
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="border-t border-gray-100 pt-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <FaCalendarAlt className="mr-2 text-gray-400" />
                        <div>
                          <div className="font-medium">Started</div>
                          <div>{formatDate(investment.created_at)}</div>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaCalendarAlt className="mr-2 text-gray-400" />
                        <div>
                          <div className="font-medium">Matures</div>
                          <div>{investment.maturity_date ? formatDate(investment.maturity_date) : "N/A"}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  {/* <div className="mt-6">
                    <button
                      onClick={() => {
                        // Add view details or manage investment functionality
                        toast.info("Investment details coming soon!");
                      }}
                      className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                    >
                      View Details
                    </button>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Summary */}
        {investments.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Investments</span>
                  <span className="font-semibold">{investments.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active</span>
                  <span className="font-semibold text-blue-600">
                    {investments.filter(i => i.status === "active").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-semibold text-green-600">
                    {investments.filter(i => i.status === "completed").length}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Capital</span>
                  <span className="font-semibold">${totalInvestment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Expected Returns</span>
                  <span className="font-semibold text-green-600">
                    +${totalReturns.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Value</span>
                  <span className="font-semibold text-blue-600">
                    ${(totalInvestment + totalReturns).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/invest-part/investment"
                  className="block w-full text-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Invest More
                </Link>
                <button
                  onClick={() => toast.info("Export feature coming soon!")}
                  className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Export Statement
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