'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, File, Flame, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function UploadZone() {
  const [uploading, setUploading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const router = useRouter()

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
    setUploading(true)

    try {
      const formData = new FormData()
      acceptedFiles.forEach((file) => {
        formData.append('files', file)
      })

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        // Store file info in sessionStorage for next page
        sessionStorage.setItem(`files_${data.sessionId}`, JSON.stringify(data.files))
        // Redirect to analysis page
        router.push(`/analyze/${data.sessionId}`)
      } else {
        console.error('Upload failed')
        setUploading(false)
      }
    } catch (error) {
      console.error('Upload failed:', error)
      setUploading(false)
    }
  }, [router])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.cbl', '.cob', '.vb', '.bas', '.frm', '.php', '.pl', '.pas', '.for', '.f90'],
      'application/octet-stream': ['.cbl', '.cob', '.vb', '.bas'],
    },
    multiple: true,
  })

  return (
    <div
      {...getRootProps()}
      className={`
        relative border-2 border-dashed rounded-2xl p-12 cursor-pointer
        transition-all duration-300 backdrop-blur-sm
        ${isDragActive 
          ? 'border-phoenix-500 bg-phoenix-500/10 scale-105' 
          : 'border-ash-600 bg-ash-800/30 hover:border-phoenix-600 hover:bg-ash-800/50'
        }
      `}
    >
      <input {...getInputProps()} />
      
      <div className="text-center">
        {uploading ? (
          <div className="space-y-4">
            <Loader2 className="w-16 h-16 mx-auto text-phoenix-500 animate-spin" />
            <div className="text-white text-xl font-semibold">
              Rising from the ashes...
            </div>
            <div className="text-ash-400">
              Analyzing your legacy code
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-center">
              {isDragActive ? (
                <Flame className="w-20 h-20 text-phoenix-500 animate-flame" />
              ) : (
                <Upload className="w-20 h-20 text-ash-400" />
              )}
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2">
              {isDragActive ? 'Drop to Resurrect' : 'Upload Dead Code'}
            </h3>
            
            <p className="text-ash-400 mb-6">
              Drag & drop your legacy files or click to browse
            </p>

            <div className="flex flex-wrap justify-center gap-2 text-sm text-ash-500">
              <span className="px-3 py-1 bg-ash-700/50 rounded-full">COBOL</span>
              <span className="px-3 py-1 bg-ash-700/50 rounded-full">VB6</span>
              <span className="px-3 py-1 bg-ash-700/50 rounded-full">Fortran</span>
              <span className="px-3 py-1 bg-ash-700/50 rounded-full">PHP</span>
              <span className="px-3 py-1 bg-ash-700/50 rounded-full">Perl</span>
              <span className="px-3 py-1 bg-ash-700/50 rounded-full">Pascal</span>
            </div>

            {files.length > 0 && (
              <div className="mt-6 space-y-2">
                {files.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-center space-x-2 text-ash-300"
                  >
                    <File className="w-4 h-4" />
                    <span className="text-sm">{file.name}</span>
                    <span className="text-xs text-ash-500">
                      ({(file.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
