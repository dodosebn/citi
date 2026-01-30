"use client";

import React, { useState, useRef, useEffect } from "react";
import { Upload, X, Check, AlertCircle, FileText, Camera, Mail } from "lucide-react";
import { usePersonalStore } from "@/app/store/usePersonalStore";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { supabase } from "@/app/store/supabase";

interface FileWithPreview {
  id: string;
  file: File;
  name: string;
  size: number;
  preview: string | null;
}

type UploadStatus = "idle" | "uploading" | "success" | "error";
type SignupStep = "upload" | "otp" | "complete";

const UpLoader: React.FC = () => {
  const router = useRouter();
  const { signupData, birthday, gender, pinValue } = usePersonalStore();

  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [currentStep, setCurrentStep] = useState<SignupStep>("upload");
  
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [otpSending, setOtpSending] = useState<boolean>(false);
  const [otpVerifying, setOtpVerifying] = useState<boolean>(false);
  const [uploadedPaths, setUploadedPaths] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const acceptedTypes: string[] = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "application/pdf",
  ];
  const maxSize: number = 10 * 1024 * 1024; 

  useEffect(() => {
    checkBucketExists();
  }, []);

  const checkBucketExists = async () => {
    try {
      console.log("🔍 Checking if 'documents' bucket exists...");
      
      const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
      
      if (bucketsError) {
        console.error("❌ Error listing buckets:", bucketsError);
        return;
      }
      
      console.log("📦 Available buckets:", buckets);
      
      const documentsBucket = buckets?.find(bucket => bucket.name === "documents");
      
      if (documentsBucket) {
        console.log("✅ 'documents' bucket found!");
        
        const { data: files, error: filesError } = await supabase.storage
          .from("documents")
          .list();
          
        if (filesError) {
          console.error("⚠️ Can't list files in bucket:", filesError);
        } else {
          console.log(`📄 Files in 'documents' bucket: ${files?.length || 0} files`);
        }
      } else {
        console.error("❌ 'documents' bucket NOT FOUND!");
        console.log("💡 Please create a bucket named 'documents' in Supabase Dashboard:");
        
        toast.error(
          <div>
            <strong>Bucket 'documents' not found!</strong><br />
            Please create it in Supabase Dashboard → Storage
          </div>,
          { autoClose: 10000 }
        );
      }
    } catch (error) {
      console.error("🔥 Error checking bucket:", error);
    }
  };

  const validateFile = (file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return "Invalid file type. Please upload JPG, PNG, WEBP, or PDF files.";
    }
    if (file.size > maxSize) {
      return "File size exceeds 10MB limit.";
    }
    return null;
  };

  const handleFiles = (fileList: FileList | null): void => {
    if (!fileList) return;

    const newFiles: FileWithPreview[] = [];

    Array.from(fileList).forEach((f: File) => {
      const err = validateFile(f);
      if (err) {
        toast.error(`${f.name}: ${err}`);
      } else {
        newFiles.push({
          id: Math.random().toString(36).substr(2, 9),
          file: f,
          name: f.name,
          size: f.size,
          preview: f.type.startsWith("image/") ? URL.createObjectURL(f) : null,
        });
      }
    });

    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    handleFiles(e.target.files);
  };

  const removeFile = (id: string): void => {
    setFiles(prev => {
      const updated = prev.filter(f => f.id !== id);
      const fileToRemove = prev.find(f => f.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return updated;
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes: string[] = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  // Upload documents and send OTP
  const handleUploadAndSendOTP = async (): Promise<void> => {
    if (!signupData) {
      toast.error("Signup data missing. Please start again.");
      router.push("/account/auth/signup");
      return;
    }

    if (files.length === 0) {
      toast.error("Please upload at least one identification document.");
      return;
    }

    toast.info(
      <div>
        <strong>Starting Upload Process</strong>
        <br />
        <small>Preparing to upload {files.length} file(s)...</small>
      </div>,
      { autoClose: 3000 }
    );

    setUploadStatus("uploading");
    setOtpSending(true);

    try {
      console.log("🚀 Starting upload process...");
      console.log("📁 Files to upload:", files.map(f => f.name));
      
      const paths: string[] = [];
      let uploadSuccessCount = 0;

      for (const [index, item] of files.entries()) {
        const file = item.file;
        const cleanFileName = file.name
          .toLowerCase()
          .replace(/[^a-z0-9._-]/g, '_')
          .replace(/\s+/g, '_')
          .replace(/_+/g, '_')
          .substring(0, 100);
        
        const filePath = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${cleanFileName}`;

        console.log(`📤 Uploading (${index + 1}/${files.length}): ${file.name}`);
        
        const progress = Math.round(((index + 1) / files.length) * 100);
        toast.info(
          <div>
            <div className="font-semibold">Uploading Files</div>
            <div className="text-sm opacity-90">File {index + 1} of {files.length}: {file.name}</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-xs mt-1">{progress}% complete</div>
          </div>,
          { autoClose: 2000 }
        );

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("documents")
          .upload(filePath, file, { 
            upsert: true,
            cacheControl: '3600'
          });

        if (uploadError) {
          console.error("❌ Upload error details:", uploadError);
          
          let errorMessage = `Failed to upload ${file.name}: `;
          
          if (uploadError.message?.includes("Bucket not found")) {
            errorMessage += "Bucket 'documents' not found. Please create it in Supabase Dashboard.";
            toast.error(
              <div>
                <strong>Bucket 'documents' not found!</strong><br />
                Create it in Supabase Dashboard → Storage → New Bucket
              </div>,
              { autoClose: 10000 }
            );
          } else if (uploadError.message?.includes("Invalid key")) {
            errorMessage += "Filename contains invalid characters. Please rename the file.";
            toast.error(
              <div>
                <strong>Invalid Filename</strong><br />
                Please rename "{file.name}" to remove special characters
              </div>,
              { autoClose: 8000 }
            );
          } else {
            errorMessage += uploadError.message;
            toast.error(errorMessage, { autoClose: 5000 });
          }
          
          setUploadStatus("error");
          setOtpSending(false);
          return;
        }

        console.log("✅ Upload successful:", uploadData);
        paths.push(filePath);
        uploadSuccessCount++;
      }

      toast.success(
        <div>
          <strong>Upload Complete! ✅</strong>
          <br />
          <small>Successfully uploaded {uploadSuccessCount} file(s)</small>
        </div>,
        {
          position: "top-center",
          autoClose: 3000,
        }
      );

      setUploadedPaths(paths);
      console.log("📝 All upload paths:", paths);

      await new Promise(resolve => setTimeout(resolve, 1500));

      toast.info(
        <div>
          <strong>Sending OTP</strong>
          <br />
          <small>Sending verification code to your email...</small>
        </div>,
        { autoClose: 2000 }
      );

      console.log("📧 Sending OTP to:", signupData.email);
      const otpRes = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: signupData.email }),
      });

      const otpResult = await otpRes.json();

      if (!otpRes.ok) {
        console.error("❌ OTP send error:", otpResult);
        toast.error(otpResult.error || "Failed to send OTP");
        setUploadStatus("error");
        setOtpSending(false);
        return;
      }

      toast.success(
        <div>
          <strong>OTP Sent! ✉️</strong>
          <br />
          <small>Check your email for the 6-digit verification code</small>
        </div>,
        {
          position: "top-center",
          autoClose: 5000,
          closeButton: true,
        }
      );

      console.log("✅ OTP sent successfully!");
      setUploadStatus("idle");
      setOtpSending(false);
      setCurrentStep("otp");
      
      setTimeout(() => otpInputRefs.current[0]?.focus(), 100);

    } catch (error) {
      console.error("🔥 Network/Upload error:", error);
      toast.error(
        `Upload failed: ${error instanceof Error ? error.message : "Please try again"}`,
        { autoClose: 5000 }
      );
      setUploadStatus("error");
      setOtpSending(false);
    }
  };

  const handleOtpChange = (index: number, value: string): void => {
    if (!/^\d*$/.test(value)) return; // Only digits

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only last character
    setOtp(newOtp);

    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split("").concat(Array(6).fill("")).slice(0, 6);
    setOtp(newOtp);

    const nextIndex = Math.min(pastedData.length, 5);
    otpInputRefs.current[nextIndex]?.focus();
  };

  // Verify OTP and complete signup
  const handleVerifyOTP = async (): Promise<void> => {
    const otpCode = otp.join("");
    
    if (otpCode.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP");
      return;
    }

    if (!signupData) {
      toast.error("Signup data missing");
      return;
    }

    console.log("🔐 Verifying OTP:", otpCode);
    
    toast.info("Verifying OTP...", { autoClose: 2000 });
    
    setOtpVerifying(true);

    try {
      const { data: otpData, error: otpError } = await supabase
        .from("otp_codes")
        .select("*")
        .eq("email", signupData.email)
        .eq("code", otpCode)
        .gt("expires_at", new Date().toISOString())
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (otpError || !otpData) {
        console.error("❌ OTP verification failed:", otpError);
        toast.error("Invalid or expired OTP. Please try again.");
        setOtpVerifying(false);
        return;
      }

      console.log("✅ OTP verified, completing signup...");
      
      // Show signup in progress toast
      toast.info("Completing your signup...", { autoClose: 2000 });

      // OTP is valid, complete signup
      const res = await fetch("/api/signup-api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...signupData,
          birthday,
          gender,
          pin: pinValue.join(""),
          documents: uploadedPaths,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error("❌ Signup API error:", result);
        toast.error(result.error || "Signup failed");
        setOtpVerifying(false);
      } else {
        // Delete used OTP
        await supabase.from("otp_codes").delete().eq("id", otpData.id);

        console.log("✅ Signup complete! User:", result.user);
        
        // Success toast with countdown
        toast.success(
          <div>
            <strong>🎉 Signup Complete!</strong>
            <br />
            <small>Redirecting to login in 3 seconds...</small>
          </div>,
          {
            position: "top-center",
            autoClose: 3000,
          }
        );
        
        setCurrentStep("complete");
        setUploadStatus("success");
        setTimeout(() => router.push("/account/auth/login"), 3000);
      }
    } catch (error) {
      console.error("🔥 OTP verification error:", error);
      toast.error("Network error. Please try again.");
      setOtpVerifying(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async (): Promise<void> => {
    if (!signupData) return;

    console.log("🔄 Resending OTP to:", signupData.email);
    
    // Show sending toast
    toast.info("Sending new OTP...", { autoClose: 2000 });
    
    setOtpSending(true);
    
    try {
      const otpRes = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: signupData.email }),
      });

      const otpResult = await otpRes.json();

      if (!otpRes.ok) {
        console.error("❌ Resend OTP error:", otpResult);
        toast.error(otpResult.error || "Failed to resend OTP");
      } else {
        console.log("✅ New OTP sent successfully");
        toast.success("New OTP sent to your email!");
        setOtp(["", "", "", "", "", ""]);
        otpInputRefs.current[0]?.focus();
      }
    } catch (error) {
      console.error("🔥 Resend OTP network error:", error);
      toast.error("Failed to resend OTP");
    } finally {
      setOtpSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-[#03305c] px-8 py-6">
            <h1 className="text-3xl font-bold text-white mb-2">
              {currentStep === "upload" && "Identity Verification"}
              {currentStep === "otp" && "Verify Your Email"}
              {currentStep === "complete" && "All Set!"}
            </h1>
            <p className="text-indigo-100">
              {currentStep === "upload" && "Upload your identification documents securely"}
              {currentStep === "otp" && "Enter the OTP sent to your email"}
              {currentStep === "complete" && "Your account has been created successfully"}
            </p>
          </div>

          <div className="p-8">
            {/* STEP 1: Upload Documents */}
            {currentStep === "upload" && (
              <>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-3 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
                    isDragging
                      ? "border-indigo-600 bg-indigo-50 scale-105"
                      : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".jpg,.jpeg,.png,.webp,.pdf"
                    onChange={handleFileInput}
                    className="hidden"
                  />

                  <div className="flex flex-col items-center gap-4">
                    <div className={`p-4 rounded-full transition-colors ${isDragging ? "bg-indigo-100" : "bg-gray-100"}`}>
                      <Upload className={`w-12 h-12 ${isDragging ? "text-indigo-600" : "text-gray-400"}`} />
                    </div>

                    <div>
                      <p className="text-lg font-semibold text-gray-700 mb-1">Drop your files here or click to browse</p>
                      <p className="text-sm text-gray-500">Accepted formats: JPG, PNG, WEBP, PDF (Max 10MB)</p>
                    </div>

                    <div className="flex gap-4 mt-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Camera className="w-4 h-4" />
                        <span>Photo ID</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FileText className="w-4 h-4" />
                        <span>Documents</span>
                      </div>
                    </div>
                  </div>
                </div>

                {files.length > 0 && (
                  <div className="mt-8 space-y-3">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Uploaded Files ({files.length})</h3>

                    {files.map(file => (
                      <div key={file.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors">
                        {file.preview ? (
                          <img src={file.preview} alt={file.name} className="w-16 h-16 object-cover rounded border border-gray-300" />
                        ) : (
                          <div className="w-16 h-16 bg-red-100 rounded flex items-center justify-center">
                            <FileText className="w-8 h-8 text-red-600" />
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-800 truncate">{file.name}</p>
                          <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFile(file.id)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors group"
                          aria-label="Remove file"
                        >
                          <X className="w-5 h-5 text-gray-400 group-hover:text-red-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-1">Document Requirements:</p>
                    <ul className="list-disc list-inside space-y-1 text-blue-700">
                      <li>Clear, legible photo of your ID</li>
                      <li>All corners of the document visible</li>
                      <li>No glare or reflections</li>
                      <li>Information must be readable</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="button"
                    onClick={handleUploadAndSendOTP}
                    disabled={files.length === 0 || otpSending}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                      files.length === 0 || otpSending
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-[#03305c] hover:bg-[#02264a] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    }`}
                  >
                    {otpSending ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Uploading & Sending OTP...</span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-5 h-5" />
                        <span>Upload & Send OTP</span>
                      </>
                    )}
                  </button>
                </div>
              </>
            )}

            {currentStep === "otp" && (
              <>
                <div className="flex flex-col items-center py-8">
                  <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                    <Mail className="w-10 h-10 text-indigo-600" />
                  </div>

                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Check Your Email</h2>
                  <p className="text-gray-600 text-center mb-8">
                    We've sent a 6-digit code to<br />
                    <span className="font-semibold text-gray-800">{signupData?.email}</span>
                  </p>

                  <div className="flex gap-3 mb-6">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={el => { otpInputRefs.current[index] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        onPaste={handleOtpPaste}
                        className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none transition-colors"
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleVerifyOTP}
                    disabled={otp.join("").length !== 6 || otpVerifying}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 mb-4 ${
                      otp.join("").length !== 6 || otpVerifying
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-[#03305c] hover:bg-[#02264a] shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {otpVerifying ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-5 h-5" />
                        <span>Verify & Complete Signup</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={otpSending}
                    className="text-indigo-600 hover:text-indigo-700 font-medium text-sm transition-colors disabled:text-gray-400"
                  >
                    {otpSending ? "Sending..." : "Didn't receive the code? Resend"}
                  </button>
                </div>

                <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-800">
                    <p>The OTP will expire in <strong>5 minutes</strong>. Check your spam folder if you don't see it.</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>🔒 Your documents are encrypted and securely transmitted</p>
        </div>
      </div>

      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default UpLoader;