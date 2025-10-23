import { z } from 'zod';

const envSchema = z.object({
  // Node Environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Server Configuration
  PORT: z.coerce.number().default(3000),
  HOST: z.string().default('localhost'),

  // API Keys - Required for AI Services
  GOOGLE_GENAI_API_KEY: z.string().min(1, 'Google Generative AI API key is required'),
  OPENAI_API_KEY: z.string().min(1, 'OpenAI API key is required'),
  ANTHROPIC_API_KEY: z.string().min(1, 'Anthropic API key is required'),
  HUGGINGFACE_API_KEY: z.string().min(1, 'HuggingFace API key is required'),

  // Design Tools Integration
  FIGMA_ACCESS_TOKEN: z.string().min(1, 'Figma access token is required for design integration'),

  // Database (Optional for advanced features)
  DATABASE_URL: z.string().optional(),
  DATABASE_AUTH_TOKEN: z.string().optional(),

  // Authentication (Optional for user management)
  NEXTAUTH_SECRET: z.string().optional(),
  NEXTAUTH_URL: z.string().url().optional(),

  // Analytics and Monitoring
  SENTRY_DSN: z.string().url().optional(),
  SENTRY_ORG: z.string().optional(),
  SENTRY_PROJECT: z.string().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),

  // Performance Monitoring
  VERCEL_ANALYTICS_ID: z.string().optional(),

  // Feature Flags
  ENABLE_ANALYTICS: z.enum(['true', 'false']).default('true').transform(val => val === 'true'),
  ENABLE_VOICE_FEATURES: z.enum(['true', 'false']).default('true').transform(val => val === 'true'),
  ENABLE_3D_PREVIEW: z.enum(['true', 'false']).default('true').transform(val => val === 'true'),
  ENABLE_AI_SUGGESTIONS: z.enum(['true', 'false']).default('true').transform(val => val === 'true'),

  // Rate Limiting
  RATE_LIMIT_REQUESTS_PER_MINUTE: z.coerce.number().default(100),
  RATE_LIMIT_BURST_SIZE: z.coerce.number().default(200),

  // Cache Configuration
  REDIS_URL: z.string().optional(),
  CACHE_TTL_SECONDS: z.coerce.number().default(3600), // 1 hour

  // File Upload Configuration
  MAX_FILE_SIZE_MB: z.coerce.number().default(10),
  ALLOWED_FILE_TYPES: z.string().default('image/*,text/*,.fig,.sketch,.xd'),

  // Security Configuration
  CORS_ORIGINS: z.string().default('*'),
  SESSION_SECRET: z.string().optional(),

  // External Services
  WEBHOOK_SECRET: z.string().optional(),

  // Development Only
  SKIP_ENV_VALIDATION: z.enum(['true', 'false']).default('false').transform(val => val === 'true'),
});

export type Env = z.infer<typeof envSchema>;

// Environment validation function
function validateEnv(): Env {
  const env = process.env;

  // Skip validation in test environment if explicitly requested
  if (env.SKIP_ENV_VALIDATION === 'true' && env.NODE_ENV === 'test') {
    console.warn('⚠️  Environment validation skipped for testing');
    return env as unknown as Env;
  }

  try {
    const validatedEnv = envSchema.parse(env);

    // Success message
    const isProduction = validatedEnv.NODE_ENV === 'production';
    if (!isProduction) {
      console.log('✅ Environment variables validated successfully');
      console.log(`📊 Running in ${validatedEnv.NODE_ENV} mode`);
      console.log(`🚀 Server will start on ${validatedEnv.HOST}:${validatedEnv.PORT}`);
    }

    return validatedEnv;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Environment validation failed!');
      console.error('💡 Please check your .env file and ensure all required variables are set.\n');

      console.error('Missing or invalid environment variables:');
      error.errors.forEach(err => {
        console.error(`  • ${err.path.join('.')}: ${err.message}`);
      });

      console.error('\n📝 Required environment variables:');
      console.error('  • GOOGLE_GENAI_API_KEY - Google Generative AI API key');
      console.error('  • OPENAI_API_KEY - OpenAI API key for GPT models');
      console.error('  • ANTHROPIC_API_KEY - Anthropic API key for Claude models');
      console.error('  • HUGGINGFACE_API_KEY - HuggingFace API key for ML models');
      console.error('  • FIGMA_ACCESS_TOKEN - Figma personal access token');

      console.error('\n💡 Optional but recommended:');
      console.error('  • SENTRY_DSN - Error monitoring and reporting');
      console.error('  • DATABASE_URL - Database connection for persistent data');
      console.error('  • REDIS_URL - Cache server for performance optimization');

      console.error('\n📋 See .env.example for a complete template');

      process.exit(1);
    }

    console.error('❌ Unexpected error during environment validation:', error);
    process.exit(1);
  }
}

// Validated environment variables
export const env = validateEnv();

// Helper functions for environment checks
export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test';

// Feature flags helpers
export const features = {
  analytics: env.ENABLE_ANALYTICS,
  voice: env.ENABLE_VOICE_FEATURES,
  preview3D: env.ENABLE_3D_PREVIEW,
  aiSuggestions: env.ENABLE_AI_SUGGESTIONS,
} as const;

// API Configuration
export const apiConfig = {
  rateLimit: {
    requestsPerMinute: env.RATE_LIMIT_REQUESTS_PER_MINUTE,
    burstSize: env.RATE_LIMIT_BURST_SIZE,
  },
  cache: {
    ttlSeconds: env.CACHE_TTL_SECONDS,
    redisUrl: env.REDIS_URL,
  },
  upload: {
    maxFileSizeMB: env.MAX_FILE_SIZE_MB,
    allowedTypes: env.ALLOWED_FILE_TYPES.split(','),
  },
  cors: {
    origins: env.CORS_ORIGINS === '*' ? true : env.CORS_ORIGINS.split(','),
  },
} as const;

// Runtime environment check
export function checkRuntimeEnvironment() {
  const requiredForRuntime = [
    'GOOGLE_GENAI_API_KEY',
    'OPENAI_API_KEY',
    'ANTHROPIC_API_KEY',
    'HUGGINGFACE_API_KEY',
    'FIGMA_ACCESS_TOKEN'
  ];

  const missing = requiredForRuntime.filter(key => !process.env[key]);

  if (missing.length > 0 && !isTest) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please check your .env file and ensure all required API keys are configured.'
    );
  }
}

// Export for use in other modules
export default env;
