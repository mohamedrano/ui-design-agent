export interface AIRequest {
  id: string
  type: 'analyze' | 'generate' | 'chat' | 'refactor' | 'audit'
  input: Record<string, any>
  timestamp: Date
  userId?: string
  projectId?: string
}

export interface AIResponse<T = any> {
  id: string
  requestId: string
  data: T
  metadata: {
    model: string
    temperature: number
    tokens: number
    latency: number
    retries: number
  }
  timestamp: Date
  success: boolean
  error?: string
}

export interface AIFlow {
  name: string
  inputSchema: any
  outputSchema: any
  execute: (input: any) => Promise<any>
}

export interface AITool {
  name: string
  description: string
  parameters: any
  execute: (params: any) => Promise<any>
}

export interface AIModel {
  name: string
  provider: string
  version: string
  capabilities: string[]
  limits: {
    maxTokens: number
    maxRequestsPerMinute: number
    maxConcurrentRequests: number
  }
}

export interface AIConfig {
  model: string
  temperature: number
  maxTokens: number
  timeout: number
  retries: number
  circuitBreaker: {
    failureThreshold: number
    recoveryTimeout: number
  }
}

export interface AIError {
  code: string
  message: string
  details?: Record<string, any>
  retryable: boolean
  timestamp: Date
}

export interface AIUsage {
  totalRequests: number
  totalTokens: number
  totalCost: number
  averageLatency: number
  errorRate: number
  lastUpdated: Date
}

export interface AICache {
  key: string
  value: any
  ttl: number
  createdAt: Date
  expiresAt: Date
}

export interface AITelemetry {
  flowName: string
  latency: number
  tokens: number
  retries: number
  success: boolean
  error?: string
  metadata?: Record<string, any>
}
