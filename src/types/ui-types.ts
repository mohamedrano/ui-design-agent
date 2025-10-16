export interface UIComponent {
  id: string
  name: string
  type: 'atom' | 'molecule' | 'organism' | 'template' | 'page'
  category: string
  variants: ComponentVariant[]
  props: ComponentProp[]
  examples: ComponentExample[]
  documentation: string
  accessibility: AccessibilityInfo
  performance: PerformanceInfo
  createdAt: Date
  updatedAt: Date
}

export interface ComponentVariant {
  name: string
  description: string
  props: Record<string, any>
  styles: string
  usage: string
  preview: string
}

export interface ComponentProp {
  name: string
  type: string
  required: boolean
  defaultValue?: any
  description: string
  options?: any[]
  validation?: ValidationRule[]
}

export interface ComponentExample {
  name: string
  description: string
  code: string
  preview: string
  language: string
}

export interface AccessibilityInfo {
  wcagLevel: 'A' | 'AA' | 'AAA'
  keyboardNavigation: boolean
  screenReaderSupport: boolean
  colorContrast: number
  focusManagement: boolean
  ariaLabels: string[]
  recommendations: string[]
}

export interface PerformanceInfo {
  bundleSize: number
  renderTime: number
  memoryUsage: number
  cpuUsage: number
  recommendations: string[]
}

export interface ValidationRule {
  type: string
  message: string
  pattern?: string
  min?: number
  max?: number
}

export interface UITheme {
  id: string
  name: string
  type: 'light' | 'dark' | 'high-contrast'
  tokens: Record<string, string>
  description: string
  createdAt: Date
  updatedAt: Date
}

export interface UIToken {
  name: string
  value: string
  type: 'color' | 'spacing' | 'typography' | 'shadow' | 'border' | 'animation'
  category: string
  description: string
  usage: string[]
  examples: string[]
}

export interface UILayout {
  id: string
  name: string
  type: 'grid' | 'flexbox' | 'css-grid' | 'float' | 'position'
  breakpoints: Breakpoint[]
  columns: number
  gutters: number
  margins: number
  description: string
  examples: LayoutExample[]
}

export interface Breakpoint {
  name: string
  value: string
  description: string
}

export interface LayoutExample {
  name: string
  description: string
  code: string
  preview: string
}

export interface UIPattern {
  id: string
  name: string
  category: string
  description: string
  examples: PatternExample[]
  bestPractices: string[]
  antiPatterns: string[]
  accessibility: AccessibilityInfo
  performance: PerformanceInfo
}

export interface PatternExample {
  name: string
  description: string
  code: string
  preview: string
  useCase: string
}

export interface UIState {
  loading: boolean
  error: string | null
  data: any
  filters: Record<string, any>
  sort: {
    field: string
    direction: 'asc' | 'desc'
  }
  pagination: {
    page: number
    limit: number
    total: number
  }
}

export interface UIAction {
  type: string
  payload?: any
  meta?: Record<string, any>
}

export interface UIReducer {
  (state: UIState, action: UIAction): UIState
}

export interface UIStore {
  state: UIState
  dispatch: (action: UIAction) => void
  subscribe: (listener: (state: UIState) => void) => () => void
  getState: () => UIState
}

export interface UIHook {
  name: string
  description: string
  parameters: HookParameter[]
  returnType: string
  examples: HookExample[]
  dependencies: string[]
}

export interface HookParameter {
  name: string
  type: string
  required: boolean
  description: string
  defaultValue?: any
}

export interface HookExample {
  name: string
  description: string
  code: string
  language: string
}

export interface UIEvent {
  type: string
  target: string
  data: any
  timestamp: Date
  source: string
}

export interface UIEventHandler {
  (event: UIEvent): void
}

export interface UIAnimation {
  id: string
  name: string
  type: 'transition' | 'keyframe' | 'spring' | 'tween'
  duration: number
  easing: string
  delay: number
  iterationCount: number
  direction: string
  fillMode: string
  keyframes?: Keyframe[]
  description: string
  examples: AnimationExample[]
}

export interface Keyframe {
  offset: number
  properties: Record<string, string>
}

export interface AnimationExample {
  name: string
  description: string
  code: string
  preview: string
}

export interface UIGesture {
  id: string
  name: string
  type: 'tap' | 'swipe' | 'pinch' | 'rotate' | 'pan' | 'long-press'
  description: string
  examples: GestureExample[]
  accessibility: AccessibilityInfo
}

export interface GestureExample {
  name: string
  description: string
  code: string
  preview: string
}

export interface UIResponsive {
  breakpoint: string
  properties: Record<string, any>
  description: string
}

export interface UIResponsiveConfig {
  breakpoints: Breakpoint[]
  containers: ResponsiveContainer[]
  grids: ResponsiveGrid[]
  typography: ResponsiveTypography[]
}

export interface ResponsiveContainer {
  name: string
  maxWidth: string
  padding: string
  margin: string
  breakpoints: Record<string, any>
}

export interface ResponsiveGrid {
  name: string
  columns: number
  gutters: string
  breakpoints: Record<string, any>
}

export interface ResponsiveTypography {
  name: string
  fontSize: string
  lineHeight: string
  breakpoints: Record<string, any>
}
