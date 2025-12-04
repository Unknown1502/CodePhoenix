# 🎬 Record Demo Video NOW - 2 Hour Guide

**Target**: 3-minute professional demo video  
**Tools**: OBS Studio (free) or built-in screen recorder  
**Script**: See `DEMO_VIDEO_SCRIPT.md`

---

## Quick Setup (15 minutes)

### Option A: OBS Studio (Best Quality)

1. **Download**: obsproject.com
2. **Install** and open OBS
3. **Add Source**:
   - Click "+" under Sources
   - Select "Display Capture" (full screen) or "Window Capture" (browser only)
   - Select your browser window
4. **Audio**:
   - Add "Audio Input Capture" for microphone
   - Test levels (speak, watch meter)
5. **Settings**:
   - Output → Recording Quality: High Quality
   - Video → Base Resolution: 1920x1080
   - Video → FPS: 60
6. **Test Recording**:
   - Click "Start Recording"
   - Do a 10-second test
   - Click "Stop Recording"
   - Check video quality

### Option B: Built-in Screen Recorder (Fastest)

**Windows**:
- Press `Win + G` (Xbox Game Bar)
- Click record button
- Or use: `Win + Alt + R` to start/stop

**Mac**:
- Press `Cmd + Shift + 5`
- Select "Record Entire Screen" or "Record Selected Window"
- Click record

---

## Recording Plan (1 hour)

### Preparation (15 minutes)

1. **Clean Browser**:
   - Close all tabs except CodePhoenix
   - Clear bookmarks bar
   - Use incognito/private mode
   - Zoom to 100%

2. **Prepare Test Data**:
   - Have `test-samples/inventory.cbl` ready
   - Pre-test upload flow
   - Know exactly what to click

3. **Script**:
   - Read `DEMO_VIDEO_SCRIPT.md`
   - Practice narration once
   - Time yourself (should be ~2:30-2:50)

4. **VS Code**:
   - Open `.kiro/` directory
   - Have files ready to show briefly

### Recording (30 minutes)

**Record in segments** (easier to edit):

#### Segment 1: Intro (0:00-0:30)
- Show statistics slide (create in PowerPoint/Canva)
- Or use text overlay in editing
- Narrate the problem

#### Segment 2: Landing Page (0:30-0:50)
- Show CodePhoenix landing page
- Phoenix animation
- Briefly show `.kiro/` directory in VS Code (1 second)
- Narrate solution

#### Segment 3: Upload (0:50-1:05)
- Drag `inventory.cbl` to upload zone
- Show upload animation
- Redirect to analysis

#### Segment 4: Analysis (1:05-1:30)
- Show analysis results
- Briefly flash `.kiro/mcp/cobol-parser.json` (1 second)
- Highlight key metrics

#### Segment 5: Transformation (1:30-2:00)
- Click "Transform"
- Select TypeScript
- Briefly flash `.kiro/steering/transformation-guide.md` (1 second)
- Show transformation progress
- Show diff viewer

#### Segment 6: Results (2:00-2:20)
- Scroll through diff viewer
- Show metrics
- Highlight improvements

#### Segment 7: Export (2:20-2:35)
- Show migration roadmap
- Show ROI calculator
- Click export options

#### Segment 8: Outro (2:35-3:00)
- Show impact statistics
- Show logo
- Show URLs

### Tips for Recording

- **Speak clearly** and at moderate pace
- **Pause between segments** (easier to edit)
- **Don't worry about mistakes** - you'll edit
- **Record multiple takes** of each segment
- **Keep cursor movements smooth**
- **Highlight important elements** with cursor

---

## Editing (30 minutes)

### Option A: DaVinci Resolve (Free, Professional)

1. **Download**: blackmagicdesign.com/products/davinciresolve
2. **Import clips**: Drag all segments to media pool
3. **Arrange timeline**: Drag clips in order
4. **Cut/trim**: Use blade tool (B) to cut, delete unwanted parts
5. **Add text overlays**:
   - Effects → Titles → Basic Title
   - Drag to timeline
   - Edit text in inspector
6. **Add transitions**:
   - Effects → Video Transitions → Cross Dissolve
   - Drag between clips
7. **Export**:
   - Deliver → YouTube 1080p preset
   - Render

### Option B: Online Editor (Fastest)

**Kapwing** (kapwing.com):
1. Upload all clips
2. Arrange in timeline
3. Add text overlays
4. Trim clips
5. Export as MP4

**Clipchamp** (clipchamp.com):
- Similar to Kapwing
- Built into Windows 11

### Editing Checklist

- [ ] All segments in correct order
- [ ] Smooth transitions between clips
- [ ] Text overlays for key points:
  - "$85B TECHNICAL DEBT"
  - "COBOL → TypeScript"
  - "50% FEWER LINES"
  - "Built with Kiro AI"
- [ ] Cursor movements smooth
- [ ] Audio clear throughout
- [ ] Total length: 2:45-3:00
- [ ] No dead air or long pauses

