// shared/apiClient.ts

import { API_BASE_URL } from './config';

// Use Render API URL by default
// Only use VITE_API_URL if it's a valid absolute URL (starts with http)
const rawBase = import.meta.env.VITE_API_URL || '';
const isValidAbsoluteUrl = rawBase && rawBase.startsWith('http');
const API_BASE = isValidAbsoluteUrl && !rawBase.includes('undefined')
  ? rawBase.replace(/\/$/, '') // Remove trailing slash if present
  : API_BASE_URL.replace(/\/$/, ''); // Default to Render API URL from config

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
export const getDemo = () => apiFetch<DemoResponse>("/demo");

// Export login fetcher
export const adminLogin = (data: AdminLoginRequest) =>
  apiFetch<AdminLoginResponse>("/admin/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
