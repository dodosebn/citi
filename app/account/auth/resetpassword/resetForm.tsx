"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { useState, useMemo } from "react";

const ResetForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = useMemo(() => searchParams.get("token"), [searchParams]);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("Invalid or expired reset link.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Reset link expired or invalid.");
      }

      setSuccess(true);

      setTimeout(() => {
        router.push("/account/auth/login");
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="bg-white p-6 rounded-md shadow-md max-w-md w-full text-center">
        <h1 className="text-lg font-semibold mb-2">Invalid link</h1>
        <p className="text-sm text-gray-600 mb-4">
          This password reset link is invalid or has expired.
        </p>
        <button
          onClick={() => router.push("/account/auth/forgot-password")}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Request a new link
        </button>
      </div>
    );
  }

  if (success) {
    return (
      <div className="bg-white p-6 rounded-md shadow-md max-w-md w-full text-center">
        <h1 className="text-xl font-semibold mb-2">
          Password reset successful 🎉
        </h1>
        <p className="text-sm text-gray-600">Redirecting you to login…</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white p-6 space-y-5 shadow-md rounded-md"
    >
      <h1 className="text-xl font-semibold text-center">Reset your password</h1>

      {error && <p className="text-sm text-red-600 text-center">{error}</p>}

      <div>
        <label className="block text-sm mb-1">New password</label>
        <input
          type="password"
          className="w-full border px-3 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Confirm password</label>
        <input
          type="password"
          className="w-full border px-3 py-2 rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
      >
        {loading ? "Resetting…" : "Reset password"}
      </button>
    </form>
  );
};

export default ResetForm;
