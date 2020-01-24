module.exports = {
  releaseCommitMessageFormat: "chore(release): {{currentTag}} [ci skip]",
  types: [
    { type: "feat", section: "Features" },
    { type: "fix", section: "Bug Fixes" },
    { type: "chore", section: "Other" },
    { type: "docs", section: "Other" },
    { type: "style", section: "Other" },
    { type: "refactor", section: "Other" },
    { type: "perf", section: "Other" },
    { type: "test", section: "Other" },
    { type: "ci", section: "Other" },
  ],
}
