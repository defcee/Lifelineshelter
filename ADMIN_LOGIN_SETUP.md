# Admin Login Setup Guide

## Overview
This document outlines all the changes made to implement and fix the admin login functionality for LifeLine Shelter's Node.js backend on cPanel.

## Problems Identified & Fixed

### 1. **Missing Admin Login Endpoint**
- **Issue**: No `/api/admin/login` route existed in the backend
- **Solution**: Created `server/routes/auth.ts` with proper authentication handlers

### 2. **No Authentication Types**
- **Issue**: Frontend and backend couldn't communicate with proper types
- **Solution**: Added `AdminLoginRequest`, `AdminLoginResponse`, and `AdminDashboardResponse` types to `shared/api.ts`

### 3. **No Admin Login UI**
- **Issue**: No frontend page for admin login
- **Solution**: Created `client/pages/AdminLogin.tsx` with form and validation

### 4. **No Admin Dashboard**
- **Issue**: No authenticated dashboard page
- **Solution**: Created `client/pages/AdminDashboard.tsx` with token verification

### 5. **Routes Not Registered**
- **Issue**: Routes not added to React Router
- **Solution**: Updated `client/App.tsx` with `/admin/login` and `/admin/dashboard` routes

### 6. **Missing Environment Variables**
- **Issue**: Admin credentials not configured
- **Solution**: Updated `.env` with `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `ADMIN_EMAIL`

### 7. **Vite File Access Restriction**
- **Issue**: Vite dev server restricted file access causing 403 errors
- **Solution**: Updated `vite.config.ts` to allow root directory access

## Files Modified/Created

### Backend Files

#### `server/routes/auth.ts` (NEW)
- Implements `handleAdminLogin` - POST `/api/admin/login`
- Implements `handleAdminDashboard` - GET `/api/admin/dashboard`
- Uses environment variables for credentials
- Generates simple tokens (production should use JWT)

```typescript
export const handleAdminLogin: RequestHandler = (req, res) => {
  const { username, password } = req.body as AdminLoginRequest;
  // Validates credentials against ADMIN_USERNAME and ADMIN_PASSWORD
  // Returns token on success
};
```

#### `server/index.ts` (MODIFIED)
- Added import for auth handlers
- Registered `/api/admin/login` and `/api/admin/dashboard` routes

### Frontend Files

#### `client/pages/AdminLogin.tsx` (NEW)
- Login form with username and password fields
- POST to `/api/admin/login` with credentials
- Stores token in localStorage on success
- Redirects to dashboard on successful login
- Shows demo credentials and setup instructions

#### `client/pages/AdminDashboard.tsx` (NEW)
- Protected page that verifies authentication token
- Displays admin information and statistics
- Includes logout functionality
- Shows troubleshooting guide for cPanel deployment

#### `client/App.tsx` (MODIFIED)
- Added imports for `AdminLogin` and `AdminDashboard`
- Added routes:
  - `GET /admin/login` → AdminLogin component
  - `GET /admin/dashboard` → AdminDashboard component

### Shared Files

#### `shared/api.ts` (MODIFIED)
- Added `AdminLoginRequest` interface
- Added `AdminLoginResponse` interface
- Added `AdminDashboardResponse` interface

### Configuration Files

#### `.env` (MODIFIED)
```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
ADMIN_EMAIL=admin@lifelineshelter.com
PORT=3000
NODE_ENV=development
```

#### `vite.config.ts` (MODIFIED)
- Changed `fs.allow` from `["./client", "./shared"]` to `[".", "./client", "./shared"]`
- This allows Vite to serve `index.html` from root directory

## API Endpoints

### POST /api/admin/login
**Request:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "base64-encoded-token",
  "admin": {
    "username": "admin",
    "email": "admin@lifelineshelter.com"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid username or password"
}
```

