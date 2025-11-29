/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Admin login request body
 */
export interface AdminLoginRequest {
  username: string;
  password: string;
}

/**
 * Admin login response
 */
export interface AdminLoginResponse {
  success: boolean;
  message: string;
  token?: string;
  admin?: {
    username: string;
    email?: string;
  };
}

/**
 * Admin dashboard data response
 */
export interface AdminDashboardResponse {
  authenticated: boolean;
  message: string;
  user?: {
    username: string;
  };
}
