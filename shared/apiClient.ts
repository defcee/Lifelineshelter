// shared/apiClient.ts

import { API_BASE_URL } from './config';

// Use relative paths for same-origin requests (production)
// For development with separate backend, set VITE_API_URL environment variable
const rawBase = import.meta.env.VITE_API_URL || '';
// Sanitize API_BASE: if it contains "undefined" or is not a valid URL/path, use config fallback
const API_BASE = rawBase && !rawBase.includes('undefined') && rawBase !== 'undefined'
  ? rawBase.replace(/\/$/, '') // Remove trailing slash if present
  : API_BASE_URL.replace(/\/$/, ''); // Fallback to Render API URL from config

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
