module.exports = {
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
        releaseRules: [
          { type: "docs", release: "patch" },
          { type: "perf", release: "patch" },
          { type: "style", release: "patch" },
        ],
        parserOpts: {
          noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES"],
        },
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "conventionalcommits",
        presetConfig: {
          types: [
            { type: "feat", section: "Features" },
            { type: "fix", section: "Bug Fixes" },
            { type: "chore", section: "Other" },
            { type: "docs", section: "Documentation" },
            { type: "style", section: "Other" },
            { type: "refactor", section: "Other" },
            { type: "perf", section: "Other" },
            { type: "test", section: "Other" },
            { type: "build", section: "Other" },
            { type: "ci", section: "Other" },
          ],
        },
      },
    ],
    "@semantic-release/changelog",
    "@semantic-release/github",
    "@semantic-release/npm",
    "@semantic-release/git",
  ],
}
