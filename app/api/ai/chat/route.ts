import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { ai } from '@/lib/ai/genkit'

const ChatRequestSchema = z.object({
  message: z.string().min(1),
  context: z.object({
    projectId: z.string().optional(),
    analysisId: z.string().optional(),
    conversationId: z.string().optional(),
    previousMessages: z.array(z.object({
      role: z.enum(['user', 'assistant']),
      content: z.string(),
      timestamp: z.string(),
    })).optional(),
  }).optional(),
  options: z.object({
    temperature: z.number().min(0).max(2).default(0.7),
    maxTokens: z.number().min(1).max(4000).default(2000),
    includeContext: z.boolean().default(true),
    includeRecommendations: z.boolean().default(true),
  }).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = ChatRequestSchema.parse(body)
    
    const { message, context = {}, options = {} } = validatedData
    
    // Build context-aware prompt
    let prompt = message
    
    if (context.includeContext && context.projectId) {
      prompt = `Project Context: ${context.projectId}\n\nUser Message: ${message}`
    }
    
    if (context.previousMessages && context.previousMessages.length > 0) {
      const conversationHistory = context.previousMessages
        .slice(-5) // Keep last 5 messages for context
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n')
      
      prompt = `Previous Conversation:\n${conversationHistory}\n\nCurrent Message: ${message}`
    }
    
    // Generate response using AI
    const result = await ai.generate({
      model: 'googleai/gemini-2.5-pro',
      prompt,
      config: {
        temperature: options.temperature,
        maxOutputTokens: options.maxTokens,
      },
      system: 'You are a UI/UX design expert and code analysis assistant. Provide helpful, accurate, and actionable advice for UI design, CSS analysis, accessibility, and performance optimization.',
    })
    
    return NextResponse.json({
      success: true,
      data: {
        message: result.text,
        conversationId: context.conversationId || `conv_${Date.now()}`,
        timestamp: new Date().toISOString(),
        metadata: {
          model: 'googleai/gemini-2.5-pro',
          temperature: options.temperature,
          maxTokens: options.maxTokens,
          tokensUsed: result.usage?.totalTokens || 0,
        },
      },
    })
    
  } catch (error) {
    console.error('Chat error:', error)
    
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
    message: 'Chat API endpoint',
    description: 'AI-powered chat for UI/UX design assistance and code analysis',
    methods: ['POST'],
    parameters: {
      message: 'User message (required)',
      context: 'Conversation context (optional)',
      options: 'Chat options (optional)',
    },
  })
}
