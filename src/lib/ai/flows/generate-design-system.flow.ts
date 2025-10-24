import { defineFlow, runFlow } from '@genkit-ai/flow';

export const generateDesignSystemFlow = defineFlow(
  {
    name: 'generateDesignSystemFlow',
    inputSchema: {
      requirements: { type: String },
      options: {
        type: Object,
        properties: {
          includeDocumentation: { type: Boolean, default: false },
          includeExamples: { type: Boolean, default: false },
          includeTests: { type: Boolean, default: false },
          format: { type: String, default: 'json' },
        },
      },
    },
    outputSchema: {
      type: Object,
      properties: {
        designSystem: { type: Object },
        documentation: { type: String },
        examples: { type: Array },
        tests: { type: Array },
        format: { type: String },
      },
    },
  },
  async (input) => {
    const { requirements, options = {} } = input;

    // Basic design system generation stub
    const designSystem = {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f3f4f6',
          500: '#6b7280',
          900: '#111827',
        },
      },
      typography: {
        fontFamily: ['Inter', 'system-ui', 'sans-serif'],
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
        },
        fontWeight: {
          normal: 400,
          medium: 500,
          bold: 700,
        },
      },
      spacing: {
        1: '0.25rem',
        2: '0.5rem',
        4: '1rem',
        6: '1.5rem',
        8: '2rem',
      },
      components: [
        {
          name: 'Button',
          variants: ['primary', 'secondary', 'outline'],
          sizes: ['sm', 'md', 'lg'],
        },
        {
          name: 'Input',
          variants: ['default', 'error', 'success'],
        },
      ],
    };

    let documentation = '';
    const examples = [];
    const tests = [];

    if (options.includeDocumentation) {
      documentation = `# Design System

This design system was generated based on the requirements: "${requirements}"

## Colors
- Primary color palette with shades from 50 to 900
- Secondary color palette for complementary elements

## Typography
- Inter font family as primary
- Responsive font sizes from xs to xl
- Standard font weights

## Spacing
- Consistent spacing scale from 1 to 8

## Components
- Button component with variants and sizes
- Input component with validation states
`;
    }

    if (options.includeExamples) {
      examples.push({
        component: 'Button',
        code: `<Button variant="primary" size="md">Click me</Button>`,
        description: 'Primary button example',
      });
    }

    if (options.includeTests) {
      tests.push({
        component: 'Button',
        test: 'should render without crashing',
        code: 'render(<Button>Click</Button>);',
      });
    }

    return {
      designSystem,
      documentation,
      examples,
      tests,
      format: options.format || 'json',
    };
  }
);
