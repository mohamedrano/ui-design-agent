import { JSDOM } from 'jsdom'
import * as axe from 'axe-core'

export interface AxeRunOptions {
  html: string
  css?: string
  options?: {
    rules?: Record<string, any>
    tags?: string[]
    disable?: string[]
  }
}

export interface AxeResult {
  violations: Array<{
    id: string
    impact: 'minor' | 'moderate' | 'serious' | 'critical'
    description: string
    help: string
    helpUrl: string
    nodes: Array<{
      target: string[]
      html: string
      failureSummary: string
    }>
  }>
  passes: Array<{
    id: string
    description: string
    nodes: Array<{
      target: string[]
      html: string
    }>
  }>
  incomplete: Array<{
    id: string
    description: string
    nodes: Array<{
      target: string[]
      html: string
    }>
  }>
  inapplicable: Array<{
    id: string
    description: string
  }>
  url: string
  timestamp: string
}

export async function runAxe(options: AxeRunOptions): Promise<AxeResult> {
  try {
    // Create JSDOM instance
    const dom = new JSDOM(options.html, {
      url: 'http://localhost:3000',
      pretendToBeVisual: true,
      resources: 'usable',
    })

    // Add CSS if provided
    if (options.css) {
      const style = dom.window.document.createElement('style')
      style.textContent = options.css
      dom.window.document.head.appendChild(style)
    }

    // Wait for any async operations
    await new Promise(resolve => setTimeout(resolve, 100))

    // Run axe-core
    const results = await axe.run(dom.window.document, options.options)

    return {
      violations: results.violations,
      passes: results.passes,
      incomplete: results.incomplete,
      inapplicable: results.inapplicable,
      url: results.url,
      timestamp: results.timestamp,
    }
  } catch (error) {
    console.error('Error running axe:', error)
    throw new Error(`Failed to run accessibility audit: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export async function runAxeOnElement(
  element: Element,
  options?: AxeRunOptions['options']
): Promise<AxeResult> {
  try {
    const results = await axe.run(element, options)
    
    return {
      violations: results.violations,
      passes: results.passes,
      incomplete: results.incomplete,
      inapplicable: results.inapplicable,
      url: results.url,
      timestamp: results.timestamp,
    }
  } catch (error) {
    console.error('Error running axe on element:', error)
    throw new Error(`Failed to run accessibility audit on element: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// Utility function to get severity level from impact
export function getSeverityLevel(impact: string): 'critical' | 'high' | 'medium' | 'low' {
  switch (impact) {
    case 'critical':
      return 'critical'
    case 'serious':
      return 'high'
    case 'moderate':
      return 'medium'
    case 'minor':
      return 'low'
    default:
      return 'low'
  }
}

// Utility function to format axe results for AI consumption
export function formatAxeResults(results: AxeResult): string {
  const violations = results.violations.map(violation => ({
    id: violation.id,
    impact: violation.impact,
    description: violation.description,
    help: violation.help,
    helpUrl: violation.helpUrl,
    nodeCount: violation.nodes.length,
    examples: violation.nodes.slice(0, 3).map(node => ({
      target: node.target,
      html: node.html.substring(0, 200) + '...',
      failureSummary: node.failureSummary,
    })),
  }))

  const passes = results.passes.map(pass => ({
    id: pass.id,
    description: pass.description,
    nodeCount: pass.nodes.length,
  }))

  return JSON.stringify({
    violations,
    passes,
    totalViolations: results.violations.length,
    totalPasses: results.passes.length,
    totalIncomplete: results.incomplete.length,
  }, null, 2)
}
