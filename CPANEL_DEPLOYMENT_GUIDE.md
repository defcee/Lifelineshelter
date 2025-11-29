# cPanel Deployment Guide for LifeLine Shelter Admin Login

## Quick Start

This guide helps you deploy the admin login system to cPanel at `lifelineshelter.com`.

## Prerequisites

- cPanel account with Node.js support enabled
- SSH access to the server
- Domain already configured in cPanel

## Step-by-Step Deployment

### 1. Prepare Your Application

```bash
# From your local machine or development environment
cd /workspaces/LifeLine

# Build the application
pnpm install
pnpm build

# This creates:
# - dist/spa/    (frontend files)
# - dist/server/ (backend server)
```

### 2. Upload Files to cPanel

#### Option A: Using cPanel File Manager

1. Login to cPanel
2. Go to **File Manager**
3. Navigate to `public_html` folder
4. Upload files from `dist/spa/`:
   - `index.html`
   - `robots.txt`
   - `favicon.ico`
   - `assets/` folder

#### Option B: Using SFTP

```bash
# From your machine
sftp your-cpanel-user@lifelineshelter.com

# Connect to the server and upload
cd public_html
put -r dist/spa/* .
```

### 3. Set Up Node.js Application

1. **In cPanel, go to: Setup Node.js App**
   - Click "Create Application"
   - **Application Root**: `/home/username/public_html/server` (or your path)
   - **Application URL**: `lifelineshelter.com`
   - **Application Entry Point**: `node-build.mjs`
   - **Node Version**: 18+ (recommended)

2. **Create `/server/node-build.mjs`** by uploading `dist/server/node-build.mjs`

### 4. Configure Environment Variables

1. **In cPanel Node.js App Settings:**
   - Click on your app
   - Click "Edit"
   - Add Environment Variables:
     ```
     ADMIN_USERNAME = admin
     ADMIN_PASSWORD = your-secure-password-here
     ADMIN_EMAIL = admin@lifelineshelter.com
     PORT = 8080 (or assigned port)
     NODE_ENV = production
     ```

2. **Important**: Click "Save"

### 5. Configure .htaccess for Routing

Create or update `.htaccess` in `public_html`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Don't rewrite API calls - let Node.js handle them
  RewriteCond %{REQUEST_URI} ^/api/ [OR]
  RewriteCond %{REQUEST_URI} ^/health [OR]
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]
  
  # All other requests go to index.html (SPA routing)
  RewriteRule ^(.*)$ index.html [L]
</IfModule>

# Compress responses
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

### 6. Start the Node.js Application

1. **In cPanel Node.js App:**
   - Select your application
   - Click **"Start Application"** button
   - Wait 30 seconds for startup

2. **Check Status:**
   - Status should show: ✓ Running
   - If not running, check the logs

### 7. Verify Installation

#### Test in Browser

1. Visit: `https://lifelineshelter.com/admin/login`
2. You should see the login page
3. Try logging in with:
   - Username: `admin`
   - Password: (the password you set in step 4)

#### Test API Endpoint

```bash
# SSH into your cPanel server and run:
curl -X POST https://lifelineshelter.com/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"your-password"}'

# Should return:
# {"success":true,"message":"Login successful","token":"...","admin":{...}}
```

## Troubleshooting

### Issue: 404 Error on Admin Login Page

**Solution:**
1. Verify `index.html` is in `public_html`
2. Check `.htaccess` is correct
3. Restart Node.js application

### Issue: 503 Service Unavailable

**Solution:**
1. Check Node.js app status in cPanel
2. Verify environment variables are set
3. Check `/error_log` in cPanel for errors
4. Ensure Node version is 18+

### Issue: "Invalid username or password"

**Solution:**
1. Double-check username/password in cPanel environment variables
2. Restart Node.js application after changing variables
3. Clear browser cache and try again

### Issue: CORS Errors in Browser Console

**Solution:**
1. This typically means frontend and backend are on different ports
2. Ensure API calls are relative: `/api/admin/login` (not `http://localhost:8080/...`)
3. Verify your `.htaccess` properly forwards API calls to Node.js

### Issue: 504 Gateway Timeout

**Solution:**
1. Check Node.js app logs in cPanel: **Node.js Manager → Logs**
2. Ensure backend is responding: Try `/api/ping` endpoint
3. Check server resources (CPU, RAM)
4. Restart Node.js application

## Security Best Practices

### 1. Use HTTPS Only

- cPanel should auto-generate free SSL (via AutoSSL)
- Ensure all traffic is redirected to HTTPS

### 2. Change Default Credentials

After deployment, change the default `admin`/`admin123` credentials:

1. SSH into server
2. Edit `/home/username/.env`
3. Update `ADMIN_USERNAME` and `ADMIN_PASSWORD`
4. Restart Node.js app

### 3. Use Strong Password

- At least 16 characters
- Mix of uppercase, lowercase, numbers, special characters

### 4. Regular Backups

- Set up automated backups in cPanel
- Test backup restoration regularly

## File Structure on cPanel

```
public_html/
├── index.html
├── assets/
│   ├── index-XXXXX.css
│   ├── index-XXXXX.js
│   └── ...
├── favicon.ico
├── robots.txt
├── .htaccess
├── node_modules/
├── package.json
├── package-lock.json
└── server/
    └── node-build.mjs
```

## Environment Variables Reference

| Variable | Example | Description |
|----------|---------|-------------|
| `ADMIN_USERNAME` | `admin` | Username for admin login |
| `ADMIN_PASSWORD` | `SecurePass123!` | Password for admin login |
| `ADMIN_EMAIL` | `admin@lifelineshelter.com` | Admin email address |
| `PORT` | `8080` | Port for Node.js app (assigned by cPanel) |
| `NODE_ENV` | `production` | Environment mode |

## Monitoring

### Check Application Logs

1. **cPanel → Node.js Manager**
2. Select your application
3. Click **"Show Logs"**
4. Look for errors starting with `[ERROR]` or `[ERR]`

### Common Log Messages

```
✓ Application running on port 8080    → Good
🚀 Fusion Starter server running       → Server started
API endpoint not found                 → Incorrect route
Invalid username or password           → Wrong credentials
```

## Next Steps

After successful deployment:

1. **Test all admin features** in production
2. **Monitor logs** for any errors
3. **Set up automated backups**
4. **Create additional admin users** (future enhancement)
5. **Implement 2FA** (future enhancement)
6. **Set up logging/analytics** (future enhancement)

## Support

If you encounter issues:

1. Check cPanel error logs
2. Review the `ADMIN_LOGIN_SETUP.md` guide
3. Verify all environment variables are set correctly
4. Restart Node.js application
5. Clear browser cache and cookies

---

**Last Updated:** November 29, 2025
**Version:** 1.0
**Status:** Ready for Production
