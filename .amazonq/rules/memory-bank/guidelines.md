# UI Design Agent - Project Structure

## Directory Organization

### Root Level
```
ui-design-agent/
├── app/                    # Next.js 15 App Router pages and API routes
├── src/                    # Core application source code
├── public/                 # Static assets (fonts, images, examples)
├── docs/                   # Project documentation
├── tests/                  # Test suites (unit, integration, e2e)
├── workflows/              # GitHub Actions CI/CD workflows
└── [config files]          # Build, lint, test configurations
```

### App Directory (Next.js App Router)
```
app/
├── (auth)/                 # Authentication pages group
├── (dashboard)/            # Main application pages
│   ├── projects/[id]/      # Dynamic project pages
│   ├── design-system/      # Design system management
│   ├── ab-evaluator/       # A/B testing interface
│   ├── visual-diff/        # Visual regression reports
│   └── settings/           # Application settings
├── api/                    # API route handlers
│   ├── ai/                 # AI-powered analysis endpoints
│   ├── accessibility/      # WCAG auditing
│   ├── performance/        # Lighthouse integration
│   ├── refactor/           # CSS-to-Tailwind conversion
│   ├── repo/               # Repository analysis
│   ├── visual-diff/        # VRT execution
│   └── webhook/            # External integrations
└── [layout files]          # Root layout, error, loading pages
```

### Source Code Structure
```
src/
├── lib/                    # Core libraries and utilities
│   ├── ai/                 # Google Genkit AI flows and tools
│   ├── analyzers/          # Design analysis modules
│   ├── generators/         # Code generation utilities
│   ├── parsers/            # File parsing utilities
│   ├── utils/              # Shared utility functions
│   └── validators/         # Input validation schemas
├── components/             # React components
│   ├── ui/                 # Base UI components (shadcn/ui)
│   └── features/           # Feature-specific components
├── hooks/                  # Custom React hooks
├── stores/                 # Zustand state management
├── types/                  # TypeScript type definitions
└── config/                 # Application configuration
```

## Core Components & Relationships

### AI Processing Layer
- **Genkit Flows**: Orchestrate complex AI analysis workflows
- **AI Tools**: Specialized analysis tools (CSS parser, color analyzer, etc.)
- **Model Integration**: Gemini 2.5 Pro for intelligent analysis

### Analysis Modules
- **CSS/SCSS/LESS Parser**: Extract design tokens and patterns
- **HTML/JSX Analyzer**: Component structure analysis
- **Accessibility Auditor**: WCAG 2.2 compliance checking
- **Performance Analyzer**: Lighthouse integration and budgets

### Generation Systems
- **Design System Generator**: Create comprehensive design systems
- **Component Library Generator**: React/TS component creation
- **Tailwind Config Generator**: Automated configuration generation
- **Token Generator**: Style Dictionary integration

### Quality Assurance
- **Visual Diff Engine**: Screenshot comparison and regression detection
- **Performance Budgets**: LCP/INP/CLS/Bundle size monitoring
- **Accessibility Gates**: Automated WCAG compliance checking
- **Code Quality Metrics**: Complexity and maintainability analysis

## Architectural Patterns

### Modular Design
- Feature-based component organization
- Separation of concerns between analysis, generation, and UI
- Plugin-based architecture for extensible analysis tools

### State Management
- Zustand for client-side state
- React Query for server state and caching
- Form state managed by React Hook Form + Zod validation

### API Design
- RESTful API routes with consistent error handling
- Streaming responses for long-running AI operations
- Rate limiting and caching for performance

### Testing Strategy
- Unit tests with Vitest
- E2E tests with Playwright
- Accessibility tests with Axe
- Performance tests with Lighthouse CI
- Visual regression tests with custom VRT system

### CI/CD Integration
- GitHub Actions for automated testing and deployment
- Quality gates for accessibility, performance, and code quality
- Automated dependency updates and security scanning
- Vercel deployment with preview environments

