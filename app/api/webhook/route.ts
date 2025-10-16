import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { webhookHandler } from '@/lib/webhook-handler'

const WebhookRequestSchema = z.object({
  type: z.enum(['github', 'vercel', 'figma', 'slack', 'custom']),
  event: z.string(),
  data: z.record(z.any()),
  signature: z.string().optional(),
  timestamp: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = WebhookRequestSchema.parse(body)
    
    const { type, event, data, signature, timestamp } = validatedData
    
    // Verify webhook signature if provided
    if (signature && !webhookHandler.verifySignature(type, signature, body)) {
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      )
    }
    
    // Process webhook
    const result = await webhookHandler.process({
      type,
      event,
      data,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
    })
    
    return NextResponse.json({
      success: true,
      data: result,
      metadata: {
        type,
        event,
        timestamp: new Date().toISOString(),
        duration: Date.now() - request.headers.get('x-request-start') || 0,
      },
    })
    
  } catch (error) {
    console.error('Webhook processing error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid webhook data',
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
    message: 'Webhook API endpoint',
    description: 'Handles webhooks from various services',
    methods: ['POST'],
    supportedTypes: ['github', 'vercel', 'figma', 'slack', 'custom'],
    events: {
      github: ['push', 'pull_request', 'issues', 'deployment'],
      vercel: ['deployment', 'build', 'error'],
      figma: ['file_update', 'comment', 'version'],
      slack: ['message', 'reaction', 'user_change'],
      custom: ['*'],
    },
  })
}
