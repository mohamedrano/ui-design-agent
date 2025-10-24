module.exports = {
  // صفحات أساسية للاختبار في CI Preview أو محليًا على http://localhost:3000
  urls: ["/", "/design-system", "/projects", "/projects/project-1"],
  // تجاهلات معقولة كي لا تفشل PRs بسبب ضوضاء غير حرجة
  rules: { "region": { enabled: true }, "color-contrast": { enabled: true } },
  concurrency: 2,
  exitOnError: true
};
