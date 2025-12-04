export type Vulnerability = {
  id: string
  description: string
  severity: 'low' | 'medium' | 'high'
  location?: string
}

// Minimal pattern-based security scanner for legacy code samples.
// This is a starter implementation to be replaced by proper SAST tools
// and language-aware analysis (tree-sitter, semantic models).
export function scanForVulnerabilities(sourceCode: string, filename = 'unknown'): Vulnerability[] {
  const issues: Vulnerability[] = []

  if (!sourceCode) return issues

  // Example patterns
  if (/\beval\(/i.test(sourceCode)) {
    issues.push({ id: 'VULN-001', description: 'Use of eval()', severity: 'high', location: filename })
  }
  if (/\bexec\(/i.test(sourceCode)) {
    issues.push({ id: 'VULN-002', description: 'Possible command execution via exec()', severity: 'high', location: filename })
  }
  if (/password\s*=\s*['\"]/i.test(sourceCode)) {
    issues.push({ id: 'VULN-003', description: 'Hardcoded credentials found', severity: 'medium', location: filename })
  }

  return issues
}
