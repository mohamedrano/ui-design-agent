# UI Design Agent - Advanced Edition

> **نسخة أقوى وأكثر تطورًا** من وكيل تصميم وإعادة تصميم الواجهات، مع توسيع المهام والقدرات وإعادة كتابة السياق الهندسي كاملًا بصورة إنتاجيّة صارمة.

## 🚀 الميزات الرئيسية

### تحليل شامل متعدد المصادر
- قراءة CSS/SCSS/LESS وHTML/JSX/TSX وملفات README/Docs وTokens
- استخراج الـ Design Language (ألوان/خطوط/Spacing/Grids/Patterns)
- بناء معرفة يمكن البحث فيها (RAG)

### تدقيق WCAG 2.2 + مُحلِّل قيود
- كشف الثغرات في التباين، لوحة المفاتيح، قارئات الشاشة
- التركيب الدلالي، ARIA
- مُحلّل قيود (Constraint Solver) يقترح **إصلاحات دقيقة**

### توليد نظام تصميم وملفات تكوين إنتاجية
- Tokens موحّدة (Style Dictionary)
- Tailwind Config مُولّد
- CSS Variables
- دعم تعدد الثيمات (Light/Dark/High-Contrast)

### إعادة الهيكلة والتحويل التلقائي
- تحويل CSS متناثر إلى **Utilities Tailwind**
- ترشيد الأنماط غير المستخدمة (Purge/Tree-Shaking)
- تقليل التعقيد

### توليد مكتبة مكوّنات React/TS
- shadcn/ui + Radix UI + Headless Patterns
- نماذج قابلية وصول صلبة
- توليد قصص Storybook تلقائيًا

### تحليل الأداء والميزانيات
- Lighthouse/Axe/Playwright/Bundle Size Budgets
- CI Gates مع تقارير قابلة للتحرك
- تصميم **ميزانيات أداء** (LCP/INP/CLS/Bundle KB)

### مقارنة مرئية (Visual Diffing) وVRT
- أخذ لقطات عبر أبعاد شاشات مختلفة
- اكتشاف انحرافات بصرية
- إرفاق تقارير PR

### تقييم A/B وقياس الأثر
- مُقوِّم موضوعي لجودة الواجهة
- قابلية استخدام/وضوح/اكتشاف الأخطاء/السرعة المدركة
- مؤشرات قياس

## 🛠️ المكدّس التقني

```typescript
// Core Technologies (Production-grade)
- Runtime: Node.js 20+ (LTS) | Edge (اختياري لمسارات القراءة)
- Framework: Next.js 15.5 (App Router + Turbopack)
- Language: TypeScript 5.6+
- AI Framework: Google Genkit 1.0
- Base Model: Gemini 2.5 Pro (models/gemini-2.5-pro)
- UI: React 19, Tailwind CSS v4, shadcn/ui, Radix UI
- State: Zustand + React Query
- Forms/Validation: React Hook Form + Zod
- Animations: Framer Motion
- Icons: Lucide React
- Design Tokens: Style Dictionary
- Testing: Vitest (الوحدات) + Playwright (E2E) + Axe (A11y) + Lighthouse CI
- Linting/Format: ESLint 9 (Flat) + Prettier + Commitlint + Husky
- CI/CD: GitHub Actions (CI/Build/Test/Lint/A11y/Perf) + Deploy (Vercel)
- Caching/Rate Limit: Upstash Redis (اختياري)/In-memory fallback
- Observability: OpenTelemetry + structured logger + Sentry (اختياري)
```

## 📁 هيكل المشروع

