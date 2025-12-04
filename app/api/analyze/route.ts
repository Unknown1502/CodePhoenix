import { NextRequest, NextResponse } from 'next/server'
import { MOCK_ANALYSIS } from '@/lib/mockData'
import { generateMigrationRoadmap } from '@/app/advanced/migrationRoadmap'
import { scanForVulnerabilities } from '@/app/advanced/securityScanner'
import { estimatePerformanceImprovement } from '@/app/advanced/performanceEstimator'

export async function POST(request: NextRequest) {
  try {
    const { sessionId, files } = await request.json()

    if (!sessionId || !files) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    // Get uploaded files from memory
    const uploadedFiles = (global as any).uploadedFiles?.get(sessionId)
    if (!uploadedFiles) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    const analysisResults = []

    for (const file of files) {
      const code = uploadedFiles.get(file.name)
      if (!code) continue

      // Determine language from file extension
      const language = detectLanguage(file.name)
      const langKey = language.toLowerCase().replace(/[^a-z0-9]/g, '')

      // Use mock analysis data
      const baseAnalysis = (MOCK_ANALYSIS as any)[langKey] || MOCK_ANALYSIS.cobol
      
      // Add advanced features
      const vulnerabilities = scanForVulnerabilities(code, file.name)
      const roadmap = generateMigrationRoadmap({ components: [{ name: file.name, complexity: baseAnalysis.complexity }] })
      const perfEstimate = estimatePerformanceImprovement({ language, architecture: 'monolith' })
      
      analysisResults.push({
        filename: file.name,
        language,
        analysis: {
          ...baseAnalysis,
          vulnerabilities,
          roadmap,
          performanceEstimate: perfEstimate
        },
      })
    }

    return NextResponse.json({
      success: true,
      sessionId,
      results: analysisResults,
    })
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Analysis failed' },
      { status: 500 }
    )
  }
}

function detectLanguage(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase()
  
  const languageMap: { [key: string]: string } = {
    // Mainframe & Legacy Business
    'cbl': 'COBOL',
    'cob': 'COBOL',
    'rpg': 'RPG',
    'rpgle': 'RPG IV',
    'jcl': 'JCL',
    'pli': 'PL/I',
    'pl1': 'PL/I',
    
    // Desktop & Client-Server Era
    'vb': 'Visual Basic 6',
    'bas': 'Visual Basic',
    'frm': 'Visual Basic Forms',
    'cls': 'VB Class',
    'pb': 'PowerBuilder',
    'prw': 'AdvPL (Protheus)',
    'dpr': 'Delphi',
    'dfm': 'Delphi Form',
    
    // Database Languages
    'prg': 'Clipper/dBASE',
    'dbf': 'dBASE',
    'fmb': 'Oracle Forms',
    'mmb': 'Oracle Menu',
    'pll': 'Oracle PL/SQL Library',
    
    // Scientific & Engineering
    'for': 'Fortran 77',
    'f': 'Fortran',
    'f90': 'Fortran 90',
    'f95': 'Fortran 95',
    'ada': 'Ada',
    'adb': 'Ada Body',
    'ads': 'Ada Spec',
    'apl': 'APL',
    
    // Web Legacy
    'php': 'PHP 5.x',
    'php3': 'PHP 3',
    'php4': 'PHP 4',
    'asp': 'Classic ASP',
    'cfm': 'ColdFusion',
    'cfc': 'ColdFusion Component',
    'jsp': 'JSP',
    
    // Scripting Legacy
    'pl': 'Perl',
    'pm': 'Perl Module',
    'tcl': 'Tcl',
    'awk': 'AWK',
    'sed': 'SED',
    
    // Systems & Low Level
    'asm': 'Assembly',
    's': 'Assembly',
    'pas': 'Pascal',
    'pp': 'Pascal',
    'mod': 'Modula-2',
    'def': 'Modula-2 Definition',
    
    // Other Dead Languages
    'alg': 'ALGOL',
    'sim': 'Simula',
    'sno': 'SNOBOL',
    'lsp': 'Lisp',
    'scm': 'Scheme',
    'logo': 'Logo',
    'rex': 'REXX',
  }

  return languageMap[ext || ''] || 'Unknown'
}
