import { configureGenkit } from '@genkit-ai/core'
import { googleAI } from '@genkit-ai/googleai'
import { flow } from '@genkit-ai/flow'
import { z } from 'zod'

// Configure Genkit with Google AI
export const ai = configureGenkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY!,
    }),
  ],
  logLevel: 'info',
  enableTracingAndMetrics: true,
})

// Export flow for use in other modules
export { flow }

// Common schemas for AI responses
export const CommonSchemas = {
  ErrorResponse: z.object({
    error: z.string(),
    code: z.string().optional(),
    details: z.record(z.any()).optional(),
  }),

  SuccessResponse: z.object({
    success: z.boolean(),
    data: z.any(),
    metadata: z.record(z.any()).optional(),
  }),

  AnalysisResult: z.object({
    score: z.number().min(0).max(100),
    issues: z.array(z.object({
      severity: z.enum(['critical', 'high', 'medium', 'low']),
      description: z.string(),
      howToFix: z.string(),
      lineNumber: z.number().optional(),
    })),
    recommendations: z.array(z.string()),
    metrics: z.record(z.number()).optional(),
  }),
}

// Retry configuration
export const retryConfig = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 10000,
  backoffFactor: 2,
}

// Circuit breaker configuration
export const circuitBreakerConfig = {
  failureThreshold: 5,
  recoveryTimeout: 30000,
  monitoringPeriod: 60000,
}

// Model configuration
export const modelConfig = {
  analysis: {
    model: 'googleai/gemini-2.5-pro',
    temperature: 0.2,
    maxOutputTokens: 4000,
  },
  generation: {
    model: 'googleai/gemini-2.5-pro',
    temperature: 0.7,
    maxOutputTokens: 4000,
  },
  chat: {
    model: 'googleai/gemini-2.5-pro',
    temperature: 0.5,
    maxOutputTokens: 2000,
  },
}

// Utility function for retry logic
export async function withRetry<T>(
  fn: () => Promise<T>,
  config = retryConfig
): Promise<T> {
  let lastError: Error
  
  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      
      if (attempt === config.maxRetries) {
        throw lastError
      }
      
      const delay = Math.min(
        config.baseDelay * Math.pow(config.backoffFactor, attempt),
        config.maxDelay
      )
      
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
  
  throw lastError!
}

// Utility function for circuit breaker
export class CircuitBreaker {
  private failures = 0
  private lastFailureTime = 0
  private state: 'closed' | 'open' | 'half-open' = 'closed'

  constructor(private config = circuitBreakerConfig) {}

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      if (Date.now() - this.lastFailureTime > this.config.recoveryTimeout) {
        this.state = 'half-open'
      } else {
        throw new Error('Circuit breaker is open')
      }
    }

    try {
      const result = await fn()
      this.onSuccess()
      return result
    } catch (error) {
      this.onFailure()
      throw error
    }
  }

  private onSuccess() {
    this.failures = 0
    this.state = 'closed'
  }

  private onFailure() {
    this.failures++
    this.lastFailureTime = Date.now()
    
    if (this.failures >= this.config.failureThreshold) {
      this.state = 'open'
    }
  }
}

// Global circuit breaker instance
export const circuitBreaker = new CircuitBreaker()
