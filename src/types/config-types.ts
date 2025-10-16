export interface AppConfig {
  name: string
  version: string
  description: string
  api: APIConfig
  ai: AIConfig
  rateLimit: RateLimitConfig
  performance: PerformanceConfig
  features: FeaturesConfig
  ui: UIConfig
  security: SecurityConfig
  monitoring: MonitoringConfig
  development: DevelopmentConfig
}

export interface APIConfig {
  baseUrl: string
  timeout: number
  retries: number
}

export interface AIConfig {
  model: string
  temperature: {
    analysis: number
    generation: number
    chat: number
  }
  maxTokens: number
  timeout: number
}

export interface RateLimitConfig {
  requestsPerMinute: number
  burstSize: number
}

export interface PerformanceConfig {
  lcp: {
    desktop: number
    mobile: number
  }
  bundleSize: number
}

export interface FeaturesConfig {
  accessibility: boolean
  performance: boolean
  seo: boolean
  visualRegression: boolean
  codeQuality: boolean
  designSystem: boolean
  componentLibrary: boolean
  abTesting: boolean
}

export interface UIConfig {
  theme: string
  language: string
  timezone: string
}

export interface SecurityConfig {
  cors: {
    origin: string
    credentials: boolean
  }
  headers: Record<string, string>
}

export interface MonitoringConfig {
  sentry: {
    dsn?: string
    enabled: boolean
  }
  analytics: {
    enabled: boolean
  }
}

export interface DevelopmentConfig {
  debug: boolean
  hotReload: boolean
  sourceMaps: boolean
}

export interface BudgetConfig {
  performance: PerformanceBudget
  accessibility: AccessibilityBudget
  seo: SEOBudget
  bestPractices: BestPracticesBudget
  bundleAnalysis: BundleAnalysisBudget
  visualRegression: VisualRegressionBudget
  codeQuality: CodeQualityBudget
  testCoverage: TestCoverageBudget
  metrics: PerformanceMetrics
}

export interface PerformanceBudget {
  desktop: {
    LCP: number
    INP: number
    CLS: number
    TTI: number
    bundleKb: number
    imageKb: number
  }
  mobile: {
    LCP: number
    INP: number
    CLS: number
    TTI: number
    bundleKb: number
    imageKb: number
  }
}

export interface AccessibilityBudget {
  minimumScore: number
  criticalIssues: number
  highIssues: number
  mediumIssues: number
}

export interface SEOBudget {
  minimumScore: number
  metaTags: {
    title: boolean
    description: boolean
    keywords: boolean
    ogTags: boolean
    twitterTags: boolean
  }
  structuredData: {
    required: boolean
    recommended: boolean
  }
}

export interface BestPracticesBudget {
  minimumScore: number
  https: boolean
  noConsoleErrors: boolean
  noDeprecatedApis: boolean
  noVulnerableLibraries: boolean
}

export interface BundleAnalysisBudget {
  maxTotalSize: number
  maxInitialSize: number
  maxChunkSize: number
  maxAsyncChunks: number
  maxDuplicates: number
}

export interface VisualRegressionBudget {
  threshold: number
  maxDifferences: number
  criticalElements: string[]
}

export interface CodeQualityBudget {
  maxComplexity: number
  maxCyclomaticComplexity: number
  maxCognitiveComplexity: number
  maxLinesPerFunction: number
  maxParameters: number
  maxNestingDepth: number
}

export interface TestCoverageBudget {
  statements: number
  branches: number
  functions: number
  lines: number
  criticalPaths: number
}

export interface PerformanceMetrics {
  LCP: {
    good: number
    needsImprovement: number
    poor: number
  }
  INP: {
    good: number
    needsImprovement: number
    poor: number
  }
  CLS: {
    good: number
    needsImprovement: number
    poor: number
  }
  FCP: {
    good: number
    needsImprovement: number
    poor: number
  }
  TTI: {
    good: number
    needsImprovement: number
    poor: number
  }
  TBT: {
    good: number
    needsImprovement: number
    poor: number
  }
}

export interface EnvironmentConfig {
  NODE_ENV: 'development' | 'production' | 'test'
  GOOGLE_GENAI_API_KEY: string
  UPSTASH_REDIS_REST_URL?: string
  UPSTASH_REDIS_REST_TOKEN?: string
  SENTRY_DSN?: string
  SENTRY_ORG?: string
  SENTRY_PROJECT?: string
  FIGMA_ACCESS_TOKEN?: string
  NEXT_PUBLIC_APP_URL: string
  LIGHTHOUSE_BUDGET_LCP_DESKTOP?: string
  LIGHTHOUSE_BUDGET_LCP_MOBILE?: string
  LIGHTHOUSE_BUDGET_BUNDLE_SIZE_KB?: string
  RATE_LIMIT_REQUESTS_PER_MINUTE?: string
  RATE_LIMIT_BURST_SIZE?: string
  AI_MODEL_TEMPERATURE_ANALYSIS?: string
  AI_MODEL_TEMPERATURE_GENERATION?: string
  AI_MODEL_MAX_TOKENS?: string
  AI_MODEL_TIMEOUT_MS?: string
}

export interface DatabaseConfig {
  type: 'postgresql' | 'mysql' | 'sqlite' | 'mongodb'
  host: string
  port: number
  database: string
  username: string
  password: string
  ssl: boolean
  pool: {
    min: number
    max: number
    idle: number
  }
}

export interface CacheConfig {
  type: 'redis' | 'memory' | 'file'
  host?: string
  port?: number
  password?: string
  ttl: number
  maxSize: number
}

export interface LoggingConfig {
  level: 'error' | 'warn' | 'info' | 'debug'
  format: 'json' | 'text'
  destination: 'console' | 'file' | 'remote'
  file?: {
    path: string
    maxSize: string
    maxFiles: number
  }
  remote?: {
    url: string
    token: string
  }
}

export interface TestingConfig {
  unit: {
    framework: 'vitest' | 'jest' | 'mocha'
    coverage: {
      threshold: number
      reporters: string[]
    }
  }
  e2e: {
    framework: 'playwright' | 'cypress' | 'puppeteer'
    browsers: string[]
    viewports: Array<{ width: number; height: number }>
  }
  visual: {
    framework: 'percy' | 'chromatic' | 'reg-suit'
    threshold: number
    viewports: Array<{ width: number; height: number }>
  }
}

export interface BuildConfig {
  target: 'es5' | 'es2015' | 'es2017' | 'es2018' | 'es2019' | 'es2020' | 'es2021' | 'es2022'
  minify: boolean
  sourcemap: boolean
  treeshake: boolean
  bundle: {
    analyzer: boolean
    splitChunks: boolean
    lazyLoading: boolean
  }
}

export interface DeployConfig {
  provider: 'vercel' | 'netlify' | 'aws' | 'gcp' | 'azure'
  region: string
  environment: 'development' | 'staging' | 'production'
  domain: string
  ssl: boolean
  cdn: boolean
  monitoring: boolean
}
