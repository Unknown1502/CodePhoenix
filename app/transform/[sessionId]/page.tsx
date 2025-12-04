'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PhoenixLogo from '@/components/PhoenixLogo'
import CodeViewer from '@/components/CodeViewer'
import { Download, Github, Zap, CheckCircle2 } from 'lucide-react'

export default function TransformPage() {
  const params = useParams()
  const [files, setFiles] = useState<string[]>([])
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [targetLanguage, setTargetLanguage] = useState('TypeScript')
  const [transforming, setTransforming] = useState(false)
  const [transformed, setTransformed] = useState(false)
  const [legacyCode, setLegacyCode] = useState('')
  const [modernCode, setModernCode] = useState('')
  const [transformData, setTransformData] = useState<any>(null)

  const targetLanguages = [
    // Modern Web Frameworks
    'TypeScript',
    'React',
    'Next.js',
    'Vue.js',
    'Svelte',
    'Angular',
    'Solid.js',
    'Qwik',
    
    // Backend Frameworks
    'Node.js + Express',
    'FastAPI (Python)',
    'Django',
    'Flask',
    'Ruby on Rails',
    'Spring Boot',
    'ASP.NET Core',
    'Laravel',
    'Phoenix (Elixir)',
    'NestJS',
    
    // Languages
    'Python',
    'Go',
    'Rust',
    'Java',
    'C#',
    'Kotlin',
    'Swift',
    'Elixir',
    'Scala',
    'F#',
    
    // Mobile
    'React Native',
    'Flutter',
    'Swift UI',
    'Jetpack Compose',
    
    // Cloud Native
    'Serverless (AWS Lambda)',
    'Azure Functions',
    'Google Cloud Functions',
    'Kubernetes CRD',
    
    // Specialized
    'GraphQL API',
    'gRPC Service',
    'WebAssembly',
  ]

  // Load uploaded files from session
  useEffect(() => {
    const loadFiles = () => {
      const filesData = sessionStorage.getItem(`files_${params.sessionId}`)
      if (filesData) {
        const parsedFiles = JSON.parse(filesData)
        const fileNames = parsedFiles.map((f: any) => f.name)
        setFiles(fileNames)
        if (fileNames.length > 0) {
          setSelectedFile(fileNames[0]) // Auto-select first file
        }
      }
    }
    loadFiles()
  }, [params.sessionId])

  const handleTransform = async () => {
    if (!selectedFile) return

    setTransforming(true)
    try {
      const response = await fetch('/api/transform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: params.sessionId,
          filename: selectedFile,
          targetLanguage
        })
      })

      const data = await response.json()
      setLegacyCode(data.legacyCode || '')
      setModernCode(data.transformedCode || '')
      setTransformData(data)
      setTransformed(true)
    } catch (error) {
      console.error('Transformation failed:', error)
    } finally {
      setTransforming(false)
    }
  }

  const handleDownloadZip = () => {
    if (!modernCode || !selectedFile) return

    // Create a simple text file with the transformed code
    const blob = new Blob([modernCode], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selectedFile.replace(/\.[^.]+$/, '')}_${targetLanguage.toLowerCase()}.${getFileExtension(targetLanguage)}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleGithubExport = () => {
    if (!transformData?.githubExport?.createUrl) {
      alert('GitHub export data not available')
      return
    }
    
    // Open GitHub new repo page in new tab
    window.open(transformData.githubExport.createUrl, '_blank')
    
    // Copy code to clipboard for easy paste
    if (modernCode) {
      navigator.clipboard.writeText(modernCode)
      alert('Code copied to clipboard! Create your repo and paste the code.')
    }
  }

  const getFileExtension = (language: string): string => {
    const extensions: { [key: string]: string } = {
      'TypeScript': 'ts',
      'React': 'tsx',
      'Python': 'py',
      'Next.js': 'tsx',
      'Go': 'go',
      'Rust': 'rs',
      'Vue.js': 'vue',
      'Angular': 'ts',
      'Java': 'java',
      'C#': 'cs',
      'Kotlin': 'kt',
      'Swift': 'swift',
      'Svelte': 'svelte',
      'Flutter': 'dart'
    }
    return extensions[language] || 'txt'
  }

  return (
    <main className="min-h-screen bg-ash-900">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <PhoenixLogo size={60} />
          <h1 className="text-4xl font-bold text-white mt-6 mb-2">Code Transformation</h1>
          <p className="text-ash-400">Transform legacy code into modern applications</p>
        </motion.div>

        {/* Controls */}
        <div className="mb-8 bg-ash-800/50 backdrop-blur-sm rounded-xl border border-ash-700 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-ash-400 mb-2">Select File</label>
              <select
                value={selectedFile || ''}
                onChange={(e) => setSelectedFile(e.target.value)}
                className="w-full px-4 py-2 bg-ash-900 border border-ash-700 text-white rounded-lg focus:border-phoenix-600 focus:outline-none"
              >
                <option value="">Choose a file...</option>
                {files.map((file, idx) => (
                  <option key={idx} value={file}>{file}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-ash-400 mb-2">Target Language</label>
              <select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                className="w-full px-4 py-2 bg-ash-900 border border-ash-700 text-white rounded-lg focus:border-phoenix-600 focus:outline-none"
              >
                {targetLanguages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleTransform}
                disabled={!selectedFile || transforming}
                className="w-full px-6 py-2 bg-phoenix-600 hover:bg-phoenix-700 disabled:bg-ash-700 disabled:text-ash-500 text-white font-bold rounded-lg transition inline-flex items-center justify-center space-x-2"
              >
                {transforming ? (
                  <>
                    <PhoenixLogo size={20} animated />
                    <span>Transforming...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    <span>Transform</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Code Viewer */}
        {transformed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <CodeViewer
              legacyCode={legacyCode}
              modernCode={modernCode}
              legacyLanguage="cobol"
              modernLanguage={targetLanguage.toLowerCase()}
            />
          </motion.div>
        )}

        {/* Export Options */}
        {transformed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center space-x-4"
          >
            <button 
              onClick={handleDownloadZip}
              className="px-6 py-3 bg-ash-800 hover:bg-ash-700 text-white rounded-lg transition inline-flex items-center space-x-2 border border-ash-600"
            >
              <Download className="w-5 h-5" />
              <span>Download ZIP</span>
            </button>
            <button 
              onClick={handleGithubExport}
              className="px-6 py-3 bg-ash-800 hover:bg-ash-700 text-white rounded-lg transition inline-flex items-center space-x-2 border border-ash-600"
            >
              <Github className="w-5 h-5" />
              <span>Export to GitHub</span>
            </button>
          </motion.div>
        )}
      </div>
    </main>
  )
}
