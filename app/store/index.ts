import { User } from "@/app/account/dashboard/components/type";

export interface AppState {
  user: User | null;
  token: string | null;
  currentView: string;
  setCurrentView: (view: string) => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  loginUser: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logoutUser: () => void;
}

export interface SignupData {
  fname: string;
  lname: string;
  email: string;
  password: string;
}

export interface PersonalStore {
  birthday: string;
  gender: string;
  pinValue: string[];
  signupData: SignupData | null;
   document_path: string | null;  
  setDocumentPath: (path: string | null) => void;

  setBirthday: (val: string) => void;
  setGender: (val: string) => void;
  addPinDigit: (num: number) => void;
  clearPin: () => void;
  backspacePin: () => void;
  setSignupData: (data: SignupData) => void;
}