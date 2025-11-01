// Simple API configuration and helper functions
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export function getAuthToken(): string | null {
  const token = localStorage.getItem("auth-token");
  if (!token) return null;

  try {
    return JSON.parse(token);
  } catch {
    return null;
  }
}

export function getAuthHeaders(): HeadersInit {
  const token = getAuthToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}
