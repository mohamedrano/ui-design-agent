import { defineFlow } from '@genkit-ai/flow';
import { z } from 'zod';

const inputSchema = z.object({
  code: z.string(),
  options: z
    .object({
      includeMetrics: z.boolean().optional().default(false),
      includeRecommendations: z.boolean().optional().default(false),
      severity: z.string().optional().default('medium'),
    })
    .optional()
    .default({}),
});

const outputSchema = z.object({
  analysis: z.object({
    estimatedLoadTime: z.number(),
    estimatedBundleSize: z.number(),
    renderBlockingScripts: z.number(),
    unoptimizedImages: z.number(),
  }),
  recommendations: z.array(z.any()),
  metrics: z.object({
    estimatedLoadTime: z.number(),
    estimatedBundleSize: z.number(),
    renderBlockingScripts: z.number(),
    unoptimizedImages: z.number(),
    performance: z.string(),
    accessibility: z.string(),
  }),
  severity: z.string(),
});

export const analyzePerformanceFlow = defineFlow(
  {
    name: 'analyzePerformanceFlow',
    inputSchema,
    outputSchema,
  },
  async input => {
    const { code = '', options = {} } = input;

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
