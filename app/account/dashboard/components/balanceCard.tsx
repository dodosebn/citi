"use client";
import React, { useState, useEffect } from "react";
import { Account, User } from "../components/type";
import Image, { StaticImageData } from "next/image";
import { FaArrowCircleUp, FaEye, FaEyeSlash } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import CopyAccountNumber from "./customs/acc-copy";
import CustomerSupport from "./customs/customerSupport";
import Link from "next/link";

interface BalanceCardProps {
  account: Account;
  user: User | null;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ account, user }) => {
  const [showAmount, setShowAmount] = useState(false);
  const [greeting, setGreeting] = useState("Hello");
  const [currentTime, setCurrentTime] = useState("");

  const toggleBalance = () => setShowAmount((prev) => !prev);

  // Function to get time-based greeting with emoji
  const getTimeBasedGreeting = (): { greeting: string; emoji: string } => {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
      return { greeting: "Good morning", emoji: "☀️" };
    } else if (hour >= 12 && hour < 17) {
      return { greeting: "Good afternoon", emoji: "🌤️" };
    } else if (hour >= 17 && hour < 21) {
      return { greeting: "Good evening", emoji: "🌙" };
    } else {
      return { greeting: "Good night", emoji: "🌃" };
    }
  };

  // Format time for display
  const formatTime = (): string => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Update time and greeting
  useEffect(() => {
    const updateTimeAndGreeting = () => {
      const now = new Date();
      const { greeting, emoji } = getTimeBasedGreeting();
      setGreeting(`${greeting} ${emoji}`);
      setCurrentTime(formatTime());
    };

    // Initial update
    updateTimeAndGreeting();
    
    const interval = setInterval(updateTimeAndGreeting, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const profileSrc =
    user?.profilePicture &&
    (typeof user.profilePicture === "string"
      ? user.profilePicture
      : (user.profilePicture as StaticImageData));

  const initials = `${user?.firstName?.[0] ?? ""}${
    user?.lastName?.[0] ?? ""
  }`.toUpperCase();

  return (
    <div className="bg-[rgb(3,48,92)] text-white md:p-6 p-5 rounded-lg shadow">
      {account.accountNumber ? (
        <CopyAccountNumber
          accountNumber={account.accountNumber}
          currency={account.currency}
        />
      ) : (
        <CustomerSupport />
      )}

      <div className="flex mx-auto justify-between">
        <div className="flex gap-3">
          <div>
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
          </div>
          <div className="text-center mt-2 flex justify-center">
            <h1 className="text-gray-400">
              {greeting}, {user ? user.firstName : "Guest"}
            </h1>
          </div>
        </div>
        <div className="md:flex flex-col hidden">
          <p className="text-gray-500 text-sm mt-2">{currentTime}</p>
          {/* <p className="text-gray-400 text-xs">{account.lastUpdated}</p> */}
        </div>
      </div>

      <div className="pt-4">
        <h2 className="text-white/90 text-sm uppercase font-semibold">
          Available Balance
        </h2>
        <section className="flex justify-between mx-auto items-center">
          <div>
            <p className="text-3xl font-bold text-white mt-2">
              {showAmount
                ? `${account.currency} ${account.balance?.toLocaleString()}`
                : "****"}
            </p>
            <p className="text-gray-500 text-sm mt-2 md:hidden flex">
              {currentTime} • Updated: {account.timeUpdated}
            </p>
          </div>
          <div
            className="cursor-pointer text-xl mb-4 md:mb-0"
            onClick={toggleBalance}
          >
            {showAmount ? <FaEye /> : <FaEyeSlash />}
          </div>
        </section>
      </div>

      <div className="mt-4">
        <section className="flex justify-between items-center">
          <div className="flex flex-row bg-[#053464] px-2 py-1 items-center gap-1">
            <FaArrowCircleUp size={24} />
            <Link
              className=" text-white px-4 py-2"
              href={"/account/dashboard/transfer"}
            >
              Transfer
            </Link>
          </div>

          <div className="flex flex-row items-center gap-1 bg-[#053464] px-2 py-1">
            <CiCirclePlus size={24} />
            <Link className=" text-white px-4 py-2 " href={"/account/dashboard/addMoney"}>Add Money</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BalanceCard;