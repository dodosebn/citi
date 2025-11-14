"use client";
import React from "react";
import foot from "@/public/images/rocky-overlay.avif";
import Logo from "@/public/images/logo.png";
import Image from "next/image";
import { FaHome } from "react-icons/fa";
import Link from "next/link";
import cert1 from "@/public/images/cert1.svg";
import cert2 from "@/public/images/cert2.svg";

const Footer = () => {
    const year = new Date().getFullYear();

  return (
    <footer
      className="w-full bg-[#03305c] bg-cover bg-center"
      style={{ backgroundImage: `url(${foot.src})` }}
    >
      <section className="max-w-6xl mx-auto px-6 py-10 text-white">
        <div className="flex items-center mb-6">
          <Image src={Logo} alt="logo" width={60} height={60} />
        </div>

        <div className="space-y-3 text-sm">
          <p className="flex flex-wrap items-center gap-2">
            Member FDIC | <FaHome className="text-white" /> Equal Housing and Equal Opportunity Lender
          </p>
          <p>Citi Bank NMLS ID# 989781</p>
        </div>

        <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <p className="text-md leading-relaxed max-w-xl">
            If you are using a screen reader and having problems using this
            website, please call{" "}
            <span className="font-semibold">+14703903270</span> for assistance or{" "}
            <Link href="/" className="underline hover:text-gray-200">
              click here
            </Link>{" "}
            to communicate with our Contact Center via instant text message chat.
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
            <Image src={cert1} alt="cert1" className="h-20 w-auto" />
            <Image src={cert2} alt="cert2" className="h-20 w-auto" />
            </div>
             <div className="text-sm text-gray-300">
          All rights reserved © {year}
        </div>
          </div>
        </div>

      </section>
             
    </footer>
  );
};

export default Footer;
