"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { supabase } from "@/app/store/supabase"; 

interface User {
  id: string;
  fname: string;
  lname: string;
  email: string;
  document_path: string | null;
  account_balance: number;
  account_number: string;
  card_number: string;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    account_balance: "",
    account_number: "",
    card_number: "",
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const adminToken =
    typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

  useEffect(() => {
    if (!adminToken) {
      toast.error("No admin token found");
      return;
    }

    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/admin/users", {
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        const data = await res.json();
        setUsers(data.users || []);
      } catch (err) {
        console.error("Error fetching users:", err);
        toast.error("Failed to fetch users");
      }
    };

    fetchUsers();
  }, [adminToken]);

  // Utility: get public URL from Supabase - FIXED
  const getDocumentUrl = (path: string | null) => {
    if (!path) return null;
    
    try {
      const { data } = supabase.storage.from("documents").getPublicUrl(path);
      console.log("Generated URL for path:", path, "URL:", data.publicUrl);
      return data.publicUrl;
    } catch (error) {
      console.error("Error generating public URL:", error);
      return null;
    }
  };

  const startEditing = (user: User) => {
    setEditingUser(user.id);
    setEditForm({
      account_balance: user.account_balance.toString(),
      account_number: user.account_number || "",
      card_number: user.card_number || "",
    });
  };

  const cancelEditing = () => {
    setEditingUser(null);
    setEditForm({ account_balance: "", account_number: "", card_number: "" });
  };

  const saveAccountDetails = async (userId: string) => {
    if (!adminToken) return toast.error("No admin token found");

    setLoading(true);
    try {
      const balance = parseFloat(editForm.account_balance) || 0;
      const res = await fetch("/api/admin/update-account-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          userId,
          account_balance: balance,
          account_number: editForm.account_number,
          card_number: editForm.card_number,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Account details updated!");
        setUsers((prev) =>
          prev.map((u) =>
            u.id === userId
              ? {
                  ...u,
                  account_balance: balance,
                  account_number: editForm.account_number,
                  card_number: editForm.card_number,
                }
              : u
          )
        );
        setEditingUser(null);
      } else {
        toast.error(data.error || "Failed to update account");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleSetBalance = async (userId: string, newBalance: number) => {
    if (!adminToken) return toast.error("No admin token found");

    setLoading(true);
    try {
      const res = await fetch("/api/admin/set-balance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ userId, newBalance }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Balance set successfully!");
        setUsers((prev) =>
          prev.map((u) =>
            u.id === userId ? { ...u, account_balance: newBalance } : u
          )
        );
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="p-4">
    <ToastContainer />
    <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

    <div className="hidden md:block overflow-auto">
      <table className="w-full border">
        <thead>
          <tr className="border bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Document</th>
            <th className="p-2">Balance</th>
            <th className="p-2">Account Number</th>
            <th className="p-2">Card Number</th>
            <th className="p-2">Set Balance</th>
            <th className="p-2">Account Details</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => {
            const docUrl = getDocumentUrl(user.document_path);
            const isImage = user.document_path
              ? /\.(jpg|jpeg|png|gif)$/i.test(user.document_path)
              : false;

            return (
              <tr key={user.id} className="border">
                <td className="p-2">{user.fname} {user.lname}</td>
                <td className="p-2">{user.email}</td>

                <td className="p-2">
                  {user.document_path ? (
                    isImage ? (
                      <div
                        className="relative w-16 h-16 cursor-pointer"
                        onClick={() => docUrl && setSelectedImage(docUrl)}
                      >
                        {docUrl ? (
                          <Image
                            src={docUrl}
                            alt="document"
                            fill
                            sizes="64px"
                            className="rounded object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-xs text-gray-500">No image</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <button
                        className="bg-gray-300 px-2 py-1 rounded"
                        onClick={() => docUrl && window.open(docUrl, "_blank")}
                      >
                        Open Doc
                      </button>
                    )
                  ) : (
                    "No document"
                  )}
                </td>

                <td className="p-2">
                  {editingUser === user.id ? (
                    <input
                      type="number"
                      value={editForm.account_balance}
                      onChange={(e) =>
                        setEditForm((p) => ({
                          ...p,
                          account_balance: e.target.value,
                        }))
                      }
                      className="border p-1 w-24"
                    />
                  ) : (
                    `$${user.account_balance.toFixed(2)}`
                  )}
                </td>

                <td className="p-2">
                  {editingUser === user.id ? (
                    <input
                      type="text"
                      value={editForm.account_number}
                      onChange={(e) =>
                        setEditForm((p) => ({
                          ...p,
                          account_number: e.target.value,
                        }))
                      }
                      className="border p-1 w-32"
                    />
                  ) : (
                    user.account_number || "Not set"
                  )}
                </td>

                <td className="p-2">
                  {editingUser === user.id ? (
                    <input
                      type="text"
                      value={editForm.card_number}
                      onChange={(e) =>
                        setEditForm((p) => ({
                          ...p,
                          card_number: e.target.value,
                        }))
                      }
                      className="border p-1 w-40"
                    />
                  ) : (
                    user.card_number
                      ? `${user.card_number.slice(0, 4)} **** **** ${user.card_number.slice(-4)}`
                      : "Not set"
                  )}
                </td>

                <td className="p-2">
                  <button
                    onClick={() => {
                      const input = prompt("Enter new balance amount");
                      if (!input) return;
                      const newBalance = parseFloat(input);
                      if (!isNaN(newBalance)) handleSetBalance(user.id, newBalance);
                      else toast.error("Invalid number");
                    }}
                    className="bg-purple-500 text-white px-2 py-1 rounded"
                  >
                    Set Balance
                  </button>
                </td>

                <td className="p-2">
                  {editingUser === user.id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveAccountDetails(user.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="bg-gray-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => startEditing(user)}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

    {/* MOBILE VERSION (Cards) */}
    <div className="md:hidden flex flex-col gap-4">
      {users.map((user) => {
        const docUrl = getDocumentUrl(user.document_path);
        const isImage = user.document_path
          ? /\.(jpg|jpeg|png|gif)$/i.test(user.document_path)
          : false;

        return (
          <div
            key={user.id}
            className="border rounded-lg p-4 shadow-sm bg-white flex flex-col gap-3"
          >
            <div className="flex justify-between">
              <h2 className="font-bold text-lg">
                {user.fname} {user.lname}
              </h2>
              <button
                onClick={() => startEditing(user)}
                className="text-sm bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
            </div>

            <p className="text-sm text-gray-600">{user.email}</p>

            {/* DOCUMENT */}
            <div>
              <p className="font-semibold mb-1">Document:</p>
              {user.document_path ? (
                isImage ? (
                  <div
                    className="relative w-32 h-32 rounded overflow-hidden"
                    onClick={() => docUrl && setSelectedImage(docUrl)}
                  >
                    <Image
                      src={docUrl || "/placeholder-image.jpg"}
                      alt="Document"
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                ) : (
                  <button
                    className="bg-gray-300 px-3 py-1 rounded"
                    onClick={() => docUrl && window.open(docUrl, "_blank")}
                  >
                    Open Document
                  </button>
                )
              ) : (
                "No document"
              )}
            </div>

            {/* BALANCE */}
            <div>
              <p className="font-semibold">Balance:</p>

              {editingUser === user.id ? (
                <input
                  type="number"
                  className="border p-2 rounded w-full"
                  value={editForm.account_balance}
                  onChange={(e) =>
                    setEditForm((p) => ({
                      ...p,
                      account_balance: e.target.value,
                    }))
                  }
                />
              ) : (
                <p className="text-lg font-bold">${user.account_balance.toFixed(2)}</p>
              )}
            </div>

            {/* ACCOUNT NUMBER */}
            <div>
              <p className="font-semibold">Account Number:</p>

              {editingUser === user.id ? (
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  value={editForm.account_number}
                  onChange={(e) =>
                    setEditForm((p) => ({
                      ...p,
                      account_number: e.target.value,
                    }))
                  }
                />
              ) : (
                <p>{user.account_number || "Not set"}</p>
              )}
            </div>

            {/* CARD NUMBER */}
            <div>
              <p className="font-semibold">Card Number:</p>
              {editingUser === user.id ? (
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  value={editForm.card_number}
                  onChange={(e) =>
                    setEditForm((p) => ({
                      ...p,
                      card_number: e.target.value,
                    }))
                  }
                />
              ) : (
                <p>
                  {user.card_number
                    ? `${user.card_number.slice(0, 4)} **** **** ${user.card_number.slice(-4)}`
                    : "Not set"}
                </p>
              )}
            </div>

            {/* SET BALANCE */}
            <button
              className="bg-purple-500 text-white px-3 py-2 rounded w-full"
              onClick={() => {
                const input = prompt("Enter new balance amount:");
                if (!input) return;
                const newBalance = parseFloat(input);
                if (!isNaN(newBalance)) handleSetBalance(user.id, newBalance);
                else toast.error("Invalid number");
              }}
            >
              Set Balance
            </button>

            {/* SAVE/CANCEL EDIT */}
            {editingUser === user.id && (
              <div className="flex gap-2 mt-2">
                <button
                  className="flex-1 bg-green-500 text-white py-2 rounded"
                  onClick={() => saveAccountDetails(user.id)}
                >
                  Save
                </button>
                <button
                  className="flex-1 bg-gray-500 text-white py-2 rounded"
                  onClick={cancelEditing}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>

    {/* Fullscreen image preview */}
    {selectedImage && (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
        <button
          className="absolute top-4 right-4 text-white text-3xl"
          onClick={() => setSelectedImage(null)}
        >
          ×
        </button>
        <div className="relative w-[90vw] h-[90vh]">
          <Image
            src={selectedImage}
            alt="Preview"
            fill
            className="rounded object-contain"
          />
        </div>
      </div>
    )}
  </div>
);

}