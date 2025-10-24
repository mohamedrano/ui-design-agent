import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { repoAuditFlow } from '@/lib/ai/flows/repo-audit.flow'

const RepoAuditRequestSchema = z.object({
  paths: z.array(z.string()).min(1),
  includePatterns: z.array(z.string()).optional(),
  excludePatterns: z.array(z.string()).optional(),
  options: z.object({
    includeUnusedSelectors: z.boolean().default(true),
    includeComplexityAnalysis: z.boolean().default(true),
    includeRiskAssessment: z.boolean().default(true),
    includeRefactorPlan: z.boolean().default(true),
    maxFileSize: z.number().default(1024 * 1024), // 1MB
    maxFiles: z.number().default(1000),
  }).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = RepoAuditRequestSchema.parse(body)
    
    const { paths, includePatterns, excludePatterns, options = {} } = validatedData
    
    // Validate paths exist and are accessible
    const fs = await import('fs/promises')
    const path = await import('path')
    
    for (const dirPath of paths) {
      try {
        const stats = await fs.stat(dirPath)
        if (!stats.isDirectory()) {
          return NextResponse.json(
            { error: `Path ${dirPath} is not a directory` },
            { status: 400 }
          )
        }
      } catch (error) {
        return NextResponse.json(
          { error: `Path ${dirPath} does not exist or is not accessible` },
          { status: 400 }
        )
      }
    }
    
    // Run repository audit
    const result = await repoAuditFlow({
      paths,
      includePatterns,
      excludePatterns,
    })
    
    return NextResponse.json({
      success: true,
      data: result,
      metadata: {
        paths,
        includePatterns,
        excludePatterns,
        timestamp: new Date().toISOString(),
        duration: Date.now() - request.headers.get('x-request-start') || 0,
      },
    })
    
  } catch (error) {
    console.error('Repository audit error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid request data',
          details: error.errors,
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Repository audit API endpoint',
    description: 'Analyzes repository structure, identifies issues, and provides refactoring recommendations',
    methods: ['POST'],
    parameters: {
      paths: 'Array of directory paths to analyze (required)',
      includePatterns: 'Array of file patterns to include (optional)',
      excludePatterns: 'Array of file patterns to exclude (optional)',
      options: 'Additional analysis options (optional)',
    },
  })
}
