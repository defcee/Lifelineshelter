# LifeLine Shelter - Humanitarian NGO Website

A modern, responsive website for LifeLine Shelter, a humanitarian organization providing relief and support to internally displaced persons (IDPs) affected by the crisis in Nigeria.

## Features

- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Modern UI/UX**: Beautiful, accessible components using Tailwind CSS
- **Multi-language Support**: Internationalization (i18n) support for multiple languages
- **Image Carousel**: Dynamic hero section with auto-rotating image carousel
- **Crisis Information**: Real-time statistics and affected regions overview
- **Program Showcase**: Detailed program cards with images and descriptions
- **Impact Stories**: Testimonials and success stories from beneficiaries
- **Donation Integration**: Support for donations through integrated payment systems
- **Contact Forms**: Easy-to-use contact and support request forms

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Internationalization**: Custom i18n implementation
- **Build Tool**: Vite
- **Node Version**: 18+

## Local Development

### Prerequisites

- Node.js 18 or higher
- npm or pnpm package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/lifelineshelter.git
   cd lifelineshelter
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   # or
   pnpm dev
   ```

   The application will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   # or
   pnpm build
   ```

## Deployment Guide: cPanel (lifelineshelter.com)

This guide walks you through deploying the LifeLine Shelter website to cPanel for the domain **lifelineshelter.com**.

### Prerequisites

- cPanel account with SSH access enabled
- Node.js support on your hosting (or ability to use Node.js in production)
- Domain lifelineshelter.com pointed to your cPanel server
- Local build ready (run `npm run build` before deploying)

### Step 1: Prepare Your Local Build

1. On your local machine, build the production version:

   ```bash
   npm run build
   ```

2. This creates a `dist` folder with all compiled static files.

### Step 2: Connect to cPanel via SSH

1. Open your terminal/command prompt
2. Connect to your cPanel server:

   ```bash
   ssh yourusername@lifelineshelter.com
   ```

   Or if using a specific port:

   ```bash
   ssh -p 22 yourusername@lifelineshelter.com
   ```

3. Enter your cPanel password when prompted

### Step 3: Navigate to Your Public HTML Directory

1. Once connected, navigate to the public_html folder:

   ```bash
   cd public_html
   ```

2. Check if you have an existing public_html folder:
   ```bash
   ls -la
   ```

### Step 4: Upload Your Files to cPanel

#### Option A: Using SCP (Secure Copy)

From your local terminal (NOT connected to SSH):

```bash
# Navigate to your project's dist folder
cd path/to/lifelineshelter/dist

# Copy all files to cPanel
scp -r * yourusername@lifelineshelter.com:~/public_html/
```

#### Option B: Using cPanel File Manager

1. Log in to cPanel at `https://lifelineshelter.com:2083/`
2. Go to **File Manager**
3. Navigate to `public_html`
4. Click **Upload** and upload the contents of your `dist` folder
5. Wait for upload to complete

#### Option C: Using FTP

1. Connect via FTP client (FileZilla, WinSCP, etc.)
2. Use credentials:
   - Host: `lifelineshelter.com`
   - Username: Your cPanel username
   - Password: Your cPanel password
   - Port: 21 (FTP) or 990 (SFTP recommended)
3. Navigate to `/public_html/`
4. Upload all files from the `dist` folder

### Step 5: Configure .htaccess for React Router

React Router requires proper server configuration for client-side routing to work correctly.

1. Via SSH, create/edit `.htaccess` in `public_html`:

   ```bash
   nano public_html/.htaccess
   ```

2. Paste the following configuration:

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

3. Save the file (Ctrl+X, then Y, then Enter in nano)

4. Set proper permissions:
   ```bash
   chmod 644 public_html/.htaccess
   ```

### Step 6: Set File Permissions

Set correct permissions for your files:

```bash
# Navigate to public_html
cd ~/public_html

# Set folder permissions to 755
find . -type d -exec chmod 755 {} \;

# Set file permissions to 644
find . -type f -exec chmod 644 {} \;
```

### Step 7: Configure SSL/HTTPS

1. Log in to cPanel
2. Go to **AutoSSL** or **SSL/TLS**
3. Install a free SSL certificate for lifelineshelter.com
4. This is usually automatic with cPanel