### GET /api/admin/dashboard
**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "authenticated": true,
  "message": "Authenticated",
  "user": {
    "username": "admin"
  }
}
```

**Error Response (401):**
```json
{
  "authenticated": false,
  "message": "No authorization token provided"
}
```

## Deployment Instructions

### For cPanel Deployment

1. **Set Environment Variables:**
   - Go to cPanel → Node.js Manager
   - Set `ADMIN_USERNAME` to your desired username
   - Set `ADMIN_PASSWORD` to a strong password
   - Set `ADMIN_EMAIL` to your email

2. **Build the Application:**
   ```bash
   pnpm build
   ```

3. **Deploy dist/spa and dist/server:**
   - Upload `dist/spa` contents to cPanel public_html or subdirectory
   - Upload `dist/server/node-build.mjs` to Node.js app directory

4. **Configure .htaccess (if using Apache):**
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

5. **Verify Installation:**
   - Visit `https://lifelineshelter.com/admin/login`
   - Enter credentials set in environment variables
   - Should see admin dashboard with "Authenticated" status

### For Local Development

1. **Start Dev Server:**
   ```bash
   pnpm dev
   ```

2. **Access Admin Login:**
   - Open `http://localhost:8080/admin/login` (or 8081 if port in use)
   - Default credentials:
     - Username: `admin`
     - Password: `admin123`

3. **Test API Directly:**
   ```bash
   curl -X POST http://localhost:8080/api/admin/login \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"admin123"}'
   ```

## Security Considerations

### Current Implementation (Development)
- Simple Base64 token encoding
- Credentials from environment variables
- No HTTPS enforcement in code (should be handled by reverse proxy)

### Production Recommendations
1. **Replace token system with JWT:**
   ```bash
   npm install jsonwebtoken
   ```

2. **Use bcrypt for password hashing:**
   ```bash
   npm install bcrypt
   ```

3. **Implement rate limiting:**
   ```typescript
   import rateLimit from "express-rate-limit";
   
   const loginLimiter = rateLimit({
     windowMs: 15 * 60 * 1000,
     max: 5
   });
   
   app.post("/api/admin/login", loginLimiter, handleAdminLogin);
   ```

4. **Add HTTPS enforcement:**
   - Use cPanel SSL/TLS certificates
   - Add `Strict-Transport-Security` header

5. **Implement refresh tokens:**
   - Separate short-lived access tokens from long-lived refresh tokens
   - Store refresh tokens securely (HttpOnly cookies)

6. **Add CORS restrictions:**
   ```typescript
   app.use(cors({
     origin: "https://lifelineshelter.com",
     credentials: true
   }));
   ```

## Troubleshooting

### Login Page Shows 504 Error
- **Cause**: Vite file access restriction or server not running
- **Fix**: Ensure `vite.config.ts` has correct `fs.allow` settings
- **Fix**: Restart dev server with `pnpm dev`

### "API endpoint not found" Error
- **Cause**: Routes not registered in `server/index.ts`
- **Fix**: Verify auth routes are imported and registered

### "Invalid username or password"
- **Cause**: Wrong credentials or environment variables not set
- **Fix**: Check `.env` file for `ADMIN_USERNAME` and `ADMIN_PASSWORD`
- **Fix**: On cPanel, verify variables set in Node.js Manager

### Dashboard Shows "Authentication failed"
- **Cause**: Token not stored or corrupted
- **Fix**: Clear localStorage: `localStorage.clear()` in browser console
- **Fix**: Re-login to get new token

### CORS Errors in Browser
- **Cause**: Frontend and backend on different ports
- **Fix**: Ensure `/api/*` requests proxy to same origin
- **Fix**: Check `cors` middleware enabled in `server/index.ts`

## Testing Checklist

- [ ] Dev server starts without errors: `pnpm dev`
- [ ] Admin login page loads: `http://localhost:8080/admin/login`
- [ ] Can submit login form with correct credentials
- [ ] Redirects to dashboard on success
- [ ] Shows error message on failed login
- [ ] Token stored in localStorage after login
- [ ] Dashboard page loads and shows "Authenticated"
- [ ] Logout button removes token and redirects to login
- [ ] Cannot access dashboard without token
- [ ] Build completes without errors: `pnpm build`

## Next Steps

1. **Add database support** for user management:
   - Create users table
   - Hash passwords with bcrypt
   - Implement registration/user management

2. **Add role-based access control** (RBAC):
   - Admin, Editor, Viewer roles
   - Protected routes by role

3. **Implement audit logging**:
   - Log all admin actions
   - Track who changed what and when

4. **Add two-factor authentication** (2FA):
   - Implement TOTP/email verification
   - Require 2FA for admin accounts

5. **Create admin dashboard features**:
   - Manage donations
   - View analytics
   - Manage user accounts
   - Update crisis information
