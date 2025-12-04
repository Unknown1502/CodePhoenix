# Agent Hooks Configuration for CodePhoenix

Agent hooks allow automated workflows at different stages of the development and deployment process.

## Hook: pre-analysis

**Trigger**: Before code analysis begins
**Purpose**: Validate uploaded files and prepare for analysis

### Tasks
1. Validate file extensions and MIME types
2. Check file sizes (max 10MB per file)
3. Scan for malicious content
4. Detect character encoding
5. Count total lines of code
6. Create analysis session metadata

### Implementation
```typescript
// .kiro/hooks/pre-analysis.ts
export async function preAnalysisHook(files: File[]): Promise<ValidationResult> {
  const results = {
    valid: [],
    invalid: [],
    warnings: [],
  };

  for (const file of files) {
    // Validate extension
    const ext = file.name.split('.').pop()?.toLowerCase();
    const validExtensions = ['cbl', 'cob', 'vb', 'bas', 'frm', 'php', 'pl', 'pas', 'for', 'f90'];
    
    if (!validExtensions.includes(ext)) {
      results.invalid.push({
        file: file.name,
        reason: `Unsupported file extension: .${ext}`
      });
      continue;
    }

    // Check file size
    if (file.size > 10 * 1024 * 1024) {
      results.invalid.push({
        file: file.name,
        reason: 'File exceeds 10MB limit'
      });
      continue;
    }

    // Read and validate content
    const content = await file.text();
    const lines = content.split('\n').length;
    
    if (lines > 50000) {
      results.warnings.push({
        file: file.name,
        message: `Large file (${lines} lines) may take longer to process`
      });
    }

    results.valid.push({
      file: file.name,
      size: file.size,
      lines,
      encoding: detectEncoding(content)
    });
  }

  return results;
}
```

---

## Hook: post-analysis

**Trigger**: After AI analysis completes
**Purpose**: Process analysis results and prepare for transformation

### Tasks
1. Validate analysis output structure
2. Calculate complexity score
3. Categorize vulnerabilities
4. Generate dependency graph
5. Estimate transformation time
6. Create analysis report

### Implementation
```typescript
// .kiro/hooks/post-analysis.ts
export async function postAnalysisHook(
  analysisResults: AnalysisResult[]
): Promise<ProcessedAnalysis> {
  const processed = {
    totalFiles: analysisResults.length,
    totalLines: 0,
    averageComplexity: 0,
    vulnerabilities: {
      high: 0,
      medium: 0,
      low: 0
    },
    estimatedHours: 0,
    recommendations: []
  };

  for (const result of analysisResults) {
    processed.totalLines += result.stats.lines;
    processed.averageComplexity += result.complexity;

    // Categorize vulnerabilities
    result.vulnerabilities.forEach(vuln => {
      processed.vulnerabilities[vuln.severity]++;
    });

    // Estimate transformation time
    const hours = estimateTransformationTime(
      result.language,
      result.stats.lines,
      result.complexity
    );
    processed.estimatedHours += hours;
  }

  processed.averageComplexity /= analysisResults.length;

  // Generate recommendations
  processed.recommendations = generateRecommendations(processed);

  return processed;
}

function estimateTransformationTime(
  language: string,
  lines: number,
  complexity: number
): number {
  const baseRate = 100; // lines per hour
  const complexityMultiplier = complexity / 5; // 1x to 2x
  
  return (lines / baseRate) * complexityMultiplier;
}
```

---

## Hook: pre-transformation

**Trigger**: Before code transformation begins
**Purpose**: Prepare code and validate transformation parameters

### Tasks
1. Validate target language selection
2. Check API availability (OpenAI/Anthropic)
3. Prepare transformation context
4. Create backup of original code
5. Initialize transformation session
6. Set up progress tracking

### Implementation
```typescript
// .kiro/hooks/pre-transformation.ts
export async function preTransformationHook(
  sessionId: string,
  files: FileInfo[],
  targetLanguage: string
): Promise<TransformationPrep> {
  // Validate target language
  const supportedTargets = ['TypeScript', 'React', 'Python', 'Next.js'];
  if (!supportedTargets.includes(targetLanguage)) {
    throw new Error(`Unsupported target language: ${targetLanguage}`);
  }

  // Check API availability
  const apiHealth = await checkAPIHealth();
  if (!apiHealth.openai || !apiHealth.anthropic) {
    throw new Error('AI services unavailable');
  }

  // Create backup
  await createBackup(sessionId, files);

  // Prepare transformation context
  const context = {
    sessionId,
    targetLanguage,
    startTime: new Date(),
    status: 'preparing',
    progress: 0,
    currentFile: null,
  };

  await saveTransformationContext(context);

  return {
    ready: true,
    context,
    estimatedDuration: files.length * 60 // 60 seconds per file
  };
}
```

