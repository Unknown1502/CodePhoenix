# Vibe Coding Instructions for CodePhoenix

## Project Context
CodePhoenix is a legacy code resurrection platform. Use this vibe to generate code components.

## Vibe 1: "Create the analysis results page"

Generate a comprehensive analysis results page at `app/analyze/[sessionId]/page.tsx` that:
- Displays uploaded file information
- Shows AI analysis results in beautiful cards
- Includes complexity visualization
- Lists security vulnerabilities with severity badges
- Displays dependency graph
- Has "Start Transformation" CTA button
- Uses dark theme with phoenix-orange accents
- Smooth animations with Framer Motion

## Vibe 2: "Build the transformation dashboard"

Create `app/transform/[sessionId]/page.tsx` with:
- Split-screen Monaco editor (legacy left, modern right)
- Language selector dropdown for target language
- Real-time transformation status
- Progress bar with phoenix rising animation
- Side panel with transformation stats
- Download and export buttons
- Dark theme with animated phoenix logo

## Vibe 3: "Make the phoenix logo component cooler"

Enhance `components/PhoenixLogo.tsx`:
- Add wing flapping animation
- Fire particles rising from bottom
- Glow pulse effect
- Scale up on hover
- Color shift from orange to bright yellow
- Smooth SVG path animations
- Support different sizes (sm, md, lg, xl)

## Vibe 4: "Create the ROI calculator component"

Build `components/ROICalculator.tsx`:
- Input sliders for current costs
- Real-time calculation display
- Animated number counters
- Bar chart showing cost comparison
- Pie chart for savings breakdown
- Timeline visualization for break-even point
- Export report button
- Professional enterprise look

## Vibe 5: "Generate the migration roadmap component"

Create `components/MigrationRoadmap.tsx`:
- Timeline view with phases
- Expandable phase cards
- Risk indicators (traffic light colors)
- Team size icons
- Duration estimates
- Dependency arrows between phases
- Progress tracking
- Export as PDF button

## Vibe 6: "Build the architecture diagram visualizer"

Implement `components/ArchitectureDiagram.tsx` using React Flow:
- Custom node components for legacy/modern systems
- Animated transformation arrows
- Before/after comparison mode
- Zoom and pan controls
- Mini-map navigation
- Node connection animations
- Export as image
- Responsive layout

## Vibe 7: "Create the diff viewer component"

Build `components/DiffViewer.tsx`:
- Monaco Editor integration
- Synchronized scrolling
- Line-by-line mapping
- Syntax highlighting for multiple languages
- Collapsible unchanged sections
- Search functionality
- Copy code buttons
- Metrics sidebar (lines changed, additions, deletions)

## Vibe 8: "Make the upload zone more dramatic"

Enhance `components/UploadZone.tsx`:
- Ash/fire theme transition on drag
- Phoenix rising animation on upload start
- File icons that "burn away" during processing
- Progress ring around phoenix logo
- Success animation with particle effects
- Support for folder uploads
- Retry failed uploads
- Maximum drama!

## Vibe 9: "Create the security scanner results component"

Build `components/SecurityResults.tsx`:
- Vulnerability cards with severity colors
- CVE database integration display
- Fix suggestions from AI
- Risk score visualization
- OWASP category classification
- Remediation complexity estimates
- Export security report
- Professional security audit look

## Vibe 10: "Generate the GitHub export modal"

Create `components/GitHubExportModal.tsx`:
- GitHub authentication flow
- Repository name input
- Visibility toggle (public/private)
- Include options checklist (tests, docs, CI/CD)
- Branch name input
- Commit message customization
- Loading state with phoenix animation
- Success state with repo link

## Style Guidelines

### Colors
```typescript
const phoenixTheme = {
  background: {
    primary: '#18181b',    // ash-900
    secondary: '#27272a',  // ash-800
    tertiary: '#3f3f46',   // ash-700
  },
  phoenix: {
    primary: '#f97316',    // phoenix-600
    light: '#fb923c',      // phoenix-400
    dark: '#ea580c',       // phoenix-700
    glow: '#fdba74',       // phoenix-300
  },
  text: {
    primary: '#ffffff',
    secondary: '#d4d4d8',  // ash-300
    muted: '#71717a',      // ash-500
  },
  status: {
    success: '#22c55e',
    warning: '#eab308',
    error: '#ef4444',
    info: '#3b82f6',
  }
}
```

### Animation Patterns
```typescript
// Phoenix rise
const riseAnimation = {
  initial: { y: 100, opacity: 0, scale: 0.8 },
  animate: { y: 0, opacity: 1, scale: 1 },
  transition: { duration: 2, ease: 'easeOut' }
}

// Flame flicker
const flameAnimation = {
  animate: { 
    scaleY: [1, 1.2, 1],
    opacity: [0.8, 1, 0.8]
  },
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: 'easeInOut'
  }
}

// Glow pulse
const glowAnimation = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(249, 115, 22, 0.5)',
      '0 0 40px rgba(249, 115, 22, 0.8)',
      '0 0 20px rgba(249, 115, 22, 0.5)'
    ]
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut'
  }
}
```

### Component Templates
```typescript
// Standard page template
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PhoenixLogo from '@/components/PhoenixLogo'

export default function Page() {
  return (
    <main className="min-h-screen bg-ash-900">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Content */}
        </motion.div>
      </div>
    </main>
  )
}

// Standard component template
'use client'

import { motion } from 'framer-motion'

interface ComponentProps {
  // Props
}

export default function Component({ }: ComponentProps) {
  return (
    <motion.div
      className="bg-ash-800/50 backdrop-blur-sm rounded-xl border border-ash-700 p-6"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Content */}
    </motion.div>
  )
}
```

## API Integration Patterns

### Fetch with loading states
```typescript
const [loading, setLoading] = useState(false)
const [data, setData] = useState(null)
const [error, setError] = useState(null)

const fetchData = async () => {
  setLoading(true)
  try {
    const res = await fetch('/api/endpoint')
    const json = await res.json()
    setData(json)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}

// UI
{loading && <PhoenixLoading />}
{error && <ErrorMessage>{error}</ErrorMessage>}
{data && <Results data={data} />}
```

### Streaming responses
```typescript
const handleTransform = async () => {
  const response = await fetch('/api/transform', {
    method: 'POST',
    body: JSON.stringify(data)
  })
  
  const reader = response.body?.getReader()
  const decoder = new TextDecoder()
  
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    
    const chunk = decoder.decode(value)
    setStreamedCode(prev => prev + chunk)
  }
}
```

## Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Stack vertically on mobile
- Side-by-side on desktop
- Touch-friendly buttons (min 44px)
- Hamburger menu for mobile navigation

## Accessibility
- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus visible states
- Screen reader friendly
- Color contrast ratios 4.5:1 minimum

## Performance
- Lazy load Monaco Editor
- Code splitting for heavy components
- Optimize images with next/image
- Minimize animation jank (use transform/opacity)
- Debounce user inputs
- Virtual scrolling for large lists
