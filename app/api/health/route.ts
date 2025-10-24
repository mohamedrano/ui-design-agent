import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const startTime = Date.now();

    // Basic health checks
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'unknown',
      version: '1.0.0',
      services: {
        api: 'operational',
        database: 'not_configured', // Will be updated when database is added
        cache: 'not_configured', // Will be updated when Redis is added
      },
      system: {
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
        memoryUsage: process.memoryUsage(),
      },
      features: {
        aiAnalysis: true,
        voiceUI: process.env.ENABLE_VOICE_FEATURES === 'true',
        spatialDesign: process.env.ENABLE_3D_PREVIEW === 'true',
        analytics: process.env.ENABLE_ANALYTICS === 'true',
      },
      responseTime: Date.now() - startTime,
    };

    // Check if all required environment variables are present
    const requiredEnvVars = [
      'GOOGLE_GENAI_API_KEY',
      'OPENAI_API_KEY',
      'ANTHROPIC_API_KEY',
      'HUGGINGFACE_API_KEY',
      'FIGMA_ACCESS_TOKEN',
    ];

    const missingEnvVars = requiredEnvVars.filter(
      (varName) => !process.env[varName]
    );

    if (missingEnvVars.length > 0) {
      healthData.services.api = 'degraded';
      (healthData as any).warnings = [
        `Missing environment variables: ${missingEnvVars.join(', ')}`,
      ];
    }

    // Add cache headers for health endpoint
    const response = NextResponse.json(healthData);
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;
  } catch (error) {
    console.error('Health check failed:', error);

    const errorResponse = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
      version: '1.0.0',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

export async function HEAD(request: NextRequest) {
  // Simple health check for load balancers
  try {
    const response = new NextResponse(null, { status: 200 });
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    return response;
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
}
