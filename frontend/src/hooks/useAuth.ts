import { useMutation } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { loginAtom, updatePreferencesAtom } from "@/store/authAtoms";
import { API_BASE_URL, getAuthHeaders } from "@/lib/api";
import type { User, NewsPreferences } from "@/types";

interface LoginRequest {
  email: string;
  password: string;
}

interface SignupRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  message: string;
  user: any;
  session?: {
    access_token: string;
    refresh_token: string;
    user?: any;
  };
  access_token?: string;
}

export function useLogin() {
  const login = useSetAtom(loginAtom);

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Login failed");
      }

      return response.json() as Promise<AuthResponse>;
    },
    onSuccess: (data) => {
      if (data.access_token && data.user) {
        login({ user: data.user, token: data.access_token });
      }
    },
  });
}

export function useSignup() {
  const login = useSetAtom(loginAtom);

  return useMutation({
    mutationFn: async (data: SignupRequest) => {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Signup failed");
      }

      return response.json() as Promise<AuthResponse>;
    },
    onSuccess: (data) => {
      if (data.user && data.session?.access_token) {
        login({ user: data.user, token: data.session.access_token });
      }
    },
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      return response.json();
    },
  });
}

export function useUpdatePreferences() {
  const updatePreferences = useSetAtom(updatePreferencesAtom);

  return useMutation({
    mutationFn: async (preferences: NewsPreferences) => {
      const response = await fetch(`${API_BASE_URL}/auth/preferences`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(preferences),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update preferences");
      }

      return response.json() as Promise<{ success: boolean; data: User }>;
    },
    onSuccess: (data) => {
      if (data.success && data.data?.preferences) {
        updatePreferences(data.data.preferences);
      }
    },
  });
}