# UI Design Agent - Technology Stack

## Core Technologies

### Runtime & Framework
- **Node.js**: 20+ LTS (production runtime)
- **Next.js**: 15.5 with App Router and Turbopack
- **TypeScript**: 5.6+ for type safety
- **React**: 19 with latest features

### AI & Machine Learning
- **Google Genkit**: 1.0 (AI framework)
- **Gemini 2.5 Pro**: Primary AI model for analysis
- **OpenTelemetry**: AI workflow observability

### UI & Styling
- **Tailwind CSS**: v4 (utility-first CSS)
- **shadcn/ui**: Component library foundation
- **Radix UI**: Headless UI primitives
- **Framer Motion**: Animation library
- **Lucide React**: Icon system

### State & Data Management
- **Zustand**: Client-side state management
- **React Query**: Server state and caching
- **React Hook Form**: Form handling
- **Zod**: Runtime validation and type inference

### Design System & Tokens
- **Style Dictionary**: Design token management
- **CSS Variables**: Dynamic theming support
- **PostCSS**: CSS processing and optimization

### Testing & Quality
- **Vitest**: Unit and integration testing
- **Playwright**: End-to-end testing
- **Axe Core**: Accessibility testing
- **Lighthouse CI**: Performance testing
- **MSW**: API mocking for tests

### Development Tools
- **ESLint 9**: Code linting with flat config
- **Prettier**: Code formatting
- **Husky**: Git hooks management
- **Commitlint**: Commit message validation
- **lint-staged**: Pre-commit code quality

### Build & Deployment
- **Turbopack**: Fast development builds
- **Bundle Analyzer**: Bundle size analysis
- **Vercel**: Deployment platform
- **GitHub Actions**: CI/CD automation

### Monitoring & Observability
- **Sentry**: Error tracking and monitoring
- **OpenTelemetry**: Distributed tracing
- **Upstash Redis**: Caching and rate limiting

## Package Versions

### Production Dependencies
```json
{
  "@genkit-ai/core": "^1.21.0",
  "@genkit-ai/googleai": "^1.21.0",
  "next": "^15.5.0",
  "react": "^19.0.0",
  "typescript": "^5.6.0",
  "tailwindcss": "^4.0.0",
  "@radix-ui/react-*": "^1.0.0+",
  "framer-motion": "^11.0.0",
  "zustand": "^4.4.0",
  "@tanstack/react-query": "^5.0.0"
}
```

### Development Dependencies
```json
{
  "vitest": "^1.0.0",
  "@playwright/test": "^1.40.0",
  "eslint": "^9.0.0",
  "@typescript-eslint/parser": "^7.0.0",
  "prettier": "^3.0.0",
  "husky": "^8.0.0"
}
```

## Development Commands

### Core Development
```bash
pnpm dev              # Start development server with Turbopack
pnpm build            # Production build
pnpm start            # Start production server
pnpm env-check        # Validate environment variables
```

### Code Quality
```bash
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint issues
pnpm format           # Format code with Prettier
pnpm type-check       # TypeScript type checking
```

### Testing
```bash
pnpm test             # Run unit tests
pnpm test:watch       # Watch mode for tests
pnpm test:coverage    # Generate coverage report
pnpm e2e              # Run E2E tests
pnpm a11y             # Accessibility testing
pnpm perf             # Performance testing
```

### CI/CD Pipeline
```bash
pnpm ci:validate      # Type check + lint + format check
pnpm ci:test          # Coverage + E2E tests
pnpm ci:quality       # A11y + performance + security audit
pnpm ci:all           # Complete CI pipeline
```

### Analysis & Auditing
```bash
pnpm audit:security   # Security vulnerability scan
pnpm audit:licenses   # License compatibility check
pnpm build:analyze    # Bundle size analysis
```

## Build Configuration

