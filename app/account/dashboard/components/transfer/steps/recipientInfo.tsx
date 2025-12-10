import React from 'react'
import { RiArrowLeftLine } from 'react-icons/ri'
import { RecipientInfoProps } from '../type';

const RecipientInfo: React.FC<RecipientInfoProps> = ({accountNumber, selectedBank, recipientName, setRecipientName, recipientEmail, setRecipientEmail, description, setDescription, setCurrentStep}) => {
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

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Recipient Name
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full px-4 py-3 border rounded-xl outline-none focus:border-blue-500"
                    placeholder="Enter recipient's full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Recipient Email
                  </label>
                  <input
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    className="w-full px-4 py-3 border rounded-xl outline-none focus:border-blue-500"
                    placeholder="Enter recipient's email"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    A confirmation email will be sent to this address
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 border rounded-xl outline-none focus:border-blue-500"
                    placeholder="Add a note or description for this transfer"
                    rows={3}
                  />
                
                </div>

                <button
                  type="submit"
                  disabled={!recipientName || !recipientEmail}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Amount
                </button>
              </>  )
}

export default RecipientInfo;