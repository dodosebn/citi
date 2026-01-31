import React, { useState, useEffect } from "react";
import { User } from "../components/type";
import Image, { StaticImageData } from "next/image";
import { supabase } from "@/app/store/supabase";

interface UserSettingsProps {
  user: User | null;
  onUpdateUser: (user: User) => void;
}

const UserSettings: React.FC<UserSettingsProps> = ({ user, onUpdateUser }) => {
  const [editedUser, setEditedUser] = useState<User | null>(user);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error.message);
        return;
      }
      window.location.href = "/account/auth/login";
    } finally {
      setLoggingOut(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (!user || files.length === 0) return;

    setUploading(true);

    try {
      for (const file of files) {
        const cleanFileName = file.name
          .toLowerCase()
          .replace(/[^a-z0-9._-]/g, "_");

        const filePath = `${user.id}/${Date.now()}-${cleanFileName}`;

        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, file, { upsert: true });

        if (uploadError) {
          console.error("Upload failed:", uploadError);
          return;
        }

        const { data } = supabase.storage
          .from("avatars")
          .getPublicUrl(filePath);

        if (!data?.publicUrl) {
          console.error("Failed to get public URL for file:", filePath);
          return;
        }

        const { data: updateData, error: updateError } = await supabase
          .from("citisignup")
          .update({ profilepicture: data.publicUrl })
          .eq("id", user.id);

        if (updateError) {
          console.error("Failed to update profilepicture in citisignup:", updateError);
        } else {
          onUpdateUser({ ...user, profilePicture: data.publicUrl });
        }
      }
    } finally {
      setUploading(false);
      setFiles([]);
    }
  };

  const getProfileDisplay = () => {
    if (!editedUser) return null;

    if (editedUser.profilePicture) {
      if (typeof editedUser.profilePicture === "string") {
        return (
          <img
            src={editedUser.profilePicture}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
        );
      }

      return (
        <Image
          src={editedUser.profilePicture as StaticImageData}
          alt="Profile"
          width={80}
          height={80}
          className="w-20 h-20 rounded-full object-cover"
        />
      );
    }

    const initials = `${editedUser.firstName?.[0] ?? ""}${editedUser.lastName?.[0] ?? ""}`.toUpperCase();
    return <span className="text-2xl font-bold text-white">{initials}</span>;
  };

  // Skeleton Loading Component
  const SkeletonLoader = () => {
    return (
      <div className="mt-8 bg-white p-6 rounded-lg shadow animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
        
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gray-200"></div>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-10 bg-gray-200 rounded w-40"></div>
            <div className="h-10 bg-gray-200 rounded w-24"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i}>
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-12 bg-gray-100 rounded w-full"></div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t flex justify-end">
            <div className="h-12 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </div>
    );
  };

  if (!editedUser) {
    return <SkeletonLoader />;
  }

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>

      <div className="space-y-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center overflow-hidden">
              {getProfileDisplay()}
            </div>
            {uploading && (
              <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center">
                <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
              className="block w-full text-sm text-gray-600
                file:mr-4 file:py-2 file:px-4 file:rounded-lg
                file:border-0 file:text-sm file:font-medium
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          
          <button
            onClick={handleUpload}
            disabled={uploading || files.length === 0}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
              disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200
              flex items-center justify-center min-w-[100px]"
          >
            {uploading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Uploading</span>
              </div>
            ) : (
              "Upload"
            )}
          </button>
        </div>

        {files.length > 0 && !uploading && (
          <div className="text-sm text-gray-600 bg-blue-50 px-3 py-2 rounded-lg">
            {files.length} file{files.length > 1 ? 's' : ''} selected
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">First Name</label>
            <input
              type="text"
              name="firstName"
              value={editedUser.firstName}
              readOnly
              className="w-full p-3 border rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={editedUser.lastName}
              readOnly
              className="w-full p-3 border rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">Email Address</label>
          <input
            type="email"
            name="email"
            value={editedUser.email}
            readOnly
            className="w-full p-3 border rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">Birthday</label>
          <input
            type="text"
            name="birthday"
            value={editedUser.birthday || ""}
            readOnly
            className="w-full p-3 border rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">Gender</label>
          <input
            type="text"
            name="gender"
            value={editedUser.gender || ""}
            readOnly
            className="w-full p-3 border rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
          />
        </div>

        <div className="pt-4 border-t flex justify-end">
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 
              disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200
              flex items-center justify-center min-w-[120px]"
          >
            {loggingOut ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Logging out</span>
              </div>
            ) : (
              "Logout"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;