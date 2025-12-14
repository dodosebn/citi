import React from 'react';

interface SavingsPlan {
  id: string;
  name: string;
  description: string;
  interest_rate: number;
  min_amount: number;
  max_amount?: number;
  withdrawal_fee: number;
  min_duration_days: number;
  created_at?: string;
}

interface SaveOverLayProps {
  isSaveModalOpen: boolean;
  setIsSaveModalOpen: (open: boolean) => void;
  selectedPlan: SavingsPlan | null;
  savingsAmount: string;
  setSavingsAmount: (amount: string) => void;
  balance: number;
  processing: boolean;
  handleSaveMoney: () => void;
  calculateProjectedInterest: (amount: number, rate: number, days?: number) => number;
}

const SaveOverLay: React.FC<SaveOverLayProps> = ({
  isSaveModalOpen,
  setIsSaveModalOpen,
  selectedPlan,
  savingsAmount,
  setSavingsAmount,
  balance,
  processing,
  handleSaveMoney,
  calculateProjectedInterest
}) => {
  if (!isSaveModalOpen || !selectedPlan) return null;

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform animate-scale-in">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            Save Money
          </h3>
          <button
            onClick={() => setIsSaveModalOpen(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={processing}
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Plan:</span>
                <p className="font-semibold text-blue-700">{selectedPlan.name}</p>
              </div>
              <div>
                <span className="text-gray-600">Interest Rate:</span>
                <p className="font-semibold">{selectedPlan.interest_rate}% APY</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount to Save ($)
            </label>
            <input
              type="number"
              value={savingsAmount}
              onChange={(e) => setSavingsAmount(e.target.value)}
              min={selectedPlan.min_amount}
              max={selectedPlan.max_amount || balance}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter amount"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Available: ${balance.toLocaleString()}</span>
              <span>Min: ${selectedPlan.min_amount.toLocaleString()}</span>
            </div>
          </div>

          {savingsAmount && !isNaN(parseFloat(savingsAmount)) && (
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">
                Projected Earnings (1 Year)
              </h4>
              <div className="text-sm text-green-700">
                <p>
                  Interest Earned: +$
                  {calculateProjectedInterest(parseFloat(savingsAmount), selectedPlan.interest_rate).toFixed(2)}
                </p>
                <p>
                  Total Value: $
                  {(parseFloat(savingsAmount) + calculateProjectedInterest(parseFloat(savingsAmount), selectedPlan.interest_rate)).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setIsSaveModalOpen(false)}
            className="flex-1 bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-400 transition-colors"
            disabled={processing}
          >
            Cancel
          </button>
          <button
            onClick={handleSaveMoney}
            disabled={processing}
            className="flex-1 bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {processing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              `Save $${parseFloat(savingsAmount || '0').toLocaleString()}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SaveOverLay;