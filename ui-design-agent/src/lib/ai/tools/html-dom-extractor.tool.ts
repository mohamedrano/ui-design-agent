import { JSDOM } from 'jsdom'
import { parse } from '@babel/parser'
import { transform } from '@babel/core'

export interface DOMExtractionOptions {
  source: string
  isJSX?: boolean
}

export interface DOMStructure {
  tagName: string
  attributes: Record<string, string>
  children: DOMStructure[]
  textContent?: string
  nodeType: number
  className?: string
  id?: string
}

export interface ExtractedDOM {
  structure: DOMStructure
  landmarks: Array<{
    type: string
    element: string
    text: string
  }>
  headings: Array<{
    level: number
    text: string
    id?: string
  }>
  forms: Array<{
    id?: string
    name?: string
    action?: string
    method?: string
    inputs: Array<{
      type: string
      name?: string
      id?: string
      required?: boolean
      placeholder?: string
    }>
  }>
  links: Array<{
    href: string
    text: string
    target?: string
  }>
  images: Array<{
    src: string
    alt?: string
    width?: string
    height?: string
  }>
  interactiveElements: Array<{
    type: string
    element: string
    text: string
    attributes: Record<string, string>
  }>
}

export async function extractDOM(options: DOMExtractionOptions): Promise<ExtractedDOM> {
  try {
    let html: string

    if (options.isJSX || options.source.includes('<') && options.source.includes('>')) {
      // Handle JSX by converting to HTML
      html = await convertJSXToHTML(options.source)
    } else {
      html = options.source
    }

    // Create JSDOM instance
    const dom = new JSDOM(html, {
      url: 'http://localhost:3000',
      pretendToBeVisual: true,
    })

    const document = dom.window.document

    // Extract DOM structure
    const structure = extractDOMStructure(document.body)

    // Extract landmarks
    const landmarks = extractLandmarks(document)

    // Extract headings
    const headings = extractHeadings(document)

    // Extract forms
    const forms = extractForms(document)

    // Extract links
    const links = extractLinks(document)

    // Extract images
    const images = extractImages(document)

    // Extract interactive elements
    const interactiveElements = extractInteractiveElements(document)

    return {
      structure,
      landmarks,
      headings,
      forms,
      links,
      images,
      interactiveElements,
    }
  } catch (error) {
    console.error('Error extracting DOM:', error)
    throw new Error(`Failed to extract DOM: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

async function convertJSXToHTML(jsx: string): Promise<string> {
  try {
    // Parse JSX
    const ast = parse(jsx, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    })

    // Transform to HTML (simplified conversion)
    const result = transform(ast, {
      plugins: [
        ['@babel/plugin-transform-react-jsx', { pragma: 'h' }],
      ],
    })

    // For now, return the original JSX as HTML
    // In a real implementation, you'd convert JSX to HTML
    return jsx.replace(/<(\w+)([^>]*)>/g, '<$1$2>')
              .replace(/<\/(\w+)>/g, '</$1>')
  } catch (error) {
    console.warn('Failed to convert JSX to HTML, using as-is:', error)
    return jsx
  }
}

function extractDOMStructure(element: Element): DOMStructure {
  const children: DOMStructure[] = []
  
  for (const child of element.children) {
    children.push(extractDOMStructure(child))
  }

  const attributes: Record<string, string> = {}
  for (const attr of element.attributes) {
    attributes[attr.name] = attr.value
  }

  return {
    tagName: element.tagName.toLowerCase(),
    attributes,
    children,
    textContent: element.textContent?.trim() || undefined,
    nodeType: element.nodeType,
    className: element.className || undefined,
    id: element.id || undefined,
  }
}

function extractLandmarks(document: Document): Array<{ type: string; element: string; text: string }> {
  const landmarks: Array<{ type: string; element: string; text: string }> = []
  
  // Common landmark selectors
  const landmarkSelectors = [
    'main',
    'nav',
    'header',
    'footer',
    'aside',
    'section[aria-label]',
    'section[aria-labelledby]',
    '[role="banner"]',
    '[role="navigation"]',
    '[role="main"]',
    '[role="complementary"]',
    '[role="contentinfo"]',
  ]

  for (const selector of landmarkSelectors) {
    const elements = document.querySelectorAll(selector)
    for (const element of elements) {
      landmarks.push({
        type: element.getAttribute('role') || element.tagName.toLowerCase(),
        element: element.tagName.toLowerCase(),
        text: element.textContent?.trim().substring(0, 100) || '',
      })
    }
  }

  return landmarks
}

function extractHeadings(document: Document): Array<{ level: number; text: string; id?: string }> {
  const headings: Array<{ level: number; text: string; id?: string }> = []
  
  for (let level = 1; level <= 6; level++) {
    const elements = document.querySelectorAll(`h${level}`)
    for (const element of elements) {
      headings.push({
        level,
        text: element.textContent?.trim() || '',
        id: element.id || undefined,
      })
    }
  }

  return headings
}

function extractForms(document: Document): Array<{
  id?: string
  name?: string
  action?: string
  method?: string
  inputs: Array<{
    type: string
    name?: string
    id?: string
    required?: boolean
    placeholder?: string
  }>
}> {
  const forms: Array<{
    id?: string
    name?: string
    action?: string
    method?: string
    inputs: Array<{
      type: string
      name?: string
      id?: string
      required?: boolean
      placeholder?: string
    }>
  }> = []

  const formElements = document.querySelectorAll('form')
  for (const form of formElements) {
    const inputs: Array<{
      type: string
      name?: string
      id?: string
      required?: boolean
      placeholder?: string
    }> = []

    const inputElements = form.querySelectorAll('input, textarea, select')
    for (const input of inputElements) {
      inputs.push({
        type: input.getAttribute('type') || input.tagName.toLowerCase(),
        name: input.getAttribute('name') || undefined,
        id: input.getAttribute('id') || undefined,
        required: input.hasAttribute('required'),
        placeholder: input.getAttribute('placeholder') || undefined,
      })
    }

    forms.push({
      id: form.id || undefined,
      name: form.getAttribute('name') || undefined,
      action: form.getAttribute('action') || undefined,
      method: form.getAttribute('method') || undefined,
      inputs,
    })
  }

  return forms
}

function extractLinks(document: Document): Array<{ href: string; text: string; target?: string }> {
  const links: Array<{ href: string; text: string; target?: string }> = []
  
  const linkElements = document.querySelectorAll('a[href]')
  for (const link of linkElements) {
    links.push({
      href: link.getAttribute('href') || '',
      text: link.textContent?.trim() || '',
      target: link.getAttribute('target') || undefined,
    })
  }

  return links
}

function extractImages(document: Document): Array<{
  src: string
  alt?: string
  width?: string
  height?: string
}> {
  const images: Array<{ src: string; alt?: string; width?: string; height?: string }> = []
  
  const imgElements = document.querySelectorAll('img')
  for (const img of imgElements) {
    images.push({
      src: img.getAttribute('src') || '',
      alt: img.getAttribute('alt') || undefined,
      width: img.getAttribute('width') || undefined,
      height: img.getAttribute('height') || undefined,
    })
  }

  return images
}

function extractInteractiveElements(document: Document): Array<{
  type: string
  element: string
  text: string
  attributes: Record<string, string>
}> {
  const interactiveElements: Array<{
    type: string
    element: string
    text: string
    attributes: Record<string, string>
  }> = []

  const interactiveSelectors = [
    'button',
    'input[type="button"]',
    'input[type="submit"]',
    'input[type="reset"]',
    'select',
    'textarea',
    '[role="button"]',
    '[role="tab"]',
    '[role="menuitem"]',
    '[tabindex]',
  ]

  for (const selector of interactiveSelectors) {
    const elements = document.querySelectorAll(selector)
    for (const element of elements) {
      const attributes: Record<string, string> = {}
      for (const attr of element.attributes) {
        attributes[attr.name] = attr.value
      }

      interactiveElements.push({
        type: element.getAttribute('type') || element.getAttribute('role') || element.tagName.toLowerCase(),
        element: element.tagName.toLowerCase(),
        text: element.textContent?.trim() || '',
        attributes,
      })
    }
  }

  return interactiveElements
}
