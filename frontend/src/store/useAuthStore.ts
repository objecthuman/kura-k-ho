import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type User, type NewsPreferences } from "@/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  updatePreferences: (preferences: NewsPreferences) => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      updatePreferences: (preferences) =>
        set((state) => ({
          user: state.user ? { ...state.user, preferences } : null,
        })),
      setUser: (user) => set({ user }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
