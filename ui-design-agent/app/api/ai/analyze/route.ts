import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { analyzeHTMLFlow } from '@/lib/ai/flows/analyze-html.flow'
import { analyzeCSSFlow } from '@/lib/ai/flows/analyze-css.flow'
import { analyzeAccessibilityFlow } from '@/lib/ai/flows/accessibility-audit.flow'
import { analyzePerformanceFlow } from '@/lib/ai/flows/performance-audit.flow'

const AnalyzeRequestSchema = z.object({
  type: z.enum(['css', 'html', 'accessibility', 'performance']),
  content: z.string(),
  options: z.object({
    includeMetrics: z.boolean().default(true),
    includeRecommendations: z.boolean().default(true),
    severity: z.enum(['all', 'critical', 'high', 'medium', 'low']).default('all'),
  }).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = AnalyzeRequestSchema.parse(body)
    
    const { type, content, options = {} } = validatedData
    
    let result
    
    switch (type) {
      case 'css':
        result = await analyzeCSSFlow({
          css: content,
          options: {
            includeMetrics: options.includeMetrics,
            includeRecommendations: options.includeRecommendations,
            severity: options.severity,
          },
        })
        break
        
      case 'html':
        result = await analyzeHTMLFlow({
          htmlOrJsx: content,
          options: {
            includeMetrics: options.includeMetrics,
            includeRecommendations: options.includeRecommendations,
            severity: options.severity,
          },
        })
        break
        
      case 'accessibility':
        result = await analyzeAccessibilityFlow({
          html: content,
          options: {
            includeMetrics: options.includeMetrics,
            includeRecommendations: options.includeRecommendations,
            severity: options.severity,
          },
        })
        break
        
      case 'performance':
        result = await analyzePerformanceFlow({
          url: content,
          options: {
            includeMetrics: options.includeMetrics,
            includeRecommendations: options.includeRecommendations,
            severity: options.severity,
          },
        })
        break
        
      default:
        return NextResponse.json(
          { error: 'Invalid analysis type' },
          { status: 400 }
        )
    }
    
    return NextResponse.json({
      success: true,
      data: result,
      metadata: {
        type,
        timestamp: new Date().toISOString(),
        duration: Date.now() - request.headers.get('x-request-start') || 0,
      },
    })
    
  } catch (error) {
    console.error('Analysis error:', error)
    
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
    message: 'Analysis API endpoint',
    supportedTypes: ['css', 'html', 'accessibility', 'performance'],
    methods: ['POST'],
  })
}
