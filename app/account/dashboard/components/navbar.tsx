"use client";
import React from "react";
import Logo from "@/public/images/logo.png";
import { MdHome } from "react-icons/md";
import { FaPaperPlane, FaRegSave } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa6";
import { User } from "../components/type";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface NavbarProps {
  user?: User | null;
  currentView: string;
  setCurrentView: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  user,
  currentView,
  setCurrentView,
}) => {
  const profileSrc =
    user?.profilePicture &&
    (typeof user.profilePicture === "string"
      ? user.profilePicture
      : (user.profilePicture as StaticImageData));

  const initials = `${user?.firstName?.[0] ?? ""}${
    user?.lastName?.[0] ?? ""
  }`.toUpperCase();

  const menuItems = [
    {
      id: "home",
      label: "Home",
      icon: <MdHome size={18} />,
      pat: "/account/dashboard",
    },
    {
      id: "spend",
      label: "Spend",
      icon: <FaPaperPlane size={18} />,
      pat: "/account/dashboard/transfer",
    },
    {
      id: "save",
      label: "Save",
      icon: <FaRegSave size={18} />,
      pat: "/account/dashboard/save",
    },
    { id: "card", label: "Card", icon: <FaCreditCard size={18} />, pat: "/account/dashboard/card" }, 
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto md:px-10 px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src={Logo} alt="logo" width={100} height={36} priority />
        </div>

        <ul className="hidden md:flex items-center gap-3">
          {menuItems.map((item) => (
            <li key={item.id}>
              {item.pat ? (
                <Link
                  href={item.pat}
                  onClick={() => setCurrentView(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors
                    hover:text-[#03305c] ${
                      currentView === item.id
                        ? "text-[#03305c]"
                        : "text-gray-500"
                    }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <div
                  onClick={() => setCurrentView(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors cursor-pointer
                    hover:text-[#03305c] ${
                      currentView === item.id
                        ? "text-[#03305c]"
                        : "text-gray-500"
                    }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              )}
            </li>
          ))}
        </ul>

        <Link
          href="/account/dashboard/settings"
          className="hidden md:flex gap-3 items-center cursor-pointer"
        >
          {profileSrc ? (
            <Image
              src={profileSrc}
              alt="Profile"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            initials && (
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
                {initials}
              </div>
            )
          )}
          <div className="text-gray-600 font-medium">Account</div>
        </Link>

        <div className="md:hidden block">
          <Link
            href="/account/dashboard/settings"
            className="flex gap-3 items-center cursor-pointer"
          >
            {profileSrc ? (
              <Image
                src={profileSrc}
                alt="Profile"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              initials && (
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
                  {initials}
                </div>
              )
            )}
            <div className="text-gray-600 font-medium">Account</div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
