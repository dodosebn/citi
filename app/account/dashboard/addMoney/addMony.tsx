"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Shield,
  Clock,
  CreditCard,
  BanknoteIcon,
  Smartphone,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppStore } from "@/app/store/useApp";

const AddMoneyPage = () => {
  const { user } = useAppStore();
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  // Fix for hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  const fundingMethods = [
    {
      id: "bank-transfer",
      name: "Bank Transfer",
      description: "Direct transfer from any bank",
      icon: <BanknoteIcon className="w-6 h-6" />,
      time: "1-3 business hours",
      details: "Use your account details to receive transfers",
    },
    {
      id: "debit-card",
      name: "Debit Card",
      description: "Instant funding with your card",
      icon: <CreditCard className="w-6 h-6" />,
      time: "Instant",
      details: "Secure card processing powered by Stripe",
    },
    {
      id: "mobile-money",
      name: "Mobile Money",
      description: "Fund via mobile wallets",
      icon: <Smartphone className="w-6 h-6" />,
      time: "2-5 minutes",
      details: "Vodafone, etc.",
    },
  ];

  const features = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Bank-Level Security",
      description: "Your funds are protected with 256-bit encryption",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "24/7 Support",
      description: "Our team is always ready to assist you",
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "No Hidden Fees",
      description: "Transparent pricing with no surprises",
    },
  ];

  const contactWhatsApp = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();

    if (!selectedMethod) {
      toast.error("Please select a funding method first");
      return;
    }

    if (!phoneNumber.trim()) {
      toast.error("Please enter your phone number");
      return;
    }

    setIsLoading(true);

    // Clean WhatsApp number (remove dashes, spaces, parentheses)
    const whatsappNumber = "+14703903270".replace(/[\s\-()]/g, "");

    const selectedMethodObj = fundingMethods.find(
      (m) => m.id === selectedMethod
    );
    
    const message =
      `Hello! I need help adding money to my account.\n\n` +
      `Preferred Method: ${selectedMethodObj?.name}\n` +
      `My Phone: ${phoneNumber}\n` +
      `I need guidance on the next steps.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open in new tab
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setTimeout(() => {
      toast.success(
        <div>
          <strong>WhatsApp opened!</strong>
          <br />
          <small>Our support team will guide you shortly.</small>
        </div>,
        { autoClose: 5000 }
      );
      setIsLoading(false);
    }, 1000);
  };

  const copyAccountDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if user exists and has required data
    if (!user?.firstName || !user?.accountNumber) {
      toast.error("User information not available. Please log in again.");
      return;
    }

    const accountDetails = `Bank: Citibank\nAccount Name: ${user.firstName}\nAccount Number: ${user.accountNumber}\nRouting: 021000021`;

    navigator.clipboard
      .writeText(accountDetails)
      .then(() => {
        toast.success("Account details copied to clipboard!");
      })
      .catch((err) => {
        console.error("Copy failed:", err);
        toast.error("Failed to copy details");
      });
  };

  // Prevent form submission on Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      contactWhatsApp();
    }
  };

  if (!mounted) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-8 px-4">
      <ToastContainer 
        position="top-right" 
        className="z-50"
        toastClassName="relative z-50"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Add Money to Your Account
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Get personalized guidance from our support team to fund your account
            securely
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Funding Methods */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 relative z-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <BanknoteIcon className="w-5 h-5 text-blue-600" />
                Select Funding Method
              </h2>

              <div className="space-y-4">
                {fundingMethods.map((method) => (
                  <motion.div
                    key={method.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 relative ${
                      selectedMethod === method.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => setSelectedMethod(method.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-3 rounded-full ${
                            selectedMethod === method.id
                              ? "bg-blue-100 text-blue-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {method.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {method.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {method.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          {method.time}
                        </span>
                      </div>
                    </div>
                    {selectedMethod === method.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4 pt-4 border-t border-gray-200"
                      >
                        <p className="text-sm text-gray-700">
                          {method.details}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Phone Number Input */}
              <div className="mt-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Phone Number (for WhatsApp)
                </label>
                <div className="flex gap-3">
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="+1 (555) 123-4567"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition z-10"
                  />
                  <button
                    onClick={contactWhatsApp}
                    disabled={isLoading || !selectedMethod}
                    className={`px-6 py-3 rounded-xl font-semibold text-white flex items-center gap-2 transition-all relative z-20 ${
                      isLoading || !selectedMethod
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl active:scale-95"
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Connecting...</span>
                      </>
                    ) : (
                      <>
                        <FaWhatsapp className="w-5 h-5" />
                        <span>Contact Support</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  We'll contact you on WhatsApp to guide you through the process
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 relative z-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={copyAccountDetails}
                  className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all group relative z-10 active:scale-95"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900">
                        Copy Account Details
                      </h3>
                      <p className="text-sm text-gray-600">
                        For bank transfers
                      </p>
                    </div>
                  </div>
                </button>

                <a
                  href="mailto:support@citibank.com"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = "mailto:support@citibank.com";
                  }}
                  className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all group relative z-10 active:scale-95"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition">
                      <MessageCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900">
                        Email Support
                      </h3>
                      <p className="text-sm text-gray-600">
                        support@citibank.com
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Info & Features */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Support Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-6 text-white relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/20 rounded-full">
                  <FaWhatsapp className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-semibold">24/7 WhatsApp Support</h2>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Instant response within minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Step-by-step guidance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Secure transaction assistance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>No automated responses</span>
                </li>
              </ul>

              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-sm font-medium mb-2">Support Hours</p>
                <p className="text-white/90">Monday - Sunday: 24/7</p>
                <p className="text-white/90 text-sm mt-1">
                  Average response time: 2-5 minutes
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl shadow-lg p-6 relative z-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Why Choose Us
              </h2>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-start gap-3"
                  >
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* FAQ Preview */}
            <div className="bg-white rounded-2xl shadow-lg p-6 relative z-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Common Questions
              </h2>
              <div className="space-y-3">
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                    <span>Is there a minimum deposit?</span>
                    <span className="transition group-open:rotate-180">▼</span>
                  </summary>
                  <p className="text-gray-600 mt-2 text-sm">
                    Minimum deposit is $10. No maximum limits for verified
                    accounts.
                  </p>
                </details>
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                    <span>How long does it take?</span>
                    <span className="transition group-open:rotate-180">▼</span>
                  </summary>
                  <p className="text-gray-600 mt-2 text-sm">
                    Instant for cards, 1-3 hours for bank transfers, and 2-5
                    minutes for mobile money.
                  </p>
                </details>
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                    <span>Are there any fees?</span>
                    <span className="transition group-open:rotate-180">▼</span>
                  </summary>
                  <p className="text-gray-600 mt-2 text-sm">
                    No fees from our side. Your bank may charge standard
                    transfer fees.
                  </p>
                </details>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 relative z-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Need Immediate Assistance?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our dedicated support team is ready to help you add money to your
              account quickly and securely.
            </p>
            <button
              onClick={contactWhatsApp}
              disabled={!selectedMethod}
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white text-lg transition-all relative z-20 ${
                !selectedMethod
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-xl hover:shadow-2xl active:scale-95"
              }`}
            >
              <FaWhatsapp className="w-6 h-6" />
              Start WhatsApp Chat Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Debug overlay - remove in production */}
      <style jsx global>{`
        button, a {
          position: relative;
          z-index: 10;
        }
        
        /* Fix for any parent elements that might be blocking clicks */
        * {
          pointer-events: auto !important;
        }
        
        /* Ensure buttons are clickable */
        button:not([disabled]) {
          cursor: pointer !important;
        }
      `}</style>
    </div>
  );
};

export default AddMoneyPage;