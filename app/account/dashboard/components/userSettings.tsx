import React from "react";
import { User } from "../components/type";
import Image, { StaticImageData } from "next/image";
import { supabase } from "@/app/store/supabase";

interface UserSettingsProps {
  user: User | null;
  onUpdateUser: (user: User) => void;
}

const UserSettings: React.FC<UserSettingsProps> = ({ user, onUpdateUser }) => {
  const [editedUser, setEditedUser] = React.useState<User | null>(user);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
      return;
    }
    window.location.href = "/account/login";
  };

  const getProfileDisplay = () => {
    if (!user) return null;

    if (user.profilePicture) {
      if (typeof user.profilePicture === "string") {
        return (
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
        );
      } else {
        return (
          <Image
            src={user.profilePicture as StaticImageData}
            alt="Profile"
            width={80}
            height={80}
            className="w-20 h-20 rounded-full object-cover"
          />
        );
      }
    }

    const initials = `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase();
    return <span className="text-2xl font-bold text-white">{initials}</span>;
  };

  if (!editedUser) {
    return <p className="text-gray-500">Loading user settings...</p>;
  }

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>

      <div className="space-y-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center overflow-hidden">
            {getProfileDisplay()}
          </div>
        </div>

        {/* Display Document Path */}
        <div>
          <label className="block text-gray-700 mb-2">Uploaded Document</label>
          <input
            type="text"
            name="document_path"
            value={editedUser.document_path || ""}
            readOnly
            className="w-full p-3 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={editedUser.firstName}
              readOnly
              className="w-full p-3 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={editedUser.lastName}
              readOnly
              className="w-full p-3 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            value={editedUser.email}
            readOnly
            className="w-full p-3 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Birthday</label>
          <input
            type="text"
            name="birthday"
            value={editedUser.birthday || ""}
            readOnly
            className="w-full p-3 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Gender</label>
          <input
            type="text"
            name="gender"
            value={editedUser.gender || ""}
            readOnly
            className="w-full p-3 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>

        <div className="pt-4 border-t flex justify-end">
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