### Next.js Configuration
- App Router with TypeScript
- Turbopack for fast development
- Bundle analyzer integration
- Environment variable validation

### Tailwind Configuration
- v4 with CSS-in-JS support
- Custom design tokens integration
- Multi-theme configuration
- Container queries support

### TypeScript Configuration
- Strict mode enabled
- Path mapping for clean imports
- Next.js optimizations
- Incremental compilation

## Environment Requirements

### Node.js
- **Minimum**: Node.js 20.0.0
- **Package Manager**: pnpm 8.0.0+
- **Runtime**: Supports Edge Runtime for API routes

### API Keys (Required)
- Google Generative AI (Gemini)
- OpenAI API (optional)
- Anthropic API (optional)
- Figma Access Token (for design imports)

### Optional Services
- Sentry (error monitoring)
- Upstash Redis (caching)
- Vercel Analytics (usage tracking)
- Database (Turso/PostgreSQL for advanced features)

# UI Design Agent - Development Guidelines

## Code Quality Standards

### TypeScript Usage
- **Strict Type Safety**: All files use TypeScript with strict mode enabled
- **Interface Definitions**: Complex props and data structures use detailed interfaces
- **Generic Types**: Leverage generics for reusable components and utilities
- **Type Inference**: Prefer type inference over explicit typing where clear

### Component Architecture
- **Functional Components**: Use React functional components with hooks exclusively
- **Props Interface**: Every component has a well-defined props interface
- **Default Props**: Use default parameter values in function signatures
- **Component Composition**: Favor composition over inheritance patterns

### File Organization
- **Feature-Based Structure**: Components organized by feature/domain
- **Index Exports**: Use index files for clean import paths
- **Type Collocation**: Keep types close to their usage
- **Test Collocation**: Test files alongside source files with `.test.tsx` suffix

## Semantic Patterns

### React Patterns
- **Custom Hooks**: Extract stateful logic into reusable custom hooks
- **Compound Components**: Use compound component pattern for complex UI
- **Render Props**: Leverage render props for flexible component APIs
- **Context Usage**: Use React Context for global state management

### State Management
- **Zustand Integration**: Use Zustand for client-side state management
- **React Query**: Handle server state with React Query/TanStack Query
- **Form Handling**: React Hook Form + Zod for form validation
- **Local State**: useState for component-local state only

### Animation Patterns
- **Framer Motion**: Use Framer Motion for all animations
- **Motion Components**: Wrap elements with motion.div, motion.button, etc.
- **Animation Variants**: Define reusable animation variants
- **Gesture Handling**: Use Framer Motion for gesture interactions

## Code Formatting Standards

### Import Organization
```typescript
// 1. React and core libraries
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 2. Third-party libraries
import { Brain, Search, Settings } from 'lucide-react';

// 3. Internal imports (absolute paths)
import { Button } from '@/components/ui/button';
import { useAnalyzer } from '@/hooks/use-analyzer';

// 4. Relative imports
import './component.css';
```

### Component Structure
```typescript
interface ComponentProps {
  // Props interface first
  title: string;
  onAction?: () => void;
  variant?: 'primary' | 'secondary';
}

const Component: React.FC<ComponentProps> = ({
  title,
  onAction,
  variant = 'primary'
}) => {
  // 1. State declarations
  const [isActive, setIsActive] = useState(false);
  
  // 2. Custom hooks
  const { data, isLoading } = useQuery();
  
  // 3. Event handlers
  const handleClick = useCallback(() => {
    onAction?.();
  }, [onAction]);
  
  // 4. Effects
  useEffect(() => {
    // Effect logic
  }, []);
  
  // 5. Render
  return (
    <motion.div>
      {/* JSX content */}
    </motion.div>
  );
};
```

### CSS-in-JS Patterns
- **Tailwind Classes**: Use Tailwind utility classes for styling
- **Conditional Classes**: Use template literals for conditional styling
- **Class Composition**: Combine classes logically with proper spacing
- **Responsive Design**: Mobile-first responsive design with Tailwind breakpoints

