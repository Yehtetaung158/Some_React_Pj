import { create } from "zustand";


const useTokentStore = create((set) => ({
    token: "",
    setToken: (token) => set({ token }),
    resetToken: () => set({ token: "" }),
}));

export default useTokentStore;