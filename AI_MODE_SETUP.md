# 🔑 Setting Up AI Mode

CodePhoenix works in **two modes**:

## 🎭 **Demo Mode** (Default)
- Uses mock data for instant transformations
- No API keys required
- Perfect for demos and testing
- **Currently Active** (no API key detected)

## 🤖 **AI Mode** (Optional)
- Uses real GPT-4 for intelligent transformations
- Analyzes actual code patterns
- Generates custom solutions
- Requires OpenAI API key

---

## 📝 How to Enable AI Mode

### 1. **Get OpenAI API Key**
   - Go to: https://platform.openai.com/api-keys
   - Create new secret key
   - Copy the key (starts with `sk-...`)

### 2. **Add to Vercel**
   1. Go to Vercel Dashboard → Your Project
   2. Click **Settings** → **Environment Variables**
   3. Add:
      - **Key**: `OPENAI_API_KEY`
      - **Value**: `sk-your-actual-key-here`
      - **Environment**: All (Production, Preview, Development)
   4. Click **Save**

### 3. **Redeploy**
   - Click **Deployments** tab
   - Click **⋯** on latest deployment
   - Click **Redeploy**
   - Wait ~2 minutes

### 4. **That's it!**
   - App automatically detects API key
   - AI mode activates automatically
   - Falls back to demo if AI fails

---

## 🎯 How It Works

```typescript
// Automatic detection in code:
const USE_REAL_AI = !!process.env.OPENAI_API_KEY

if (USE_REAL_AI) {
  // Use GPT-4 for transformation
  transformedCode = await transformWithAI(code, language)
} else {
  // Use mock data (demo mode)
  transformedCode = generateMockData(language)
}
```

**Smart Fallback**: If AI fails (rate limit, timeout, etc.), automatically falls back to demo mode.

---

## 💰 API Costs

**Typical usage**:
- ~1,500 tokens per transformation
- GPT-4 Turbo: $0.01 / 1K input tokens, $0.03 / 1K output tokens
- **Cost per transformation**: ~$0.05-$0.10

**For hackathon demo**:
- ~20 transformations = ~$2
- Free tier: $5 credit (enough for 50+ demos)

---

## 🚀 Best Practices

### For Demos/Hackathon:
✅ **Use Demo Mode** - Free, instant, reliable  
✅ Works offline  
✅ No rate limits  
✅ Consistent results  

### For Production:
✅ **Use AI Mode** - Real intelligence  
✅ Handles any code  
✅ Custom transformations  
✅ Learns from context  

---

## 🐛 Troubleshooting

**"Still using demo mode after adding API key"**
- Check: Did you redeploy after adding env var?
- Check: Is key correct? (starts with `sk-`)
- Check: All environments selected?

**"API calls failing"**
- Check: Do you have OpenAI credits?
- Check: Rate limits? (Wait 1 minute)
- App automatically falls back to demo mode

**"Want to force demo mode even with API key"**
- Remove `OPENAI_API_KEY` from environment variables
- Or add `useDemo: true` in API requests

---

## 📊 Mode Indicator

Response includes `mode` field:
```json
{
  "transformedCode": "...",
  "mode": "ai"  // or "demo"
}
```

Check this to confirm which mode was used!

---

**Current Status**: 🎭 **Demo Mode Active** (Perfect for hackathon submission!)

To enable AI mode, add `OPENAI_API_KEY` to Vercel environment variables.
