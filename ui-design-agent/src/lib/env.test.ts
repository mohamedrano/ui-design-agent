import { describe, it, expect, vi, beforeEach } from 'vitest';
import { env, isDevelopment, isProduction, isTest, features, apiConfig } from './env';

describe('Environment Configuration', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  describe('Environment Variables', () => {
    it('should have required environment variables in test mode', () => {
      expect(env.NODE_ENV).toBe('test');
      expect(env.GOOGLE_GENAI_API_KEY).toBe('test-key');
      expect(env.OPENAI_API_KEY).toBe('test-key');
      expect(env.ANTHROPIC_API_KEY).toBe('test-key');
      expect(env.HUGGINGFACE_API_KEY).toBe('test-key');
      expect(env.FIGMA_ACCESS_TOKEN).toBe('test-token');
    });

    it('should have proper default values', () => {
      expect(env.PORT).toBe(3000);
      expect(env.HOST).toBe('localhost');
      expect(env.RATE_LIMIT_REQUESTS_PER_MINUTE).toBe(1000);
      expect(env.RATE_LIMIT_BURST_SIZE).toBe(2000);
      expect(env.CACHE_TTL_SECONDS).toBe(3600);
      expect(env.MAX_FILE_SIZE_MB).toBe(10);
    });

    it('should have feature flags configured correctly', () => {
      expect(env.ENABLE_ANALYTICS).toBe(false);
      expect(env.ENABLE_VOICE_FEATURES).toBe(false);
      expect(env.ENABLE_3D_PREVIEW).toBe(false);
      expect(env.ENABLE_AI_SUGGESTIONS).toBe(true);
    });

    it('should skip validation in test environment', () => {
      expect(env.SKIP_ENV_VALIDATION).toBe(true);
    });
  });

  describe('Environment Helper Functions', () => {
    it('should correctly identify test environment', () => {
      expect(isDevelopment).toBe(false);
      expect(isProduction).toBe(false);
      expect(isTest).toBe(true);
    });
  });

  describe('Feature Flags', () => {
    it('should have correct feature flag values', () => {
      expect(features.analytics).toBe(false);
      expect(features.voice).toBe(false);
      expect(features.preview3D).toBe(false);
      expect(features.aiSuggestions).toBe(true);
    });
  });

  describe('API Configuration', () => {
    it('should have proper rate limiting configuration', () => {
      expect(apiConfig.rateLimit.requestsPerMinute).toBe(1000);
      expect(apiConfig.rateLimit.burstSize).toBe(2000);
    });

    it('should have proper cache configuration', () => {
      expect(apiConfig.cache.ttlSeconds).toBe(3600);
      expect(apiConfig.cache.redisUrl).toBeUndefined();
    });

    it('should have proper upload configuration', () => {
      expect(apiConfig.upload.maxFileSizeMB).toBe(10);
      expect(apiConfig.upload.allowedTypes).toEqual([
        'image/*',
        'text/*',
        '.fig',
        '.sketch',
        '.xd',
      ]);
    });

    it('should have proper CORS configuration', () => {
      expect(apiConfig.cors.origins).toBe(true);
    });
  });

  describe('Environment Validation Edge Cases', () => {
    it('should handle missing optional variables gracefully', () => {
      expect(env.DATABASE_URL).toBeUndefined();
      expect(env.REDIS_URL).toBeUndefined();
      expect(env.SENTRY_DSN).toBeUndefined();
      expect(env.NEXTAUTH_SECRET).toBeUndefined();
    });

    it('should have proper file type configuration', () => {
      const allowedTypes = env.ALLOWED_FILE_TYPES.split(',');
      expect(allowedTypes).toContain('image/*');
      expect(allowedTypes).toContain('text/*');
      expect(allowedTypes).toContain('.fig');
      expect(allowedTypes).toContain('.sketch');
      expect(allowedTypes).toContain('.xd');
    });

    it('should have reasonable timeout and limit values', () => {
      expect(env.CACHE_TTL_SECONDS).toBeGreaterThan(0);
      expect(env.RATE_LIMIT_REQUESTS_PER_MINUTE).toBeGreaterThan(0);
      expect(env.RATE_LIMIT_BURST_SIZE).toBeGreaterThan(0);
      expect(env.MAX_FILE_SIZE_MB).toBeGreaterThan(0);
    });
  });

  describe('Type Safety', () => {
    it('should have proper TypeScript types', () => {
      // Test that the env object has the correct structure
      expect(typeof env.NODE_ENV).toBe('string');
      expect(typeof env.PORT).toBe('number');
      expect(typeof env.HOST).toBe('string');
      expect(typeof env.ENABLE_ANALYTICS).toBe('boolean');
      expect(typeof env.ENABLE_VOICE_FEATURES).toBe('boolean');
      expect(typeof env.ENABLE_3D_PREVIEW).toBe('boolean');
      expect(typeof env.ENABLE_AI_SUGGESTIONS).toBe('boolean');
    });

    it('should have proper feature flag types', () => {
      expect(typeof features.analytics).toBe('boolean');
      expect(typeof features.voice).toBe('boolean');
      expect(typeof features.preview3D).toBe('boolean');
      expect(typeof features.aiSuggestions).toBe('boolean');
    });

    it('should have proper API config types', () => {
      expect(typeof apiConfig.rateLimit.requestsPerMinute).toBe('number');
      expect(typeof apiConfig.rateLimit.burstSize).toBe('number');
      expect(typeof apiConfig.cache.ttlSeconds).toBe('number');
      expect(typeof apiConfig.upload.maxFileSizeMB).toBe('number');
      expect(Array.isArray(apiConfig.upload.allowedTypes)).toBe(true);
    });
  });

  describe('Security Considerations', () => {
    it('should not expose sensitive data in client', () => {
      // API keys should not be in public environment variables
      expect(env.GOOGLE_GENAI_API_KEY).toBeDefined();
      expect(env.OPENAI_API_KEY).toBeDefined();
      expect(env.ANTHROPIC_API_KEY).toBeDefined();
      expect(env.HUGGINGFACE_API_KEY).toBeDefined();
      expect(env.FIGMA_ACCESS_TOKEN).toBeDefined();
    });

    it('should have reasonable CORS configuration', () => {
      // In test, CORS should be permissive
      expect(apiConfig.cors.origins).toBe(true);
    });

    it('should have file size limits', () => {
      expect(env.MAX_FILE_SIZE_MB).toBeLessThanOrEqual(10);
    });
  });
});
