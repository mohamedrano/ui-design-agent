export interface PatchOptions {
  filePath: string
  before: string
  after: string
  context?: number
}

export interface Patch {
  filePath: string
  diff: string
  before: string
  after: string
  lineNumber?: number
}

export async function generatePatch(options: PatchOptions): Promise<string> {
  try {
    const { filePath, before, after, context = 3 } = options
    
    // Generate unified diff format
    const diff = makeUnifiedDiff(filePath, before, after, context)
    
    return diff
  } catch (error) {
    console.error('Error generating patch:', error)
    throw new Error(`Failed to generate patch: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export function makeUnifiedDiff(
  filePath: string,
  before: string,
  after: string,
  context: number = 3
): string {
  const beforeLines = before.split('\n')
  const afterLines = after.split('\n')
  
  // Simple diff algorithm (in production, use a proper diff library)
  const diff = generateDiff(beforeLines, afterLines, context)
  
  const header = `--- a/${filePath}
+++ b/${filePath}
@@ -1,${beforeLines.length} +1,${afterLines.length} @@
`
  
  return header + diff
}

function generateDiff(
  beforeLines: string[],
  afterLines: string[],
  context: number
): string {
  const result: string[] = []
  let beforeIndex = 0
  let afterIndex = 0
  
  while (beforeIndex < beforeLines.length || afterIndex < afterLines.length) {
    const beforeLine = beforeLines[beforeIndex]
    const afterLine = afterLines[afterIndex]
    
    if (beforeLine === afterLine) {
      // Lines are the same
      result.push(` ${beforeLine}`)
      beforeIndex++
      afterIndex++
    } else if (beforeIndex < beforeLines.length && afterIndex < afterLines.length) {
      // Lines are different
      result.push(`-${beforeLine}`)
      result.push(`+${afterLine}`)
      beforeIndex++
      afterIndex++
    } else if (beforeIndex < beforeLines.length) {
      // Line was removed
      result.push(`-${beforeLine}`)
      beforeIndex++
    } else {
      // Line was added
      result.push(`+${afterLine}`)
      afterIndex++
    }
  }
  
  return result.join('\n')
}

export function createPatch(options: PatchOptions): Patch {
  return {
    filePath: options.filePath,
    diff: makeUnifiedDiff(options.filePath, options.before, options.after, options.context),
    before: options.before,
    after: options.after,
  }
}

export function formatPatchForPR(patch: Patch): string {
  const header = `## Changes to \`${patch.filePath}\`

\`\`\`diff
${patch.diff}
\`\`\`

### Summary
- **File**: \`${patch.filePath}\`
- **Changes**: ${patch.after.split('\n').length - patch.before.split('\n').length} lines modified
- **Type**: ${patch.after.split('\n').length > patch.before.split('\n').length ? 'Addition' : 'Modification'}

`
  
  return header
}

export function createCommitMessage(patches: Patch[]): string {
  const fileCount = patches.length
  const totalChanges = patches.reduce((sum, patch) => {
    const beforeLines = patch.before.split('\n').length
    const afterLines = patch.after.split('\n').length
    return sum + Math.abs(afterLines - beforeLines)
  }, 0)
  
  const message = `refactor: convert CSS to Tailwind utilities

- Converted ${fileCount} file(s) to use Tailwind CSS
- ${totalChanges} lines modified
- Improved maintainability and consistency

Files changed:
${patches.map(patch => `- ${patch.filePath}`).join('\n')}`
  
  return message
}

export function createBranchName(prefix: string = 'refactor'): string {
  const timestamp = new Date().toISOString().slice(0, 10)
  const random = Math.random().toString(36).substring(2, 8)
  return `${prefix}/tailwind-conversion-${timestamp}-${random}`
}

export function validatePatch(patch: Patch): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (!patch.filePath) {
    errors.push('File path is required')
  }
  
  if (!patch.diff) {
    errors.push('Diff content is required')
  }
  
  if (!patch.before && !patch.after) {
    errors.push('Either before or after content is required')
  }
  
  if (patch.before === patch.after) {
    errors.push('Before and after content are identical')
  }
  
  return {
    valid: errors.length === 0,
    errors,
  }
}

export function mergePatches(patches: Patch[]): string {
  const header = `# Patch Summary

Generated on: ${new Date().toISOString()}
Total files: ${patches.length}

## Files Modified

`
  
  const fileSections = patches.map(patch => formatPatchForPR(patch)).join('\n---\n\n')
  
  return header + fileSections
}
