export interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: APIError
  metadata?: APIMetadata
  timestamp: Date
}

export interface APIError {
  code: string
  message: string
  details?: Record<string, any>
  stack?: string
  timestamp: Date
}

export interface APIMetadata {
  requestId: string
  duration: number
  version: string
  rateLimit?: RateLimitInfo
  pagination?: PaginationInfo
}

export interface RateLimitInfo {
  limit: number
  remaining: number
  reset: Date
  retryAfter?: number
}

export interface PaginationInfo {
  page: number
  limit: number
  total: number
  pages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface APIRequest {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  path: string
  headers?: Record<string, string>
  query?: Record<string, any>
  body?: any
  timestamp: Date
}

export interface APIEndpoint {
  path: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  description: string
  parameters: APIParameter[]
  responses: APIResponseSchema[]
  examples: APIExample[]
}

export interface APIParameter {
  name: string
  type: string
  required: boolean
  description: string
  example?: any
  schema?: any
}

export interface APIResponseSchema {
  status: number
  description: string
  schema: any
  example?: any
}

export interface APIExample {
  name: string
  description: string
  request: APIRequest
  response: APIResponse
}

export interface APIConfig {
  baseUrl: string
  timeout: number
  retries: number
  rateLimit: {
    requestsPerMinute: number
    burstSize: number
  }
  authentication: {
    type: 'none' | 'bearer' | 'api-key' | 'oauth'
    token?: string
    apiKey?: string
    clientId?: string
    clientSecret?: string
  }
  headers: Record<string, string>
  interceptors: {
    request?: (config: APIRequest) => APIRequest
    response?: (response: APIResponse) => APIResponse
    error?: (error: APIError) => APIError
  }
}

export interface APIMiddleware {
  name: string
  priority: number
  execute: (req: APIRequest, res: APIResponse, next: () => void) => void
}

export interface APIRoute {
  path: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  handler: (req: APIRequest) => Promise<APIResponse>
  middleware: APIMiddleware[]
  validation: any
  documentation: APIEndpoint
}

export interface APIServer {
  port: number
  host: string
  routes: APIRoute[]
  middleware: APIMiddleware[]
  errorHandler: (error: Error, req: APIRequest, res: APIResponse) => void
  notFoundHandler: (req: APIRequest, res: APIResponse) => void
}

export interface APIClient {
  config: APIConfig
  request: <T = any>(req: APIRequest) => Promise<APIResponse<T>>
  get: <T = any>(path: string, query?: Record<string, any>) => Promise<APIResponse<T>>
  post: <T = any>(path: string, body?: any) => Promise<APIResponse<T>>
  put: <T = any>(path: string, body?: any) => Promise<APIResponse<T>>
  patch: <T = any>(path: string, body?: any) => Promise<APIResponse<T>>
  delete: <T = any>(path: string) => Promise<APIResponse<T>>
}

export interface APILogger {
  info: (message: string, meta?: Record<string, any>) => void
  warn: (message: string, meta?: Record<string, any>) => void
  error: (message: string, meta?: Record<string, any>) => void
  debug: (message: string, meta?: Record<string, any>) => void
}

export interface APIMonitor {
  metrics: APIMetrics
  health: APIHealth
  alerts: APIAlert[]
}

export interface APIMetrics {
  requests: {
    total: number
    successful: number
    failed: number
    rate: number
  }
  latency: {
    average: number
    p50: number
    p95: number
    p99: number
  }
  errors: {
    total: number
    rate: number
    byType: Record<string, number>
  }
  throughput: {
    requestsPerSecond: number
    bytesPerSecond: number
  }
}

export interface APIHealth {
  status: 'healthy' | 'degraded' | 'unhealthy'
  checks: HealthCheck[]
  uptime: number
  lastCheck: Date
}

export interface HealthCheck {
  name: string
  status: 'pass' | 'fail' | 'warn'
  message?: string
  duration: number
  timestamp: Date
}

export interface APIAlert {
  id: string
  type: 'error' | 'warning' | 'info'
  message: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  timestamp: Date
  resolved: boolean
  resolvedAt?: Date
}
