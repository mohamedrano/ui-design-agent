import { defineFlow } from '@genkit-ai/flow';

export const analyzePerformanceFlow = defineFlow(
  {
    name: 'analyzePerformanceFlow',
    inputSchema: {
      code: { type: String },
      options: {
        type: Object,
        properties: {
          includeMetrics: { type: Boolean, default: false },
          includeRecommendations: { type: Boolean, default: false },
          severity: { type: String, default: 'medium' },
        },
      },
    },
    outputSchema: {
      type: Object,
      properties: {
        analysis: { type: Object },
        recommendations: { type: Array },
        metrics: { type: Object },
        severity: { type: String },
      },
    },
  },
  async input => {
    const { code = '', options = {} as Record<string, unknown> } = input;

    const analysis = {
      estimatedLoadTime: Math.random() * 2000 + 500,
      estimatedBundleSize: Math.random() * 2_000_000 + 500_000,
      renderBlockingScripts: code.includes('<script')
        ? Math.floor(Math.random() * 5)
        : 0,
      unoptimizedImages: (code.match(/<img[^>]*>/g) || []).length,
    };

    const recommendations: any[] = [];
    if (options.includeRecommendations) {
      if (analysis.estimatedLoadTime > 2000) {
        recommendations.push({
          type: 'optimization',
          message: 'Reduce asset size and critical path',
          severity: 'high',
        });
      }
      if (analysis.renderBlockingScripts > 3) {
        recommendations.push({
          type: 'performance',
          message: 'Defer or async non-critical scripts',
          severity: 'medium',
        });
      }
    }

    const metrics = {
      estimatedLoadTime: analysis.estimatedLoadTime,
      estimatedBundleSize: analysis.estimatedBundleSize,
      renderBlockingScripts: analysis.renderBlockingScripts,
      unoptimizedImages: analysis.unoptimizedImages,
      performance: analysis.estimatedLoadTime < 1000 ? 'excellent' : 'good',
      accessibility: 'good',
    };

    return {
      analysis,
      recommendations,
      metrics,
      severity: options.severity || 'medium',
    };
  }
);
