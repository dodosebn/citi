"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  Transaction,
  Account,
  Card,
  User
} from "./type";
import BalanceCard from "./balanceCard";
import QuickActions from "./quickActions";
import CreditCard from "./creditCard";
import TransactionHis from "./transactionalHis";
import UserSettings from "./userSettings";
import { useAppStore } from "@/app/store/useApp";
import Layout from "../layout";
import ElectricityForm from "./Elect/electricityForm";
import LoanPage from "./loan/loanPage";
import InvestmentsPage from "./investment/investment";
import Transfer from "./transfer";
import SavingsPage from "../save/page";
import InvestmentOTPVerification from "@/app/invest-part/otp-verification/page";

const BankingDetails: React.FC = () => {
  const { user, currentView, setUser } = useAppStore();

  // ------------------------------
  // Helpers
  // ------------------------------
  const formatCustomTime = (date: Date): string =>
    date.toLocaleTimeString("en-GB", { hour12: false });

  const formatCustomDate = (date: Date): string => {
    const time = date.toLocaleTimeString("en-GB", { hour12: false });
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const day = date.getDate();
    const month = date
      .toLocaleDateString("en-US", { month: "long" })
      .toUpperCase();
    const year = date.getFullYear();

    return `${time}, ${dayName}, ${day} ${month} ${year}`;
  };

  // ------------------------------
  // Account State (safe defaults)
  // ------------------------------
  const [account, setAccount] = useState<Account>({
    balance: 0,
    lastUpdated: "",
    timeUpdated: "",
    currency: "$",
    accountNumber: ""
  });

  // When user loads (after refresh), sync account
  useEffect(() => {
    if (!user) return;

    setAccount({
      balance: user.accountBalance,
      lastUpdated: formatCustomDate(new Date()),
      timeUpdated: formatCustomTime(new Date()),
      currency: "$",
      accountNumber: user.accountNumber
    });
  }, [user]);

  // ------------------------------
  // Card State
  // ------------------------------
  const [card, setCard] = useState<Card>({
    id: "",
    cardNumber: "",
    expiryDate: "12/35",
    cvv: "123",
    cardHolder: "Card Holder",
    type: "visa"
  });

  // Sync when user loads
  useEffect(() => {
    if (!user) return;

    setCard({
      id: user.id.toString(),
      cardNumber: user.cardNumber || "",
      expiryDate: "12/35",
      cvv: "123",
      cardHolder: `${user.firstName} ${user.lastName}`,
      type: "visa"
    });
  }, [user]);

  // ------------------------------
  // Update user handler
  // ------------------------------
  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  // ------------------------------
  // Navigation Renderer
  // ------------------------------
  const renderCurrentView = () => {
    switch (currentView) {
      case "home":
        return (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {user && <BalanceCard account={account} user={user} />}
              <QuickActions />

              <div className="mt-6 md:hidden flex flex-col gap-6">
                {user?.id && <TransactionHis userId={user.id} />}
                <CreditCard card={card} />
              </div>

              <div className="mt-6 md:flex hidden flex-col gap-6">
                <CreditCard card={card} />
              </div>
            </div>

            <div className="lg:col-span-1 md:flex hidden">
              {user?.id && <TransactionHis userId={user.id} />}
            </div>
          </div>
        );

      case "settings":
        return (
          <UserSettings user={user} onUpdateUser={handleUpdateUser} />
        );

      case "electricity":
        return <ElectricityForm />;

      case "loan":
        return <LoanPage user={user} />;

 case "invest":
  return <InvestmentOTPVerification/>
 case 'save': 
 return <SavingsPage />
      case "spend":
        return (
          <div className="mt-8">
            <Transfer />
          </div>
        );
      case "card":
        return (
          <div className="mt-8 rounded-lg shadow">
            <CreditCard card={card} />
          </div>
        );

      default:
        return (
          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            404
          </div>
        );
    }
  };

  // ------------------------------
  // Render
  // ------------------------------
  return (
    <>
      <Head>
        <title>Banking Dashboard</title>
        <meta name="description" content="Modern banking interface" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>{renderCurrentView()}</Layout>
    </>
  );
};

export default BankingDetails;
