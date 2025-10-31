import { apiService } from "./api";
import type { User, NewsPreferences, ApiResponse } from "@/types";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    return apiService.post<AuthResponse>("/auth/login", credentials);
  },

  async signup(data: SignupRequest): Promise<ApiResponse<AuthResponse>> {
    return apiService.post<AuthResponse>("/auth/signup", data);
  },

  async logout(): Promise<ApiResponse<void>> {
    return apiService.post<void>("/auth/logout");
  },

  async updatePreferences(
    preferences: NewsPreferences,
  ): Promise<ApiResponse<User>> {
    return apiService.put<User>("/auth/preferences", preferences);
  },

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return apiService.get<User>("/auth/me");
  },
};
