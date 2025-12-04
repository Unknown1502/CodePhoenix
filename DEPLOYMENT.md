# 🚀 Deployment Guide - CodePhoenix

## Quick Deploy to Vercel (5 minutes)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit - CodePhoenix for Kiroween 2025"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/codephoenix.git
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables:
   - `OPENAI_API_KEY` = your OpenAI key
   - `ANTHROPIC_API_KEY` = your Anthropic key (optional)
5. Click "Deploy"

**Done!** Your app will be live at `https://codephoenix-xxx.vercel.app`

---

## Alternative: Deploy to Netlify

### Step 1: Build Settings
```bash
Build command: npm run build
Publish directory: .next
```

### Step 2: Environment Variables
Add in Netlify dashboard:
- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`

---

## Environment Variables Required

### Required
- `OPENAI_API_KEY` - Get from [platform.openai.com](https://platform.openai.com)

### Optional
- `ANTHROPIC_API_KEY` - Get from [console.anthropic.com](https://console.anthropic.com)
- `BLOB_READ_WRITE_TOKEN` - Vercel Blob storage (auto-configured on Vercel)

---

## Testing Deployment

After deployment, test these features:
1. ✅ Landing page loads with phoenix animation
2. ✅ Upload a test file (use `test-samples/calculator.vb`)
3. ✅ Analysis completes successfully
4. ✅ Transformation generates code
5. ✅ Diff viewer displays results

---

## Troubleshooting

### Build fails with "Module not found"
```bash
# Reinstall dependencies
npm install
npm run build
```

### API routes return 500 errors
- Check environment variables are set
- Verify API keys are valid
- Check Vercel function logs

### Upload fails
- Check file size < 5MB
- Verify supported file extensions (.cbl, .vb, .php, etc.)

---

## Production Checklist

- [x] MIT License added
- [x] Environment variables documented
- [x] .gitignore configured
- [x] README updated
- [x] Build succeeds locally
- [ ] Deployed to Vercel/Netlify
- [ ] Test upload works
- [ ] Test transformation works
- [ ] Demo video recorded
- [ ] Devpost submission complete

---

**Estimated deployment time**: 5-10 minutes

**Live demo required for hackathon submission!**
