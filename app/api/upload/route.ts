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

    // Store file contents directly in response (client-side storage)
    const savedFiles = []
    const fileContents: { [key: string]: string } = {}
    
    for (const file of files) {
      const text = await file.text()
      fileContents[file.name] = text
      
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
      fileContents, // Send file contents back to client
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
