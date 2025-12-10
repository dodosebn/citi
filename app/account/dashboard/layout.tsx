"use client";
import React from "react";
import Navbar from "./components/navbar";
import MobileUp from "./components/mobileUp";
import { useAppStore } from "@/app/store/useApp";
import { useStoreHydration } from "@/app/hooks/useStoreHydration";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
   useStoreHydration();
  const { user, currentView, setCurrentView } = useAppStore();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar 
        user={user}   
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      <MobileUp currentView={currentView} setCurrentView={setCurrentView} />
     
      <main className="flex-1 md:px-20 px-2 pt-8 pb-5">
        {/* <Header currentView={currentView} /> */}
        {children}
      </main>
    </div>
  );
};

export default Layout;
