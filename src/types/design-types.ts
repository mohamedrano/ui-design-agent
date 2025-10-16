export interface DesignSystem {
  id: string
  name: string
  version: string
  description: string
  tokens: DesignTokens
  components: Component[]
  themes: Theme[]
  breakpoints: Breakpoint[]
  spacing: SpacingScale
  typography: TypographyScale
  colors: ColorPalette
  shadows: ShadowScale
  borders: BorderScale
  animations: AnimationScale
  createdAt: Date
  updatedAt: Date
}

export interface DesignTokens {
  colors: Record<string, string>
  spacing: Record<string, string>
  typography: Record<string, TypographyToken>
  shadows: Record<string, string>
  borders: Record<string, BorderToken>
  animations: Record<string, AnimationToken>
  breakpoints: Record<string, string>
}

export interface Component {
  id: string
  name: string
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
}

export interface ComponentProp {
  name: string
  type: string
  required: boolean
  defaultValue?: any
  description: string
  options?: any[]
}

export interface ComponentExample {
  name: string
  description: string
  code: string
  preview: string
}

export interface Theme {
  id: string
  name: string
  type: 'light' | 'dark' | 'high-contrast'
  tokens: Record<string, string>
  description: string
  createdAt: Date
  updatedAt: Date
}

export interface Breakpoint {
  name: string
  value: string
  description: string
}

export interface SpacingScale {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
  '3xl': string
  '4xl': string
}

export interface TypographyScale {
  fontFamily: Record<string, string>
  fontSize: Record<string, string>
  fontWeight: Record<string, string>
  lineHeight: Record<string, string>
  letterSpacing: Record<string, string>
}

export interface TypographyToken {
  fontFamily: string
  fontSize: string
  fontWeight: string
  lineHeight: string
  letterSpacing: string
}

export interface ColorPalette {
  primary: ColorScale
  secondary: ColorScale
  neutral: ColorScale
  success: ColorScale
  warning: ColorScale
  error: ColorScale
  info: ColorScale
}

export interface ColorScale {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
}

export interface ShadowScale {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
  inner: string
  none: string
}

export interface BorderScale {
  none: string
  sm: string
  md: string
  lg: string
  xl: string
  full: string
}

export interface BorderToken {
  width: string
  style: string
  color: string
  radius: string
}

export interface AnimationScale {
  duration: Record<string, string>
  easing: Record<string, string>
  delay: Record<string, string>
}

export interface AnimationToken {
  duration: string
  easing: string
  delay: string
  iterationCount: string
  direction: string
  fillMode: string
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

export interface DesignSystemConfig {
  name: string
  version: string
  description: string
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
}
