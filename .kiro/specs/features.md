# CodePhoenix Feature Specifications

## Feature 1: Legacy Code Upload System

### Description
Drag-and-drop interface for uploading legacy code files from various ancient programming languages.

### User Flow
1. User lands on homepage
2. Sees prominent "Upload Dead Code" dropzone
3. Drags legacy files or clicks to browse
4. System validates file types
5. Shows upload progress with phoenix animation
6. Redirects to analysis page upon completion

### Technical Requirements
- Support file types: .cbl, .cob, .vb, .bas, .frm, .php, .pl, .pas, .for, .f90
- Maximum file size: 10MB per file
- Maximum files per upload: 20
- File storage: Local filesystem with session-based organization
- Progress tracking: Real-time upload percentage

### UI Components
- `UploadZone.tsx`: Dropzone with drag-and-drop
- Animated phoenix logo during upload
- File list preview with size information
- Error handling for invalid files

### API Endpoint
```typescript
POST /api/upload
Body: FormData with files
Response: {
  success: boolean
  sessionId: string
  files: FileInfo[]
}
```

---

## Feature 2: AI-Powered Code Analysis

### Description
Deep analysis of legacy code to understand business logic, dependencies, and vulnerabilities.

### Analysis Components
1. **Language Detection**: Automatic detection from file extension
2. **Business Logic Extraction**: Identify core business rules
3. **Dependency Mapping**: Find all imports and dependencies
4. **Security Scanning**: Identify common vulnerabilities
5. **Complexity Scoring**: Rate code complexity (1-10)
6. **Architecture Analysis**: Understand current structure

### AI Prompts
```
System: You are an expert legacy code analyzer specializing in [LANGUAGE].
Analyze the following code and provide:
1. Summary of business logic (2-3 sentences)
2. List of key functions/procedures
3. Dependencies and external libraries
4. Security vulnerabilities found
5. Complexity score (1-10) with justification
6. Recommended modern tech stack for migration

User: [LEGACY CODE]
```

### Output Format
```typescript
interface AnalysisResult {
  filename: string
  language: string
  businessLogic: string
  keyFunctions: string[]
  dependencies: string[]
  vulnerabilities: {
    severity: 'high' | 'medium' | 'low'
    description: string
    location: string
  }[]
  complexity: number
  recommendations: {
    targetLanguage: string
    framework: string
    database: string
    deployment: string
  }
}
```

### API Endpoint
```typescript
POST /api/analyze
Body: { sessionId: string, files: FileInfo[] }
Response: { results: AnalysisResult[] }
```

---

## Feature 3: Code Transformation Engine

### Description
AI-powered conversion of legacy code to modern languages while preserving business logic.

### Supported Transformations

#### COBOL → TypeScript/Node.js
- DIVISIONS → Modules
- PICTURE clauses → TypeScript types
- PERFORM loops → for/while loops
- File I/O → fs/streams API
- WORKING-STORAGE → const/let variables

#### VB6 → React + Python
- Forms → React components
- Controls → JSX elements
- Events → React event handlers
- ActiveX → Modern web APIs
- Data access → REST APIs

#### Old PHP → Next.js
- Procedural → Component-based
- MySQL queries → Prisma ORM
- Sessions → JWT/cookies
- Include files → ES6 imports

#### Fortran → Python
- SUBROUTINES → Functions
- COMMON blocks → Classes
- DO loops → for loops
- Array indexing → NumPy arrays

### Transformation Prompt Template
```
System: You are an expert code transformation AI. Convert ${SOURCE_LANGUAGE} 
code to ${TARGET_LANGUAGE} while:
1. Preserving exact business logic
2. Maintaining data flow and algorithms
3. Modernizing architecture patterns
4. Adding proper error handling
5. Following ${TARGET_LANGUAGE} best practices
6. Adding helpful comments

Output ONLY code, no explanations.

${LANGUAGE_SPECIFIC_RULES}

User: Transform this code:
${LEGACY_CODE}
```

### Quality Assurance
- Syntax validation of generated code
- Business logic verification prompts
- Test case generation
- Performance metrics comparison

### API Endpoint
```typescript
POST /api/transform
Body: {
  sessionId: string
  filename: string
  targetLanguage: string
}
Response: {
  legacyCode: string
  transformedCode: string
  stats: {
    originalLines: number
    transformedLines: number
    reductionPercentage: number
  }
}
```

---

## Feature 4: Interactive Diff Viewer

### Description
Side-by-side comparison of legacy and transformed code with syntax highlighting.

### Features
- Monaco Editor integration
- Split view (legacy left, modern right)
- Synchronized scrolling
- Line number mapping
- Syntax highlighting for both languages
- Collapsible sections
- Search and replace
- Export diff as HTML/PDF

### UI Layout
```
┌────────────────┬────────────────┐
│  Legacy Code   │  Modern Code   │
│  (COBOL)       │  (TypeScript)  │
│                │                │
│  Line 1        │  Line 1        │
│  Line 2        │  Line 2        │
│  ...           │  ...           │
└────────────────┴────────────────┘
     [Metrics]  [Download]  [GitHub]
```

