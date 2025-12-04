import React from 'react'
import { generateMigrationRoadmap } from '../app/advanced/migrationRoadmap'
import { estimateROI } from '../app/advanced/roiCalculator'
import { scanForVulnerabilities } from '../app/advanced/securityScanner'
import { estimatePerformanceImprovement } from '../app/advanced/performanceEstimator'

type Props = {
  analysis?: any
}

export default function AdvancedFeaturesPanel({ analysis }: Props) {
  const roadmap = generateMigrationRoadmap(analysis)
  const roi = estimateROI({ currentMaintenancePerYearUSD: 120000, migrationCostUSD: 200000, expectedEfficiencyGainPercent: 30 })
  const vulns = (analysis?.files || []).flatMap((f: any) => scanForVulnerabilities(f.content, f.name))
  const perf = estimatePerformanceImprovement({ language: 'TypeScript', architecture: 'microservice' })

  return (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3">Advanced Features</h3>

      <section className="mb-4">
        <strong>Migration Roadmap</strong>
        <ul className="list-disc ml-5 mt-2">
          {roadmap.map(r => (
            <li key={r.id}>{r.component} — {r.riskLevel} risk — {r.estimatedHours}h</li>
          ))}
        </ul>
      </section>

      <section className="mb-4">
        <strong>ROI Estimate</strong>
        <div className="mt-2">Estimated Annual Savings: ${roi.estimatedAnnualSavingsUSD}</div>
        <div>Payback Months: {roi.paybackMonths}</div>
      </section>

      <section className="mb-4">
        <strong>Security Scan</strong>
        <div className="mt-2">Found {vulns.length} potential issues</div>
      </section>

      <section>
        <strong>Performance Estimate</strong>
        <div className="mt-2">Expected Speedup: {perf.expectedSpeedupPercent}%</div>
      </section>
    </div>
  )
}
