import React from 'react';
import foot from "@/public/images/picsAccBg.jpg";
import Sform from './sform';

const Page = () => {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${foot.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[#03305c]/90 opacity-90"></div>

      <div className="relative z-10 w-full max-w-md">
        <Sform />
      </div>
    </div>
  );
};

export default Page;
