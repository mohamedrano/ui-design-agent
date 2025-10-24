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