export type RoadmapStep = {
  id: string
  component: string
  riskLevel: 'low' | 'medium' | 'high'
  estimatedHours: number
  recommendedTeamSize: number
  notes?: string
}

// Lightweight migration roadmap generator stub.
// In the full implementation this would consume the analyzer output
// (dependency graphs, complexity scores, test coverage) and produce
// a prioritized, time-boxed plan.
export function generateMigrationRoadmap(analysis: any): RoadmapStep[] {
  const components = analysis?.components || [{ name: 'legacy-core', complexity: 5 }]

  return components.map((c: any, i: number) => {
    const riskLevel = c.complexity > 7 ? 'high' : c.complexity > 4 ? 'medium' : 'low'
    const estimatedHours = Math.round((c.complexity || 5) * 20)
    const recommendedTeamSize = Math.max(1, Math.ceil((c.complexity || 5) / 4))

    return {
      id: `step-${i + 1}`,
      component: c.name || `component-${i + 1}`,
      riskLevel,
      estimatedHours,
      recommendedTeamSize,
      notes: `Auto-generated roadmap step for ${c.name || 'component'}`,
    }
  })
}
