import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  test: {
    // Global test configuration
    globals: true,
    environment: 'jsdom',

    // Setup files
    setupFiles: ['./src/test/setup.ts'],

    // Test patterns
    include: [
      'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],

    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/coverage/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
      '**/e2e/**',
    ],

    // Timeout configuration
    testTimeout: 10000,
    hookTimeout: 10000,
    teardownTimeout: 5000,

    // Watch mode configuration
    watch: true,
    watchExclude: ['**/node_modules/**', '**/dist/**', '**/coverage/**'],

    // Parallel execution
    maxConcurrency: 8,
    minWorkers: 1,
    maxWorkers: '50%',

    // Retry configuration for flaky tests
    retry: process.env.CI ? 2 : 0,

    // Reporter configuration
    reporter: process.env.CI
      ? ['verbose', 'junit', 'json']
      : ['verbose', 'html'],

    outputFile: {
      junit: './coverage/junit-report.xml',
      json: './coverage/json-report.json',
      html: './coverage/html-report/index.html',
    },

    // Coverage configuration with strict thresholds
    coverage: {
      provider: 'v8',
      enabled: true,

      // Reporters
      reporter: [
        'text',
        'text-summary',
        'json',
        'json-summary',
        'html',
        'lcov',
        'clover',
        'cobertura',
      ],

      // Output directories
      reportsDirectory: './coverage',

      // Include/exclude patterns
      include: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],

      exclude: [
        // Test files
        'src/**/*.{test,spec}.{js,jsx,ts,tsx}',
        'src/test/**',

        // Config files
        'src/**/*.config.{js,ts}',

        // Type definitions
        'src/**/*.d.ts',

        // Stories and documentation
        'src/**/*.stories.{js,jsx,ts,tsx}',
        'src/**/*.mdx',

        // Build and dist
        '**/node_modules/**',
        '**/dist/**',
        '**/.next/**',
        '**/coverage/**',

        // Specific exclusions
        'src/lib/env.ts', // Environment validation (hard to test without actual env vars)
        'src/app/**/layout.tsx', // Next.js layouts (tested via E2E)
        'src/app/**/loading.tsx', // Loading components (tested via E2E)
        'src/app/**/error.tsx', // Error boundaries (tested via E2E)
        'src/app/**/not-found.tsx', // 404 pages (tested via E2E)

        // External integrations (tested via mocks)
        'src/lib/ai/genkit.ts',
        'src/lib/webhook-handler.ts',
      ],

      // Coverage thresholds - Production-ready strict requirements
      thresholds: {
        // Global thresholds
        global: {
          branches: 80,
          functions: 85,
          lines: 85,
          statements: 85,
        },

        // Critical modules require higher coverage
        'src/lib/ai/advanced-ui-agent.ts': {
          branches: 90,
          functions: 95,
          lines: 95,
          statements: 95,
        },

        'src/lib/ai/flows/advanced-design-flows.ts': {
          branches: 85,
          functions: 90,
          lines: 90,
          statements: 90,
        },

        'src/lib/ai/tools/advanced-design-tools.ts': {
          branches: 85,
          functions: 90,
          lines: 90,
          statements: 90,
        },

        // Components should have good coverage
        'src/components/**/*.{ts,tsx}': {
          branches: 80,
          functions: 85,
          lines: 85,
          statements: 85,
        },
      },

      // Fail build if thresholds not met
      thresholds100: false,
      skipFull: false,

      // Source mapping
      sourceMap: true,

      // Clean coverage directory on start
      clean: true,
      cleanOnRerun: true,

      // All files reporting (show uncovered files)
      all: true,

      // Watermarks for color-coding coverage results
      watermarks: {
        statements: [70, 85],
        functions: [70, 85],
        branches: [60, 80],
        lines: [70, 85],
      },
    },

    // Mocking and environment configuration
    mockReset: true,
    clearMocks: true,
    restoreMocks: true,

    // Browser environment setup for jsdom
    environmentOptions: {
      jsdom: {
        resources: 'usable',
        runScripts: 'dangerously',
        url: 'http://localhost:3000',
      },
    },

    // Snapshot configuration
    snapshotFormat: {
      escapeString: true,
      printBasicPrototype: true,
    },

    // Custom matchers and utilities
    typecheck: {
      enabled: true,
      only: false,
    },

    // Silent console output in tests (unless debugging)
    silent: process.env.VITEST_VERBOSE !== 'true',

    // Performance monitoring
    logHeapUsage: process.env.NODE_ENV === 'development',

    // Pool options for better performance
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false,
        isolate: true,
        minThreads: 1,
        maxThreads: process.env.CI ? 4 : undefined,
      },
    },

    // Benchmark configuration (for performance tests)
    benchmark: {
      include: ['src/**/*.bench.{js,ts}'],
      exclude: [
        'node_modules',
        'dist',
        '.idea',
        '.git',
        '.cache',
        '.output',
        '.temp',
      ],
      outputFile: './coverage/benchmark-results.json',
      reporters: ['verbose'],
    },

    // Custom test sequences
    sequence: {
      concurrent: true,
      shuffle: false,
      hooks: 'parallel',
    },

    // Debugging configuration
    inspect: false,
    inspectBrk: false,

    // File watching options
    deps: {
      inline: [
        // Inline dependencies that should be transformed
        /@genkit-ai\/.*/,
        /^@radix-ui\/.*/,
        /framer-motion/,
        /lucide-react/,
      ],
      external: [
        // External dependencies that should not be transformed
        'next',
        'react',
        'react-dom',
      ],
    },
  },

  // Vite configuration for tests
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/components': resolve(__dirname, './src/components'),
      '@/lib': resolve(__dirname, './src/lib'),
      '@/hooks': resolve(__dirname, './src/hooks'),
      '@/stores': resolve(__dirname, './src/stores'),
      '@/types': resolve(__dirname, './src/types'),
      '@/config': resolve(__dirname, './src/config'),
      '@/test': resolve(__dirname, './src/test'),
    },
  },

  // Define globals for better TypeScript support
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
    __TEST__: JSON.stringify(process.env.NODE_ENV === 'test'),
    __PROD__: JSON.stringify(process.env.NODE_ENV === 'production'),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'test'),
  },

  // Optimization for tests
  optimizeDeps: {
    include: [
      '@testing-library/react',
      '@testing-library/jest-dom',
      '@testing-library/user-event',
      'jsdom',
    ],
  },

  // ESBuild configuration for better performance
  esbuild: {
    target: 'node20',
    format: 'esm',
  },
});
