import { defineFlow, runFlow } from '@genkit-ai/flow';

export const generateComponentLibraryFlow = defineFlow(
  {
    name: 'generateComponentLibraryFlow',
    inputSchema: {
      requirements: { type: String },
      options: {
        type: Object,
        properties: {
          includeDocumentation: { type: Boolean, default: false },
          includeExamples: { type: Boolean, default: false },
          includeTests: { type: Boolean, default: false },
          includeStorybook: { type: Boolean, default: false },
          format: { type: String, default: 'tsx' },
        },
      },
    },
    outputSchema: {
      type: Object,
      properties: {
        components: { type: Array },
        documentation: { type: String },
        examples: { type: Array },
        tests: { type: Array },
        storybookConfig: { type: Object },
        format: { type: String },
      },
    },
  },
  async input => {
    const { requirements, options = {} } = input;

    // Basic component library generation stub
    const components = [
      {
        name: 'Button',
        props: {
          variant: ['primary', 'secondary', 'outline', 'ghost'],
          size: ['sm', 'md', 'lg'],
          disabled: Boolean,
          loading: Boolean,
          children: String,
          onClick: Function,
        },
        code: `const Button = ({ variant = 'primary', size = 'md', disabled, loading, children, onClick }) => {
  return (
    <button
      className={\`btn btn-\${variant} btn-\${size} \${disabled ? 'disabled' : ''} \${loading ? 'loading' : ''}\`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && <span>Loading...</span>}
      {children}
    </button>
  );
};`,
      },
      {
        name: 'Input',
        props: {
          type: String,
          placeholder: String,
          value: String,
          disabled: Boolean,
          error: Boolean,
          required: Boolean,
          onChange: Function,
        },
        code: `const Input = ({ type = 'text', placeholder, value, disabled, error, required, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      required={required}
      className={\`input \${error ? 'input-error' : ''} \${disabled ? 'input-disabled' : ''}\`}
      onChange={(e) => onChange && onChange(e.target.value)}
    />
  );
};`,
      },
      {
        name: 'Card',
        props: {
          title: String,
          children: String,
          shadow: ['none', 'sm', 'md', 'lg'],
          padding: ['sm', 'md', 'lg'],
        },
        code: `const Card = ({ title, children, shadow = 'md', padding = 'md' }) => {
  return (
    <div className={\`card card-shadow-\${shadow} card-padding-\${padding}\`}>
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};`,
      },
    ];

    let documentation = '';
    const examples = [];
    const tests = [];
    let storybookConfig = {};

    if (options.includeDocumentation) {
      documentation = `# Component Library

Generated component library based on requirements: "${requirements}"

## Components

### Button
A versatile button component with multiple variants and sizes.

### Input
Form input component with validation states.

### Card
Container component for content organization.

## Usage
\`\`\`tsx
import { Button, Input, Card } from './components';
\`\`\`
`;
    }

    if (options.includeExamples) {
      examples.push({
        component: 'Button',
        code: `<Button variant="primary" size="md" onClick={() => console.log('clicked')}>Click me</Button>`,
      });
      examples.push({
        component: 'Input',
        code: `<Input type="email" placeholder="Enter email" required />`,
      });
      examples.push({
        component: 'Card',
        code: `<Card title="Example Card" shadow="lg"><p>Card content here</p></Card>`,
      });
    }

    if (options.includeTests) {
      tests.push({
        component: 'Button',
        test: 'renders with default props',
        code: `render(<Button>Click</Button>);
expect(screen.getByRole('button')).toBeInTheDocument();`,
      });
    }

    if (options.includeStorybook) {
      storybookConfig = {
        stories: './stories',
        addons: ['@storybook/addon-essentials'],
        framework: '@storybook/react-vite',
      };
    }

    return {
      components,
      documentation,
      examples,
      tests,
      storybookConfig,
      format: options.format || 'tsx',
    };
  }
);
