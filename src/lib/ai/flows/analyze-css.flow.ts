import { defineFlow, runFlow } from '@genkit-ai/flow';

export const analyzeCSSFlow = defineFlow(
  {
    name: 'analyzeCSSFlow',
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
    const { code, options = {} } = input;

    // Basic CSS analysis stub
    const analysis = {
      selectors: code.match(/[^\r\n,{}]+(?=\s*\{)/g)?.length || 0,
      properties: code.match(/[^:]+:[^;]+/g)?.length || 0,
      rules: code.split('}').filter(rule => rule.trim()).length,
    };

    const recommendations = [];
    const metrics = {
      totalSelectors: analysis.selectors,
      totalProperties: analysis.properties,
      totalRules: analysis.rules,
      specificity: 'medium',
      performance: 'good',
    };

    if (options.includeRecommendations) {
      if (analysis.selectors > 50) {
        recommendations.push({
          type: 'optimization',
          message: 'Consider reducing the number of selectors',
          severity: 'medium',
        });
      }
    }

    return {
      analysis,
      recommendations,
      metrics,
      severity: options.severity || 'medium',
    };
  }
);
