// Simple ESLint configuration for basic linting
module.exports = [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // Basic code quality rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
      'no-unused-vars': 'off', // Disable for TypeScript files
      'no-undef': 'off', // TypeScript handles this
      'no-unreachable': 'error',
      'no-duplicate-imports': 'error',
      eqeqeq: ['error', 'always'],
      curly: 'error',

      // React specific rules
      'react-hooks/rules-of-hooks': 'off', // Will be handled by Next.js if available
      'react-hooks/exhaustive-deps': 'off',
    },
  },
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'dist/**',
      'build/**',
      'coverage/**',
      'playwright-report/**',
      'test-results/**',
      '*.config.js',
      '*.config.ts',
      '*.config.cjs',
      '*.config.mjs',
      '.env*',
      'pnpm-lock.yaml',
      'ui-design-agent/**', // Ignore duplicate directory
    ],
  },
];
