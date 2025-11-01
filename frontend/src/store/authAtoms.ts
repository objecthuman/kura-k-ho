import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { type User, type NewsPreferences } from "@/types";

// Persisted atoms with localStorage
export const userAtom = atomWithStorage<User | null>("auth-user", null);
export const tokenAtom = atomWithStorage<string | null>("auth-token", null);

// Derived atom for authentication status
export const isAuthenticatedAtom = atom((get) => {
  const user = get(userAtom);
  const token = get(tokenAtom);
  return !!user && !!token;
});

// Write-only atoms for actions
export const loginAtom = atom(
  null,
  (get, set, { user, token }: { user: User; token: string }) => {
    set(userAtom, user);
    set(tokenAtom, token);
  }
);

export const logoutAtom = atom(null, (get, set) => {
  set(userAtom, null);
  set(tokenAtom, null);
});

export const updatePreferencesAtom = atom(
  null,
  (get, set, preferences: NewsPreferences) => {
    const currentUser = get(userAtom);
    if (currentUser) {
      set(userAtom, { ...currentUser, preferences });
    }
  }
);
