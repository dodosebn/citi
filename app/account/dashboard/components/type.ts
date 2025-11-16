import { StaticImageData } from "next/image";

// types/index.ts
export interface User {
   id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string | StaticImageData;
  birthday?: string;   
  gender?: string;   
   accountNumber?: string;     // bank account number
  accountBalance: number;   
  cardNumber?: string;    
  pin: number;
  document_path?: string;
}
export interface Transaction {
  id: string;
  type: 'debit' | 'credit';
  description: string;
  amount: number;
  date: string;
  category?: string;
}

export interface Account {
  balance?: number;
  lastUpdated: string;
  timeUpdated: string;
  currency: string;
  accountNumber?: string;
}

export interface Card {
  id: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardHolder: string;
  type: 'visa' | 'mastercard' | 'amex';
}