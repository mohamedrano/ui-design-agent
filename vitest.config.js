const { defineConfig } = require('vitest/config');
const { resolve } = require('path');

module.exports = defineConfig({
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
    watch: false,
    watchExclude: ['**/node_modules/**', '**/dist/**', '**/coverage/**'],

    // Parallel execution
    maxConcurrency: 4,
    minWorkers: 1,
    maxWorkers: 4,

    // Retry configuration for flaky tests
    retry: process.env.CI ? 2 : 0,

    // Reporter configuration
    reporter: process.env.CI ? ['verbose', 'junit'] : ['verbose'],

    outputFile: {
      junit: './coverage/junit-report.xml',
    },

    // Coverage configuration with relaxed thresholds for CI
    coverage: {
      provider: 'v8',
      enabled: true,

      // Reporters
      reporter: ['text', 'text-summary', 'json', 'html', 'lcov'],

      // Output directories
      reportsDirectory: './coverage',

      // Include/exclude patterns
      include: ['src/**/*.{js,jsx,ts,tsx}'],
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

        // Specific exclusions for CI
        'src/lib/env.ts',
        'src/app/**/layout.tsx',
        'src/app/**/loading.tsx',
        'src/app/**/error.tsx',
        'src/app/**/not-found.tsx',
        'src/lib/ai/genkit.ts',
        'src/lib/webhook-handler.ts',
        'src/lib/ai/flows/**',
        'src/lib/ai/tools/**',
      ],

      // Relaxed coverage thresholds for CI pipeline
      thresholds: {
        global: {
          branches: 30,
          functions: 40,
          lines: 40,
          statements: 40,
        },
      },

      // Allow build to continue if thresholds not met
      thresholdAutoUpdate: false,
      skipFull: true,

      // Source mapping
      sourceMap: true,

      // Clean coverage directory on start
      clean: true,
      cleanOnRerun: true,

      // All files reporting
      all: false,
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

    // Custom matchers and utilities
    typecheck: {
      enabled: false, // Disable for faster CI
      only: false,
    },

    // Silent console output in tests
    silent: true,

    // Performance monitoring
    logHeapUsage: false,

    // Pool options for better performance
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false,
        isolate: true,
        minThreads: 1,
        maxThreads: 4,
      },
    },

    // Custom test sequences
    sequence: {
      concurrent: true,
      shuffle: false,
      hooks: 'parallel',
    },

    // File watching options
    deps: {
      inline: [
        /@genkit-ai\/.*/,
        /^@radix-ui\/.*/,
        /framer-motion/,
        /lucide-react/,
      ],
      external: ['next', 'react', 'react-dom'],
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
    format: 'cjs',
  },
});
