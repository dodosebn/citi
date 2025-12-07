"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/app/store/supabase";
import { 
  Download, 
  Share2, 
  Eye, 
  EyeOff, 
  ChevronRight,
  X,
  MessageCircle,
  FileText,
  Printer,
  Copy,
  ExternalLink
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Transaction, TransactionDetails } from "./history/transactionDetails";

export default function TransactionHis({ userId }: { userId: string }) {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showBalance, setShowBalance] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data: user, error: userError } = await supabase
          .from("citisignup")
          .select("account_balance")
          .eq("id", userId)
          .single();

        if (!userError && user) {
          setBalance(user.account_balance);
        }

        const { data: tx, error: txError } = await supabase
          .from("transactions")
          .select("*")
          .eq("user_id", userId)
          .order("date", { ascending: false });

        if (!txError && tx) {
          setTransactions(tx as Transaction[]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    const txChannel = supabase
      .channel("transactions-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "transactions",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setTransactions((prev) => [payload.new as Transaction, ...prev]);
        }
      )
      .subscribe();

    const balanceChannel = supabase
      .channel("balance-realtime")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "citisignup",
          filter: `id=eq.${userId}`,
        },
        (payload) => {
          setBalance(payload.new.account_balance);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(txChannel);
      supabase.removeChannel(balanceChannel);
    };
  }, [userId]);

  const exportAllTransactions = async () => {
    try {
      toast.info("Preparing export...", { autoClose: 2000 });
      
      const csvContent = [
        ['Date', 'Type', 'Amount', 'Description', 'Status', 'Reference'],
        ...transactions.map(t => [
          new Date(t.date).toLocaleString(),
          t.type,
          `$${t.amount.toFixed(2)}`,
          t.description,
          t.status || 'completed',
          t.reference || ''
        ])
      ].map(row => row.join(',')).join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `transactions-${new Date().getTime()}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      toast.success("Transactions exported to CSV!");
    } catch (error) {
      toast.error("Failed to export transactions");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today, ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday, ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays <= 7) {
      return date.toLocaleDateString('en-US', { weekday: 'long', hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <ToastContainer position="top-right" />

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-4 mb-6 shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-white/80 text-sm">Available Balance</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-2xl font-bold text-white">
                {showBalance ? `$${balance.toFixed(2)}` : '••••••'}
              </p>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-1 hover:bg-white/20 rounded"
              >
                {showBalance ? <EyeOff className="w-4 h-4 text-white" /> : <Eye className="w-4 h-4 text-white" />}
              </button>
            </div>
          </div>
          {transactions.length > 0 && (
            <button
              onClick={exportAllTransactions}
              className="flex items-center gap-2 px-3 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm">Export All</span>
            </button>
          )}
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800">Transaction History</h3>
            <span className="text-sm text-gray-500">
              {transactions.length} {transactions.length === 1 ? 'transaction' : 'transactions'}
            </span>
          </div>
        </div>

        {isLoading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-gray-500 mt-2">Loading transactions...</p>
          </div>
        ) : transactions.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">No transactions yet</p>
            <p className="text-gray-400 text-sm mt-1">Your transactions will appear here</p>
          </div>
        ) : (
          <ul className="divide-y">
            {transactions.map((t) => (
              <li 
                key={t.id} 
                className="p-4 hover:bg-gray-50 cursor-pointer transition"
                onClick={() => setSelectedTransaction(t)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      t.type === 'debit' ? 'bg-red-100' : 'bg-green-100'
                    }`}>
                      <span className={`font-bold ${t.type === 'debit' ? 'text-red-600' : 'text-green-600'}`}>
                        {t.type === 'debit' ? '−' : '+'}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{t.description}</p>
                      <p className="text-sm text-gray-500">{formatDate(t.date)}</p>
                      {t.status && (
                        <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${t.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                          {t.status}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${t.type === 'debit' ? 'text-red-600' : 'text-green-600'}`}>
                      {t.type === 'debit' ? '-' : '+'}${t.amount.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                      <span>View details</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <TransactionDetails
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  );
}