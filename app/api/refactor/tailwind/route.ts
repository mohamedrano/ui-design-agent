import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { refactorCssToTailwindFlow } from '@/lib/ai/flows/refactor-css-to-tailwind.flow'

const RefactorRequestSchema = z.object({
  css: z.string().min(1),
  filePath: z.string().min(1),
  options: z.object({
    removeUnused: z.boolean().default(true),
    preserveComments: z.boolean().default(true),
    generateUtilities: z.boolean().default(true),
    includePatches: z.boolean().default(true),
    includeCoverage: z.boolean().default(true),
    includeRecommendations: z.boolean().default(true),
  }).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = RefactorRequestSchema.parse(body)
    
    const { css, filePath, options = {} } = validatedData
    
    // Validate CSS content
    if (!css.trim()) {
      return NextResponse.json(
        { error: 'CSS content cannot be empty' },
        { status: 400 }
      )
    }
    
    // Validate file path
    if (!filePath.trim()) {
      return NextResponse.json(
        { error: 'File path cannot be empty' },
        { status: 400 }
      )
    }
    
    // Run CSS to Tailwind refactoring
    const result = await refactorCssToTailwindFlow({
      css,
      filePath,
      options,
    })
    
    return NextResponse.json({
      success: true,
      data: result,
      metadata: {
        filePath,
        originalSize: css.length,
        refactoredSize: result.patches.reduce((total, patch) => total + patch.after.length, 0),
        utilitiesCoverage: result.utilitiesCoverage,
        removedUnusedRules: result.removedUnusedRules,
        timestamp: new Date().toISOString(),
        duration: Date.now() - request.headers.get('x-request-start') || 0,
      },
    })
    
  } catch (error) {
    console.error('CSS refactoring error:', error)
    
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
    message: 'CSS to Tailwind refactoring API endpoint',
    description: 'Converts CSS to Tailwind utilities with patches and recommendations',
    methods: ['POST'],
    parameters: {
      css: 'CSS content to refactor (required)',
      filePath: 'File path for context (required)',
      options: 'Refactoring options (optional)',
    },
    options: {
      removeUnused: 'Remove unused CSS rules (default: true)',
      preserveComments: 'Preserve CSS comments (default: true)',
      generateUtilities: 'Generate custom utilities (default: true)',
      includePatches: 'Include diff patches (default: true)',
      includeCoverage: 'Include coverage analysis (default: true)',
      includeRecommendations: 'Include recommendations (default: true)',
    },
  })
}
