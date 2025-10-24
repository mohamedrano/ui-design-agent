import { ai, flow, CommonSchemas } from '../genkit'
import { z } from 'zod'
import { runAxe } from '../tools/axe-runner.tool'
import { extractDOM } from '../tools/html-dom-extractor.tool'

const HtmlAnalysisSchema = z.object({
  landmarks: z.array(z.string()),
  headingsOutline: z.array(z.object({ 
    level: z.number(), 
    text: z.string(),
    id: z.string().optional(),
  })),
  ariaFindings: z.array(z.string()),
  semanticsScore: z.number().min(0).max(100),
  issues: z.array(z.object({
    severity: z.enum(['critical', 'high', 'medium', 'low']),
    description: z.string(),
    howToFix: z.string(),
    element: z.string().optional(),
    lineNumber: z.number().optional(),
  })),
  recommendations: z.array(z.string()),
  metrics: z.object({
    totalElements: z.number(),
    interactiveElements: z.number(),
    formElements: z.number(),
    imageElements: z.number(),
    linkElements: z.number(),
  }),
})

export type HtmlAnalysis = z.infer<typeof HtmlAnalysisSchema>

export const analyzeHTMLFlow = flow(
  {
    name: 'analyzeHTMLFlow',
    inputSchema: z.object({
      htmlOrJsx: z.string(),
      cssContext: z.string().optional(),
    }),
    outputSchema: HtmlAnalysisSchema,
  },
  async (input) => {
    try {
      // Extract DOM structure
      const dom = await extractDOM({ source: input.htmlOrJsx })
      
      // Run accessibility audit with axe
      const axeResults = await runAxe({ 
        html: input.htmlOrJsx, 
        css: input.cssContext 
      })

      const prompt = `
تحليل شامل للبنية الدلالية والوصولية لـ HTML/JSX:

الكود المراد تحليله:
${input.htmlOrJsx}

${input.cssContext ? `CSS المرتبط:\n${input.cssContext}` : ''}

نتائج فحص axe الأولية:
${JSON.stringify(axeResults, null, 2)}

يرجى تحليل:
1. البنية الدلالية (landmarks, headings hierarchy)
2. استخدام ARIA بشكل صحيح
3. إمكانية الوصول (WCAG 2.2)
4. جودة الكود الهيكلي
5. التوصيات للتحسين

أخرج النتائج وفق المخطط المحدد مع التركيز على:
- نقاط الضعف الحرجة في الوصولية
- مشاكل البنية الدلالية
- التوصيات العملية للتحسين
- المقاييس الكمية للعناصر
`

      const result = await ai.generate({
        model: 'googleai/gemini-2.5-pro',
        prompt,
        output: { schema: HtmlAnalysisSchema },
        config: { 
          temperature: 0.2,
          maxOutputTokens: 4000,
        },
        system: 'خبير في HTML5، إمكانية الوصول (WCAG 2.2)، والبنية الدلالية. تحليل دقيق ومفصل.',
      })

      return result.output
    } catch (error) {
      console.error('Error in analyzeHTMLFlow:', error)
      throw new Error(`Failed to analyze HTML: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
)
