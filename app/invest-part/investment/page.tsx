import InvestmentsPage from "@/app/account/dashboard/components/investment/investment";
import { FaWhatsappSquare } from "react-icons/fa";

const page = () => {
  return (
    <div className="relative">
      <InvestmentsPage />

      <a
        href="https://wa.me/14703903270?text=Hello%20I%20need%20help%20with%20my%20account"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 left-6 z-50"
      >
        <FaWhatsappSquare
          size={48}
          className="text-green-500 cursor-pointer hover:scale-110 transition-transform drop-shadow-lg"
        />
      </a>
    </div>
  );
};

export default page;
