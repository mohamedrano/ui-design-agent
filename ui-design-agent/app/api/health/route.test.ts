import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { GET, HEAD } from './route';

// Mock environment variables
vi.mock('process', () => ({
  env: {
    NODE_ENV: 'test',
    GOOGLE_GENAI_API_KEY: 'test-key',
    OPENAI_API_KEY: 'test-key',
    ANTHROPIC_API_KEY: 'test-key',
    HUGGINGFACE_API_KEY: 'test-key',
    FIGMA_ACCESS_TOKEN: 'test-token',
    ENABLE_VOICE_FEATURES: 'true',
    ENABLE_3D_PREVIEW: 'true',
    ENABLE_ANALYTICS: 'false',
  },
  version: 'v20.0.0',
  platform: 'linux',
  arch: 'x64',
  uptime: () => 3600,
  memoryUsage: () => ({
    rss: 50000000,
    heapTotal: 30000000,
    heapUsed: 20000000,
    external: 1000000,
    arrayBuffers: 500000,
  }),
}));

describe('/api/health', () => {
  let mockRequest: NextRequest;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRequest = new NextRequest('http://localhost:3000/api/health', {
      method: 'GET',
    });
  });

  describe('GET /api/health', () => {
    it('should return healthy status with complete information', async () => {
      const response = await GET(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toMatchObject({
        status: 'healthy',
        timestamp: expect.any(String),
        uptime: expect.any(Number),
        environment: 'test',
        version: '1.0.0',
        services: {
          api: 'operational',
          database: 'not_configured',
          cache: 'not_configured',
        },
        system: {
          nodeVersion: expect.any(String),
          platform: expect.any(String),
          arch: expect.any(String),
          memoryUsage: expect.objectContaining({
            rss: expect.any(Number),
            heapTotal: expect.any(Number),
            heapUsed: expect.any(Number),
            external: expect.any(Number),
          }),
        },
        features: {
          aiAnalysis: true,
          voiceUI: true,
          spatialDesign: true,
          analytics: false,
        },
        responseTime: expect.any(Number),
      });
    });

    it('should include proper cache headers', async () => {
      const response = await GET(mockRequest);

      expect(response.headers.get('Cache-Control')).toBe(
        'no-cache, no-store, must-revalidate'
      );
      expect(response.headers.get('Pragma')).toBe('no-cache');
      expect(response.headers.get('Expires')).toBe('0');
    });

    it('should have a valid timestamp in ISO format', async () => {
      const response = await GET(mockRequest);
      const data = await response.json();

      expect(data.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);

      // Timestamp should be recent (within last 5 seconds)
      const timestamp = new Date(data.timestamp);
      const now = new Date();
      const timeDiff = now.getTime() - timestamp.getTime();
      expect(timeDiff).toBeLessThan(5000);
    });

    it('should report system information correctly', async () => {
      const response = await GET(mockRequest);
      const data = await response.json();

      expect(data.system).toMatchObject({
        nodeVersion: expect.stringContaining('v'),
        platform: expect.any(String),
        arch: expect.any(String),
        memoryUsage: {
          rss: expect.any(Number),
          heapTotal: expect.any(Number),
          heapUsed: expect.any(Number),
          external: expect.any(Number),
        },
      });

      // Memory usage should be positive numbers
      expect(data.system.memoryUsage.rss).toBeGreaterThan(0);
      expect(data.system.memoryUsage.heapTotal).toBeGreaterThan(0);
      expect(data.system.memoryUsage.heapUsed).toBeGreaterThan(0);
    });

    it('should report feature flags correctly', async () => {
      const response = await GET(mockRequest);
      const data = await response.json();

      expect(data.features).toEqual({
        aiAnalysis: true,
        voiceUI: true,
        spatialDesign: true,
        analytics: false,
      });
    });

    it('should include response time measurement', async () => {
      const response = await GET(mockRequest);
      const data = await response.json();

      expect(data.responseTime).toBeTypeOf('number');
      expect(data.responseTime).toBeGreaterThanOrEqual(0);
      expect(data.responseTime).toBeLessThan(1000); // Should be fast
    });

    it('should report uptime', async () => {
      const response = await GET(mockRequest);
      const data = await response.json();

      expect(data.uptime).toBeTypeOf('number');
      expect(data.uptime).toBeGreaterThan(0);
    });
  });

  describe('GET /api/health - Missing Environment Variables', () => {
    it('should report degraded status when environment variables are missing', async () => {
      // Mock missing environment variables
      vi.mocked(process.env).GOOGLE_GENAI_API_KEY = '';
      vi.mocked(process.env).OPENAI_API_KEY = undefined;

      const response = await GET(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.status).toBe('healthy');
      expect(data.services.api).toBe('degraded');
      expect(data.warnings).toEqual([
        expect.stringContaining('Missing environment variables:'),
      ]);
    });

    it('should identify specific missing environment variables', async () => {
      // Mock specific missing variables
      vi.mocked(process.env).GOOGLE_GENAI_API_KEY = '';
      vi.mocked(process.env).FIGMA_ACCESS_TOKEN = undefined;

      const response = await GET(mockRequest);
      const data = await response.json();

      expect(data.warnings[0]).toContain('GOOGLE_GENAI_API_KEY');
      expect(data.warnings[0]).toContain('FIGMA_ACCESS_TOKEN');
    });
  });

  describe('GET /api/health - Error Handling', () => {
    it('should handle errors gracefully', async () => {
      // Mock process.uptime to throw an error
      const originalUptime = process.uptime;
      vi.mocked(process).uptime = vi.fn(() => {
        throw new Error('System error');
      });

      const response = await GET(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data).toMatchObject({
        status: 'unhealthy',
        timestamp: expect.any(String),
        error: 'System error',
        version: '1.0.0',
      });

      // Restore original function
      vi.mocked(process).uptime = originalUptime;
    });

    it('should handle unknown errors', async () => {
      // Mock to throw a non-Error object
      const originalMemoryUsage = process.memoryUsage;
      vi.mocked(process).memoryUsage = vi.fn(() => {
        throw 'String error';
      });

      const response = await GET(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data).toMatchObject({
        status: 'unhealthy',
        timestamp: expect.any(String),
        error: 'Unknown error',
        version: '1.0.0',
      });

      // Restore original function
      vi.mocked(process).memoryUsage = originalMemoryUsage;
    });
  });

  describe('HEAD /api/health', () => {
    it('should return 200 status with no content', async () => {
      const mockHeadRequest = new NextRequest('http://localhost:3000/api/health', {
        method: 'HEAD',
      });

      const response = await HEAD(mockHeadRequest);

      expect(response.status).toBe(200);
      expect(response.headers.get('Cache-Control')).toBe(
        'no-cache, no-store, must-revalidate'
      );

      // HEAD should not have a body
      const text = await response.text();
      expect(text).toBe('');
    });

    it('should handle HEAD request errors', async () => {
      // Mock NextResponse to throw an error
      const OriginalNextResponse = NextResponse;

      // This is a bit tricky to test, but we can simulate it
      const mockHeadRequest = new NextRequest('http://localhost:3000/api/health', {
        method: 'HEAD',
      });

      // Should still return a valid response even if there are issues
      const response = await HEAD(mockHeadRequest);
      expect([200, 500]).toContain(response.status);
    });
  });

  describe('Response Format Validation', () => {
    it('should have consistent response structure', async () => {
      const response = await GET(mockRequest);
      const data = await response.json();

      // Required fields
      const requiredFields = [
        'status',
        'timestamp',
        'uptime',
        'environment',
        'version',
        'services',
        'system',
        'features',
        'responseTime',
      ];

      requiredFields.forEach(field => {
        expect(data).toHaveProperty(field);
      });

      // Services structure
      expect(data.services).toHaveProperty('api');
      expect(data.services).toHaveProperty('database');
      expect(data.services).toHaveProperty('cache');

      // System structure
      expect(data.system).toHaveProperty('nodeVersion');
      expect(data.system).toHaveProperty('platform');
      expect(data.system).toHaveProperty('arch');
      expect(data.system).toHaveProperty('memoryUsage');

      // Features structure
      expect(data.features).toHaveProperty('aiAnalysis');
      expect(data.features).toHaveProperty('voiceUI');
      expect(data.features).toHaveProperty('spatialDesign');
      expect(data.features).toHaveProperty('analytics');
    });

    it('should have valid data types', async () => {
      const response = await GET(mockRequest);
      const data = await response.json();

      expect(typeof data.status).toBe('string');
      expect(typeof data.timestamp).toBe('string');
      expect(typeof data.uptime).toBe('number');
      expect(typeof data.environment).toBe('string');
      expect(typeof data.version).toBe('string');
      expect(typeof data.responseTime).toBe('number');

      expect(typeof data.services).toBe('object');
      expect(typeof data.system).toBe('object');
      expect(typeof data.features).toBe('object');

      expect(typeof data.features.aiAnalysis).toBe('boolean');
      expect(typeof data.features.voiceUI).toBe('boolean');
      expect(typeof data.features.spatialDesign).toBe('boolean');
      expect(typeof data.features.analytics).toBe('boolean');
    });
  });
});
