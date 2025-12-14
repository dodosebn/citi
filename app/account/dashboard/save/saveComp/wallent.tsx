import React from 'react'
import { FaChartLine, FaPiggyBank, FaWallet } from 'react-icons/fa6';

interface WallentProps {
  balance: number;
  getTotalSavings: () => number;
  getTotalInterestEarned: () => number;
}

const Wallent: React.FC<WallentProps> = ({ 
  balance, 
  getTotalSavings, 
  getTotalInterestEarned 
}) => {
  return (
<div className="bg-white rounded-xl shadow-md p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center text-gray-500 mb-2">
                    <FaWallet className="mr-2" />
                    <span className="text-sm">Available Balance</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    ${balance.toLocaleString()}
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center text-gray-500 mb-2">
                    <FaPiggyBank className="mr-2" />
                    <span className="text-sm">Total Savings</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    ${getTotalSavings().toLocaleString()}
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center text-gray-500 mb-2">
                    <FaChartLine className="mr-2" />
                    <span className="text-sm">Interest Earned</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    +${getTotalInterestEarned().toLocaleString()}
                  </div>
                </div>
              </div>
            </div>  )
}

export default Wallent;