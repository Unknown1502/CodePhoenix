export type PerfEstimate = {
  before: { rps?: number; memMB?: number }
  after: { rps?: number; memMB?: number }
  expectedSpeedupPercent: number
  notes?: string
}

// Heuristic performance estimator. For demo, we estimate improvements
// based on language/architecture modernization. Replace with real
// benchmarks when available.
export function estimatePerformanceImprovement(metrics: {language?: string; architecture?: 'monolith'|'microservice'|'serverless'}): PerfEstimate {
  const baseline = { rps: 100, memMB: 512 }
  let speedup = 20

  if (metrics.language === 'COBOL') speedup = 10
  if (metrics.language === 'TypeScript') speedup = 40
  if (metrics.architecture === 'microservice') speedup += 15
  if (metrics.architecture === 'serverless') speedup += 10

  const expectedSpeedupPercent = Math.min(200, Math.max(5, speedup))

  return {
    before: baseline,
    after: { rps: Math.round(baseline.rps * (1 + expectedSpeedupPercent / 100)), memMB: Math.round(baseline.memMB * (1 - expectedSpeedupPercent / 400)) },
    expectedSpeedupPercent,
    notes: 'Heuristic estimate — run real benchmarks for accurate numbers.'
  }
}