### Step 8: Verify Your Deployment

1. Open your browser
2. Visit `https://lifelineshelter.com`
3. Check that:
   - The website loads correctly
   - Images display properly
   - Navigation works (try clicking different pages)
   - Responsive design works on mobile devices

### Step 9: Set Up Environment Variables (If Needed)

If your application requires environment variables:

1. Create a `.env.production` file in your project root
2. Add necessary variables (API keys, endpoints, etc.)
3. Rebuild: `npm run build`
4. Redeploy the dist folder

**Important**: Never commit sensitive credentials. Use environment variables for sensitive data.

### Step 10: Enable Gzip Compression (Optional but Recommended)

For better performance, enable gzip compression:

1. In cPanel, go to **Optimize Website**
2. Enable **Gzip Compression**
3. Or add to `.htaccess`:
   ```apache
   <IfModule mod_deflate.c>
     AddOutputFilterByType DEFLATE text/html
     AddOutputFilterByType DEFLATE text/plain
     AddOutputFilterByType DEFLATE text/xml
     AddOutputFilterByType DEFLATE text/css
     AddOutputFilterByType DEFLATE text/javascript
     AddOutputFilterByType DEFLATE application/javascript
     AddOutputFilterByType DEFLATE application/x-javascript
   </IfModule>
   ```

## Deployment Troubleshooting

### Issue: Blank page after deployment

**Solution**:

- Check browser console for errors (F12)
- Verify `.htaccess` is properly configured
- Clear browser cache (Ctrl+Shift+Delete)
- Check that all files were uploaded correctly

### Issue: CSS/Images not loading

**Solution**:

- Ensure file permissions are correct (644 for files, 755 for folders)
- Check that paths in the built files are correct
- Verify domain is properly configured in cPanel

### Issue: 404 errors on navigation

**Solution**:

- This typically means `.htaccess` routing isn't working
- Verify `.htaccess` file exists in `public_html`
- Check that `mod_rewrite` is enabled on your hosting
- Contact your hosting provider if needed

### Issue: Slow loading times

**Solution**:

- Enable Gzip compression (see Step 10)
- Optimize images before deployment
- Enable caching via `.htaccess`
- Use a CDN if available through cPanel

## Post-Deployment Maintenance

### Regular Updates

1. Make changes locally
2. Test thoroughly
3. Build: `npm run build`
4. Upload new dist files
5. Clear browser cache

### Monitoring

- Monitor error logs via cPanel's Error Log
- Check website uptime regularly
- Monitor bandwidth usage
- Update content as needed

### Backups

1. In cPanel, use **Backup** to create regular backups
2. Download backups to your local machine
3. Keep version control (Git) for code backups

## Development Workflow

### Recommended Git Workflow

```bash
# Create a feature branch
git checkout -b feature/my-feature

# Make changes
git add .
git commit -m "Add my feature"

# Push to repository
git push origin feature/my-feature

# Create pull request and merge to main
# After merge, deploy to cPanel
```

## Performance Optimization Tips

1. **Image Optimization**: Compress images before uploading
2. **Code Splitting**: The app already uses lazy loading
3. **Caching**: Configure browser caching headers
4. **CDN**: Consider using Cloudflare for better performance
5. **Minification**: Vite automatically minifies in production

## Security Considerations

1. **HTTPS**: Always use HTTPS (already set in Step 7)
2. **Sensitive Data**: Never commit API keys or passwords
3. **Dependencies**: Keep npm packages updated
   ```bash
   npm audit
   npm update
   ```
4. **File Permissions**: Ensure proper permissions (see Step 6)
5. **Regular Backups**: Backup site regularly via cPanel

## Contact & Support

For issues with:

- **Website content**: Contact the LifeLine Shelter team
- **Hosting/cPanel**: Contact your hosting provider
- **Development**: Refer to the project documentation or create an issue

## Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [cPanel Documentation](https://docs.cpanel.net/)
- [Apache mod_rewrite Guide](https://httpd.apache.org/docs/current/mod/mod_rewrite.html)

## License

This project is developed for LifeLine Shelter humanitarian organization.

---

**Last Updated**: 2024

For the latest deployment procedures, always refer to your hosting provider's documentation.
