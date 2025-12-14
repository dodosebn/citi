import React from "react";
import { RiArrowLeftLine } from "react-icons/ri";
import { AmountProps } from "../type";

const Amount: React.FC<AmountProps> = ({
  setCurrentStep,
  accountNumber,
  selectedBank,
  recipientName,
  recipientEmail,
  description,
  amount,
  swiftCode,
    routingNumber,
  setAmount,
}) => {
  return (
    <>
      <button
        type="button"
        onClick={() => setCurrentStep("recipient-info")}
        className="text-blue-600 mb-4 flex items-center gap-1 hover:text-blue-800 transition-colors"
      >
        <RiArrowLeftLine /> Back to Recipient Info
      </button>

      <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-3">Transfer Details</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Account Number:</span>
            <span className="font-semibold">{accountNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Bank:</span>
            <span className="font-semibold">{selectedBank}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Recipient:</span>
            <span className="font-semibold">{recipientName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Email:</span>
            <span className="font-semibold">{recipientEmail}</span>
          </div>
             <div className="flex justify-between">
            <span className="text-gray-600">Swiftcode:</span>
            <span className="font-semibold">{swiftCode}</span>
          </div>
             <div className="flex justify-between">
            <span className="text-gray-600">Routing Number:</span>
            <span className="font-semibold">{routingNumber}</span>
          </div>
          {description && (
            <div className="flex justify-between">
              <span className="text-gray-600">Description:</span>
              <span className="font-semibold">{description}</span>
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">
          Amount to Transfer
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            $
          </span>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full pl-8 pr-4 py-3 border rounded-md outline-none focus:border-blue-500"
            placeholder="0.00"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {[1000, 2000, 3000, 5000].map((amt) => (
            <button
              type="button"
              key={amt}
              onClick={() => setAmount(amt.toString())}
              className="px-4 py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
            >
              ${amt}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={!amount || parseFloat(amount) <= 0}
        className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue to PIN Verification
      </button>
    </>
  );
};

export default Amount;
