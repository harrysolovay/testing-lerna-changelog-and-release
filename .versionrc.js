module.exports = {
  bumpFiles: [
    {
      filename: "package.json",
      type: "json",
    },
    {
      filename: "lerna.json",
      type: "json",
    },
    {
      filename: "packages/first/package.json",
      type: "json",
    },
    {
      filename: "packages/second/package.json",
      type: "json",
    },
  ],
  scripts: {
    postchangelog: "prettier --write . --ignore-path=node_modules/**",
  },
  types: [
    {
      type: "feat",
      section: "Features",
    },
    {
      type: "fix",
      section: "Bug Fixes",
    },
    {
      type: "chore",
    },
    {
      type: "docs",
    },
    {
      type: "style",
      hidden: true,
    },
    {
      type: "refactor",
      hidden: "Refactoring",
    },
    {
      type: "perf",
      section: "Performance Enhancements",
    },
    {
      type: "test",
      hidden: true,
    },
  ],
};
