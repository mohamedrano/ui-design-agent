import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { analyzePerformanceFlow } from '@/lib/ai/flows/performance-audit.flow'

const PerformanceRequestSchema = z.object({
  url: z.string().url(),
  options: z.object({
    includeMetrics: z.boolean().default(true),
    includeRecommendations: z.boolean().default(true),
    includeBudget: z.boolean().default(true),
    device: z.enum(['desktop', 'mobile', 'both']).default('both'),
    connection: z.enum(['slow3g', 'fast3g', '4g', 'wifi']).default('4g'),
    throttling: z.boolean().default(true),
  }).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = PerformanceRequestSchema.parse(body)
    
    const { url, options = {} } = validatedData
    
    // Run performance analysis
    const result = await analyzePerformanceFlow({
      url,
      options: {
        includeMetrics: options.includeMetrics,
        includeRecommendations: options.includeRecommendations,
        includeBudget: options.includeBudget,
        device: options.device,
        connection: options.connection,
        throttling: options.throttling,
      },
    })
    
    return NextResponse.json({
      success: true,
      data: result,
      metadata: {
        url,
        device: options.device,
        connection: options.connection,
        timestamp: new Date().toISOString(),
        duration: Date.now() - request.headers.get('x-request-start') || 0,
      },
    })
    
  } catch (error) {
    console.error('Performance analysis error:', error)
    
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
    message: 'Performance analysis API endpoint',
    description: 'Analyzes website performance using Lighthouse and provides optimization recommendations',
    methods: ['POST'],
    parameters: {
      url: 'URL to analyze (required)',
      options: 'Analysis options (optional)',
    },
    options: {
      includeMetrics: 'Include performance metrics (default: true)',
      includeRecommendations: 'Include optimization recommendations (default: true)',
      includeBudget: 'Include budget analysis (default: true)',
      device: 'Device type for analysis (default: both)',
      connection: 'Network connection type (default: 4g)',
      throttling: 'Enable network throttling (default: true)',
    },
  })
}
