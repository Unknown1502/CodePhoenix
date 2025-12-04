import { NextRequest, NextResponse } from 'next/server'

// Simple UUID generation without external dependency
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files uploaded' },
        { status: 400 }
      )
    }

    // Create unique session ID
    const sessionId = generateId()

    // Store files in memory (mock mode - no filesystem)
    const savedFiles = []
    for (const file of files) {
      const text = await file.text()
      
      // Store in global Map for session (simple in-memory storage)
      if (!(global as any).uploadedFiles) {
        (global as any).uploadedFiles = new Map()
      }
      if (!(global as any).uploadedFiles.has(sessionId)) {
        (global as any).uploadedFiles.set(sessionId, new Map())
      }
      (global as any).uploadedFiles.get(sessionId).set(file.name, text)
      
      savedFiles.push({
        name: file.name,
        size: file.size,
        type: file.type,
      })
    }

    return NextResponse.json({
      success: true,
      sessionId,
      files: savedFiles,
      message: `${files.length} file(s) uploaded successfully`,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    )
  }
}