## Testing Standards

### Test Structure
- **Describe Blocks**: Organize tests with descriptive describe blocks
- **Test Categories**: Group tests by functionality (rendering, interactions, etc.)
- **Mock Strategy**: Mock external dependencies and heavy libraries
- **Accessibility Testing**: Include accessibility assertions in tests

### Testing Patterns
```typescript
describe('ComponentName', () => {
  const mockProps = {
    // Default test props
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render basic elements', () => {
      render(<Component {...mockProps} />);
      expect(screen.getByText('Expected Text')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should handle user actions', async () => {
      const user = userEvent.setup();
      const mockHandler = vi.fn();
      
      render(<Component {...mockProps} onAction={mockHandler} />);
      
      await user.click(screen.getByRole('button'));
      expect(mockHandler).toHaveBeenCalled();
    });
  });
});
```

### Mock Patterns
- **Library Mocking**: Mock heavy libraries like framer-motion and lucide-react
- **API Mocking**: Use MSW for API endpoint mocking
- **Component Mocking**: Mock complex child components for unit tests
- **Function Mocking**: Use vi.fn() for callback testing

## API Integration Patterns

### HTTP Client Usage
- **Fetch API**: Use native fetch for HTTP requests
- **Error Handling**: Consistent error handling with try-catch blocks
- **Response Validation**: Validate API responses with Zod schemas
- **Loading States**: Handle loading and error states consistently

### Mock Service Worker (MSW)
- **Comprehensive Mocking**: Mock all external API endpoints
- **Realistic Responses**: Provide realistic mock data structures
- **Error Simulation**: Include error scenarios for testing
- **Request Validation**: Validate request bodies and parameters

## Performance Optimization

### Bundle Optimization
- **Dynamic Imports**: Use dynamic imports for code splitting
- **Tree Shaking**: Ensure proper tree shaking with ES modules
- **Dependency Analysis**: Regular bundle size analysis
- **Lazy Loading**: Implement lazy loading for non-critical components

### React Optimization
- **Memoization**: Use React.memo for expensive components
- **Callback Optimization**: useCallback for stable function references
- **Effect Dependencies**: Proper dependency arrays for useEffect
- **State Updates**: Batch state updates when possible

## Accessibility Standards

### WCAG Compliance
- **Semantic HTML**: Use proper HTML semantics
- **ARIA Labels**: Provide ARIA labels for interactive elements
- **Keyboard Navigation**: Ensure full keyboard accessibility
- **Screen Reader Support**: Test with screen readers

### Testing Accessibility
- **Automated Testing**: Use axe-core for automated a11y testing
- **Manual Testing**: Regular manual accessibility testing
- **Focus Management**: Proper focus management in dynamic content
- **Color Contrast**: Ensure sufficient color contrast ratios

## Configuration Standards

### Build Configuration
- **TypeScript Config**: Strict TypeScript configuration
- **Path Mapping**: Use path aliases for clean imports
- **Environment Variables**: Proper environment variable validation
- **Build Optimization**: Optimized build configuration for production

### Testing Configuration
- **Vitest Setup**: Comprehensive Vitest configuration
- **Coverage Thresholds**: Reasonable coverage thresholds for CI
- **Test Environment**: Proper jsdom environment setup
- **Mock Configuration**: Centralized mock configuration

## Documentation Standards

### Code Documentation
- **JSDoc Comments**: Document complex functions and components
- **Type Documentation**: Document complex type definitions
- **API Documentation**: Document public APIs and interfaces
- **README Files**: Maintain up-to-date README files

### Component Documentation
- **Props Documentation**: Document all component props
- **Usage Examples**: Provide usage examples for components
- **Storybook Stories**: Create Storybook stories for UI components
- **Migration Guides**: Document breaking changes and migrations