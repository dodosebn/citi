"use client";
import React, { useState, useRef, useEffect } from "react";
import { RiFileCopy2Line, RiArrowLeftLine } from "react-icons/ri";
import { TbHomeFilled } from "react-icons/tb";
import { FaChevronDown, FaSearch, FaShieldAlt } from "react-icons/fa";
import { Banks } from "./data/bank";
import { useAppStore } from "@/app/store/useApp";
import { supabase } from "@/app/store/supabase";

interface Bank {
  NAME: string;
  REGION: string;
  COUNTRY: string;
  NOTE: string;
}

interface RecipientDetails {
  name: string;
  email: string;
}

type FormStep = "bank-details" | "recipient-info" | "amount" | "pin-verification" | "confirmation";

const Transfer = () => {
  const [query, setQuery] = useState("");
  const [banks, setBanks] = useState<Bank[]>([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState(["", "", "", ""]);
  const [currentStep, setCurrentStep] = useState<FormStep>("bank-details");

  const { user } = useAppStore();
  const PIN = user?.pin;
  const BALANCE = user?.accountBalance;

  const [isCopied, setIsCopied] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pinError, setPinError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<
    "pending" | "success" | "error"
  >("pending");

  const pinInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  useEffect(() => {
    const filled = pin.filter(Boolean).length;
    if (filled < 4 && pinInputRefs.current[filled]) {
      pinInputRefs.current[filled]?.focus();
    }
  }, [pin]);

  const handleSearch = (value: string) => {
    setQuery(value);

    if (value.trim()) {
      setSelectedBank(value);
    } else {
      setSelectedBank("");
    }

    if (!value.trim()) {
      setBanks([]);
      setIsDropdownOpen(false);
      return;
    }

    const filteredBanks = Banks.filter((b) =>
      b.NAME.toLowerCase().includes(value.toLowerCase())
    );
    setBanks(filteredBanks);

    setIsDropdownOpen(filteredBanks.length > 0);
  };

  const handleBankSelect = (bankName: string) => {
    setSelectedBank(bankName);
    setQuery(bankName);
    setIsDropdownOpen(false);
  };

  const handleCustomBankInput = () => {
    if (query.trim() && !banks.some((bank) => bank.NAME === query)) {
      setSelectedBank(query);
    }
    setIsDropdownOpen(false);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setAccountNumber(text);
    } catch {
      return;
    }
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const verifyBankDetails = async () => {
    setIsVerifying(true);
    await new Promise((r) => setTimeout(r, 1000));
    
    const isValid = accountNumber.length >= 10 && selectedBank;
    
    if (isValid) {
      setVerificationStatus("success");
      setCurrentStep("recipient-info");
    } else {
      setVerificationStatus("error");
    }
    setIsVerifying(false);
  };

  const verifyRecipientInfo = () => {
    if (recipientName && recipientEmail) {
      setCurrentStep("amount");
    }
  };

  const handlePinChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setPinError("");
    if (newPin.every(Boolean) && index === 3) verifyPin(newPin.join(""));
  };

  const handlePinKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      pinInputRefs.current[index - 1]?.focus();
    }
  };

  const sendEmailNotification = async (
    toEmail: string,
    toName: string,
    type: "sender" | "recipient",
    details: {
      amount: number;
      senderName: string;
      senderEmail: string;
      recipientName: string;
      recipientEmail: string;
      bank: string;
      accountNumber: string;
      transactionId: string;
      date: string;
      description: string;
      newBalance?: number;
    }
  ) => {
    try {
      const subject =
        type === "sender"
          ? `Transfer Confirmation - $${details.amount.toFixed(2)} Sent`
          : `Money Received - $${details.amount.toFixed(2)}`;

      const senderMessage = `
        <h2>Transfer Successful!</h2>
        <p>Dear ${details.senderName},</p>
        <p>You have successfully transferred <strong>$${details.amount.toFixed(
          2
        )}</strong> to:</p>
        <ul>
          <li><strong>Recipient:</strong> ${details.recipientName}</li>
          <li><strong>Bank:</strong> ${details.bank}</li>
          <li><strong>Account Number:</strong> ${details.accountNumber}</li>
          <li><strong>Transaction ID:</strong> ${details.transactionId}</li>
          <li><strong>Date:</strong> ${details.date}</li>
          <li><strong>Description:</strong> ${
            details.description || "No description provided"
          }</li>
          ${
            details.newBalance
              ? `<li><strong>Your New Balance:</strong> $${details.newBalance.toFixed(
                  2
                )}</li>`
              : ""
          }
        </ul>
        <p>Thank you for banking with us!</p>
      `;

      const recipientMessage = `
        <h2>Money Received!</h2>
        <p>Dear ${details.recipientName},</p>
        <p>You have received <strong>$${details.amount.toFixed(
          2
        )}</strong> from:</p>
        <ul>
          <li><strong>Sender:</strong> ${details.senderName}</li>
          <li><strong>Sender's Bank:</strong> ${details.bank}</li>
          <li><strong>Transaction ID:</strong> ${details.transactionId}</li>
          <li><strong>Date:</strong> ${details.date}</li>
          <li><strong>Reference:</strong> ${
            details.description || "Bank Transfer"
          }</li>
        </ul>
        <p>The funds should reflect in your account shortly.</p>
        <p>If you have any questions, please contact our support team.</p>
      `;

      const emailData = {
        to: toEmail,
        subject,
        html: type === "sender" ? senderMessage : recipientMessage,
      };

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Email sending error:", error);
    }
  };

  const verifyPin = async (enteredPin: string) => {
    const balance = BALANCE ?? 0;
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 1000));

    const transferAmount = parseFloat(amount);

    if (enteredPin === `${PIN}`) {
      if (transferAmount > balance) {
        setPinError("Insufficient balance.");
        setIsProcessing(false);
        return;
      }

      const newBalance = balance - transferAmount;

      const { error: balanceError } = await supabase
        .from("citisignup")
        .update({ account_balance: newBalance })
        .eq("id", user?.id);

      if (balanceError) {
        setPinError("Failed to update balance. Try again.");
        setIsProcessing(false);
        return;
      }

      const transactionId = `TRX-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      const transactionDate = new Date().toISOString();

      const recipientDetails: RecipientDetails = {
        name: recipientName,
        email: recipientEmail,
      };

      const transferDescription = description || `Transfer to ${recipientName}`;

      const { error: transactionError } = await supabase
        .from("transactions")
        .insert({
          user_id: user?.id,
          amount: transferAmount,
          type: "transfer",
          description: transferDescription,
          recipient_details: recipientDetails,
          bank_name: selectedBank,
          account_number: accountNumber,
          transaction_id: transactionId,
          status: "completed",
          created_at: transactionDate,
        });

      if (transactionError) {
        console.error("Transaction record failed:", transactionError);
      }

      useAppStore.setState((prev: any) => ({
        user: {
          ...prev.user,
          accountBalance: newBalance,
        },
      }));

      const emailDetails = {
        amount: transferAmount,
        senderName: user?.firstName || "Customer",
        senderEmail: user?.email || "",
        recipientName,
        recipientEmail,
        bank: selectedBank,
        accountNumber,
        transactionId,
        date: new Date(transactionDate).toLocaleString(),
        description: transferDescription,
        newBalance,
      };

      try {
        await sendEmailNotification(
          user?.email || "",
          user?.firstName|| "Customer",
          "sender",
          emailDetails
        );

        await sendEmailNotification(
          recipientEmail,
          recipientName,
          "recipient",
          emailDetails
        );
      } catch (emailError) {
        console.error(
          "Email sending failed, but transaction completed:",
          emailError
        );
      }

      setCurrentStep("confirmation");
    } else {
      setPinError("Invalid PIN. Please try again.");
      setPin(["", "", "", ""]);
      pinInputRefs.current[0]?.focus();
    }

    setIsProcessing(false);
  };

  const formatCurrency = (val: string) => {
    if (!val) return "";
    const numericValue = val.replace(/[^\d.]/g, "");
    return parseFloat(numericValue || "0").toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
      setAmount("");
      return;
    }

    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const resetForm = () => {
    setQuery("");
    setSelectedBank("");
    setAccountNumber("");
    setRecipientName("");
    setRecipientEmail("");
    setDescription("");
    setAmount("");
    setPin(["", "", "", ""]);
    setPinError("");
    setCurrentStep("bank-details");
    setVerificationStatus("pending");
  };

  return (
    <div className=" bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold">Bank Transfer</h1>
              <div className="flex items-center gap-2 text-blue-200">
                <FaShieldAlt />
                <span className="text-sm">Secure</span>
              </div>
            </div>
            
            {/* Progress Steps */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === "bank-details" ? "bg-white text-blue-600" : currentStep === "recipient-info" || currentStep === "amount" || currentStep === "pin-verification" || currentStep === "confirmation" ? "bg-green-500 text-white" : "bg-blue-400 text-white"}`}>
                    1
                  </div>
                  <span className="text-xs mt-1">Bank Details</span>
                </div>
                <div className="flex-1 h-1 mx-2 bg-blue-400"></div>
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === "recipient-info" ? "bg-white text-blue-600" : currentStep === "amount" || currentStep === "pin-verification" || currentStep === "confirmation" ? "bg-green-500 text-white" : "bg-blue-400 text-white"}`}>
                    2
                  </div>
                  <span className="text-xs mt-1">Recipient</span>
                </div>
                <div className="flex-1 h-1 mx-2 bg-blue-400"></div>
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === "amount" ? "bg-white text-blue-600" : currentStep === "pin-verification" || currentStep === "confirmation" ? "bg-green-500 text-white" : "bg-blue-400 text-white"}`}>
                    3
                  </div>
                  <span className="text-xs mt-1">Amount</span>
                </div>
                <div className="flex-1 h-1 mx-2 bg-blue-400"></div>
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === "pin-verification" ? "bg-white text-blue-600" : currentStep === "confirmation" ? "bg-green-500 text-white" : "bg-blue-400 text-white"}`}>
                    4
                  </div>
                  <span className="text-xs mt-1">Confirm</span>
                </div>
              </div>
            </div>
          </div>

          <form
            className="p-6 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              if (currentStep === "bank-details") verifyBankDetails();
              if (currentStep === "recipient-info") verifyRecipientInfo();
              if (currentStep === "amount") setCurrentStep("pin-verification");
            }}
          >
            {currentStep === "bank-details" && (
              <>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Account Number
                  </label>
                  <div className="flex border rounded-xl overflow-hidden">
                    <input
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      className="flex-grow px-4 py-3 outline-none"
                      placeholder="Enter account number"
                    />
                    <button
                      type="button"
                      onClick={handlePaste}
                      className={`px-4 ${
                        isCopied ? "text-green-600" : "text-gray-600"
                      }`}
                    >
                      {isCopied ? "Copied!" : <RiFileCopy2Line />}
                    </button>
                  </div>
                </div>

                <div ref={dropdownRef}>
                  <label className="block text-sm font-semibold mb-2">
                    Bank Name
                  </label>
                  <div className="relative">
                    <div className="flex border rounded-xl px-4">
                      <div className="mt-4">
                        <TbHomeFilled className="text-gray-400 mr-2" />
                      </div>
                      <input
                        type="text"
                        value={query}
                        onChange={(e) => handleSearch(e.target.value)}
                        onBlur={handleCustomBankInput}
                        onFocus={() =>
                          query && banks.length > 0 && setIsDropdownOpen(true)
                        }
                        placeholder="Search or type bank name..."
                        className="flex-grow py-3 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        disabled={banks.length === 0}
                      >
                        <FaChevronDown
                          className={isDropdownOpen ? "rotate-180" : ""}
                        />
                      </button>
                    </div>
                    {isDropdownOpen && (
                      <ul className="absolute z-10 w-full bg-white border rounded-xl mt-2 max-h-60 overflow-y-auto shadow-lg">
                        {banks.length > 0 ? (
                          banks.map((b, i) => (
                            <li
                              key={i}
                              className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                              onClick={() => handleBankSelect(b.NAME)}
                            >
                              {b.NAME}{" "}
                              <span className="text-sm text-gray-500">
                                ({b.REGION})
                              </span>
                            </li>
                          ))
                        ) : (
                          <li className="p-4 text-gray-400 text-center">
                            No banks found. You can type any bank name.
                          </li>
                        )}
                      </ul>
                    )}
                  </div>
                  {selectedBank &&
                    !Banks.some((bank) => bank.NAME === selectedBank) && (
                      <p className="text-sm text-blue-600 mt-2">
                        Using custom bank:{" "}
                        <span className="font-semibold">{selectedBank}</span>
                      </p>
                    )}
                </div>

                <button
                  type="submit"
                  disabled={!selectedBank || !accountNumber || isVerifying}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isVerifying ? "Verifying..." : "Continue to Recipient Info"}
                </button>
              </>
            )}

            {currentStep === "recipient-info" && (
              <>
                <button
                  type="button"
                  onClick={() => setCurrentStep("bank-details")}
                  className="text-blue-600 mb-4 flex items-center gap-1 hover:text-blue-800 transition-colors"
                >
                  <RiArrowLeftLine /> Back to Bank Details
                </button>
                
                <div className="mb-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Bank Details</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Account Number:</span>
                      <span className="font-semibold">{accountNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bank:</span>
                      <span className="font-semibold">{selectedBank}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Recipient Name
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full px-4 py-3 border rounded-xl outline-none focus:border-blue-500"
                    placeholder="Enter recipient's full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Recipient Email
                  </label>
                  <input
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    className="w-full px-4 py-3 border rounded-xl outline-none focus:border-blue-500"
                    placeholder="Enter recipient's email"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    A confirmation email will be sent to this address
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 border rounded-xl outline-none focus:border-blue-500"
                    placeholder="Add a note or description for this transfer"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This will be included in the transaction history and email notifications
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={!recipientName || !recipientEmail}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Amount
                </button>
              </>
            )}

            {currentStep === "amount" && (
              <>
                <button
                  type="button"
                  onClick={() => setCurrentStep("recipient-info")}
                  className="text-blue-600 mb-4 flex items-center gap-1 hover:text-blue-800 transition-colors"
                >
                  <RiArrowLeftLine /> Back to Recipient Info
                </button>
                
                <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-3">Transfer Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Account Number:</span>
                      <span className="font-semibold">{accountNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bank:</span>
                      <span className="font-semibold">{selectedBank}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Recipient:</span>
                      <span className="font-semibold">{recipientName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-semibold">{recipientEmail}</span>
                    </div>
                    {description && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Description:</span>
                        <span className="font-semibold">{description}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Amount to Transfer
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="text"
                      value={amount}
                      onChange={handleAmountChange}
                      className="w-full pl-8 pr-4 py-3 border rounded-xl outline-none focus:border-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setAmount("100")}
                      className="px-4 py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      $100
                    </button>
                    <button
                      type="button"
                      onClick={() => setAmount("250")}
                      className="px-4 py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      $250
                    </button>
                    <button
                      type="button"
                      onClick={() => setAmount("500")}
                      className="px-4 py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      $500
                    </button>
                    <button
                      type="button"
                      onClick={() => setAmount("1000")}
                      className="px-4 py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      $1,000
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!amount || parseFloat(amount) <= 0}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to PIN Verification
                </button>
              </>
            )}

            {currentStep === "pin-verification" && (
              <>
                <button
                  type="button"
                  onClick={() => setCurrentStep("amount")}
                  className="text-blue-600 mb-4 flex items-center gap-1 hover:text-blue-800 transition-colors"
                >
                  <RiArrowLeftLine /> Back to Amount
                </button>
                
                <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-3">Final Confirmation</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-bold text-lg text-green-600">
                        ${formatCurrency(amount)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Account Number:</span>
                      <span className="font-semibold">{accountNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bank:</span>
                      <span className="font-semibold">{selectedBank}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Recipient:</span>
                      <span className="font-semibold">{recipientName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-semibold">{recipientEmail}</span>
                    </div>
                    {description && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Description:</span>
                        <span className="font-semibold">{description}</span>
                      </div>
                    )}
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between text-gray-600">
                        <span>Fee:</span>
                        <span className="font-semibold">$0.00</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg pt-1">
                        <span>Total:</span>
                        <span>${formatCurrency(amount)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-3 text-center">
                    Enter your PIN to confirm the transfer
                  </label>
                  <div className="flex justify-center gap-3">
                    {pin.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => {
                          pinInputRefs.current[i] = el;
                        }}
                        type="password"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handlePinChange(i, e.target.value)}
                        onKeyDown={(e) => handlePinKeyDown(i, e)}
                        className="w-14 h-14 text-xl text-center border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-center text-gray-500 mt-3">
                    Enter your 4-digit PIN to authorize this transaction
                  </p>
                </div>

                {pinError && (
                  <div className="text-red-600 text-center font-medium">
                    {pinError}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => verifyPin(pin.join(""))}
                  disabled={pin.some((d) => !d) || isProcessing}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing Transfer...
                    </div>
                  ) : (
                    "Confirm Transfer"
                  )}
                </button>
              </>
            )}

            {currentStep === "confirmation" && (
              <div className="text-center space-y-6">
                <div className="text-green-500 text-5xl mb-2">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
                    ✓
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Transfer Successful!
                </h3>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 p-6 rounded-xl shadow-sm">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount Sent:</span>
                      <span className="font-bold text-lg text-green-600">
                        ${formatCurrency(amount)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">To:</span>
                      <span className="font-bold">{recipientName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transaction ID:</span>
                      <span className="font-mono text-sm">
                        TRX-{Date.now().toString().slice(-8)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex items-start">
                    <div className="text-blue-500 mr-3 mt-1">✉️</div>
                    <div className="text-left">
                      <p className="font-medium text-blue-800">
                        Emails sent successfully!
                      </p>
                      <p className="text-sm text-blue-600">
                        Confirmation emails have been sent to both you and{" "}
                        {recipientEmail}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-left">
                  <p className="font-medium text-green-800 mb-1">
                    What happens next?
                  </p>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>
                      • The money is on its way to {recipientName}'s account
                    </li>
                    <li>• Funds should appear within 1-2 business days</li>
                    <li>
                      • You can track this transfer in your transaction history
                    </li>
                  </ul>
                </div>

                <div className="space-y-3 pt-4">
                  <button
                    onClick={resetForm}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors"
                  >
                    Make Another Transfer
                  </button>
                  <button
                    onClick={() => (window.location.href = "/dashboard")}
                    className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-xl font-semibold transition-colors"
                  >
                    Back to Dashboard
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Transfer;