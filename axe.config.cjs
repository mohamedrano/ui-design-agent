module.exports = {
  // صفحات أساسية للاختبار في CI Preview أو محليًا على http://localhost:3000
  urls: ['/', '/design-system', '/projects', '/projects/project-1'],

  // تجاهلات معقولة كي لا تفشل PRs بسبب ضوضاء غير حرجة
  rules: {
    region: { enabled: true },
    'color-contrast': { enabled: true },
    'focus-order-semantics': { enabled: true },
    'keyboard-navigation': { enabled: true },
    'aria-valid-attr': { enabled: true },
    'aria-required-attr': { enabled: true },
    'button-name': { enabled: true },
    'form-field-multiple-labels': { enabled: true },
    'heading-order': { enabled: true },
    'html-has-lang': { enabled: true },
    'html-lang-valid': { enabled: true },
    'image-alt': { enabled: true },
    'input-image-alt': { enabled: true },
    label: { enabled: true },
    'link-name': { enabled: true },
    list: { enabled: true },
    listitem: { enabled: true },
    'meta-refresh': { enabled: true },
    'meta-viewport': { enabled: true },
    'page-has-heading-one': { enabled: true },
    'role-img-alt': { enabled: true },
    'scrollable-region-focusable': { enabled: true },
    'server-side-image-map': { enabled: true },
    'svg-img-alt': { enabled: true },
    'th-has-data-cells': { enabled: true },
    'valid-lang': { enabled: true },
    'video-caption': { enabled: true },
  },

  // إعدادات التنفيذ
  concurrency: 2,
  exitOnError: true,

  // مستوى WCAG المطلوب
  tags: ['wcag2a', 'wcag2aa', 'wcag21aa'],

  // تجاهل بعض العناصر التي قد تسبب false positives
  exclude: [
    ['.loading-skeleton'], // عناصر التحميل
    ["[data-testid='loading']"], // مؤشرات التحميل
    ['.sr-only'], // عناصر screen reader فقط
    ["iframe[src*='vercel.live']"], // Vercel live preview
  ],

  // إعدادات المتصفح
  browser: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ],
  },

  // تحديد timeout للصفحات البطيئة
  timeout: 30000,

  // إعدادات إضافية للبيئة
  waitForSelector: {
    timeout: 5000,
    visible: true,
  },

  // تخصيص مستوى التفاصيل في التقرير
  verbose: process.env.CI ? false : true,

  // مسار حفظ النتائج
  outputDir: './axe-results',
  outputFile: 'axe-results.json',

  // إعدادات خاصة بـ CI
  ci: {
    // في بيئة CI، استخدم إعدادات أكثر صرامة
    failOnError: true,

    // حد أدنى لدرجة الوصولية (من 1 إلى 100)
    threshold: {
      violations: 0, // لا تسمح بأي انتهاكات
      incomplete: 5, // السماح بحد أقصى 5 اختبارات غير مكتملة
    },
  },
};
