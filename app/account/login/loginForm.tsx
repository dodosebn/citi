"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Logo from "@/public/images/logo.png";
import Image from "next/image";
import { FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/app/store/useApp";

const LoginForm = () => {
  const router = useRouter();
  const { user, setUser, token, setToken, loginUser } = useAppStore(); 

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Both fields are required", { position: "top-right" });
      return;
    }

    setLoading(true);
    try {
      const result = await loginUser(formData.email, formData.password);

      if (!result.success) {
        toast.error(result.error || "Login failed", { position: "top-right" });
        return;
      }

      toast.success("Login successful!", { position: "top-right" });
      setFormData({ email: "", password: "" });

      setTimeout(() => {
        router.push("/account/dashboard");
      }, 1500);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again.", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 space-y-5 shadow-md rounded-md"
      >
        <div className="flex justify-start relative">
          <Image src={Logo} alt="logo" className="w-20 h-20" />
          <div className="absolute top-7 left-20">
            <h2 className="text-xl font-semibold text-[#03305c] mb-5 text-center">
              Login
            </h2>
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 text-sm font-medium text-[#000]">
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
              className="w-full px-4 py-3 rounded-sm border focus:ring-[#03305c] outline-none text-sm pl-10"
            />
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex justify-between">
            <label htmlFor="password" className="mb-1 text-sm font-medium text-[#000]">
              Password
            </label>
            <Link href="/account/resetpassword" className="text-[#03305c] text-sm">
              Forgot Password
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter Your Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-sm focus:ring-[#03305c] outline-none text-sm pl-10 pr-10"
            />
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-sm bg-[#03305c] text-white py-3 text-md font-medium transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-gray-600 text-center">
          Don’t have an account?{" "}
          <Link href="/account/signup" className="text-red-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>

      <ToastContainer />
    </div>
  );
};

export default LoginForm;
