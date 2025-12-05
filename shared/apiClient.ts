// shared/apiClient.ts

const API_BASE = import.meta.env.VITE_API_URL;

// Export apiFetch
export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API request failed: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

// Import API types
import type { DemoResponse, AdminLoginRequest, AdminLoginResponse } from "./api";

// Export demo fetcher
export const getDemo = () => apiFetch<DemoResponse>("/api/demo");

// Export login fetcher
export const adminLogin = (data: AdminLoginRequest) =>
  apiFetch<AdminLoginResponse>("/api/admin/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
