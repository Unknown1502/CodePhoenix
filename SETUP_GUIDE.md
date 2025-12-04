# CodePhoenix Setup Guide

Complete installation and deployment guide for CodePhoenix.

---

## 📋 Prerequisites

### Required
- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher (or yarn/pnpm)
- **Git**: For version control

### API Keys Required
- **OpenAI API Key**: For code transformation (GPT-4)
- **Anthropic API Key** (optional): For enhanced code analysis (Claude)

### Optional
- **Vercel Account**: For easy deployment
- **GitHub Account**: For repository export feature
- **Vercel Blob Storage**: For cloud file storage (alternative to local filesystem)

---

## 🚀 Quick Start (5 minutes)

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/codephoenix.git
cd codephoenix
```

### 2. Install Dependencies
```bash
npm install
```

This installs:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Monaco Editor
- OpenAI SDK
- And more...

### 3. Environment Setup

Copy the example environment file:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your API keys:
```bash
# Required
OPENAI_API_KEY=sk-your-openai-key-here

# Optional but recommended
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key-here

# Optional
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
GITHUB_TOKEN=ghp_your-github-token
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🔑 Getting API Keys

### OpenAI API Key (Required)

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Navigate to **API Keys** section
4. Click **Create new secret key**
5. Copy the key (starts with `sk-`)
6. Add to `.env.local` as `OPENAI_API_KEY=sk-...`

**Important**: You need GPT-4 API access. Check your account tier.

**Pricing**: ~$0.03 per transformation (1000 tokens)

### Anthropic API Key (Optional)

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up for access
3. Get your API key
4. Add to `.env.local` as `ANTHROPIC_API_KEY=sk-ant-...`

**Usage**: Enhanced code analysis (better business logic extraction)

### GitHub Personal Access Token (Optional)

1. Go to GitHub Settings → Developer Settings → Personal Access Tokens
2. Generate new token (classic)
3. Scopes needed:
   - `repo` (full control)
   - `workflow` (for CI/CD)
4. Add to `.env.local` as `GITHUB_TOKEN=ghp_...`

**Usage**: Export transformed code directly to GitHub

---

## 📦 Project Structure

```
CodePhoenix/
├── .kiro/                      # Kiro AI configuration ⭐
│   ├── specs/                  # Architecture specs
│   │   ├── architecture.md
│   │   └── features.md
│   ├── vibe/                   # Vibe coding instructions
│   │   └── coding-instructions.md
│   ├── steering/               # AI transformation rules
│   │   └── transformation-guide.md
│   ├── hooks/                  # Agent automation
│   │   └── agent-hooks.md
│   └── mcp/                    # Custom protocols
│       └── protocols.md
│
├── app/                        # Next.js app directory
│   ├── page.tsx                # Landing page
│   ├── layout.tsx              # Root layout
│   ├── globals.css             # Global styles
│   ├── analyze/
│   │   └── [sessionId]/
│   │       └── page.tsx        # Analysis results
│   ├── transform/
│   │   └── [sessionId]/
│   │       └── page.tsx        # Transformation UI
│   └── api/                    # API routes
│       ├── upload/
│       │   └── route.ts        # File upload handler
│       ├── analyze/
│       │   └── route.ts        # AI analysis
│       └── transform/
│           └── route.ts        # Code transformation
│
├── components/                 # React components
│   ├── PhoenixLogo.tsx         # Animated logo
│   ├── UploadZone.tsx          # Drag & drop
│   └── CodeViewer.tsx          # Monaco editor wrapper
│
├── public/                     # Static assets
├── uploads/                    # User uploaded files (gitignored)
│
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── tailwind.config.ts          # Tailwind config
├── next.config.js              # Next.js config
├── .env.local.example          # Example environment vars
├── .env.local                  # Your environment vars (gitignored)
└── README.md                   # Documentation
```

---

## 🛠️ Development

### Available Scripts

```bash
# Development server (with hot reload)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Type check
npx tsc --noEmit
```

### Development Workflow

1. **Make changes** to components/pages
2. **Hot reload** automatically updates browser
3. **Check console** for errors
4. **Test locally** at http://localhost:3000
5. **Commit changes** when ready

### Key Files to Edit

**Landing Page**: `app/page.tsx`  
**Upload Logic**: `app/api/upload/route.ts`  
**Analysis Logic**: `app/api/analyze/route.ts`  
**Transformation**: `app/api/transform/route.ts`  
**Styling**: `app/globals.css` and `tailwind.config.ts`  

---

## 🎨 Customization

### Change Colors

Edit `tailwind.config.ts`:

```typescript
phoenix: {
  500: '#f97316',  // Change main phoenix color
  600: '#ea580c',
  // ...
}
```

### Modify AI Prompts

Edit transformation prompts in `app/api/transform/route.ts`:

```typescript
const systemPrompt = `You are an expert code transformer...`
```

