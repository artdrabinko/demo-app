# Deployment Guide - Social Support Portal

## 🚀 Deploying to Railway

Railway is the recommended platform for deploying this SPA (Single Page Application).

### Prerequisites

1. **GitHub Account** - Push your code to GitHub
2. **Railway Account** - Sign up at [railway.app](https://railway.app)
3. **OpenAI API Key** - Get from [platform.openai.com](https://platform.openai.com)

### Step-by-Step Deployment

#### 1. Prepare Your Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Social Support Portal"

# Create GitHub repository and push
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

#### 2. Deploy to Railway

1. **Go to Railway**
   - Visit [railway.app](https://railway.app)
   - Click "Login" and authenticate with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Environment Variables**
   - In the Railway dashboard, click on your service
   - Go to "Variables" tab
   - Add the following variables:

   ```
   VITE_OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
   VITE_OPENAI_API_URL=https://api.openai.com/v1/chat/completions
   VITE_APP_NAME=Social Support Portal
   ```

4. **Configure Build Settings** (Optional - Railway auto-detects)
   - Railway will automatically detect `railway.json` and `nixpacks.toml`
   - Build command: `pnpm install && pnpm build`
   - Start command: `pnpm preview --host 0.0.0.0 --port $PORT`

5. **Deploy**
   - Railway will automatically build and deploy
   - Wait for deployment to complete (2-3 minutes)
   - Click on the generated URL to access your app

#### 3. Custom Domain (Optional)

1. In Railway dashboard, go to "Settings"
2. Click "Generate Domain" for a railway.app subdomain
3. Or add your custom domain in "Custom Domain" section

### Deployment Configuration Files

The following files are included for Railway deployment:

1. **`railway.json`** - Railway configuration
   ```json
   {
     "build": {
       "builder": "NIXPACKS",
       "buildCommand": "pnpm install && pnpm build"
     },
     "deploy": {
       "startCommand": "pnpm preview --host 0.0.0.0 --port $PORT"
     }
   }
   ```

2. **`nixpacks.toml`** - Nixpacks build configuration
   - Specifies Node.js 20 and pnpm
   - Defines install, build, and start phases

3. **`.env.example`** - Example environment variables
   - Copy to `.env` for local development
   - Reference for Railway environment variables

### Environment Variables Required

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_OPENAI_API_KEY` | Your OpenAI API key | `sk-proj-...` |
| `VITE_OPENAI_API_URL` | OpenAI API endpoint | `https://api.openai.com/v1/chat/completions` |
| `VITE_APP_NAME` | Application name | `Social Support Portal` |

### Post-Deployment Checklist

- [ ] Application loads successfully
- [ ] All 3 form steps are working
- [ ] Language switcher (EN/AR) works
- [ ] AI "Help Me Write" buttons work
- [ ] Form validation shows errors
- [ ] Form submission works
- [ ] Auto-save is working
- [ ] Mobile responsive design works

### Troubleshooting Railway Deployment

#### Build Fails
- Check build logs in Railway dashboard
- Verify all dependencies are in `package.json`
- Ensure `pnpm` is available

#### Environment Variables Not Working
- Ensure variables start with `VITE_` prefix
- Rebuild the application after adding variables
- Check Railway variables tab for typos

#### OpenAI API Not Working
- Verify API key is correct
- Check if API key has sufficient credits
- Test API key locally first

#### Port Issues
- Railway automatically provides `$PORT` variable
- Preview command uses `--port $PORT` flag
- Don't hardcode port numbers

### Alternative: Deploy to Vercel

If you prefer Vercel:

1. **Install Vercel CLI**
   ```bash
   pnpm add -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set Environment Variables**
   ```bash
   vercel env add VITE_OPENAI_API_KEY
   vercel env add VITE_OPENAI_API_URL
   vercel env add VITE_APP_NAME
   ```

4. **Production Deploy**
   ```bash
   vercel --prod
   ```

### Alternative: Deploy to Netlify

1. **Install Netlify CLI**
   ```bash
   pnpm add -g netlify-cli
   ```

2. **Build the app**
   ```bash
   pnpm build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod --dir=dist
   ```

4. **Set Environment Variables**
   - Go to Netlify dashboard
   - Site settings → Environment variables
   - Add your variables

### Performance Optimization

For production, consider:

1. **Code Splitting**
   - Lazy load routes
   - Dynamic imports for heavy components

2. **Image Optimization**
   - Compress images
   - Use modern formats (WebP)

3. **Caching**
   - Configure headers for static assets
   - Use service workers

4. **CDN**
   - Railway/Vercel/Netlify provide global CDN
   - Assets served from edge locations

### Monitoring

After deployment:

1. **Check Railway Logs**
   - Monitor application logs
   - Watch for errors

2. **Test All Features**
   - Form validation
   - AI assistance
   - Language switching
   - Mobile responsiveness

3. **Performance**
   - Use Lighthouse for audits
   - Check loading times
   - Test on different devices

### Security Considerations

⚠️ **Important**: 
- Never commit `.env` file to git
- Use `.env.example` for documentation
- Rotate API keys regularly
- Monitor API usage and costs

### Support

For deployment issues:
- Railway: [docs.railway.app](https://docs.railway.app)
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Netlify: [docs.netlify.com](https://docs.netlify.com)

---

**Status**: ✅ Ready for Railway Deployment  
**Build**: ✅ Production build successful  
**Size**: 513 KB (gzipped: 169 KB)
