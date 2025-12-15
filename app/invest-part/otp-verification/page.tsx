// app/invest-part/otp-verification/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppStore } from "@/app/store/useApp";
import { FaLock, FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function InvestmentOTPVerification() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const { user } = useAppStore();

const hasSentOTP = useRef(false);

useEffect(() => {
  if (!user?.email || hasSentOTP.current) return;

  hasSentOTP.current = true;
  sendOTP(false);

  const timer = setInterval(() => {
    setCountdown((prev) => {
      if (prev <= 1) {
        clearInterval(timer);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [user]);


  const sendOTP = async (isResend = false) => {
    if (!user?.email) return;

    setResending(true);
    try {
      const otpRes = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: user.email,
          type: "investment_verification"
        }),
      });

      const otpResult = await otpRes.json();

      if (!otpRes.ok) {
        console.error("OTP send error:", otpResult);
        toast.error(otpResult.error || "Failed to send OTP");
        return;
      }

      toast.success(
        isResend ? "New OTP sent! Check your email" : "OTP sent! Check your email",
        { position: "top-center" }
      );
      
      // Reset countdown
      setCountdown(60);
      
      // Focus first OTP input
      setTimeout(() => otpInputRefs.current[0]?.focus(), 100);

    } catch (error) {
      console.error("OTP send error:", error);
      toast.error("Failed to send OTP");
    } finally {
      setResending(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Allow only single digit
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move to previous input on backspace
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join("");
    
    if (otpString.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const verifyRes = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: user?.email,
          otp: otpString
        }),
      });

      const verifyResult = await verifyRes.json();

      if (!verifyRes.ok) {
        toast.error(verifyResult.error || "Invalid OTP");
        return;
      }

      toast.success("OTP verified successfully!");
      
      sessionStorage.setItem("investment_verified", "true");
      sessionStorage.setItem("investment_verified_at", Date.now().toString());
      
      router.push("/invest-part/investment");

    } catch (error) {
      console.error("Verification error:", error);
      toast.error("Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaLock className="text-2xl text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Investment Verification
            </h1>
            <p className="text-gray-600">
              Enter the 6-digit OTP sent to
              <br />
              <span className="font-medium text-blue-600">{user?.email}</span>
            </p>
          </div>

          <div className="mb-8">
            <div className="flex justify-center space-x-3 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={ (el) => {otpInputRefs.current[index] = el}}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 text-2xl font-bold text-center border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="one-time-code"
                />
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => sendOTP(true)}
                disabled={resending || countdown > 0}
                className="text-blue-600 hover:text-blue-700 font-medium disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                {resending ? "Sending..." : 
                 countdown > 0 ? `Resend OTP in ${countdown}s` : "Resend OTP"}
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <button
              onClick={handleVerify}
              disabled={loading || otp.join("").length !== 6}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Verifying...
                </>
              ) : (
                <>
                  Verify & Continue
                  <FaArrowRight className="ml-2" />
                </>
              )}
            </button>

            <button
              onClick={handleBack}
              className="w-full bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center"
            >
              <FaArrowLeft className="mr-2" />
              Go Back
            </button>
          </div>

          {/* Info */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-800 text-center">
              <strong>Security Note:</strong> This verification ensures that only authorized users can access investment features. The OTP is valid for 10 minutes.
            </p>
          </div>
        </div>

        <div className="text-center mt-6 text-gray-500 text-sm">
          <p>Having trouble? Contact support at support@citibank.com</p>
        </div>
      </div>
      <ToastContainer position="bottom-center" autoClose={3000} />
    </div>
  );
}