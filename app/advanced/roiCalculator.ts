export type ROIResult = {
  estimatedAnnualSavingsUSD: number
  paybackMonths: number
  notes?: string
}

// Simple ROI estimation stub. Replace with more sophisticated models
// (license costs, engineering hours saved, downtime reduction) as needed.
export function estimateROI(params: {currentMaintenancePerYearUSD: number; migrationCostUSD: number; expectedEfficiencyGainPercent: number}): ROIResult {
  const { currentMaintenancePerYearUSD, migrationCostUSD, expectedEfficiencyGainPercent } = params
  const estimatedAnnualSavingsUSD = Math.round(currentMaintenancePerYearUSD * (expectedEfficiencyGainPercent / 100))
  const paybackMonths = Math.max(1, Math.round((migrationCostUSD / Math.max(1, estimatedAnnualSavingsUSD)) * 12))

  return {
    estimatedAnnualSavingsUSD,
    paybackMonths,
    notes: 'This is an estimate. Use real operational metrics for accuracy.'
  }
}