```
ui-design-agent/
├─ .github/workflows/
│  ├─ ci.yml                 # build/lint/type-check/test + axe + lighthouse budgets
│  └─ deploy.yml             # نشر تلقائي + تحققات ما قبل النشر
├─ app/
│  ├─ (auth)/...
│  ├─ (dashboard)/
│  │  ├─ projects/[id]/page.tsx
│  │  ├─ projects/[id]/analyze/page.tsx
│  │  ├─ projects/[id]/redesign/page.tsx
│  │  ├─ design-system/page.tsx
│  │  ├─ ab-evaluator/page.tsx          # شاشة تقييم A/B
│  │  ├─ visual-diff/page.tsx           # تقارير VRT/الانحرافات
│  │  └─ settings/page.tsx
│  ├─ api/
│  │  ├─ ai/analyze/route.ts
│  │  ├─ ai/generate/route.ts
│  │  ├─ ai/chat/route.ts
│  │  ├─ repo/audit/route.ts            # تدقيق كود الواجهة
│  │  ├─ refactor/tailwind/route.ts     # تحويل CSS→Tailwind
│  │  ├─ visual-diff/route.ts           # تشغيل لقطات VRT
│  │  ├─ accessibility/route.ts
│  │  ├─ performance/route.ts           # Lighthouse budgets
│  │  ├─ design-tokens/route.ts
│  │  └─ webhook/route.ts
│  ├─ layout.tsx / page.tsx / error.tsx / loading.tsx / not-found.tsx
├─ src/
│  ├─ lib/
│  │  ├─ ai/
│  │  │  ├─ genkit.ts
│  │  │  ├─ flows/
│  │  │  │  ├─ analyze-css.flow.ts
│  │  │  │  ├─ analyze-html.flow.ts             # جديد
│  │  │  │  ├─ repo-audit.flow.ts               # جديد
│  │  │  │  ├─ refactor-css-to-tailwind.flow.ts # جديد
│  │  │  │  ├─ generate-design.flow.ts
│  │  │  │  ├─ component-library.flow.ts        # جديد
│  │  │  │  ├─ accessibility-audit.flow.ts
│  │  │  │  ├─ visual-diff.flow.ts              # جديد
│  │  │  │  └─ ab-evaluator.flow.ts             # جديد
│  │  │  └─ tools/
│  │  │     ├─ css-parser.tool.ts
│  │  │     ├─ color-analyzer.tool.ts
│  │  │     ├─ html-dom-extractor.tool.ts       # جديد
│  │  │     ├─ axe-runner.tool.ts               # WCAG via axe
│  │  │     ├─ lighthouse-runner.tool.ts
│  │  │     ├─ tailwind-suggester.tool.ts       # جديد
│  │  │     └─ patch-generator.tool.ts          # يُنتج diff/patch
│  │  ├─ analyzers/ (typography/color/wcag/perf/spacing/…)
│  │  ├─ generators/ (design-system/component/tailwind-config/…)
│  │  ├─ validators/
│  │  ├─ utils/ (logger, error-handler, cache-utils, file-utils, git-utils)
│  │  └─ parsers/ (css/figma/readme/design-tokens)
│  ├─ components/
│  │  ├─ ui/…  ├─ features/{design-analyzer,chat,preview,ab,visual-diff,code-export}
│  ├─ hooks/ (use-ai-agent, use-visual-diff, use-ab-eval, use-design-export)
│  ├─ stores/ (project-store, design-store, eval-store, ui-store)
│  ├─ types/ (ai-types, design-types, analysis-types, repo-types, api-types)
│  └─ config/ (ai-config, app-config, design-system-config, budgets.config.ts)
├─ public/{fonts,images,examples}
├─ tests/{unit,integration,e2e,__snapshots__}
├─ docs/{API.md,ARCHITECTURE.md,DEPLOYMENT.md,DESIGN_GUIDE.md}
├─ .env.example  .eslintrc.js  .prettierrc  .commitlintrc.js
├─ next.config.ts  tailwind.config.ts  tsconfig.json  package.json  README.md
```

## 🚀 البدء السريع

### 1. تثبيت التبعيات

```bash
# تثبيت pnpm (إذا لم يكن مثبتاً)
npm install -g pnpm

# تثبيت التبعيات
pnpm install
```

### 2. إعداد متغيرات البيئة

```bash
# نسخ ملف البيئة
cp .env.example .env.local

# تعديل المتغيرات المطلوبة
nano .env.local
```

### 3. تشغيل التطبيق

```bash
# وضع التطوير
pnpm dev

# بناء التطبيق
pnpm build

# تشغيل التطبيق
pnpm start
```

