module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["/lib/", "/node_modules/", "ignore.*"],
  coverageProvider: "v8",
  collectCoverageFrom: ["src/*.ts"],
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
}
