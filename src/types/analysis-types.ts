export interface AnalysisResult {
  id: string
  type: 'css' | 'html' | 'accessibility' | 'performance' | 'seo' | 'code-quality'
  score: number
  issues: Issue[]
  recommendations: Recommendation[]
  metrics: Record<string, number>
  metadata: AnalysisMetadata
  createdAt: Date
  updatedAt: Date
}

export interface Issue {
  id: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  category: string
  description: string
  howToFix: string
  element?: string
  lineNumber?: number
  columnNumber?: number
  file?: string
  code?: string
  impact: string
  effort: 'low' | 'medium' | 'high'
  priority: number
  tags: string[]
  references: Reference[]
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

export interface AnalysisMetadata {
  tool: string
  version: string
  duration: number
  fileCount: number
  lineCount: number
  complexity: number
  maintainability: number
  readability: number
  testability: number
}

export interface Reference {
  title: string
  url: string
  type: 'documentation' | 'tutorial' | 'specification' | 'example'
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

export interface CSSAnalysis extends AnalysisResult {
  type: 'css'
  unusedRules: UnusedRule[]
  complexityHotspots: ComplexityHotspot[]
  specificityIssues: SpecificityIssue[]
  performanceIssues: PerformanceIssue[]
  maintainabilityIssues: MaintainabilityIssue[]
}

export interface UnusedRule {
  selector: string
  file: string
  lineNumber: number
  confidence: number
  reason: string
}

export interface ComplexityHotspot {
  file: string
  selector: string
  complexity: number
  issues: string[]
  suggestions: string[]
}

export interface SpecificityIssue {
  selector: string
  specificity: number
  file: string
  lineNumber: number
  suggestion: string
}

export interface PerformanceIssue {
  rule: string
  impact: 'low' | 'medium' | 'high'
  description: string
  suggestion: string
}

export interface MaintainabilityIssue {
  rule: string
  description: string
  suggestion: string
  effort: 'low' | 'medium' | 'high'
}

export interface HTMLAnalysis extends AnalysisResult {
  type: 'html'
  landmarks: Landmark[]
  headings: Heading[]
  forms: Form[]
  links: Link[]
  images: Image[]
  interactiveElements: InteractiveElement[]
  semanticIssues: SemanticIssue[]
  accessibilityIssues: AccessibilityIssue[]
}

export interface Landmark {
  type: string
  element: string
  text: string
  level: number
  position: Position
}

export interface Heading {
  level: number
  text: string
  id?: string
  position: Position
  hierarchy: boolean
}

export interface Form {
  id?: string
  name?: string
  action?: string
  method?: string
  inputs: FormInput[]
  validation: ValidationRule[]
}

export interface FormInput {
  type: string
  name?: string
  id?: string
  required?: boolean
  placeholder?: string
  label?: string
  validation?: ValidationRule[]
}

export interface ValidationRule {
  type: string
  message: string
  pattern?: string
  min?: number
  max?: number
}

export interface Link {
  href: string
  text: string
  target?: string
  rel?: string
  position: Position
}

export interface Image {
  src: string
  alt?: string
  width?: string
  height?: string
  loading?: string
  position: Position
}

export interface InteractiveElement {
  type: string
  element: string
  text: string
  attributes: Record<string, string>
  position: Position
}

export interface SemanticIssue {
  element: string
  issue: string
  suggestion: string
  severity: 'low' | 'medium' | 'high'
}

export interface AccessibilityIssue {
  element: string
  issue: string
  wcagLevel: 'A' | 'AA' | 'AAA'
  suggestion: string
  severity: 'low' | 'medium' | 'high'
}

export interface Position {
  line: number
  column: number
  file: string
}

export interface AccessibilityAnalysis extends AnalysisResult {
  type: 'accessibility'
  wcagLevel: 'A' | 'AA' | 'AAA'
  violations: AccessibilityViolation[]
  passes: AccessibilityPass[]
  incomplete: AccessibilityIncomplete[]
  inapplicable: AccessibilityInapplicable[]
  summary: AccessibilitySummary
}

export interface AccessibilityViolation {
  id: string
  impact: 'minor' | 'moderate' | 'serious' | 'critical'
  description: string
  help: string
  helpUrl: string
  nodes: AccessibilityNode[]
}

export interface AccessibilityPass {
  id: string
  description: string
  nodes: AccessibilityNode[]
}

export interface AccessibilityIncomplete {
  id: string
  description: string
  nodes: AccessibilityNode[]
}

export interface AccessibilityInapplicable {
  id: string
  description: string
}

export interface AccessibilityNode {
  target: string[]
  html: string
  failureSummary?: string
}

export interface AccessibilitySummary {
  totalViolations: number
  totalPasses: number
  totalIncomplete: number
  totalInapplicable: number
  criticalViolations: number
  seriousViolations: number
  moderateViolations: number
  minorViolations: number
}

export interface PerformanceAnalysis extends AnalysisResult {
  type: 'performance'
  metrics: PerformanceMetrics
  opportunities: PerformanceOpportunity[]
  diagnostics: PerformanceDiagnostic[]
  budget: PerformanceBudget
}

export interface PerformanceMetrics {
  lcp: number
  fcp: number
  cls: number
  tti: number
  tbt: number
  si: number
  fmp: number
  fci: number
  eil: number
  ttfcp: number
  ttfmp: number
  ttfci: number
  ttfcp: number
  ttfmp: number
  ttfci: number
}

export interface PerformanceOpportunity {
  id: string
  title: string
  description: string
  score: number
  displayValue: string
  details: PerformanceOpportunityDetail[]
}

export interface PerformanceOpportunityDetail {
  type: string
  title: string
  description: string
  score: number
  displayValue: string
  details: Record<string, any>
}

export interface PerformanceDiagnostic {
  id: string
  title: string
  description: string
  score: number
  displayValue: string
  details: Record<string, any>
}

export interface PerformanceBudget {
  lcp: number
  fcp: number
  cls: number
  tti: number
  tbt: number
  si: number
  fmp: number
  fci: number
  eil: number
  ttfcp: number
  ttfmp: number
  ttfci: number
  ttfcp: number
  ttfmp: number
  ttfci: number
}
