import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { visualDiffFlow } from '@/lib/ai/flows/visual-diff.flow'

const VisualDiffRequestSchema = z.object({
  baseline: z.object({
    url: z.string().url(),
    viewport: z.object({
      width: z.number(),
      height: z.number(),
    }),
  }),
  candidate: z.object({
    url: z.string().url(),
    viewport: z.object({
      width: z.number(),
      height: z.number(),
    }),
  }),
  options: z.object({
    threshold: z.number().min(0).max(1).default(0.1),
    includeFullPage: z.boolean().default(true),
    includeElements: z.array(z.string()).optional(),
    includeAnimations: z.boolean().default(false),
    includeInteractions: z.boolean().default(false),
    includeAccessibility: z.boolean().default(true),
  }).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = VisualDiffRequestSchema.parse(body)
    
    const { baseline, candidate, options = {} } = validatedData
    
    // Run visual diff analysis
    const result = await visualDiffFlow({
      baseline,
      candidate,
      options: {
        threshold: options.threshold,
        includeFullPage: options.includeFullPage,
        includeElements: options.includeElements,
        includeAnimations: options.includeAnimations,
        includeInteractions: options.includeInteractions,
        includeAccessibility: options.includeAccessibility,
      },
    })
    
    return NextResponse.json({
      success: true,
      data: result,
      metadata: {
        baseline: baseline.url,
        candidate: candidate.url,
        threshold: options.threshold,
        timestamp: new Date().toISOString(),
        duration: Date.now() - request.headers.get('x-request-start') || 0,
      },
    })
    
  } catch (error) {
    console.error('Visual diff analysis error:', error)
    
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
    message: 'Visual diff analysis API endpoint',
    description: 'Compares visual differences between baseline and candidate versions',
    methods: ['POST'],
    parameters: {
      baseline: 'Baseline version configuration (required)',
      candidate: 'Candidate version configuration (required)',
      options: 'Analysis options (optional)',
    },
    baseline: {
      url: 'Baseline URL (required)',
      viewport: 'Viewport dimensions (required)',
    },
    candidate: {
      url: 'Candidate URL (required)',
      viewport: 'Viewport dimensions (required)',
    },
    options: {
      threshold: 'Difference threshold (default: 0.1)',
      includeFullPage: 'Include full page comparison (default: true)',
      includeElements: 'Specific elements to compare (optional)',
      includeAnimations: 'Include animation comparison (default: false)',
      includeInteractions: 'Include interaction comparison (default: false)',
      includeAccessibility: 'Include accessibility comparison (default: true)',
    },
  })
}
