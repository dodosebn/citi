import { create } from "zustand";
import { PersonalStore } from ".";

export const usePersonalStore = create<PersonalStore>((set) => ({
  birthday: "",
  gender: "",
  pinValue: [],
  signupData: null,
  document_path: null,

  setDocumentPath: (path) => set({ document_path: path }),
  setBirthday: (val) => set({ birthday: val }),
  setGender: (val) => set({ gender: val }),

  addPinDigit: (num) =>
    set((state) =>
      state.pinValue.length < 4
        ? { pinValue: [...state.pinValue, String(num)] }
        : state
    ),

  clearPin: () => set({ pinValue: [] }),

  backspacePin: () =>
    set((state) => ({ pinValue: state.pinValue.slice(0, -1) })),

  setSignupData: (data) => set({ signupData: data }),
}));
