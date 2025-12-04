'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PhoenixLogo from '@/components/PhoenixLogo'
import { Shield, Code2, GitBranch, TrendingUp, AlertTriangle, CheckCircle2, XCircle, Flame } from 'lucide-react'

interface AnalysisResult {
  filename: string
  language: string
  analysis: {
    language?: string
    languageVersion?: string
    linesOfCode?: number
    complexity?: number
    maintainability?: number
    businessLogic?: string[]
    dependencies?: string[]
    securityIssues?: Array<{
      severity: string
      description: string
      line?: number
    }>
    technicalDebt?: string[]
    estimatedMigrationTime?: string
    recommendedTarget?: string
    migrationComplexity?: string
    vulnerabilities?: Array<{
      id: string
      description: string
      severity: 'low' | 'medium' | 'high'
      location?: string
    }>
    roadmap?: any
    performanceEstimate?: any
  }
  stats?: {
    lines: number
    functions: number
    complexity: number
  }
  vulnerabilities?: Array<{
    severity: 'high' | 'medium' | 'low'
    description: string
  }>
}

export default function AnalyzePage() {
  const params = useParams()
  const router = useRouter()
  const [results, setResults] = useState<AnalysisResult[]>([])
  const [loading, setLoading] = useState(true)
  const [fileNames, setFileNames] = useState<string[]>([])

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        // Get uploaded files from sessionStorage
        const filesData = sessionStorage.getItem(`files_${params.sessionId}`)
        const fileContentsData = sessionStorage.getItem(`fileContents_${params.sessionId}`)
        const files = filesData ? JSON.parse(filesData) : []
        const fileContents = fileContentsData ? JSON.parse(fileContentsData) : {}
        
        if (files.length === 0) {
          console.error('No files found in session')
          return
        }

        setFileNames(files.map((f: any) => f.name))

        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            sessionId: params.sessionId,
            files: files,
            fileContents: fileContents
          })
        })
        
        const data = await response.json()
        setResults(data.results || [])
      } catch (error) {
        console.error('Failed to fetch analysis:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalysis()
  }, [params.sessionId])

  if (loading) {
    return (
      <div className="min-h-screen bg-ash-900 flex items-center justify-center">
        <div className="text-center">
          <PhoenixLogo size={80} animated />
          <h2 className="text-2xl text-white mt-6 mb-2">Analyzing Legacy Code...</h2>
          <p className="text-ash-400">AI is examining your codebase</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-ash-900 via-ash-800 to-ash-900">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <PhoenixLogo size={60} />
          <h1 className="text-4xl font-bold text-white mt-6 mb-2">Analysis Complete</h1>
          <p className="text-ash-400">Your legacy code has been analyzed and catalogued</p>
        </motion.div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: Code2,
              label: 'Files Analyzed',
              value: results.length,
              color: 'phoenix-500'
            },
            {
              icon: GitBranch,
              label: 'Total Lines',
              value: results.reduce((sum, r) => sum + (r.analysis?.linesOfCode || 0), 0),
              color: 'blue-500'
            },
            {
              icon: TrendingUp,
              label: 'Avg Complexity',
              value: (results.reduce((sum, r) => sum + (r.analysis?.complexity || 0), 0) / results.length).toFixed(1),
              color: 'yellow-500'
            },
            {
              icon: Shield,
              label: 'Vulnerabilities',
              value: results.reduce((sum, r) => sum + (r.analysis?.vulnerabilities?.length || 0), 0),
              color: 'red-500'
            }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-ash-800/50 backdrop-blur-sm rounded-xl border border-ash-700 p-6"
            >
              <stat.icon className={`w-8 h-8 text-${stat.color} mb-3`} />
              <div className={`text-3xl font-bold text-${stat.color} mb-1`}>{stat.value}</div>
              <div className="text-ash-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Analysis Results */}
        <div className="space-y-6 mb-12">
          {results.map((result, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-ash-800/50 backdrop-blur-sm rounded-xl border border-ash-700 p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{result.filename}</h3>
                  <span className="px-3 py-1 bg-phoenix-600/20 text-phoenix-400 rounded-full text-sm">
                    {result.language}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{result.analysis?.complexity || 'N/A'}/10</div>
                  <div className="text-ash-400 text-sm">Complexity</div>
                </div>
              </div>

              {/* Analysis Summary */}
              <div className="mb-6 p-4 bg-ash-900/50 rounded-lg">
                <h4 className="text-phoenix-500 font-semibold mb-2">AI Analysis Summary</h4>
                <div className="space-y-2 text-ash-300">
                  {result.analysis?.businessLogic && (
                    <div>
                      <strong className="text-white">Business Logic:</strong>
                      <ul className="list-disc ml-6 mt-1">
                        {result.analysis.businessLogic.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {result.analysis?.technicalDebt && (
                    <div className="mt-3">
                      <strong className="text-white">Technical Debt:</strong>
                      <ul className="list-disc ml-6 mt-1">
                        {result.analysis.technicalDebt.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {result.analysis?.estimatedMigrationTime && (
                    <div className="mt-3">
                      <strong className="text-white">Estimated Migration Time:</strong> {result.analysis.estimatedMigrationTime}
                    </div>
                  )}
                  {result.analysis?.recommendedTarget && (
                    <div className="mt-3">
                      <strong className="text-white">Recommended Target:</strong> {result.analysis.recommendedTarget}
                    </div>
                  )}
                </div>
              </div>

              {/* Vulnerabilities */}
              {result.analysis?.vulnerabilities && result.analysis.vulnerabilities.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
                    Security Vulnerabilities ({result.analysis.vulnerabilities.length})
                  </h4>
                  <div className="space-y-2">
                    {result.analysis.vulnerabilities.map((vuln, vIdx) => (
                      <div
                        key={vIdx}
                        className={`p-3 rounded-lg border ${
                          vuln.severity === 'high' 
                            ? 'bg-red-500/10 border-red-500/50'
                            : vuln.severity === 'medium'
                            ? 'bg-yellow-500/10 border-yellow-500/50'
                            : 'bg-blue-500/10 border-blue-500/50'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className={`px-2 py-1 rounded text-xs font-bold mr-3 ${
                            vuln.severity === 'high'
                              ? 'bg-red-500 text-white'
                              : vuln.severity === 'medium'
                              ? 'bg-yellow-500 text-black'
                              : 'bg-blue-500 text-white'
                          }`}>
                            {vuln.severity.toUpperCase()}
                          </span>
                          <span className="text-ash-300">{vuln.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-phoenix-500">{result.analysis?.linesOfCode || 0}</div>
                  <div className="text-ash-500 text-sm">Lines of Code</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-phoenix-500">{result.analysis?.dependencies?.length || 0}</div>
                  <div className="text-ash-500 text-sm">Dependencies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-phoenix-500">{result.analysis?.complexity || 0}/10</div>
                  <div className="text-ash-500 text-sm">Complexity</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <button
            onClick={() => router.push(`/transform/${params.sessionId}`)}
            className="px-8 py-4 bg-gradient-to-r from-phoenix-600 to-phoenix-700 text-white font-bold rounded-lg hover:from-phoenix-700 hover:to-phoenix-800 transition inline-flex items-center space-x-2 animate-glow"
          >
            <Flame className="w-5 h-5" />
            <span>Start Transformation</span>
          </button>
        </motion.div>
      </div>
    </main>
  )
}
