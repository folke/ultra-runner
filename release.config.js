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
        presetConfig: {
          types: [
            { type: "feat", section: "Features" },
            { type: "fix", section: "Bug Fixes" },
            { type: "chore", section: "Other" },
            { type: "docs", section: "Other" },
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
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    [
      "@semantic-release/git",
      {
        assets: [["CHANGELOG.md", "package.json", "../../CHANGELOG.md"]],
      },
    ],
  ],
}
