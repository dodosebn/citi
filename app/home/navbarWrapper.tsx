"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/account/dashboard");
const isInvestPart = pathname.startsWith("/invest-part");
  if (isDashboard || isInvestPart) return null; 

  return <Navbar />;
}
