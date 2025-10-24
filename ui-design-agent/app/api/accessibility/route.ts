import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { analyzeAccessibilityFlow } from '@/lib/ai/flows/accessibility-audit.flow'

const AccessibilityRequestSchema = z.object({
  html: z.string().min(1),
  css: z.string().optional(),
  options: z.object({
    includeMetrics: z.boolean().default(true),
    includeRecommendations: z.boolean().default(true),
    severity: z.enum(['all', 'critical', 'high', 'medium', 'low']).default('all'),
    wcagLevel: z.enum(['A', 'AA', 'AAA']).default('AA'),
    includeAutomated: z.boolean().default(true),
    includeManual: z.boolean().default(false),
  }).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = AccessibilityRequestSchema.parse(body)
    
    const { html, css, options = {} } = validatedData
    
    // Run accessibility analysis
    const result = await analyzeAccessibilityFlow({
      html,
      css,
      options: {
        includeMetrics: options.includeMetrics,
        includeRecommendations: options.includeRecommendations,
        severity: options.severity,
        wcagLevel: options.wcagLevel,
        includeAutomated: options.includeAutomated,
        includeManual: options.includeManual,
      },
    })
    
    return NextResponse.json({
      success: true,
      data: result,
      metadata: {
        wcagLevel: options.wcagLevel,
        severity: options.severity,
        timestamp: new Date().toISOString(),
        duration: Date.now() - request.headers.get('x-request-start') || 0,
      },
    })
    
  } catch (error) {
    console.error('Accessibility analysis error:', error)
    
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
    message: 'Accessibility analysis API endpoint',
    description: 'Analyzes HTML/CSS for accessibility issues and provides WCAG compliance recommendations',
    methods: ['POST'],
    parameters: {
      html: 'HTML content to analyze (required)',
      css: 'CSS content for context (optional)',
      options: 'Analysis options (optional)',
    },
    options: {
      includeMetrics: 'Include accessibility metrics (default: true)',
      includeRecommendations: 'Include improvement recommendations (default: true)',
      severity: 'Filter by issue severity (default: all)',
      wcagLevel: 'WCAG compliance level (default: AA)',
      includeAutomated: 'Include automated checks (default: true)',
      includeManual: 'Include manual checks (default: false)',
    },
  })
}