---

## Hook: post-transformation

**Trigger**: After code transformation completes
**Purpose**: Validate, test, and package transformed code

### Tasks
1. Validate syntax of generated code
2. Run automated tests
3. Compare business logic
4. Generate transformation report
5. Create deployment package
6. Calculate metrics

### Implementation
```typescript
// .kiro/hooks/post-transformation.ts
export async function postTransformationHook(
  sessionId: string,
  transformations: Transformation[]
): Promise<ValidationReport> {
  const report = {
    sessionId,
    totalFiles: transformations.length,
    successful: 0,
    failed: 0,
    warnings: [],
    metrics: {
      linesReduced: 0,
      complexityReduced: 0,
      performanceGain: 0,
    },
    tests: {
      passed: 0,
      failed: 0,
      skipped: 0,
    }
  };

  for (const transformation of transformations) {
    try {
      // Validate syntax
      const syntaxValid = await validateSyntax(
        transformation.transformedCode,
        transformation.targetLanguage
      );

      if (!syntaxValid) {
        report.failed++;
        report.warnings.push({
          file: transformation.filename,
          message: 'Syntax validation failed'
        });
        continue;
      }

      // Run tests
      const testResults = await runTests(transformation);
      report.tests.passed += testResults.passed;
      report.tests.failed += testResults.failed;

      // Calculate metrics
      report.metrics.linesReduced += 
        transformation.stats.originalLines - 
        transformation.stats.transformedLines;

      report.successful++;
    } catch (error) {
      report.failed++;
      report.warnings.push({
        file: transformation.filename,
        message: error.message
      });
    }
  }

  // Generate deployment package
  await createDeploymentPackage(sessionId, transformations);

  return report;
}
```

---

## Hook: pre-deployment

**Trigger**: Before deploying transformed code
**Purpose**: Final checks and deployment preparation

### Tasks
1. Run security scan on generated code
2. Validate environment configuration
3. Create Dockerfile
4. Generate docker-compose.yml
5. Create Kubernetes manifests
6. Set up CI/CD pipeline

### Implementation
```typescript
// .kiro/hooks/pre-deployment.ts
export async function preDeploymentHook(
  sessionId: string,
  targetEnvironment: string
): Promise<DeploymentPackage> {
  // Security scan
  const securityScan = await runSecurityScan(sessionId);
  if (securityScan.highSeverity > 0) {
    throw new Error('High severity security issues found');
  }

  // Generate Dockerfile
  const dockerfile = generateDockerfile(sessionId);
  await saveFile(`${sessionId}/Dockerfile`, dockerfile);

  // Generate docker-compose
  const dockerCompose = generateDockerCompose(sessionId);
  await saveFile(`${sessionId}/docker-compose.yml`, dockerCompose);

  // Generate Kubernetes manifests
  if (targetEnvironment === 'kubernetes') {
    const k8sManifests = generateK8sManifests(sessionId);
    await saveK8sManifests(sessionId, k8sManifests);
  }

  // Create CI/CD pipeline
  const pipeline = generateCICD(sessionId, targetEnvironment);
  await saveFile(`${sessionId}/.github/workflows/deploy.yml`, pipeline);

  return {
    ready: true,
    docker: true,
    kubernetes: targetEnvironment === 'kubernetes',
    cicd: true,
    securityScore: securityScan.score
  };
}

function generateDockerfile(sessionId: string): string {
  return `
# Multi-stage build for optimized production image
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .
RUN npm run build

# Production image
FROM node:18-alpine AS production

WORKDIR /app

# Copy built assets from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

# Set environment
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s \\
  CMD node healthcheck.js

# Start application
CMD ["node", "dist/index.js"]
`.trim();
}
```

---

## Hook: post-deployment

**Trigger**: After successful deployment
**Purpose**: Verification and monitoring setup

### Tasks
1. Verify deployment health
2. Run smoke tests
3. Set up monitoring
4. Configure alerts
5. Generate deployment report
6. Notify stakeholders

