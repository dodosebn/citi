'use client';
import { ConfirmationProps } from "../type";

const Confirmation: React.FC<ConfirmationProps> = ({formatCurrency, amount, recipientName, recipientEmail, resetForm}) => {
  return (
              <div className="text-center space-y-6">
                <div className="text-green-500 text-5xl mb-2">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
                    ✓
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Transfer Successful!
                </h3>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 p-6 rounded-xl shadow-sm">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount Sent:</span>
                      <span className="font-bold text-lg text-green-600">
                        ${formatCurrency(amount)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">To:</span>
                      <span className="font-bold">{recipientName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transaction ID:</span>
                      <span className="font-mono text-sm">
                        TRX-{Date.now().toString().slice(-8)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex items-start">
                    <div className="text-blue-500 mr-3 mt-1">✉️</div>
                    <div className="text-left">
                      <p className="font-medium text-blue-800">
                        Emails sent successfully!
                      </p>
                      <p className="text-sm text-blue-600">
                        Confirmation emails will be be sent to both you and{" "}
                        {recipientEmail} shortly.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-left">
                  <p className="font-medium text-green-800 mb-1">
                    What happens next?
                  </p>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>
                      • The money is on its way to {recipientName}'s account
                    </li>
                  </ul>
                </div>

                <div className="space-y-3 pt-4">
                  <button
                    onClick={resetForm}
                    className="w-full bg-blue-600 rounded-full hover:bg-blue-700 text-white py-3 rounded-ful font-semibold transition-colors"
                  >
                    Make Another Transfer
                  </button>
                  <button
                    onClick={() => (window.location.href = "/account/dashboard")}
                    className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-full font-semibold transition-colors"
                  >
                    Back to Dashboard
                  </button>
                </div>
              </div>  )
}

export default Confirmation;