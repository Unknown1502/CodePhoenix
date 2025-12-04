# 🚀 DEPLOY NOW - 5 Minute Guide

## Step 1: Push to GitHub (2 minutes)

Open terminal in CodePhoenix directory:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "CodePhoenix - Kiroween 2025 Resurrection Category"

# Create main branch
git branch -M main

# Add your GitHub repo (create it first on github.com)
git remote add origin https://github.com/YOUR_USERNAME/codephoenix.git

# Push
git push -u origin main
```

**Create GitHub Repo**:
1. Go to github.com
2. Click "New repository"
3. Name: `codephoenix`
4. Description: "AI-powered legacy code resurrection platform - Kiroween 2025"
5. Public ✅
6. Don't initialize with README (we have one)
7. Create repository
8. Copy the URL and use it above

---

## Step 2: Deploy to Vercel (3 minutes)

### Option A: Vercel CLI (Fastest)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: codephoenix
# - Directory: ./
# - Override settings? No

# Add environment variables
vercel env add OPENAI_API_KEY
# Paste your OpenAI key when prompted

# Deploy to production
vercel --prod
```

### Option B: Vercel Dashboard (Easier)

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: Next.js ✅ (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
5. Add Environment Variables:
   - Name: `OPENAI_API_KEY`
   - Value: `sk-...` (your key)
   - (Optional) `ANTHROPIC_API_KEY`
6. Click "Deploy"

**Wait 2-3 minutes for build to complete**

---

## Step 3: Test Deployment (1 minute)

Your app will be live at: `https://codephoenix-xxx.vercel.app`

**Test Checklist**:
1. ✅ Landing page loads with phoenix animation
2. ✅ Upload test file (`test-samples/calculator.vb`)
3. ✅ Analysis completes
4. ✅ Transformation works
5. ✅ Diff viewer displays

**If something fails**:
- Check Vercel function logs
- Verify environment variables are set
- Check build logs for errors

---

## Step 4: Get Your URLs

You now have:
- ✅ **GitHub**: `https://github.com/YOUR_USERNAME/codephoenix`
- ✅ **Live Demo**: `https://codephoenix-xxx.vercel.app`

**Copy these URLs** - you'll need them for:
- Devpost submission
- Demo video description
- Blog post
- Social media

---

## Troubleshooting

### Build Fails
```bash
# Test build locally first
npm run build

# If it works locally but fails on Vercel:
# - Check Node.js version (should be 18+)
# - Verify all dependencies in package.json
# - Check Vercel build logs
```

### Environment Variables Not Working
1. Go to Vercel dashboard
2. Select your project
3. Settings → Environment Variables
4. Add/update variables
5. Redeploy (Deployments → ... → Redeploy)

### Upload Fails
- Check file size < 5MB
- Verify API route is deployed
- Check function logs in Vercel

### API Returns 500 Errors
- Verify `OPENAI_API_KEY` is set correctly
- Check API key has credits
- Review function logs

---

## Alternative: Netlify

If Vercel doesn't work:

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod

# Add environment variables in Netlify dashboard
```

---

## Next Steps

After deployment:
1. ✅ Test all features work
2. ✅ Copy live URL
3. ✅ Record demo video (show live site)
4. ✅ Submit to Devpost

---

## 🎉 You're Live!

**Deployment Complete**: ✅  
**Time Taken**: ~5 minutes  
**Status**: Production-ready  

**Your live demo**: `https://codephoenix-xxx.vercel.app`

Now record your demo video showing the live site! 🔥

---

**Need Help?**
- Vercel Docs: vercel.com/docs
- Vercel Support: vercel.com/support
- GitHub Issues: github.com/YOUR_USERNAME/codephoenix/issues
