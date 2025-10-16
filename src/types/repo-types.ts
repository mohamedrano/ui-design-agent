export interface RepoAudit {
  id: string
  name: string
  path: string
  riskRegister: Risk[]
  unusedSelectors: UnusedSelector[]
  complexityHotspots: ComplexityHotspot[]
  refactorPlan: RefactorTask[]
  summary: RepoSummary
  recommendations: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Risk {
  id: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  category: 'css' | 'html' | 'performance' | 'accessibility' | 'maintainability'
  description: string
  impact: string
  likelihood: 'high' | 'medium' | 'low'
  mitigation: string
  file: string
  lineNumber?: number
  status: 'open' | 'in-progress' | 'resolved' | 'closed'
  assignedTo?: string
  dueDate?: Date
  createdAt: Date
  updatedAt: Date
}

export interface UnusedSelector {
  selector: string
  file: string
  lineNumber: number
  confidence: number
  reason: string
  impact: 'low' | 'medium' | 'high'
  effort: 'low' | 'medium' | 'high'
  priority: number
}

export interface ComplexityHotspot {
  file: string
  complexity: number
  issues: string[]
  suggestions: string[]
  impact: 'low' | 'medium' | 'high'
  effort: 'low' | 'medium' | 'high'
  priority: number
}

export interface RefactorTask {
  id: string
  priority: 'high' | 'medium' | 'low'
  task: string
  description: string
  estimatedEffort: string
  dependencies: string[]
  files: string[]
  status: 'pending' | 'in-progress' | 'completed' | 'blocked'
  assignedTo?: string
  dueDate?: Date
  createdAt: Date
  updatedAt: Date
}

export interface RepoSummary {
  totalFiles: number
  totalLines: number
  cssFiles: number
  componentFiles: number
  riskScore: number
  maintainabilityScore: number
  complexityScore: number
  testCoverage: number
  documentationCoverage: number
  lastAnalyzed: Date
}

export interface FileAnalysis {
  path: string
  type: 'css' | 'scss' | 'less' | 'html' | 'jsx' | 'tsx' | 'js' | 'ts'
  size: number
  lines: number
  complexity: number
  maintainability: number
  readability: number
  testability: number
  issues: Issue[]
  recommendations: Recommendation[]
  lastModified: Date
}

export interface Issue {
  id: string
  type: 'error' | 'warning' | 'info'
  severity: 'critical' | 'high' | 'medium' | 'low'
  message: string
  line: number
  column: number
  rule: string
  description: string
  suggestion: string
  impact: 'low' | 'medium' | 'high'
  effort: 'low' | 'medium' | 'high'
  priority: number
}

export interface Recommendation {
  id: string
  type: 'optimization' | 'refactoring' | 'accessibility' | 'performance' | 'seo'
  title: string
  description: string
  impact: 'low' | 'medium' | 'high'
  effort: 'low' | 'medium' | 'high'
  priority: number
  implementation: string
  examples: Example[]
  resources: Resource[]
}

export interface Example {
  title: string
  description: string
  code: string
  language: string
}

export interface Resource {
  title: string
  url: string
  type: 'article' | 'video' | 'tool' | 'library'
}

export interface RepoConfig {
  name: string
  description: string
  version: string
  author: string
  license: string
  repository: string
  homepage: string
  documentation: string
  changelog: string
  keywords: string[]
  dependencies: Record<string, string>
  peerDependencies: Record<string, string>
  devDependencies: Record<string, string>
  scripts: Record<string, string>
  engines: Record<string, string>
  packageManager: string
}

export interface RepoStats {
  totalFiles: number
  totalLines: number
  totalSize: number
  languages: Record<string, number>
  fileTypes: Record<string, number>
  complexity: number
  maintainability: number
  testCoverage: number
  documentationCoverage: number
  lastCommit: Date
  lastAnalyzed: Date
  contributors: number
  commits: number
  branches: number
  tags: number
}

export interface RepoHealth {
  score: number
  status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical'
  metrics: {
    codeQuality: number
    maintainability: number
    testCoverage: number
    documentation: number
    performance: number
    accessibility: number
    security: number
  }
  trends: {
    codeQuality: 'improving' | 'stable' | 'declining'
    maintainability: 'improving' | 'stable' | 'declining'
    testCoverage: 'improving' | 'stable' | 'declining'
    documentation: 'improving' | 'stable' | 'declining'
    performance: 'improving' | 'stable' | 'declining'
    accessibility: 'improving' | 'stable' | 'declining'
    security: 'improving' | 'stable' | 'declining'
  }
  recommendations: string[]
  nextSteps: string[]
}
