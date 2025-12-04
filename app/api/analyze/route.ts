import { NextRequest, NextResponse } from 'next/server'
import { MOCK_ANALYSIS } from '@/lib/mockData'

const USE_REAL_AI = !!process.env.OPENAI_API_KEY // Auto-detect: use AI if key exists

export async function POST(request: NextRequest) {
  try {
    const { sessionId, files, fileContents, useDemo } = await request.json()

    if (!sessionId || !files) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    const analysisResults = []

    for (const file of files) {
      // Get code from request payload (client sends it)
      const code = fileContents?.[file.name]
      if (!code) continue

      // Determine language from file extension
      const language = detectLanguage(file.name)
      const langKey = language.toLowerCase().replace(/[^a-z0-9]/g, '')

      let analysis

      // Use AI if available and not explicitly requesting demo
      if (USE_REAL_AI && useDemo !== true) {
        try {
          analysis = await analyzeWithAI(code, language)
        } catch (aiError) {
          console.error('AI analysis failed, falling back to demo:', aiError)
          // Fallback to mock data if AI fails
          analysis = (MOCK_ANALYSIS as any)[langKey] || MOCK_ANALYSIS.cobol
        }
      } else {
        // Use mock analysis data (demo mode)
        analysis = (MOCK_ANALYSIS as any)[langKey] || MOCK_ANALYSIS.cobol
      }
      
      analysisResults.push({
        filename: file.name,
        language,
        analysis,
        mode: USE_REAL_AI && useDemo !== true ? 'ai' : 'demo',
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

async function analyzeWithAI(code: string, language: string): Promise<any> {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    throw new Error('OpenAI API key not configured')
  }

  const prompt = `Analyze this ${language} code and provide a detailed assessment in JSON format.

Code:
\`\`\`
${code}
\`\`\`

Return a JSON object with this exact structure:
{
  "language": "${language}",
  "languageVersion": "detected version",
  "linesOfCode": number,
  "complexity": number (1-10),
  "maintainability": number (0-100),
  "businessLogic": ["key functionality 1", "key functionality 2", ...],
  "dependencies": ["dependency 1", "dependency 2", ...],
  "securityIssues": [{"severity": "critical|high|medium|low", "description": "issue", "line": number}],
  "technicalDebt": ["debt item 1", "debt item 2", ...],
  "estimatedMigrationTime": "X-Y weeks",
  "recommendedTarget": "suggested modern framework",
  "migrationComplexity": "Low|Medium|High"
}

Return ONLY valid JSON, no other text.`

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are a senior software architect specializing in legacy code analysis. Provide accurate, detailed assessments.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1500,
      response_format: { type: 'json_object' }
    })
  })

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`)
  }

  const data = await response.json()
  const analysisText = data.choices[0]?.message?.content || '{}'
  
  return JSON.parse(analysisText)
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
