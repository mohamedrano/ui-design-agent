import { parse } from 'postcss'

export interface TailwindSuggestion {
  originalCSS: string
  suggestedClasses: string[]
  confidence: number
  explanation: string
  category: 'layout' | 'spacing' | 'colors' | 'typography' | 'effects' | 'interactivity' | 'custom'
}

export interface TailwindSuggestionsOptions {
  css: string
  filePath: string
}

export async function suggestTailwindClasses(options: TailwindSuggestionsOptions): Promise<TailwindSuggestion[]> {
  try {
    const suggestions: TailwindSuggestion[] = []
    
    // Parse CSS
    const root = parse(options.css)
    
    root.walkRules((rule) => {
      const suggestion = analyzeRule(rule)
      if (suggestion) {
        suggestions.push(suggestion)
      }
    })
    
    return suggestions
  } catch (error) {
    console.error('Error suggesting Tailwind classes:', error)
    throw new Error(`Failed to suggest Tailwind classes: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

function analyzeRule(rule: any): TailwindSuggestion | null {
  const selector = rule.selector
  const declarations = rule.nodes || []
  
  if (declarations.length === 0) return null
  
  const suggestedClasses: string[] = []
  let confidence = 0
  let explanation = ''
  let category: TailwindSuggestion['category'] = 'custom'
  
  // Analyze each declaration
  for (const decl of declarations) {
    if (decl.type === 'decl') {
      const suggestion = analyzeDeclaration(decl)
      if (suggestion) {
        suggestedClasses.push(...suggestion.classes)
        confidence += suggestion.confidence
        explanation += suggestion.explanation + ' '
        category = suggestion.category
      }
    }
  }
  
  if (suggestedClasses.length === 0) return null
  
  // Calculate average confidence
  confidence = confidence / declarations.length
  
  return {
    originalCSS: rule.toString(),
    suggestedClasses: [...new Set(suggestedClasses)], // Remove duplicates
    confidence: Math.round(confidence),
    explanation: explanation.trim(),
    category,
  }
}

function analyzeDeclaration(decl: any): {
  classes: string[]
  confidence: number
  explanation: string
  category: TailwindSuggestion['category']
} | null {
  const property = decl.prop
  const value = decl.value
  
  // Layout properties
  if (property === 'display') {
    return {
      classes: [`${value === 'flex' ? 'flex' : value === 'block' ? 'block' : value === 'inline' ? 'inline' : value === 'grid' ? 'grid' : ''}`].filter(Boolean),
      confidence: 90,
      explanation: `Display ${value}`,
      category: 'layout',
    }
  }
  
  if (property === 'position') {
    return {
      classes: [`${value === 'absolute' ? 'absolute' : value === 'relative' ? 'relative' : value === 'fixed' ? 'fixed' : value === 'sticky' ? 'sticky' : ''}`].filter(Boolean),
      confidence: 90,
      explanation: `Position ${value}`,
      category: 'layout',
    }
  }
  
  // Spacing properties
  if (property === 'margin') {
    const classes = parseSpacing(value, 'm')
    return {
      classes,
      confidence: 85,
      explanation: `Margin ${value}`,
      category: 'spacing',
    }
  }
  
  if (property === 'padding') {
    const classes = parseSpacing(value, 'p')
    return {
      classes,
      confidence: 85,
      explanation: `Padding ${value}`,
      category: 'spacing',
    }
  }
  
  // Color properties
  if (property === 'color') {
    const classes = parseColor(value, 'text')
    return {
      classes,
      confidence: 80,
      explanation: `Text color ${value}`,
      category: 'colors',
    }
  }
  
  if (property === 'background-color') {
    const classes = parseColor(value, 'bg')
    return {
      classes,
      confidence: 80,
      explanation: `Background color ${value}`,
      category: 'colors',
    }
  }
  
  // Typography properties
  if (property === 'font-size') {
    const classes = parseFontSize(value)
    return {
      classes,
      confidence: 85,
      explanation: `Font size ${value}`,
      category: 'typography',
    }
  }
  
  if (property === 'font-weight') {
    const classes = parseFontWeight(value)
    return {
      classes,
      confidence: 90,
      explanation: `Font weight ${value}`,
      category: 'typography',
    }
  }
  
  if (property === 'text-align') {
    return {
      classes: [`text-${value}`],
      confidence: 95,
      explanation: `Text align ${value}`,
      category: 'typography',
    }
  }
  
  // Border properties
  if (property === 'border') {
    const classes = parseBorder(value)
    return {
      classes,
      confidence: 75,
      explanation: `Border ${value}`,
      category: 'effects',
    }
  }
  
  if (property === 'border-radius') {
    const classes = parseBorderRadius(value)
    return {
      classes,
      confidence: 85,
      explanation: `Border radius ${value}`,
      category: 'effects',
    }
  }
  
  // Shadow properties
  if (property === 'box-shadow') {
    const classes = parseBoxShadow(value)
    return {
      classes,
      confidence: 70,
      explanation: `Box shadow ${value}`,
      category: 'effects',
    }
  }
  
  // Width and height
  if (property === 'width') {
    const classes = parseSize(value, 'w')
    return {
      classes,
      confidence: 80,
      explanation: `Width ${value}`,
      category: 'layout',
    }
  }
  
  if (property === 'height') {
    const classes = parseSize(value, 'h')
    return {
      classes,
      confidence: 80,
      explanation: `Height ${value}`,
      category: 'layout',
    }
  }
  
  return null
}

function parseSpacing(value: string, prefix: string): string[] {
  const classes: string[] = []
  
  // Handle shorthand values like "1rem 2rem"
  const values = value.split(' ')
  
  if (values.length === 1) {
    // All sides
    classes.push(`${prefix}-${convertSpacingValue(values[0])}`)
  } else if (values.length === 2) {
    // Vertical and horizontal
    classes.push(`${prefix}-y-${convertSpacingValue(values[0])}`)
    classes.push(`${prefix}-x-${convertSpacingValue(values[1])}`)
  } else if (values.length === 4) {
    // Top, right, bottom, left
    classes.push(`${prefix}-t-${convertSpacingValue(values[0])}`)
    classes.push(`${prefix}-r-${convertSpacingValue(values[1])}`)
    classes.push(`${prefix}-b-${convertSpacingValue(values[2])}`)
    classes.push(`${prefix}-l-${convertSpacingValue(values[3])}`)
  }
  
  return classes
}

function parseColor(value: string, prefix: string): string[] {
  const classes: string[] = []
  
  // Handle common color values
  if (value === 'transparent') {
    classes.push(`${prefix}-transparent`)
  } else if (value === 'currentColor') {
    classes.push(`${prefix}-current`)
  } else if (value.startsWith('#')) {
    // Hex colors - would need custom color configuration
    classes.push(`${prefix}-[${value}]`)
  } else if (value.startsWith('rgb') || value.startsWith('hsl')) {
    // RGB/HSL colors
    classes.push(`${prefix}-[${value}]`)
  } else {
    // Named colors
    const colorName = value.replace(/\s+/g, '-').toLowerCase()
    classes.push(`${prefix}-${colorName}`)
  }
  
  return classes
}

function parseFontSize(value: string): string[] {
  const classes: string[] = []
  
  // Handle common font sizes
  if (value === '12px' || value === '0.75rem') {
    classes.push('text-xs')
  } else if (value === '14px' || value === '0.875rem') {
    classes.push('text-sm')
  } else if (value === '16px' || value === '1rem') {
    classes.push('text-base')
  } else if (value === '18px' || value === '1.125rem') {
    classes.push('text-lg')
  } else if (value === '20px' || value === '1.25rem') {
    classes.push('text-xl')
  } else if (value === '24px' || value === '1.5rem') {
    classes.push('text-2xl')
  } else if (value === '30px' || value === '1.875rem') {
    classes.push('text-3xl')
  } else if (value === '36px' || value === '2.25rem') {
    classes.push('text-4xl')
  } else {
    // Custom font size
    classes.push(`text-[${value}]`)
  }
  
  return classes
}

function parseFontWeight(value: string): string[] {
  const classes: string[] = []
  
  if (value === '100' || value === 'thin') {
    classes.push('font-thin')
  } else if (value === '200' || value === 'extralight') {
    classes.push('font-extralight')
  } else if (value === '300' || value === 'light') {
    classes.push('font-light')
  } else if (value === '400' || value === 'normal') {
    classes.push('font-normal')
  } else if (value === '500' || value === 'medium') {
    classes.push('font-medium')
  } else if (value === '600' || value === 'semibold') {
    classes.push('font-semibold')
  } else if (value === '700' || value === 'bold') {
    classes.push('font-bold')
  } else if (value === '800' || value === 'extrabold') {
    classes.push('font-extrabold')
  } else if (value === '900' || value === 'black') {
    classes.push('font-black')
  }
  
  return classes
}

function parseBorder(value: string): string[] {
  const classes: string[] = []
  
  if (value === 'none') {
    classes.push('border-0')
  } else if (value.includes('solid')) {
    classes.push('border-solid')
  } else if (value.includes('dashed')) {
    classes.push('border-dashed')
  } else if (value.includes('dotted')) {
    classes.push('border-dotted')
  }
  
  return classes
}

function parseBorderRadius(value: string): string[] {
  const classes: string[] = []
  
  if (value === '0' || value === '0px') {
    classes.push('rounded-none')
  } else if (value === '2px' || value === '0.125rem') {
    classes.push('rounded-sm')
  } else if (value === '4px' || value === '0.25rem') {
    classes.push('rounded')
  } else if (value === '6px' || value === '0.375rem') {
    classes.push('rounded-md')
  } else if (value === '8px' || value === '0.5rem') {
    classes.push('rounded-lg')
  } else if (value === '12px' || value === '0.75rem') {
    classes.push('rounded-xl')
  } else if (value === '16px' || value === '1rem') {
    classes.push('rounded-2xl')
  } else if (value === '24px' || value === '1.5rem') {
    classes.push('rounded-3xl')
  } else {
    classes.push(`rounded-[${value}]`)
  }
  
  return classes
}

function parseBoxShadow(value: string): string[] {
  const classes: string[] = []
  
  if (value === 'none') {
    classes.push('shadow-none')
  } else if (value.includes('0 1px 3px')) {
    classes.push('shadow-sm')
  } else if (value.includes('0 1px 2px')) {
    classes.push('shadow')
  } else if (value.includes('0 4px 6px')) {
    classes.push('shadow-md')
  } else if (value.includes('0 10px 15px')) {
    classes.push('shadow-lg')
  } else if (value.includes('0 20px 25px')) {
    classes.push('shadow-xl')
  } else if (value.includes('0 25px 50px')) {
    classes.push('shadow-2xl')
  } else {
    classes.push(`shadow-[${value}]`)
  }
  
  return classes
}

function parseSize(value: string, prefix: string): string[] {
  const classes: string[] = []
  
  if (value === 'auto') {
    classes.push(`${prefix}-auto`)
  } else if (value === '100%') {
    classes.push(`${prefix}-full`)
  } else if (value === '50%') {
    classes.push(`${prefix}-1/2`)
  } else if (value === '25%') {
    classes.push(`${prefix}-1/4`)
  } else if (value === '75%') {
    classes.push(`${prefix}-3/4`)
  } else if (value === '33.333333%') {
    classes.push(`${prefix}-1/3`)
  } else if (value === '66.666667%') {
    classes.push(`${prefix}-2/3`)
  } else if (value === '100vh') {
    classes.push(`${prefix}-screen`)
  } else if (value === '100vw') {
    classes.push(`${prefix}-screen`)
  } else {
    classes.push(`${prefix}-[${value}]`)
  }
  
  return classes
}

function convertSpacingValue(value: string): string {
  // Convert common spacing values to Tailwind classes
  if (value === '0' || value === '0px') {
    return '0'
  } else if (value === '1px') {
    return 'px'
  } else if (value === '2px' || value === '0.125rem') {
    return '0.5'
  } else if (value === '4px' || value === '0.25rem') {
    return '1'
  } else if (value === '8px' || value === '0.5rem') {
    return '2'
  } else if (value === '12px' || value === '0.75rem') {
    return '3'
  } else if (value === '16px' || value === '1rem') {
    return '4'
  } else if (value === '20px' || value === '1.25rem') {
    return '5'
  } else if (value === '24px' || value === '1.5rem') {
    return '6'
  } else if (value === '32px' || value === '2rem') {
    return '8'
  } else if (value === '40px' || value === '2.5rem') {
    return '10'
  } else if (value === '48px' || value === '3rem') {
    return '12'
  } else if (value === '64px' || value === '4rem') {
    return '16'
  } else if (value === '80px' || value === '5rem') {
    return '20'
  } else if (value === '96px' || value === '6rem') {
    return '24'
  } else {
    // Custom spacing value
    return `[${value}]`
  }
}
