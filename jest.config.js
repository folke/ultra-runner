module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["/lib/", "/node_modules/", "ignore.*"],
  coverageProvider: "v8",
  collectCoverageFrom: ["src/*.ts"],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
}
