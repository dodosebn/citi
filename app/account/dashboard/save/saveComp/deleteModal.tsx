// In your deleteModal.tsx file, update the interface
import React from 'react';
import { FaExclamationTriangle, FaClock } from 'react-icons/fa';

// Match the UserSaving type from parent
interface SavingsPlan {
  id?: string;
  name?: string;
  description?: string;
  interest_rate?: number;
  min_amount?: number;
  max_amount?: number;
  withdrawal_fee?: number;
  min_duration_days?: number;
  created_at?: string;
}

interface SavingToDelete {
  id?: string;
  plan_id?: string;
  amount?: number;
  interest_earned?: number;
  total_balance: number;
  status?: string;
  start_date?: string;
  last_interest_date?: string;
  withdrawal_date?: string;
  created_at?: string;
  savings_plans?: SavingsPlan;
  days_since_start?: number;
}

interface DeleteModalProps {
  isDeleteModalOpen: boolean;
  savingToDelete: SavingToDelete | null;
  setIsDeleteModalOpen: (open: boolean) => void;
  processing: boolean;
  handleDeleteSavings: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isDeleteModalOpen,
  savingToDelete,
  setIsDeleteModalOpen,
  processing,
  handleDeleteSavings
}) => {
  if (!isDeleteModalOpen || !savingToDelete) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform animate-scale-in">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            Delete Savings Account
          </h3>
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={processing}
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <div className="flex items-center text-red-800 mb-2">
              <FaExclamationTriangle className="mr-2" />
              <span className="font-semibold">Warning</span>
            </div>
            <p className="text-sm text-red-700">
              This action will permanently delete your savings account and refund the balance to your main account.
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Account:</span>
                <p className="font-semibold text-blue-700">
                  {savingToDelete.savings_plans?.name || "Savings Account"}
                </p>
              </div>
              <div>
                <span className="text-gray-600">Current Balance:</span>
                <p className="font-semibold">
                  ${savingToDelete.total_balance.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {savingToDelete.savings_plans && savingToDelete.days_since_start && 
           savingToDelete.savings_plans.min_duration_days && // Add this check
           savingToDelete.days_since_start < savingToDelete.savings_plans.min_duration_days && (
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <div className="flex items-center text-yellow-800 mb-2">
                <FaClock className="mr-2" />
                <span className="font-semibold">Early Deletion Penalty</span>
              </div>
              <p className="text-sm text-yellow-700">
                You are deleting before the minimum duration ({savingToDelete.savings_plans.min_duration_days} days). 
                A penalty of {savingToDelete.savings_plans.withdrawal_fee || 0}% will be applied.
              </p>
            </div>
          )}

          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">
              Refund Summary
            </h4>
            <div className="text-sm text-green-700">
              {(() => {
                const plan = savingToDelete.savings_plans;
                let penaltyFee = 0;
                let refundAmount = savingToDelete.total_balance;

                if (plan && savingToDelete.days_since_start && 
                    plan.min_duration_days && // Add this check
                    savingToDelete.days_since_start < plan.min_duration_days) {
                  penaltyFee = (savingToDelete.total_balance * (plan.withdrawal_fee || 0)) / 100;
                  refundAmount = savingToDelete.total_balance - penaltyFee;
                }

                return (
                  <>
                    <p className="mb-1">Total Balance: ${savingToDelete.total_balance.toLocaleString()}</p>
                    {penaltyFee > 0 && (
                      <p className="mb-1 text-yellow-600">
                        Penalty: -${penaltyFee.toFixed(2)}
                      </p>
                    )}
                    <p className="font-bold">
                      Refund Amount: ${refundAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </>
                );
              })()}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="flex-1 bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-400 transition-colors"
            disabled={processing}
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteSavings}
            disabled={processing}
            className="flex-1 bg-red-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {processing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Deleting...
              </>
            ) : (
              'Delete Account'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;