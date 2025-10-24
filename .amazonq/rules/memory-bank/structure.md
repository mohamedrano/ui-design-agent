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