import { ai, flow } from '../genkit'
import { z } from 'zod'
import { readFile, readdir } from 'fs/promises'
import { join, extname } from 'path'

const RiskRegisterSchema = z.object({
  id: z.string(),
  severity: z.enum(['critical', 'high', 'medium', 'low']),
  category: z.enum(['css', 'html', 'performance', 'accessibility', 'maintainability']),
  description: z.string(),
  impact: z.string(),
  likelihood: z.enum(['high', 'medium', 'low']),
  mitigation: z.string(),
  file: z.string(),
  lineNumber: z.number().optional(),
})

const UnusedSelectorSchema = z.object({
  selector: z.string(),
  file: z.string(),
  lineNumber: z.number(),
  confidence: z.number().min(0).max(100),
})

const ComplexityHotspotSchema = z.object({
  file: z.string(),
  complexity: z.number(),
  issues: z.array(z.string()),
  suggestions: z.array(z.string()),
})

const RefactorPlanSchema = z.object({
  priority: z.enum(['high', 'medium', 'low']),
  task: z.string(),
  estimatedEffort: z.string(),
  dependencies: z.array(z.string()),
  files: z.array(z.string()),
})

const RepoAuditSchema = z.object({
  riskRegister: z.array(RiskRegisterSchema),
  unusedSelectors: z.array(UnusedSelectorSchema),
  complexityHotspots: z.array(ComplexityHotspotSchema),
  refactorPlan: z.array(RefactorPlanSchema),
  summary: z.object({
    totalFiles: z.number(),
    totalLines: z.number(),
    cssFiles: z.number(),
    componentFiles: z.number(),
    riskScore: z.number().min(0).max(100),
    maintainabilityScore: z.number().min(0).max(100),
  }),
  recommendations: z.array(z.string()),
})

export type RepoAudit = z.infer<typeof RepoAuditSchema>

export const repoAuditFlow = flow(
  {
    name: 'repoAuditFlow',
    inputSchema: z.object({
      paths: z.array(z.string()),
      includePatterns: z.array(z.string()).optional(),
      excludePatterns: z.array(z.string()).optional(),
    }),
    outputSchema: RepoAuditSchema,
  },
  async (input) => {
    try {
      // Scan files in the specified paths
      const files = await scanFiles(input.paths, input.includePatterns, input.excludePatterns)
      
      // Analyze CSS files
      const cssFiles = files.filter(f => extname(f) === '.css' || extname(f) === '.scss' || extname(f) === '.less')
      const componentFiles = files.filter(f => extname(f) === '.tsx' || extname(f) === '.jsx')
      
      // Read and analyze file contents
      const fileContents = await Promise.all(
        files.map(async (file) => ({
          path: file,
          content: await readFile(file, 'utf-8'),
        }))
      )

      const prompt = `
تحليل شامل لمستودع الكود للواجهات:

الملفات المفحوصة:
${files.map(f => `- ${f}`).join('\n')}

محتوى الملفات:
${fileContents.map(f => `\n=== ${f.path} ===\n${f.content.substring(0, 1000)}...`).join('\n')}

يرجى تحليل:
1. سجل المخاطر (CSS غير مستخدم، تعقيد عالي، مشاكل أداء)
2. قواعد CSS غير مستخدمة
3. نقاط التعقيد في الكود
4. خطة إعادة الهيكلة
5. التوصيات للتحسين

أخرج النتائج وفق المخطط المحدد مع التركيز على:
- المخاطر الحرجة التي تحتاج إصلاح فوري
- الفرص لتحسين الأداء والصيانة
- خطة عمل واضحة لإعادة الهيكلة
`

      const result = await ai.generate({
        model: 'googleai/gemini-2.5-pro',
        prompt,
        output: { schema: RepoAuditSchema },
        config: { 
          temperature: 0.3,
          maxOutputTokens: 4000,
        },
        system: 'خبير في تحليل الكود، إدارة المخاطر، وإعادة هيكلة المشاريع. تحليل دقيق ومفصل.',
      })

      return result.output
    } catch (error) {
      console.error('Error in repoAuditFlow:', error)
      throw new Error(`Failed to audit repository: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
)

async function scanFiles(
  paths: string[], 
  includePatterns?: string[], 
  excludePatterns?: string[]
): Promise<string[]> {
  const files: string[] = []
  
  for (const path of paths) {
    try {
      const entries = await readdir(path, { withFileTypes: true })
      
      for (const entry of entries) {
        const fullPath = join(path, entry.name)
        
        if (entry.isDirectory()) {
          // Recursively scan subdirectories
          const subFiles = await scanFiles([fullPath], includePatterns, excludePatterns)
          files.push(...subFiles)
        } else if (entry.isFile()) {
          // Check if file matches include/exclude patterns
          const shouldInclude = !includePatterns || includePatterns.some(pattern => 
            entry.name.includes(pattern)
          )
          const shouldExclude = excludePatterns && excludePatterns.some(pattern => 
            entry.name.includes(pattern)
          )
          
          if (shouldInclude && !shouldExclude) {
            files.push(fullPath)
          }
        }
      }
    } catch (error) {
      console.warn(`Could not scan directory ${path}:`, error)
    }
  }
  
  return files
}
