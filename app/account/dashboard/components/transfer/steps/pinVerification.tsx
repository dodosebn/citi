import React from 'react'
import { RiArrowLeftLine } from 'react-icons/ri';
import { PinVerificationProps } from '../type';

const pinVerification: React.FC<PinVerificationProps> = ({setCurrentStep, formatCurrency, amount,
     accountNumber, selectedBank, recipientName, recipientEmail, description, pin,
      pinInputRefs, handlePinChange, handlePinKeyDown, pinError, verifyPin, isProcessing}) => {
  return (
 <>
                <button
                  type="button"
                  onClick={() => setCurrentStep("amount")}
                  className="text-blue-600 mb-4 flex items-center gap-1 hover:text-blue-800 transition-colors"
                >
                  <RiArrowLeftLine /> Back to Amount
                </button>

                <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-3">
                    Final Confirmation
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-bold text-lg text-green-600">
                        ${formatCurrency(amount)}
                      </span>
                    </div>
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
                    {description && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Description:</span>
                        <span className="font-semibold">{description}</span>
                      </div>
                    )}
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between text-gray-600">
                        <span>Fee:</span>
                        <span className="font-semibold">$0.00</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg pt-1">
                        <span>Total:</span>
                        <span>${formatCurrency(amount)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-3 text-center">
                    Enter your PIN to confirm the transfer
                  </label>
                  <div className="flex justify-center gap-3">
                    {pin.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => {
                          pinInputRefs.current[i] = el;
                        }}
                        type="password"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handlePinChange(i, e.target.value)}
                        onKeyDown={(e) => handlePinKeyDown(i, e)}
                        className="w-14 h-14 text-xl text-center border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-center text-gray-500 mt-3">
                    Enter your 4-digit PIN to authorize this transaction
                  </p>
                </div>

                {pinError && (
                  <div className="text-red-600 text-center font-medium">
                    {pinError}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => verifyPin(pin.join(""))}
                  disabled={pin.some((d) => !d) || isProcessing}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-full font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing Transfer...
                    </div>
                  ) : (
                    "Confirm Transfer"
                  )}
                </button> </>  )
}

export default pinVerification