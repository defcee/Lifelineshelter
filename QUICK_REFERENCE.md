# Quick Reference - Admin Login

## 🚀 Quick Start (5 minutes)

### Local Development
```bash
cd /workspaces/LifeLine
pnpm dev
# Visit: http://localhost:8080/admin/login
# Credentials: admin / admin123
```

### Build for Production
```bash
pnpm build
# Output: dist/spa/ and dist/server/node-build.mjs
```

## 📍 Key URLs

| URL | Purpose |
|-----|---------|
| `/admin/login` | Admin login page |
| `/api/admin/login` | Login API endpoint |
| `/admin/dashboard` | Admin dashboard (protected) |
| `/api/admin/dashboard` | Dashboard API endpoint |

## 🔑 Default Credentials (Development)

| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `admin123` |
| Email | `admin@lifelineshelter.com` |

> **⚠️ IMPORTANT**: Change these in `.env` before production deployment!

## 📋 API Endpoints

### POST /api/admin/login
```bash
curl -X POST http://localhost:8080/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

**Success Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "base64-encoded-token",
  "admin": {"username": "admin", "email": "admin@lifelineshelter.com"}
}
```

### GET /api/admin/dashboard
```bash
TOKEN="your-token-here"
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8080/api/admin/dashboard
```

## 📁 Important Files

| File | Purpose |
|------|---------|
| `server/routes/auth.ts` | Authentication logic |
| `client/pages/AdminLogin.tsx` | Login form UI |
| `client/pages/AdminDashboard.tsx` | Dashboard UI |
| `.env` | Configuration & credentials |
| `shared/api.ts` | TypeScript interfaces |

## ⚙️ Configuration

### Environment Variables (.env)
```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
ADMIN_EMAIL=admin@lifelineshelter.com
PORT=3000
NODE_ENV=development
```

### For cPanel Production
Set these in **cPanel → Node.js Manager → Environment Variables**

## 🔍 Troubleshooting

| Problem | Solution |
|---------|----------|
| 404 Admin Login Page | Ensure routes in `App.tsx` are updated |
| 503 Backend Error | Check `.env` variables are set |
| "Invalid credentials" | Verify username/password in `.env` |
| CORS Errors | Check backend is running on same port |
| Vite 403 Error | Restart dev server: `pnpm dev` |

## 📦 Project Structure

```
server/
├── index.ts (API routes)
└── routes/
    └── auth.ts ← NEW

client/
├── pages/
│   ├── AdminLogin.tsx ← NEW
│   └── AdminDashboard.tsx ← NEW
├── App.tsx (updated)
└── ...

shared/
└── api.ts (updated)

.env (updated)
```

## ✨ Features

- ✅ Simple admin login form
- ✅ Token-based authentication
- ✅ Protected dashboard page
- ✅ Logout functionality
- ✅ Error handling
- ✅ Environment variable configuration
- ✅ Type-safe API contracts

## 📚 Documentation

- **`ADMIN_LOGIN_SETUP.md`** - Detailed technical guide
- **`CPANEL_DEPLOYMENT_GUIDE.md`** - cPanel deployment steps
- **`IMPLEMENTATION_SUMMARY.md`** - Overview of all changes

## 🎯 Next Steps

1. **Test Locally** - Run `pnpm dev` and test login
2. **Deploy** - Follow `CPANEL_DEPLOYMENT_GUIDE.md`
3. **Configure** - Set environment variables in cPanel
4. **Verify** - Test login on production
5. **Enhance** - Add JWT, password hashing, 2FA

## 🔐 Security Checklist

Before production:
- [ ] Change `ADMIN_PASSWORD` to strong password
- [ ] Update `ADMIN_USERNAME` (optional)
- [ ] Enable HTTPS via cPanel SSL
- [ ] Implement JWT (recommended)
- [ ] Add password hashing (recommended)
- [ ] Set `NODE_ENV=production`
- [ ] Enable rate limiting (future)
- [ ] Set up audit logging (future)

## 📞 Support

**Dev Issues:**
- Check terminal for error messages
- Run `pnpm typecheck` to verify TypeScript
- Check browser console for frontend errors

**Production Issues:**
- Check cPanel Node.js logs
- Verify environment variables in cPanel
- Restart Node.js application
- Check `.htaccess` routing

## 🎓 Learn More

- **Express.js**: https://expressjs.com
- **React Router**: https://reactrouter.com
- **cPanel Docs**: https://docs.cpanel.net
- **TypeScript**: https://www.typescriptlang.org

---

**Version:** 1.0  
**Last Updated:** November 29, 2025  
**Status:** ✅ Ready
