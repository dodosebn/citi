export type FormStep =
  | "bank-details"
  | "recipient-info"
  | "amount"
  | "pin-verification"
  | "confirmation";
export interface Bank {
  NAME: string;
  REGION: string;
  COUNTRY: string;
  NOTE: string;
}
export interface StepBankDetailsProps {
  accountNumber: string;
  setAccountNumber: React.Dispatch<React.SetStateAction<string>>;
  handlePaste: () => void;
  isCopied: boolean;
  query: string;
  handleSearch: (value: string) => void;
  handleCustomBankInput: () => void;
  handleBankSelect: (bankName: string) => void;
  banks: Bank[];
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedBank: string;
  setSelectedBank: React.Dispatch<React.SetStateAction<string>>;
  dropdownRef: React.RefObject<HTMLDivElement>;
  Banks: Bank[];
    isVerifying: boolean;
}
export interface RecipientInfoProps {
  accountNumber: string;
  selectedBank: string;
  recipientName: string;
  setRecipientName: (value: string) => void;
  recipientEmail: string;
  setRecipientEmail: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  setCurrentStep: (step: FormStep) => void;
}
export interface AmountProps {
  setCurrentStep: (step: FormStep) => void;
  accountNumber: string;
  selectedBank: string;
  recipientName: string;
  recipientEmail: string;
  description: string;
  amount: string;
  setAmount: (value: string) => void;
}
export interface PinVerificationProps {
  setCurrentStep: (step: FormStep) => void;
  formatCurrency: (value: string) => string;
  amount: string;
  accountNumber: string;
  selectedBank: string;
  recipientName: string;
  recipientEmail: string;
  description: string;
  pin: string[];
  pinInputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  handlePinChange: (index: number, value: string) => void;
  handlePinKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
  pinError?: string; 
  isProcessing?: boolean; 
  verifyPin: (enteredPin: string) => void; 
}
export interface ConfirmationProps {
  formatCurrency: (value: string) => string;
  amount: string;
  recipientName: string;
  recipientEmail: string;
  resetForm: () => void;
}
