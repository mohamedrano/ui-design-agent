module.exports = {
  ci: {
    collect: {
      // الصفحات الأساسية للاختبار
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/design-system',
        'http://localhost:3000/projects',
      ],

      // إعدادات الخادم للاختبار
      startServerCommand: 'pnpm start',
      startServerReadyPattern: 'ready - started server on',
      startServerReadyTimeout: 30000,

      // عدد التشغيلات لكل صفحة للحصول على متوسط دقيق
      numberOfRuns: 3,

      // إعدادات Chrome للاختبار
      settings: {
        chromeFlags: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--headless',
        ],
      },
    },

    assert: {
      assertions: {
        // معايير الأداء الأساسية
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],

        // مقاييس الأداء التفصيلية
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }], // 2s
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }], // 2.5s
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }], // 300ms

        // ميزانية الحجم والموارد
        'total-byte-weight': ['error', { maxNumericValue: 256000 }], // ~250KB
        'unused-javascript': ['warn', { maxNumericValue: 20000 }], // 20KB unused JS
        'unused-css-rules': ['warn', { maxNumericValue: 10000 }], // 10KB unused CSS

        // تحسينات الضغط والتحميل
        'uses-text-compression': 'error',
        'uses-responsive-images': 'error',
        'modern-image-formats': 'error',
        'efficient-animated-content': 'warn',
        'preload-lcp-image': 'warn',

        // تحسينات الشبكة
        'uses-http2': 'warn',
        'uses-rel-preconnect': 'warn',
        'uses-rel-preload': 'warn',

        // أفضل الممارسات الأمنية
        'is-on-https': 'error',
        'uses-https': 'error',
        'csp-xss': 'warn',

        // إمكانية الوصول المتقدمة
        'color-contrast': 'error',
        'heading-order': 'error',
        'aria-allowed-attr': 'error',
        'aria-required-attr': 'error',
        'button-name': 'error',
        'image-alt': 'error',
        label: 'error',
        'link-name': 'error',

        // تحسينات PWA (إذا كان مطبق)
        'installable-manifest': 'off', // متوقف حالياً
        'service-worker': 'off', // متوقف حالياً

        // تجاهل بعض المقاييس غير الحرجة في البيئة التطويرية
        'tap-targets': 'warn',
        'meta-description': 'warn',
      },

      // إعدادات مستويات التحذير
      preset: 'lighthouse:no-pwa', // تجاهل متطلبات PWA حالياً

      // تسامح مع اختلافات بسيطة بين التشغيلات
      includePassedAssertions: false,
    },

    upload: {
      // رفع النتائج للتخزين المؤقت العام لمراجعة النتائج
      target: 'temporary-public-storage',

      // أو يمكن استخدام filesystem للتطوير المحلي
      // target: "filesystem",
      // outputDir: "./lighthouse-results"
    },

    server: {
      // إعدادات الخادم المحلي
      port: 3000,
      host: 'localhost',
    },
  },
};
