"use client";
import React, { useState, useRef, useEffect } from "react";
import { RiArrowLeftLine } from "react-icons/ri";
import { Banks } from "./data/bank";
import { useAppStore } from "@/app/store/useApp";
import { supabase } from "@/app/store/supabase";
import ProgressSteps from "./transfer/progressSteps";
import { Bank, FormStep } from "./transfer/type";
import { FaShieldAlt } from "react-icons/fa";
import StepBankDetails from "./transfer/steps/stepBankDetails";
import RecipientInfo from "./transfer/steps/recipientInfo";
import Amount from "./transfer/steps/amount";
import PinVerification from "./transfer/steps/pinVerification";
import Confirmation from "./transfer/steps/confirmation";






const Transfer = () => {
  const [query, setQuery] = useState("");
  const [banks, setBanks] = useState<Bank[]>([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
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
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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
    swiftCode: string;
    routingNumber: string;
  }
) => {
  try {
    const subject =
      type === "sender"
        ? `Transfer Confirmation - $${details.amount.toFixed(2)} Sent`
        : `Money Received - $${details.amount.toFixed(2)}`;

    // Receipt-style CSS for emails
    const receiptStyles = `
      <style>
        .receipt-container {
          font-family: 'Courier New', Courier, monospace, Arial, sans-serif;
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          border: 2px solid #1a237e;
          border-radius: 8px;
          overflow: hidden;
          padding: 0;
        }
        .receipt-header {
          background: linear-gradient(135deg, #1a237e 0%, #283593 100%);
          color: white;
          padding: 20px;
          text-align: center;
          border-bottom: 3px solid #3949ab;
        }
        .receipt-header h1 {
          margin: 0 0 10px 0;
          font-size: 24px;
          font-weight: bold;
        }
        .receipt-header p {
          margin: 5px 0;
          font-size: 14px;
          opacity: 0.9;
        }
        .receipt-logo {
          max-width: 150px;
          height: auto;
          margin-bottom: 15px;
        }
        .receipt-body {
          padding: 25px;
        }
        .receipt-row {
          display: flex;
          gap: 2rem;
          padding: 12px 0;
          border-bottom: 1px dashed #e0e0e0;
          font-size: 14px;
        }
        .receipt-label {
          font-weight: bold;
          color: #333;
          min-width: 180px;
        }
        .receipt-value {
          text-align: right;
          color: #555;
          font-family: 'Courier New', monospace;
        }
        .receipt-divider {
          height: 1px;
          background: repeating-linear-gradient(
            to right,
            transparent,
            transparent 5px,
            #ccc 5px,
            #ccc 10px
          );
          margin: 20px 0;
        }
        .receipt-total {
          display: flex;
          justify-content: space-between;
          padding: 15px 0;
          border-top: 3px double #333;
          border-bottom: 3px double #333;
          font-weight: bold;
          font-size: 18px;
          background: #f8f9fa;
          margin: 20px 0;
        }
        .receipt-footer {
          text-align: center;
          padding: 20px 0 0;
          color: #666;
          font-size: 12px;
          border-top: 1px solid #eee;
          margin-top: 20px;
        }
        .receipt-footer p {
          margin: 5px 0;
        }
        .receipt-success {
          background: #e8f5e9;
          color: #2e7d32;
          padding: 12px;
          border-radius: 4px;
          text-align: center;
          font-weight: bold;
          margin-bottom: 20px;
          border-left: 4px solid #4caf50;
        }
        .receipt-warning {
          background: #fff3e0;
          color: #f57c00;
          padding: 10px;
          border-radius: 4px;
          font-size: 12px;
          margin-top: 20px;
          border-left: 4px solid #ff9800;
        }
        .receipt-id {
          background: #f5f5f5;
          padding: 10px;
          border-radius: 4px;
          font-family: monospace;
          letter-spacing: 1px;
          text-align: center;
          margin: 15px 0;
          border: 1px dashed #ccc;
        }
        .receipt-date {
          text-align: center;
          color: #666;
          font-size: 13px;
          margin: 10px 0;
          padding: 10px;
          background: #f9f9f9;
          border-radius: 4px;
        }
        @media (max-width: 600px) {
          .receipt-row {
            flex-direction: column;
          }
          .receipt-label {
            margin-bottom: 5px;
          }
          .receipt-value {
            text-align: left;
          }
        }
      </style>
    `;

    const senderMessage = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      ${receiptStyles}
    </head>
    <body style="margin: 0; padding: 20px; background: #f5f7fa;">
      <div class="receipt-container">
        
        <!-- Header -->
        <div class="receipt-header">
          <img src="https://citi-zeta.vercel.app/images/logo.png" alt="Citibank Logo" class="receipt-logo" />
          <h1>Citibank</h1>
          <p>Electronic Funds Transfer Receipt</p>
          <div class="receipt-date">
            ${details.date}
          </div>
        </div>
        
        <!-- Body -->
        <div class="receipt-body">
          
          <!-- Success Message -->
          <div class="receipt-success">
            ✓ TRANSFER COMPLETED SUCCESSFULLY
          </div>
          
          <!-- Transaction ID -->
          <div class="receipt-id">
            Transaction ID: ${details.transactionId}
          </div>
          
          <div class="receipt-divider"></div>
          
          <!-- Sender Info -->
          <div class="receipt-row">
            <span class="receipt-label">Sender:</span>
            <span class="receipt-value">${details.senderName}</span>
          </div>
          
          <div class="receipt-row">
            <span class="receipt-label">Sender Email:</span>
            <span class="receipt-value">${details.senderEmail}</span>
          </div>
          
          <div class="receipt-divider"></div>
          
          <!-- Recipient Info -->
          <div class="receipt-row">
            <span class="receipt-label">Recipient:</span>
            <span class="receipt-value">${details.recipientName}</span>
          </div>
              <div class="receipt-row">
                <span class="receipt-label">Swift Code:</span>
                <span class="receipt-value">${details.swiftCode || "—"}</span>
          </div>
          <div class="receipt-row">
                <span class="receipt-label">Routing Number:</span>
                <span class="receipt-value">${details.routingNumber || "—"}</span>
          </div>
          <div class="receipt-row">
            <span class="receipt-label">Recipient Bank:</span>
            <span class="receipt-value">${details.bank}</span>
          </div>
          
          <div class="receipt-row">
            <span class="receipt-label">Account Number:</span>
            <span class="receipt-value">${details.accountNumber}</span>
          </div>
          
          <div class="receipt-divider"></div>
          
          <!-- Transaction Details -->
          <div class="receipt-row">
            <span class="receipt-label">Description:</span>
            <span class="receipt-value">${details.description || "Bank Transfer"}</span>
          </div>
          
         
          
          <div class="receipt-divider"></div>
          
          <!-- Amount Section -->
          <div class="receipt-total">
            <span>Amount Transferred:</span>
            <span style="color: #1a237e;">$${details.amount.toFixed(2)}</span>
          </div>
          
          <!-- Balance Update -->
          ${details.newBalance ? `
          <div class="receipt-row">
            <span class="receipt-label">Previous Balance:</span>
            <span class="receipt-value">$${(details.newBalance + details.amount).toFixed(2)}</span>
          </div>
          
          <div class="receipt-row">
            <span class="receipt-label">New Balance:</span>
            <span class="receipt-value" style="color: #1a237e; font-weight: bold;">$${details.newBalance.toFixed(2)}</span>
          </div>
          ` : ''}
          
          <!-- Footer -->
          <div class="receipt-footer">
            <p>This is an automated receipt for your records.</p>
            <p>Please keep this email for future reference.</p>
            <p>For any inquiries, contact: support@citibank.com</p>
            <p style="font-size: 11px; color: #999; margin-top: 15px;">
              Transaction Ref: ${details.transactionId}<br>
              Generated: ${new Date().toISOString()}
            </p>
                <p>
            94050 Southwest Germini Drive<br />
            Beaverton, Oregon 97008, U.S.A
          </p>
          </div>
          
        </div>
      </div>
      
      <!-- Print Warning -->
      <div class="receipt-warning" style="max-width: 600px; margin: 20px auto;">
        <strong>Important:</strong> This email contains sensitive financial information. 
        Please do not share this receipt with unauthorized parties.
      </div>
      
    </body>
    </html>
    `;

    const recipientMessage = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      ${receiptStyles}
    </head>
    <body style="margin: 0; padding: 20px; background: #f5f7fa;">
      <div class="receipt-container">
        
        <!-- Header -->
        <div class="receipt-header">
          <img src="https://citi-zeta.vercel.app/images/logo.png" alt="Citibank Logo" class="receipt-logo" />
          <h1>Citibank</h1>
          <p>Funds Received Notification</p>
          <div class="receipt-date">
            ${details.date}
          </div>
        </div>
        
        <!-- Body -->
        <div class="receipt-body">
          
          <!-- Success Message -->
          <div class="receipt-success">
            ✓ FUNDS SUCCESSFULLY RECEIVED
          </div>
          
          <!-- Transaction ID -->
          <div class="receipt-id">
            Transaction ID: ${details.transactionId}
          </div>
          
          <div class="receipt-divider"></div>
          
          <!-- Recipient Info -->
          <div class="receipt-row">
            <span class="receipt-label">Recipient:</span>
            <span class="receipt-value">${details.recipientName}</span>
          </div>
          
          <div class="receipt-row">
            <span class="receipt-label">Recipient Email:</span>
            <span class="receipt-value">${details.recipientEmail}</span>
          </div>
          
          <div class="receipt-divider"></div>
          
          <!-- Sender Info -->
          <div class="receipt-row">
            <span class="receipt-label">Sender:</span>
            <span class="receipt-value">${details.senderName}</span>
          </div>
          
          <div class="receipt-row">
            <span class="receipt-label">Sender Bank:</span>
            <span class="receipt-value">${details.bank}</span>
          </div>
          
          <div class="receipt-row">
            <span class="receipt-label">Sender Email:</span>
            <span class="receipt-value">${details.senderEmail}</span>
          </div>
          <div class="receipt-row">
                <span class="receipt-label">Swift Code:</span>
                <span class="receipt-value">${details.swiftCode || "—"}</span>
          </div>
          <div class="receipt-row">
                <span class="receipt-label">Routing Number:</span>
                <span class="receipt-value">${details.routingNumber || "—"}</span>
          </div>
          <div class="receipt-divider"></div>
          
          <!-- Transaction Details -->
          <div class="receipt-row">
            <span class="receipt-label">Reference:</span>
            <span class="receipt-value">${details.description || "Bank Transfer"}</span>
          </div>
          
          <div class="receipt-row">
            <span class="receipt-label">Status:</span>
            <span class="receipt-value" style="color: #4CAF50;">Funds Received</span>
          </div>
          
          <div class="receipt-divider"></div>
          
          <!-- Amount Section -->
          <div class="receipt-total">
            <span>Amount Received:</span>
            <span style="color: #1a237e;">$${details.amount.toFixed(2)}</span>
          </div>
          
          <!-- Processing Info -->
          <div class="receipt-row">
            <span class="receipt-label">Processing Time:</span>
            <span class="receipt-value">1-2 Business Days</span>
          </div>
          
          <!-- Footer -->
          <div class="receipt-footer">
            <p>This is an official notification of funds received.</p>
            <p>The funds should reflect in your account within 1-2 business days.</p>
            <p>For any inquiries, contact: support@citibank.com</p>
            <p style="font-size: 11px; color: #999; margin-top: 15px;">
              Transaction Ref: ${details.transactionId}<br>
              Generated: ${new Date().toISOString()}
            </p>
                 <p>
            94050 Southwest Germini Drive<br />
            Beaverton, Oregon 97008, U.S.A
          </p>
          </div>
          
        </div>
      </div>
      
      <!-- Important Notice -->
      <div class="receipt-warning" style="max-width: 600px; margin: 20px auto;">
        <strong>Note:</strong> This transfer is initiated by the sender. 
        If you were not expecting this payment, please contact your bank immediately.
      </div>
      
    </body>
    </html>
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

      const recipientDetailsData = {
  bank: selectedBank,
  account_number: accountNumber,
  recipient_name: recipientName,
  recipient_email: recipientEmail,
  swift_code: swiftCode,
  routing_number: routingNumber,
  description: description,
  captured_at: new Date().toISOString(),
};
      const transferDescription = description || `Transfer to ${recipientName}`;

      const { error: transactionError } = await supabase
        .from("transactions")
        .insert({
          user_id: user?.id,
          amount: transferAmount,
          type: "transfer",
          description: transferDescription,
          recipient_details: recipientDetailsData,
          bank_name: selectedBank,
          account_number: accountNumber,
          transaction_id: transactionId,
          // status: "completed",
          created_at: transactionDate,
        });
console.log("RECIPIENT DETAILS", recipientDetailsData);

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
        swiftCode,
        routingNumber,
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
          user?.firstName || "Customer",
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
                    <ProgressSteps currentStep={currentStep} />
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
             <StepBankDetails 
               accountNumber={accountNumber}
               setAccountNumber={setAccountNumber}
               handlePaste={handlePaste}
               isCopied={isCopied}
               query={query}
               handleSearch={handleSearch}
               handleCustomBankInput={handleCustomBankInput}
               banks={banks}
               isDropdownOpen={isDropdownOpen}
               setIsDropdownOpen={setIsDropdownOpen}
               selectedBank={selectedBank}
               setSelectedBank={setSelectedBank}
               dropdownRef={dropdownRef as React.RefObject<HTMLDivElement>}
               Banks={Banks}
               isVerifying={isVerifying}
               handleBankSelect={handleBankSelect}
             />
            )}

            {currentStep === "recipient-info" && (
         <RecipientInfo
    accountNumber={accountNumber}
    selectedBank={selectedBank}
    recipientName={recipientName}
    setRecipientName={setRecipientName}
    recipientEmail={recipientEmail}
    setRecipientEmail={setRecipientEmail}
    description={description}
    setDescription={setDescription}
    setCurrentStep={setCurrentStep}
      swiftCode={swiftCode}
  setSwiftCode={setSwiftCode}
  routingNumber={routingNumber}
  setRoutingNumber={setRoutingNumber}
  />
            )}

            {currentStep === "amount" && (
          <Amount setCurrentStep={setCurrentStep}
  accountNumber={accountNumber}
  selectedBank={selectedBank}
  recipientName={recipientName}
  recipientEmail={recipientEmail}
  description={description}
  amount={amount}
  setAmount={setAmount} swiftCode={swiftCode} routingNumber={routingNumber}/>
            )}

            {currentStep === "pin-verification" && (
               <PinVerification
    setCurrentStep={setCurrentStep}
    formatCurrency={formatCurrency}
    amount={amount}
    accountNumber={accountNumber}
    selectedBank={selectedBank}
    recipientName={recipientName}
    recipientEmail={recipientEmail}
    description={description}
    pin={pin}
    pinInputRefs={pinInputRefs}
    handlePinChange={handlePinChange}
    handlePinKeyDown={handlePinKeyDown}
    pinError={pinError} 
    isProcessing={isProcessing} 
    verifyPin={verifyPin}
  />
            )}

            {currentStep === "confirmation" && (
<Confirmation 
  formatCurrency={formatCurrency}
  amount={amount}
  recipientName={recipientName}
  recipientEmail={recipientEmail}
  resetForm={resetForm}
  swiftCode={swiftCode}
  routingNumber={routingNumber}
/>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
