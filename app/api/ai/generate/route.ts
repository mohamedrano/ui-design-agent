import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { generateDesignSystemFlow } from '@/lib/ai/flows/generate-design-system.flow'
import { generateComponentLibraryFlow } from '@/lib/ai/flows/component-library.flow'

const GenerateRequestSchema = z.object({
  type: z.enum(['design-system', 'component-library', 'tokens', 'theme']),
  input: z.record(z.any()),
  options: z.object({
    includeDocumentation: z.boolean().default(true),
    includeExamples: z.boolean().default(true),
    includeTests: z.boolean().default(true),
    includeStorybook: z.boolean().default(true),
    format: z.enum(['json', 'yaml', 'typescript', 'javascript']).default('typescript'),
  }).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = GenerateRequestSchema.parse(body)
    
    const { type, input, options = {} } = validatedData
    
    let result
    
    switch (type) {
      case 'design-system':
        result = await generateDesignSystemFlow({
          input,
          options: {
            includeDocumentation: options.includeDocumentation,
            includeExamples: options.includeExamples,
            includeTests: options.includeTests,
            format: options.format,
          },
        })
        break
        
      case 'component-library':
        result = await generateComponentLibraryFlow({
          input,
          options: {
            includeDocumentation: options.includeDocumentation,
            includeExamples: options.includeExamples,
            includeTests: options.includeTests,
            includeStorybook: options.includeStorybook,
            format: options.format,
          },
        })
        break
        
      default:
        return NextResponse.json(
          { error: 'Invalid generation type' },
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
    console.error('Generation error:', error)
    
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
    message: 'Generation API endpoint',
    supportedTypes: ['design-system', 'component-library', 'tokens', 'theme'],
    methods: ['POST'],
  })
}
