import { defineFlow } from '@genkit-ai/flow';
import { z } from 'zod';

const inputSchema = z.object({
  requirements: z.string(),
  options: z
    .object({
      includeDocs: z.boolean().optional().default(false),
      format: z.string().optional().default('json'),
    })
    .optional()
    .default({}),
});

const outputSchema = z.object({
  tokens: z.object({
    color: z.record(z.any()),
    typography: z.record(z.any()),
    spacing: z.record(z.string()),
    radius: z.record(z.string()),
    shadow: z.record(z.string()),
  }),
  documentation: z.string(),
  format: z.string(),
});

export const generateDesignTokensFlow = defineFlow(
  {
    name: 'generateDesignTokensFlow',
    inputSchema,
    outputSchema,
  },
  async input => {
    const { requirements = '', options = {} } = input;

    const tokens = {
      color: {
        primary: { 50: '#eff6ff', 500: '#3b82f6', 900: '#1e3a8a' },
        gray: { 50: '#f9fafb', 500: '#6b7280', 900: '#111827' },
      },
      typography: {
        fontFamily: { base: 'Inter, system-ui, sans-serif' },
        fontSize: {
          xs: '12px',
          sm: '14px',
          base: '16px',
          lg: '18px',
          xl: '20px',
        },
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
      },
      radius: { sm: '4px', md: '8px', lg: '12px' },
      shadow: {
        sm: '0 1px 2px rgba(0,0,0,0.05)',
        md: '0 4px 6px rgba(0,0,0,0.1)',
      },
    };

    const documentation = options.includeDocs
      ? `# Design Tokens\n\nGenerated for: "${requirements}"\n\nIncludes color, typography, spacing, radius, and shadow scales.\n`
      : '';

    return { tokens, documentation, format: options.format || 'json' };
  }
);
