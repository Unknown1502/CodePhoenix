'use client'

import { useState } from 'react'
import Editor from '@monaco-editor/react'

interface CodeViewerProps {
  legacyCode: string
  modernCode: string
  legacyLanguage?: string
  modernLanguage?: string
}

export default function CodeViewer({
  legacyCode,
  modernCode,
  legacyLanguage = 'plaintext',
  modernLanguage = 'typescript'
}: CodeViewerProps) {
  const [theme] = useState('vs-dark')

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-ash-800/50 backdrop-blur-sm rounded-xl border border-ash-700 p-4">
      {/* Legacy Code */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-ash-400">Legacy Code</h3>
          <span className="px-3 py-1 bg-ash-700 text-ash-300 rounded-full text-sm">
            {legacyLanguage}
          </span>
        </div>
        <div className="border border-ash-700 rounded-lg overflow-hidden">
          <Editor
            height="600px"
            language={legacyLanguage}
            value={legacyCode}
            theme={theme}
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
            }}
          />
        </div>
      </div>

      {/* Modern Code */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-phoenix-500">Modern Code</h3>
          <span className="px-3 py-1 bg-phoenix-600/20 text-phoenix-400 rounded-full text-sm">
            {modernLanguage}
          </span>
        </div>
        <div className="border border-phoenix-600 rounded-lg overflow-hidden">
          <Editor
            height="600px"
            language={modernLanguage}
            value={modernCode}
            theme={theme}
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
            }}
          />
        </div>
      </div>

      {/* Metrics */}
      <div className="lg:col-span-2 mt-4 grid grid-cols-3 gap-4">
        <div className="bg-ash-900/50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-phoenix-500">
            {legacyCode.split('\n').length}
          </div>
          <div className="text-ash-500 text-sm">Original Lines</div>
        </div>
        <div className="bg-ash-900/50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-phoenix-500">
            {modernCode.split('\n').length}
          </div>
          <div className="text-ash-500 text-sm">Transformed Lines</div>
        </div>
        <div className="bg-ash-900/50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-500">
            {Math.round((1 - modernCode.split('\n').length / legacyCode.split('\n').length) * 100)}%
          </div>
          <div className="text-ash-500 text-sm">Reduction</div>
        </div>
      </div>
    </div>
  )
}
