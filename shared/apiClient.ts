// shared/apiClient.ts
import { API_BASE_URL } from './config';

// Prefer environment variable if defined, otherwise fallback to config
const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || API_BASE_URL.replace(/\/$/, '');

// Generic fetch function
export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = endpoint.startsWith('/') ? `${API_BASE}${endpoint}` : `${API_BASE}/${endpoint}`;

  const res = await fetch(url, {
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

// API types
import type { DemoResponse, AdminLoginRequest, AdminLoginResponse } from './api';

// Demo fetcher
export const getDemo = () => apiFetch<DemoResponse>('/api/demo');

// Admin login fetcher
export const adminLogin = (data: AdminLoginRequest) =>
  apiFetch<AdminLoginResponse>('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
