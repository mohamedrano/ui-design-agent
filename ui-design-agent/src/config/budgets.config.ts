export const performanceBudgets = {
  desktop: {
    LCP: 2500, // Largest Contentful Paint (ms)
    INP: 200,  // Interaction to Next Paint (ms)
    CLS: 0.1,  // Cumulative Layout Shift
    TTI: 3800, // Time to Interactive (ms)
    bundleKb: 300, // Bundle size in KB
    imageKb: 500,  // Total image size in KB
  },
  mobile: {
    LCP: 3500, // More lenient for mobile
    INP: 200,
    CLS: 0.1,
    TTI: 5000,
    bundleKb: 350,
    imageKb: 750,
  },
} as const

export const accessibilityBudgets = {
  minimumScore: 90, // Minimum accessibility score (0-100)
  criticalIssues: 0, // Maximum critical accessibility issues
  highIssues: 2,     // Maximum high priority issues
  mediumIssues: 5,   // Maximum medium priority issues
} as const

export const seoBudgets = {
  minimumScore: 90, // Minimum SEO score (0-100)
  metaTags: {
    title: true,
    description: true,
    keywords: false, // Optional
    ogTags: true,
    twitterTags: true,
  },
  structuredData: {
    required: false,
    recommended: true,
  },
} as const

export const bestPracticesBudgets = {
  minimumScore: 90, // Minimum best practices score (0-100)
  https: true,
  noConsoleErrors: true,
  noDeprecatedApis: true,
  noVulnerableLibraries: true,
} as const

export const bundleAnalysisBudgets = {
  maxTotalSize: 500, // KB
  maxInitialSize: 300, // KB
  maxChunkSize: 200, // KB
  maxAsyncChunks: 10,
  maxDuplicates: 5, // Number of duplicate modules
} as const

export const visualRegressionBudgets = {
  threshold: 0.1, // 10% difference threshold
  maxDifferences: 5, // Maximum number of visual differences
  criticalElements: [
    'button',
    'input',
    'navigation',
    'header',
    'footer',
  ],
} as const

export const codeQualityBudgets = {
  maxComplexity: 10,
  maxCyclomaticComplexity: 15,
  maxCognitiveComplexity: 20,
  maxLinesPerFunction: 50,
  maxParameters: 5,
  maxNestingDepth: 4,
} as const

export const testCoverageBudgets = {
  statements: 80,
  branches: 80,
  functions: 80,
  lines: 80,
  criticalPaths: 95, // Critical user paths
} as const

export const performanceMetrics = {
  // Core Web Vitals
  LCP: {
    good: 2500,
    needsImprovement: 4000,
    poor: 4000,
  },
  INP: {
    good: 200,
    needsImprovement: 500,
    poor: 500,
  },
  CLS: {
    good: 0.1,
    needsImprovement: 0.25,
    poor: 0.25,
  },
  // Additional metrics
  FCP: {
    good: 1800,
    needsImprovement: 3000,
    poor: 3000,
  },
  TTI: {
    good: 3800,
    needsImprovement: 7300,
    poor: 7300,
  },
  TBT: {
    good: 200,
    needsImprovement: 600,
    poor: 600,
  },
} as const

export const budgetConfig = {
  performance: performanceBudgets,
  accessibility: accessibilityBudgets,
  seo: seoBudgets,
  bestPractices: bestPracticesBudgets,
  bundleAnalysis: bundleAnalysisBudgets,
  visualRegression: visualRegressionBudgets,
  codeQuality: codeQualityBudgets,
  testCoverage: testCoverageBudgets,
  metrics: performanceMetrics,
} as const

export type BudgetConfig = typeof budgetConfig
export type PerformanceBudget = typeof performanceBudgets
export type AccessibilityBudget = typeof accessibilityBudgets
export type SEOBudget = typeof seoBudgets
export type BestPracticesBudget = typeof bestPracticesBudgets
export type BundleAnalysisBudget = typeof bundleAnalysisBudgets
export type VisualRegressionBudget = typeof visualRegressionBudgets
export type CodeQualityBudget = typeof codeQualityBudgets
export type TestCoverageBudget = typeof testCoverageBudgets
export type PerformanceMetrics = typeof performanceMetrics
