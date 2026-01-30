"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import Logo from "@/public/images/logo.png";
import { FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { usePersonalStore } from "@/app/store/usePersonalStore";

const Sform = () => {
  const router = useRouter();
  const { setSignupData } = usePersonalStore(); 

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [passwordTyped, setPasswordTyped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "password") setPasswordTyped(value.length > 0);
  };

  const validateForm = () => {
    const { fname, lname, email, password, cpassword } = formData;
    if (!fname.trim() || !lname.trim() || !email.trim() || !password.trim()) {
      return "All fields are required.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email address.";
    if (password.length < 5) return "Password must be at least 5 characters.";
    if (password !== cpassword) return "Passwords do not match.";
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError, { position: "top-right" });
      return;
    }
    setLoading(true);

    setSignupData({
      fname: formData.fname,
      lname: formData.lname,
      email: formData.email,
      password: formData.password,
    });

    toast.success("Proceed to complete your profile", { position: "top-right" });

    setTimeout(() => router.push("/account/auth/personalCredentials"), 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 space-y-4 shadow-md rounded-md"
      >
        <div className="flex justify-start relative">
          <Image src={Logo} alt="logo" className="w-20 h-20" />
          <div className="absolute top-7 left-20">
            <h2 className="text-xl font-semibold text-[#03305c] mb-5 text-center">
              Sign Up
            </h2>
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="fname" className="mb-1 text-sm font-medium text-gray-700">
            First Name
          </label>
          <div className="relative">
            <input
              type="text"
              id="fname"
              name="fname"
              placeholder="Enter Your First Name"
              value={formData.fname}
              onChange={handleChange}
              className="w-full px-4 py-2 border focus:ring-1 focus:ring-[#03305c] outline-none text-sm pl-10"
            />
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="lname" className="mb-1 text-sm font-medium text-gray-700">
            Last Name
          </label>
          <div className="relative">
            <input
              type="text"
              id="lname"
              name="lname"
              placeholder="Enter Your Last Name"
              value={formData.lname}
              onChange={handleChange}
              className="w-full px-4 py-2 border focus:ring-1 focus:ring-[#03305c] outline-none text-sm pl-10"
            />
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border focus:ring-1 focus:ring-[#03305c] outline-none text-sm pl-10"
            />
            <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter Your Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border focus:ring-1 focus:ring-[#03305c] outline-none text-sm pl-10 pr-10"
            />
            <CiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

        {passwordTyped && (
          <div className="flex flex-col">
            <label htmlFor="cpassword" className="mb-1 text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showCPassword ? "text" : "password"}
                id="cpassword"
                name="cpassword"
                placeholder="Confirm Your Password"
                value={formData.cpassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border focus:ring-1 focus:ring-[#03305c] outline-none text-sm pl-10 pr-10"
              />
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <button
                type="button"
                onClick={() => setShowCPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
              >
                {showCPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
        )}

      <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#03305c] text-white py-3 rounded-sm text-md font-medium transition disabled:opacity-50"
        >
          {loading ? "Processing..." : "Next"}
        </button>

        <p className="text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link href="/account/auth/login" className="text-red-600 hover:underline">
            Login
          </Link>
        </p>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Sform;