## 🔧 الأوامر المتاحة

```json
{
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json,md}\"",
    "type-check": "tsc --noEmit",
    "test": "vitest run",
    "test:ui": "vitest --ui",
    "e2e": "playwright test",
    "a11y": "axe -c axe.config.cjs",
    "perf": "lhci autorun",
    "prepare": "husky install",
    "ci:all": "pnpm type-check && pnpm lint && pnpm test && pnpm e2e && pnpm a11y && pnpm perf"
  }
}
```

## 📊 الميزانيات والأداء

### ميزانيات الأداء
- **LCP**: ≤ 2.5s (دسك توب) / ≤ 3.5s (موبايل)
- **INP**: ≤ 200ms
- **CLS**: ≤ 0.1
- **Bundle Size**: ≤ 300KB (دسك توب) / ≤ 350KB (موبايل)

### ميزانيات إمكانية الوصول
- **الدرجة الدنيا**: 90/100
- **المشاكل الحرجة**: 0
- **المشاكل العالية**: ≤ 2
- **المشاكل المتوسطة**: ≤ 5

### ميزانيات جودة الكود
- **التعقيد**: ≤ 10
- **التعقيد الدوري**: ≤ 15
- **التعقيد المعرفي**: ≤ 20
- **الأسطر لكل دالة**: ≤ 50

## 🧪 الاختبارات

### اختبارات الوحدات
```bash
pnpm test
```

### اختبارات E2E
```bash
pnpm e2e
```

### اختبارات إمكانية الوصول
```bash
pnpm a11y
```

### اختبارات الأداء
```bash
pnpm perf
```

## 🔍 تحليل الكود

### تحليل CSS
```bash
curl -X POST http://localhost:3000/api/ai/analyze \
  -H "Content-Type: application/json" \
  -d '{"cssContent": "..."}'
```

### تدقيق المستودع
```bash
curl -X POST http://localhost:3000/api/repo/audit \
  -H "Content-Type: application/json" \
  -d '{"paths": ["src/components", "app"]}'
```

### تحويل CSS إلى Tailwind
```bash
curl -X POST http://localhost:3000/api/refactor/tailwind \
  -H "Content-Type: application/json" \
  -d '{"css": "...", "filePath": "..."}'
```

## 📈 المراقبة والملاحظة

- **OpenTelemetry**: تتبع flows (اسم التدفق، الزمن، المحاولات، حجم المخرجات)
- **Sentry** (اختياري): Captures مع Metadata
- **لوحات CI artifacts**: تقارير Lighthouse/Axe/Visual Diff

## 🚀 النشر

### Vercel (مُوصى به)
```bash
# تثبيت Vercel CLI
npm i -g vercel

# نشر التطبيق
vercel --prod
```

### Docker
```bash
# بناء الصورة
docker build -t ui-design-agent .

# تشغيل الحاوية
docker run -p 3000:3000 ui-design-agent
```

## 🤝 المساهمة

1. Fork المشروع
2. إنشاء فرع للميزة (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add some amazing feature'`)
4. Push إلى الفرع (`git push origin feature/amazing-feature`)
5. فتح Pull Request

## 📝 الترخيص

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

## 🙏 الشكر والتقدير

- [Next.js](https://nextjs.org/) - React Framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Google Genkit](https://genkit.dev/) - AI Framework
- [Radix UI](https://www.radix-ui.com/) - Headless UI Components
- [shadcn/ui](https://ui.shadcn.com/) - Component Library
- [Playwright](https://playwright.dev/) - E2E Testing
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance Testing
- [axe-core](https://www.deque.com/axe/) - Accessibility Testing

## 📞 الدعم

إذا واجهت أي مشاكل أو لديك أسئلة، يرجى:

1. فتح [Issue](https://github.com/your-username/ui-design-agent/issues)
2. مراجعة [الوثائق](docs/)
3. التواصل معنا عبر [البريد الإلكتروني](mailto:support@ui-design-agent.com)

---

**ملاحظة**: هذا المشروع في مرحلة التطوير النشط. قد تحدث تغييرات كبيرة في API قبل الإصدار المستقر.
