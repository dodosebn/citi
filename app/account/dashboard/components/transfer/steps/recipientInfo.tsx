import React from 'react'
import { RiArrowLeftLine } from 'react-icons/ri'
import { RecipientInfoProps } from '../type';

const RecipientInfo: React.FC<RecipientInfoProps> = ({
  accountNumber,
  selectedBank,
  recipientName,
  setRecipientName,
  recipientEmail,
  setRecipientEmail,
  description,
  setDescription,
  setCurrentStep,
  swiftCode,
  setSwiftCode,
  routingNumber,
  setRoutingNumber,
}) => {

  const presetDescriptions = ["Transaction Pending", "Transfer Completed"];

  return (
    <>
      <button
        type="button"
        onClick={() => setCurrentStep("bank-details")}
        className="text-blue-600 mb-4 flex items-center gap-1 hover:text-blue-800 transition-colors"
      >
        <RiArrowLeftLine /> Back to Bank Details
      </button>

      <div className="mb-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-2">
          Bank Details
        </h4>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Account Number:</span>
            <span className="font-semibold">{accountNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Bank:</span>
            <span className="font-semibold">{selectedBank}</span>
          </div>
        </div>
      </div>

    {[
      { label: "Recipient Name", value: recipientName, setter: setRecipientName, type: "text", placeholder: "Enter recipient's full name" },
      { label: "Recipient Email", value: recipientEmail, setter: setRecipientEmail, type: "email", placeholder: "Enter recipient's email" },
      { label: "Swiftcode", value: swiftCode, setter: setSwiftCode, type: "text", placeholder: "Enter SwiftCode" },
      { label: "Routing Number", value: routingNumber, setter: setRoutingNumber, type: "text", placeholder: "Enter Routing Number" }
    ].map(({ label, value, setter, type, placeholder }, idx) => (
      <div key={idx}>
        <label className="block text-sm font-semibold mb-2">
          {label}
        </label>
        <input
          type={type}
          value={value}
          onChange={(e) => setter(e.target.value)}
          className="w-full px-4 py-3 border rounded-md outline-none focus:border-blue-500"
          placeholder={placeholder}
        />
        { type === "email" &&
            <div>
   
      
        <p className="text-xs text-gray-500 mt-1">
          A confirmation email will be sent to this address
        </p>
      </div>
        }
      </div>
    ))}
  
  

    

      <div>
        <label className="block text-sm font-semibold mb-2">
          Description (Optional)
        </label>

        <select
          className="w-full px-4 py-3 border rounded-md outline-none focus:border-blue-500 mb-2"
          value={presetDescriptions.includes(description) ? description : ""}
          onChange={(e) => setDescription(e.target.value)}
        >
          <option value="">Select a description (optional)</option>
          {presetDescriptions.map((item, idx) => (
            <option key={idx} value={item}>
              {item}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-3 border outline-none focus:border-blue-500"
          placeholder="Or enter a custom description"
        />
      </div>

      <button
        type="submit"
        disabled={!recipientName || !recipientEmail}
        className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
      >
        Continue to Amount
      </button>
    </>
  )
}

export default RecipientInfo;
