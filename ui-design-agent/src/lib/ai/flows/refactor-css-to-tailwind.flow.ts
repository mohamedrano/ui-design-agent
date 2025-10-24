import { ai, flow } from '../genkit'
import { z } from 'zod'
import { suggestTailwindClasses } from '../tools/tailwind-suggester.tool'
import { generatePatch } from '../tools/patch-generator.tool'

const PatchSchema = z.object({
  file: z.string(),
  diff: z.string(),
  before: z.string(),
  after: z.string(),
  lineNumber: z.number().optional(),
})

const RefactorResultSchema = z.object({
  patches: z.array(PatchSchema),
  utilitiesCoverage: z.number().min(0).max(100),
  removedUnusedRules: z.number(),
  notes: z.array(z.string()),
  summary: z.object({
    totalRules: z.number(),
    convertedRules: z.number(),
    remainingRules: z.number(),
    complexityReduction: z.number(),
  }),
  recommendations: z.array(z.string()),
})

export type RefactorResult = z.infer<typeof RefactorResultSchema>

export const refactorCssToTailwindFlow = flow(
  {
    name: 'refactorCssToTailwindFlow',
    inputSchema: z.object({
      css: z.string(),
      filePath: z.string(),
      options: z.object({
        removeUnused: z.boolean().default(true),
        preserveComments: z.boolean().default(true),
        generateUtilities: z.boolean().default(true),
      }).optional(),
    }),
    outputSchema: RefactorResultSchema,
  },
  async (input) => {
    try {
      const options = input.options || {
        removeUnused: true,
        preserveComments: true,
        generateUtilities: true,
      }

      // Get Tailwind class suggestions
      const suggestions = await suggestTailwindClasses({
        css: input.css,
        filePath: input.filePath,
      })

      const prompt = `
تحويل CSS إلى Tailwind CSS:

CSS الأصلي:
${input.css}

الملف: ${input.filePath}

اقتراحات Tailwind:
${JSON.stringify(suggestions, null, 2)}

يرجى تحويل CSS إلى Tailwind مع:
1. تحويل القواعد إلى utility classes
2. إزالة القواعد غير المستخدمة (إذا كان مطلوباً)
3. الحفاظ على التعليقات (إذا كان مطلوباً)
4. إنشاء utilities مخصصة للقواعد المعقدة
5. حساب نسبة التغطية

أخرج النتائج وفق المخطط المحدد مع:
- patches جاهزة للتطبيق
- إحصائيات التحويل
- التوصيات للتحسين
`

      const result = await ai.generate({
        model: 'googleai/gemini-2.5-pro',
        prompt,
        output: { schema: RefactorResultSchema },
        config: { 
          temperature: 0.2,
          maxOutputTokens: 4000,
        },
        system: 'خبير في Tailwind CSS وتحويل CSS. تحويل دقيق وفعال.',
      })

      // Generate actual patches
      const patches = await Promise.all(
        result.output.patches.map(async (patch) => {
          const diff = await generatePatch({
            filePath: patch.file,
            before: patch.before,
            after: patch.after,
          })
          return {
            ...patch,
            diff,
          }
        })
      )

      return {
        ...result.output,
        patches,
      }
    } catch (error) {
      console.error('Error in refactorCssToTailwindFlow:', error)
      throw new Error(`Failed to refactor CSS: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
)