### Implementation
```typescript
// .kiro/hooks/post-deployment.ts
export async function postDeploymentHook(
  sessionId: string,
  deploymentUrl: string
): Promise<DeploymentReport> {
  const report = {
    sessionId,
    deploymentUrl,
    health: 'unknown',
    smokeTests: {
      passed: 0,
      failed: 0
    },
    monitoring: false,
    alerts: false,
    timestamp: new Date()
  };

  // Health check
  const healthCheck = await fetch(`${deploymentUrl}/health`);
  report.health = healthCheck.ok ? 'healthy' : 'unhealthy';

  // Run smoke tests
  const smokeTests = await runSmokeTests(deploymentUrl);
  report.smokeTests = smokeTests;

  // Set up monitoring
  await setupMonitoring(deploymentUrl);
  report.monitoring = true;

  // Configure alerts
  await configureAlerts(deploymentUrl);
  report.alerts = true;

  // Send notification
  await notifyDeployment(report);

  return report;
}

async function runSmokeTests(url: string): Promise<TestResults> {
  const tests = [
    { name: 'Homepage loads', test: () => fetch(url) },
    { name: 'API responds', test: () => fetch(`${url}/api/health`) },
    { name: 'Authentication works', test: () => fetch(`${url}/api/auth/verify`) },
  ];

  const results = { passed: 0, failed: 0 };

  for (const test of tests) {
    try {
      const response = await test.test();
      if (response.ok) {
        results.passed++;
      } else {
        results.failed++;
      }
    } catch {
      results.failed++;
    }
  }

  return results;
}
```

---

## Hook: on-error

**Trigger**: When any error occurs during the process
**Purpose**: Error handling and recovery

### Tasks
1. Log error details
2. Create error report
3. Attempt automatic recovery
4. Notify administrators
5. Preserve state for debugging
6. Suggest remediation steps

### Implementation
```typescript
// .kiro/hooks/on-error.ts
export async function onErrorHook(
  error: Error,
  context: ErrorContext
): Promise<ErrorRecovery> {
  // Log error
  await logError({
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date()
  });

  // Create detailed report
  const report = createErrorReport(error, context);
  
  // Attempt recovery
  const recovery = await attemptRecovery(error, context);

  // Notify if critical
  if (context.severity === 'critical') {
    await notifyAdministrators(report);
  }

  // Preserve state
  await saveErrorState(context.sessionId, {
    error,
    context,
    recovery
  });

  return {
    recovered: recovery.success,
    report,
    suggestions: generateSuggestions(error, context)
  };
}

async function attemptRecovery(
  error: Error,
  context: ErrorContext
): Promise<RecoveryResult> {
  // API timeout - retry with backoff
  if (error.message.includes('timeout')) {
    return await retryWithBackoff(context.operation);
  }

  // Rate limit - wait and retry
  if (error.message.includes('rate limit')) {
    await sleep(60000); // Wait 1 minute
    return await retryWithBackoff(context.operation);
  }

  // Invalid code - try alternative approach
  if (error.message.includes('syntax error')) {
    return await useAlternativeTransformation(context);
  }

  return { success: false, message: 'No recovery strategy available' };
}
```

---

## Hook Configuration File

```json
{
  "hooks": {
    "pre-analysis": {
      "enabled": true,
      "timeout": 30000,
      "retries": 3
    },
    "post-analysis": {
      "enabled": true,
      "timeout": 60000,
      "retries": 2
    },
    "pre-transformation": {
      "enabled": true,
      "timeout": 30000,
      "retries": 3
    },
    "post-transformation": {
      "enabled": true,
      "timeout": 120000,
      "retries": 2
    },
    "pre-deployment": {
      "enabled": true,
      "timeout": 300000,
      "retries": 1
    },
    "post-deployment": {
      "enabled": true,
      "timeout": 180000,
      "retries": 2
    },
    "on-error": {
      "enabled": true,
      "timeout": 10000,
      "retries": 0
    }
  },
  "notifications": {
    "email": "dev@codephoenix.dev",
    "slack": "webhook-url",
    "discord": "webhook-url"
  },
  "monitoring": {
    "enabled": true,
    "interval": 60000,
    "metrics": ["cpu", "memory", "requests", "errors"]
  }
}
```

## Usage in Code

```typescript
// In API route
import { runHook } from '@/lib/hooks';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Run pre-analysis hook
    const validation = await runHook('pre-analysis', data.files);
    
    if (!validation.valid) {
      return NextResponse.json({ error: validation.errors }, { status: 400 });
    }
    
    // Continue with analysis...
    
  } catch (error) {
    // Run error hook
    await runHook('on-error', error, { stage: 'analysis' });
    throw error;
  }
}
```