### Metrics Display
- Lines of code comparison
- Complexity reduction
- Performance improvement estimate
- Maintainability score increase

---

## Feature 5: Migration Roadmap Generator

### Description
AI-generated step-by-step plan for migrating legacy system to modern stack.

### Roadmap Components
1. **Phase Assessment**
   - Identify migration phases
   - Estimate duration per phase
   - Risk assessment

2. **Resource Planning**
   - Team size recommendations
   - Skill requirements
   - Training needs

3. **Technical Steps**
   - Database migration strategy
   - API development plan
   - Frontend migration approach
   - Testing strategy

4. **Timeline Visualization**
   - Gantt chart style display
   - Milestone markers
   - Dependency tracking

### AI Prompt
```
Generate a detailed migration roadmap for transforming a ${SOURCE_LANGUAGE} 
application to ${TARGET_LANGUAGE}. 

Code Analysis:
- ${ANALYSIS_SUMMARY}
- Complexity: ${COMPLEXITY_SCORE}
- Lines: ${LINE_COUNT}

Provide:
1. Migration phases (5-8 phases)
2. Duration estimates
3. Risk assessment per phase
4. Team requirements
5. Testing strategy
6. Rollback plans
```

### Output Format
```typescript
interface MigrationRoadmap {
  phases: {
    id: number
    name: string
    duration: string
    tasks: string[]
    risks: { level: string; description: string }[]
    teamSize: number
    skills: string[]
  }[]
  totalDuration: string
  totalCost: number
  riskLevel: 'low' | 'medium' | 'high'
}
```

---

## Feature 6: ROI Calculator

### Description
Calculate cost savings and return on investment for legacy code modernization.

### Calculation Factors
1. **Current Costs**
   - Maintenance hours per month
   - Developer salaries
   - Infrastructure costs
   - Downtime costs
   - Security incident costs

2. **Migration Costs**
   - Development hours
   - Testing hours
   - Training costs
   - Tool/license costs

3. **Future Savings**
   - Reduced maintenance (50-70%)
   - Improved performance (2-5x)
   - Lower infrastructure costs (cloud-native)
   - Reduced security risks
   - Easier hiring (modern stack)

### Formula
```typescript
const currentAnnualCost = 
  maintenanceHours * hourlyRate * 12 + 
  infrastructureCost * 12 + 
  downtimeCost

const migrationCost = 
  estimatedHours * hourlyRate + 
  toolCosts + 
  trainingCosts

const futureAnnualCost = 
  currentAnnualCost * 0.3  // 70% reduction

const roi = {
  breakEvenMonths: migrationCost / (currentAnnualCost - futureAnnualCost) * 12,
  threeYearSavings: (currentAnnualCost - futureAnnualCost) * 3 - migrationCost,
  fiveYearROI: ((currentAnnualCost - futureAnnualCost) * 5 - migrationCost) / migrationCost * 100
}
```

### UI Components
- Input sliders for cost factors
- Real-time calculation updates
- Visual charts (Recharts)
- Comparison tables
- Export as PDF report

---

## Feature 7: Export & Deployment

### Description
Export transformed code with full project structure, Docker configuration, and documentation.

### Export Options

#### 1. ZIP Download
```
project-export.zip
├── src/
│   └── [transformed-code]
├── Dockerfile
├── docker-compose.yml
├── package.json
├── README.md
├── MIGRATION_GUIDE.md
└── tests/
    └── [generated-tests]
```

#### 2. GitHub Repository
- Create new repo via GitHub API
- Push transformed code
- Add CI/CD workflow files
- Generate GitHub Issues for remaining work

#### 3. Containerization
- Auto-generate Dockerfile
- Multi-stage builds
- Environment configuration
- Health checks

### Documentation Generation
- README with setup instructions
- Migration guide with step-by-step
- API documentation (if applicable)
- Architecture diagrams
- Deployment guide

### API Endpoint
```typescript
POST /api/export
Body: {
  sessionId: string
  format: 'zip' | 'github'
  githubToken?: string
  repoName?: string
}
Response: {
  downloadUrl?: string
  githubUrl?: string
}
```

---

## Feature 8: Architecture Visualization

### Description
Visual diagram showing transformation from legacy monolith to modern microservices.

### Diagram Types
1. **Legacy Architecture**
   - Monolithic structure
   - Database connections
   - External dependencies

2. **Modern Architecture**
   - Microservices breakdown
   - API Gateway
   - Container orchestration
   - Cloud services

3. **Migration Path**
   - Strangler fig pattern
   - Step-by-step evolution
   - Parallel run strategy

### Technology
- React Flow for interactive diagrams
- Custom node components
- Animated transitions
- Export as PNG/SVG

### Node Types
```typescript
const nodeTypes = {
  legacy: LegacySystemNode,
  service: MicroserviceNode,
  database: DatabaseNode,
  api: APIGatewayNode,
  cloud: CloudServiceNode,
}
```
