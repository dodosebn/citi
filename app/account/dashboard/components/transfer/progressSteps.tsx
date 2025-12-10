import React from 'react'

const ProgressSteps = ({ currentStep }: { currentStep: string }) => {
  return (
    <div className="mt-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep === "bank-details"
                        ? "bg-white text-blue-600"
                        : currentStep === "recipient-info" ||
                          currentStep === "amount" ||
                          currentStep === "pin-verification" ||
                          currentStep === "confirmation"
                        ? "bg-green-500 text-white"
                        : "bg-blue-400 text-white"
                    }`}
                  >
                    1
                  </div>
                  <span className="text-xs mt-1">Bank Details</span>
                </div>
                <div className="flex-1 h-1 mx-2 bg-blue-400"></div>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep === "recipient-info"
                        ? "bg-white text-blue-600"
                        : currentStep === "amount" ||
                          currentStep === "pin-verification" ||
                          currentStep === "confirmation"
                        ? "bg-green-500 text-white"
                        : "bg-blue-400 text-white"
                    }`}
                  >
                    2
                  </div>
                  <span className="text-xs mt-1">Recipient</span>
                </div>
                <div className="flex-1 h-1 mx-2 bg-blue-400"></div>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep === "amount"
                        ? "bg-white text-blue-600"
                        : currentStep === "pin-verification" ||
                          currentStep === "confirmation"
                        ? "bg-green-500 text-white"
                        : "bg-blue-400 text-white"
                    }`}
                  >
                    3
                  </div>
                  <span className="text-xs mt-1">Amount</span>
                </div>
                <div className="flex-1 h-1 mx-2 bg-blue-400"></div>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep === "pin-verification"
                        ? "bg-white text-blue-600"
                        : currentStep === "confirmation"
                        ? "bg-green-500 text-white"
                        : "bg-blue-400 text-white"
                    }`}
                  >
                    4
                  </div>
                  <span className="text-xs mt-1">Confirm</span>
                </div>
              </div>
            </div>
          )
}

export default ProgressSteps;