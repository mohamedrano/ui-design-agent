import { defineFlow } from '@genkit-ai/flow';

export const generateDesignTokensFlow = defineFlow(
  {
    name: 'generateDesignTokensFlow',
    inputSchema: {
      requirements: { type: String },
      options: {
        type: Object,
        properties: {
          includeDocs: { type: Boolean, default: false },
          format: { type: String, default: 'json' },
        },
      },
    },
    outputSchema: {
      type: Object,
      properties: {
        tokens: { type: Object },
        documentation: { type: String },
        format: { type: String },
      },
    },
  },
  async input => {
    const { requirements = '', options = {} as Record<string, unknown> } =
      input;

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
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        6: '24px',
        8: '32px',
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
