import foot from "@/public/images/picsAccBg.jpg";
import ResetForm from "./resetForm";
import { Suspense } from "react";

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
      <div className="absolute inset-0 bg-[#03305c]/90" />

      <div className="relative z-10 flex items-center justify-center w-full px-4">
        <Suspense
          fallback={
            <div className="bg-white p-6 rounded-md shadow-md max-w-md w-full text-center">
              Loading…
            </div>
          }
        >
          <ResetForm />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