---

## Narration Script (Read This)

**Intro (0:00-0:30)**:
> "Every enterprise has a secret. Beneath their modern websites runs code from the 1970s. COBOL. Visual Basic 6. Fortran. 85 billion dollars in technical debt. And the developers who understand it? They're retiring. Fast."

**Solution (0:30-0:50)**:
> "Introducing CodePhoenix. AI-powered legacy code resurrection. Built entirely with Kiro AI using all 5 features: Specs, Vibe Coding, Steering, Agent Hooks, and MCP Servers. Transform 50-year-old code into modern applications. In minutes, not months."

**Upload (0:50-1:05)**:
> "Step one: Upload your legacy code. COBOL, VB6, Fortran, PHP... if it's ancient, we support it."

**Analysis (1:05-1:30)**:
> "Our AI deeply analyzes your code using custom MCP servers. Business logic. Dependencies. Security vulnerabilities. Complexity. Everything you need to understand what you're dealing with."

**Transformation (1:30-2:00)**:
> "Choose your target language. Kiro's steering rules guide the transformation. TypeScript. React. Python. Next.js. Watch as decades-old COBOL transforms into modern, idiomatic code. Same business logic. Modern architecture."

**Results (2:00-2:20)**:
> "Compare side-by-side. See exactly how your legacy code becomes modern. 50% fewer lines. 70% less complex. Infinitely more maintainable."

**Export (2:20-2:35)**:
> "Get a complete migration roadmap. Timeline. Resources. ROI. Export as ZIP or push directly to GitHub. Complete with Docker configuration, tests, and CI/CD pipeline. Production-ready. Day one."

**Outro (2:35-3:00)**:
> "CodePhoenix. Rise from the ashes. Transform legacy code in hours, not months. Save millions. Move faster. Build better. The future is here. Visit codephoenix dot vercel dot app. Built with Kiro AI for Kiroween 2025."

---

## Upload to YouTube (15 minutes)

1. **Go to**: youtube.com/upload
2. **Upload video**
3. **Title**: "CodePhoenix - AI Legacy Code Resurrection | Kiroween 2025"
4. **Description**:
```
🔥 CodePhoenix - AI-powered legacy code resurrection platform

Transform 50-year-old COBOL, VB6, and Fortran code into modern TypeScript, React, and Python applications with AI.

⚡ Features:
• AI Code Analysis
• Multi-Language Transformation
• Interactive Diff Viewer
• Migration Roadmap Generator
• ROI Calculator
• GitHub Export

🏆 Built for Kiroween 2025 Hackathon
Category: Resurrection
Built with: Kiro AI (all 5 features)

🔗 Links:
• Live Demo: https://codephoenix-xxx.vercel.app
• GitHub: https://github.com/YOUR_USERNAME/codephoenix
• Blog Post: [coming soon]

💰 Business Impact:
• $85B technical debt market
• 85% faster migration
• $500K+ saved per project

#CodePhoenix #Kiroween #AI #LegacyCode #COBOL
```

5. **Thumbnail**: Upload phoenix logo or screenshot
6. **Visibility**: PUBLIC ✅
7. **Publish**

---

## Alternative: Quick & Dirty Version (30 minutes)

If you're short on time:

1. **Record in one take** (no editing)
2. **Use Loom** (loom.com):
   - Free screen + webcam recording
   - Automatic upload
   - Shareable link
3. **Script**: Just hit the key points
4. **Length**: Aim for 2:30-2:50
5. **Upload**: Loom gives you instant link

---

## Checklist Before Uploading

- [ ] Video is under 3 minutes
- [ ] Shows all main features
- [ ] Mentions Kiro AI and 5 features
- [ ] Shows `.kiro/` directory briefly
- [ ] Audio is clear
- [ ] No long pauses or dead air
- [ ] Shows live deployed site (not localhost)
- [ ] Includes URLs at end
- [ ] Set to PUBLIC on YouTube
- [ ] Has good title and description

---

## Common Mistakes to Avoid

1. ❌ Video over 3 minutes (judges stop watching)
2. ❌ Showing localhost instead of live site
3. ❌ Not mentioning Kiro features
4. ❌ Poor audio quality
5. ❌ Too slow/boring pace
6. ❌ Not showing actual functionality
7. ❌ Forgetting to set video to public
8. ❌ No call-to-action at end

---

## 🎬 You Got This!

**Time Needed**: 2 hours total
- Setup: 15 min
- Recording: 1 hour
- Editing: 30 min
- Upload: 15 min

**Result**: Professional 3-minute demo video

**Next Step**: Copy YouTube URL for Devpost submission

---

**Pro Tip**: Record multiple takes of each segment. Pick the best ones in editing. Don't try to do it all in one perfect take!

**Remember**: Judges watch hundreds of videos. Make yours:
- Fast-paced
- Visually interesting
- Clear value proposition
- Shows actual working product

🔥 **Let's make this video fire!** 🔥