### Add New Languages

1. Add to `supportedLanguages` array
2. Update file extension detection
3. Add transformation rules in `.kiro/steering/`

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/codephoenix.git
git push -u origin main
```

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repo
   - Add environment variables:
     - `OPENAI_API_KEY`
     - `ANTHROPIC_API_KEY`
   - Click "Deploy"

3. **Done!** Your app is live at `https://your-project.vercel.app`

### Environment Variables in Vercel

Add in **Settings → Environment Variables**:
- `OPENAI_API_KEY` = `sk-...`
- `ANTHROPIC_API_KEY` = `sk-ant-...`
- `GITHUB_TOKEN` = `ghp_...` (optional)

### Custom Domain

In Vercel:
1. Go to **Settings → Domains**
2. Add your domain
3. Update DNS records as shown
4. Wait for propagation (5-30 minutes)

---

## 🐳 Docker Deployment

### Build Docker Image

```bash
# Build
docker build -t codephoenix .

# Run
docker run -p 3000:3000 \
  -e OPENAI_API_KEY=sk-... \
  -e ANTHROPIC_API_KEY=sk-ant-... \
  codephoenix
```

### Docker Compose

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
    volumes:
      - ./uploads:/app/uploads
```

Run with:
```bash
docker-compose up
```

---

## 🧪 Testing

### Test File Upload

1. Prepare test COBOL file (`test.cbl`)
2. Go to http://localhost:3000
3. Drag and drop file
4. Check analysis page loads
5. Verify AI analysis appears

### Test Transformation

1. Upload COBOL file
2. Click "Start Transformation"
3. Select target language (TypeScript)
4. Verify transformation completes
5. Check diff viewer shows results

### Test API Endpoints

```bash
# Test upload
curl -X POST http://localhost:3000/api/upload \
  -F "files=@test.cbl"

# Test analysis (replace SESSION_ID)
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"sessionId":"SESSION_ID"}'
```

---

## 🐛 Troubleshooting

### Issue: "Cannot find module 'next'"

**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: "OPENAI_API_KEY is not set"

**Solution**: Check `.env.local` file exists and has correct key.

### Issue: Upload fails

**Possible causes**:
1. File too large (>10MB)
2. Unsupported file type
3. Insufficient permissions for `uploads/` folder

**Solution**:
```bash
mkdir uploads
chmod 755 uploads
```

### Issue: Transformation fails

**Possible causes**:
1. Invalid OpenAI API key
2. Insufficient API credits
3. Network issues

**Check**:
```bash
# Test OpenAI API
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

### Issue: Monaco Editor not loading

**Solution**: Monaco requires client-side rendering. Ensure component uses `'use client'` directive.

---

## 📊 Monitoring

### Check Logs

**Development**:
```bash
# Console shows all logs
npm run dev
```

**Production (Vercel)**:
- Go to project dashboard
- Click **Functions** tab
- View logs for API routes

### Performance Monitoring

Add Vercel Analytics:
```bash
npm install @vercel/analytics
```

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## 🔐 Security Best Practices

### Never Commit Secrets
```bash
# .gitignore already includes:
.env.local
.env
uploads/
```

### Use Environment Variables
```typescript
// ✅ Good
const apiKey = process.env.OPENAI_API_KEY

// ❌ Bad
const apiKey = "sk-hardcoded-key"
```

### Validate File Uploads
```typescript
// Check file size
if (file.size > 10 * 1024 * 1024) {
  throw new Error('File too large');
}

// Check file type
const validExtensions = ['.cbl', '.cob', '.vb'];
if (!validExtensions.includes(ext)) {
  throw new Error('Invalid file type');
}
```

### Rate Limiting

Consider adding rate limiting for API routes:
```bash
npm install @upstash/ratelimit
```

---

## 📚 Additional Resources

### Documentation
- **Next.js**: https://nextjs.org/docs
- **React**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com/docs
- **OpenAI API**: https://platform.openai.com/docs
- **Framer Motion**: https://www.framer.com/motion

### Kiro AI
- **Kiro Docs**: https://kiro.dev/docs
- **Kiro Discord**: https://discord.gg/kiro
- **Kiroween**: https://kiroween.dev

### Support
- **GitHub Issues**: [Your repo]/issues
- **Email**: your.email@example.com
- **Twitter**: @yourhandle

---

## 🎯 Next Steps

After setup:

1. ✅ Test with sample COBOL file
2. ✅ Customize colors/branding
3. ✅ Add your own transformation rules
4. ✅ Deploy to Vercel
5. ✅ Share with the world!

---

## 🤝 Contributing

Want to improve CodePhoenix?

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📝 License

MIT License - See LICENSE file for details

---

**Need help?** Open an issue on GitHub or reach out on Twitter!

**Built with ❤️ and 🔥 using Kiro AI**
