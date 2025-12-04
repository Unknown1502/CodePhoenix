# CodePhoenix Architecture Specification

## Project Overview
CodePhoenix is an AI-powered legacy code resurrection platform that transforms ancient codebases (COBOL, VB6, Fortran, etc.) into modern, cloud-native applications.

## Core Architecture

### Frontend (Next.js 14 App Router)
```
app/
├── page.tsx                 # Landing page with Phoenix animation
├── layout.tsx              # Root layout with dark theme
├── dashboard/             
│   └── page.tsx            # Main dashboard
├── analyze/
│   └── [sessionId]/
│       └── page.tsx        # Analysis results page
├── transform/
│   └── [sessionId]/
│       └── page.tsx        # Transformation interface
└── export/
    └── [sessionId]/
        └── page.tsx        # Export options
```

### Backend API Routes
```
app/api/
├── upload/
│   └── route.ts           # File upload handler
├── analyze/
│   └── route.ts           # AI code analysis
├── transform/
│   └── route.ts           # Code transformation
├── migration/
│   └── route.ts           # Migration roadmap generator
└── export/
    └── route.ts           # Export to GitHub/ZIP
```

### Components
```
components/
├── PhoenixLogo.tsx        # Animated phoenix SVG
├── UploadZone.tsx         # Drag & drop file upload
├── CodeViewer.tsx         # Monaco editor wrapper
├── DiffViewer.tsx         # Side-by-side code comparison
├── ArchitectureDiagram.tsx # React Flow diagram
├── AnalysisResults.tsx    # Analysis display
├── TransformationPanel.tsx # Transformation controls
├── MigrationRoadmap.tsx   # Timeline visualization
└── ROICalculator.tsx      # Cost savings calculator
```

## Technology Stack

### Core Technologies
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **AI**: OpenAI GPT-4 + Anthropic Claude
- **Code Display**: Monaco Editor
- **Diagrams**: React Flow
- **File Upload**: react-dropzone
- **Storage**: Vercel Blob / Local filesystem

### AI Integration
1. **Analysis Phase**: Claude for deep code analysis
2. **Transformation Phase**: GPT-4 for code generation
3. **Validation Phase**: GPT-4 for testing generated code

## Data Flow

### 1. Upload Flow
```
User uploads files → UploadZone component → /api/upload
→ Save to filesystem → Generate session ID → Return session ID
```

### 2. Analysis Flow
```
Session ID → /api/analyze → Read uploaded files → Detect language
→ Send to Claude API → Parse business logic → Extract dependencies
→ Identify vulnerabilities → Return analysis JSON
```

### 3. Transformation Flow
```
Session ID + Target Language → /api/transform → Read legacy code
→ Detect source language → Send to GPT-4 with transformation prompt
→ Generate modern code → Validate syntax → Return transformed code
```

### 4. Export Flow
```
Session ID → /api/export → Package transformed code
→ Generate Dockerfile → Create README → Generate migration guide
→ Export as ZIP or push to GitHub
```

## Database Schema (Future)
```typescript
// Sessions
interface Session {
  id: string
  createdAt: Date
  files: File[]
  status: 'uploaded' | 'analyzing' | 'transforming' | 'complete'
}

// Analysis Results
interface Analysis {
  sessionId: string
  filename: string
  language: string
  businessLogic: string
  dependencies: string[]
  vulnerabilities: Vulnerability[]
  complexity: number
}

// Transformations
interface Transformation {
  sessionId: string
  sourceFile: string
  targetLanguage: string
  transformedCode: string
  stats: {
    originalLines: number
    transformedLines: number
    estimatedSavings: number
  }
}
```

## Key Features Implementation

### 1. Phoenix Rising Animation
- SVG-based phoenix logo
- Framer Motion for rise animation
- Flame effect on hover/upload
- Glow effect with tailwind

### 2. Drag & Drop Upload
- react-dropzone integration
- Support for .cbl, .cob, .vb, .bas, .php, .pl, .for, .f90
- Multi-file upload
- Progress indicators
- File size validation

### 3. AI Code Analysis
- GPT-4 for code understanding
- Extract business logic patterns
- Identify key functions/procedures
- Map dependencies
- Security vulnerability scanning
- Complexity scoring (1-10)

### 4. Code Transformation
- COBOL → TypeScript/Node.js
- VB6 → React + Python
- Old PHP → Next.js
- Fortran → Python
- Maintains exact business logic
- Adds modern error handling
- Follows best practices

### 5. Migration Roadmap
- Step-by-step plan generation
- Risk assessment per module
- Timeline estimation
- Team size recommendations
- Cost savings calculator

### 6. Interactive Diff Viewer
- Monaco Editor integration
- Side-by-side comparison
- Syntax highlighting
- Line-by-line mapping
- Before/after metrics

## Performance Targets
- Upload: < 2s for files up to 5MB
- Analysis: < 30s per file
- Transformation: < 60s per file
- Page load: < 1s
- Interactive: < 100ms response time

## Security Considerations
- API key security (environment variables)
- File upload validation
- Session-based isolation
- No code stored permanently (optional)
- Rate limiting on API routes

## Deployment Strategy
- Platform: Vercel
- Edge runtime for API routes
- CDN for static assets
- Environment variables for API keys
- Auto-scaling enabled
