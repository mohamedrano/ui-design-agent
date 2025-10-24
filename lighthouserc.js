module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:3000/", "http://localhost:3000/design-system"],
      startServerCommand: "pnpm start",
      startServerReadyPattern: "ready - started server on",
      numberOfRuns: 1
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.90 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "uses-text-compression": "error",
        "total-byte-weight": ["error", { maxNumericValue: 256000 }], // ~250KB
      }
    },
    upload: { target: "temporary-public-storage" }
  }
};
