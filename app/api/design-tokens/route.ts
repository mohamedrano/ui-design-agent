import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { generateDesignTokensFlow } from '@/lib/ai/flows/generate-design-tokens.flow'

const DesignTokensRequestSchema = z.object({
  input: z.object({
    colors: z.record(z.string()).optional(),
    spacing: z.record(z.string()).optional(),
    typography: z.record(z.any()).optional(),
    shadows: z.record(z.string()).optional(),
    borders: z.record(z.any()).optional(),
    animations: z.record(z.any()).optional(),
  }),
  options: z.object({
    format: z.enum(['json', 'yaml', 'typescript', 'javascript', 'css']).default('typescript'),
    includeDocumentation: z.boolean().default(true),
    includeExamples: z.boolean().default(true),
    includeTailwindConfig: z.boolean().default(true),
    includeCSSVariables: z.boolean().default(true),
    includeStyleDictionary: z.boolean().default(true),
  }).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = DesignTokensRequestSchema.parse(body)
    
    const { input, options = {} } = validatedData
    
    // Run design tokens generation
    const result = await generateDesignTokensFlow({
      input,
      options: {
        format: options.format,
        includeDocumentation: options.includeDocumentation,
        includeExamples: options.includeExamples,
        includeTailwindConfig: options.includeTailwindConfig,
        includeCSSVariables: options.includeCSSVariables,
        includeStyleDictionary: options.includeStyleDictionary,
      },
    })
    
    return NextResponse.json({
      success: true,
      data: result,
      metadata: {
        format: options.format,
        timestamp: new Date().toISOString(),
        duration: Date.now() - request.headers.get('x-request-start') || 0,
      },
    })
    
  } catch (error) {
    console.error('Design tokens generation error:', error)
    
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
    message: 'Design tokens generation API endpoint',
    description: 'Generates design tokens in various formats with documentation and examples',
    methods: ['POST'],
    parameters: {
      input: 'Design token input data (required)',
      options: 'Generation options (optional)',
    },
    input: {
      colors: 'Color palette (optional)',
      spacing: 'Spacing scale (optional)',
      typography: 'Typography scale (optional)',
      shadows: 'Shadow scale (optional)',
      borders: 'Border scale (optional)',
      animations: 'Animation scale (optional)',
    },
    options: {
      format: 'Output format (default: typescript)',
      includeDocumentation: 'Include documentation (default: true)',
      includeExamples: 'Include usage examples (default: true)',
      includeTailwindConfig: 'Include Tailwind config (default: true)',
      includeCSSVariables: 'Include CSS variables (default: true)',
      includeStyleDictionary: 'Include Style Dictionary config (default: true)',
    },
  })
}
