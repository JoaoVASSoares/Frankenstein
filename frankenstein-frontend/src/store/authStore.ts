// store/authStore.ts
import { create } from "zustand";
import { IAuthState } from "../core/Interfaces";

export const useAuthStore = create<IAuthState>(set => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  rememberMe: false,

  setUser: user => set({ user, isAuthenticated: true }),
  setRememberMe: remember => set({ rememberMe: remember }),

  logout: () => {
    set({ user: null, isAuthenticated: false, isLoading: false });
    localStorage.removeItem("remember");
  },

  fetchUser: async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/authentication/verify", {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Token inválido");

      const user = await res.json();

      set({ user, isAuthenticated: true, isLoading: false });
    } catch {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));
