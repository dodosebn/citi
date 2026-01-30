import React from 'react'
import UpLoader from './uploader'
import foot from "@/public/images/picsAccBg.jpg";

const page = () => {
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
     <div className="relative z-10 w-full max-w-xl">
        <UpLoader/>
      </div>
      </div>
)}

export default page