export const appConfig = {
  name: 'UI Design Agent',
  version: '1.0.0',
  description: 'Advanced UI Design & Redesign Intelligence Agent',
  
  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    timeout: 30000,
    retries: 3,
  },
  
  // AI Configuration
  ai: {
    model: 'googleai/gemini-2.5-pro',
    temperature: {
      analysis: 0.2,
      generation: 0.7,
      chat: 0.5,
    },
    maxTokens: 4000,
    timeout: 30000,
  },
  
  // Rate Limiting
  rateLimit: {
    requestsPerMinute: parseInt(process.env.RATE_LIMIT_REQUESTS_PER_MINUTE || '60'),
    burstSize: parseInt(process.env.RATE_LIMIT_BURST_SIZE || '10'),
  },
  
  // Performance Budgets
  performance: {
    lcp: {
      desktop: parseInt(process.env.LIGHTHOUSE_BUDGET_LCP_DESKTOP || '2500'),
      mobile: parseInt(process.env.LIGHTHOUSE_BUDGET_LCP_MOBILE || '3500'),
    },
    bundleSize: parseInt(process.env.LIGHTHOUSE_BUDGET_BUNDLE_SIZE_KB || '300'),
  },
  
  // Features
  features: {
    accessibility: true,
    performance: true,
    seo: true,
    visualRegression: true,
    codeQuality: true,
    designSystem: true,
    componentLibrary: true,
    abTesting: true,
  },
  
  // UI Configuration
  ui: {
    theme: 'light',
    language: 'en',
    timezone: 'UTC',
  },
  
  // Security
  security: {
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      credentials: true,
    },
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'origin-when-cross-origin',
      'X-XSS-Protection': '1; mode=block',
    },
  },
  
  // Monitoring
  monitoring: {
    sentry: {
      dsn: process.env.SENTRY_DSN,
      enabled: !!process.env.SENTRY_DSN,
    },
    analytics: {
      enabled: process.env.NODE_ENV === 'production',
    },
  },
  
  // Development
  development: {
    debug: process.env.NODE_ENV === 'development',
    hotReload: true,
    sourceMaps: true,
  },
} as const

export type AppConfig = typeof appConfig
