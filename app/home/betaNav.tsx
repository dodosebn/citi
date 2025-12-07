"use client";
import React, { useEffect, useState } from "react";

const BetaNav = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [menubar, setMenubar] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const menuItems = [
    {
      title: "Personal",
      links: [
        { name: "Banking", path: "home/personal/banking" },
        { name: "Loans", path: "home/personal/loans" },
        { name: "Credit Cards", path: "home/personal/credit-cards" },
        { name: "Investments", path: "home/personal/investments" },
      ],
    },
    {
      title: "Small Business",
      links: [
        {
          name: "Business Banking",
          path: "home/small-Business/business-banking",
        },
        { name: "Business Loans", path: "home/small-Business/business-loans" },
        {
          name: "Merchant Services",
          path: "home/small-Business/merchant-services",
        },
      ],
    },
    {
      title: "Institutional Investing",
      links: [
        {
          name: "Wealth Management",
          path: "home/institutional-Investing/wealth-mgt",
        },
        {
          name: "Retirement Planning",
          path: "home/institutional-Investing/retirement-plan",
        },
        {
          name: "Trust Services",
          path: "home/institutional-Investing/trust-services",
        },
      ],
    },
    {
      title: "About Us",
      links: [
        { name: "Our Story", path: "/home/aboutUs/our-story" },
        { name: "Leadership", path: "/home/aboutUs/leaderShip" },
        { name: "Careers", path: "/home/aboutUs/careers" },
        { name: "Community Impact", path: "/home/aboutUs/community-impact" },
      ],
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMenubar(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDropdown = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <div className="w-full hidden md:block">
      <div className="flex justify-center items-center px-6 pb-2 max-w-7xl mx-auto">
        <ul className="flex space-x-8">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="relative group"
              onMouseEnter={() => !isMobile && setActiveDropdown(index)}
              onMouseLeave={() => !isMobile && setActiveDropdown(null)}
            >
              <button
                className="font-bold text-xl hover:text-[#e8742c] text-[#03305c] flex items-center space-x-1 py-2"
                onClick={() => isMobile && toggleDropdown(index)}
              >
                <span>{item.title}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    activeDropdown === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {activeDropdown === index && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 border border-gray-100">
                  <div className="py-1">
                    {item.links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.path} 
                        className="block px-4 py-2 text-sm text-[#03305c] hover:bg-[#f5f5f5] hover:text-[#e8742c] transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BetaNav;