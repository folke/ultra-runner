module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:jest/recommended",
    "plugin:jest/style",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "prettier",
    "prettier/@typescript-eslint",
    "plugin:unicorn/recommended",
    "plugin:promise/recommended",
  ],
  env: {
    node: true,
    browser: false,
    jest: true,
  },
  plugins: ["@typescript-eslint", "prettier", "jest", "import", "promise"],
  parserOptions: {
    ecmaVersion: 2019, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    project: "./tsconfig.json",
    impliedStrict: true,
  },
  rules: {
    "array-callback-return": "error",
    "prefer-template": "warn",
    "prefer-promise-reject-errors": "error",
    "require-unicode-regexp": "error",
    yoda: "error",
    "prefer-spread": "error",
    "prettier/prettier": "warn",
    "unicorn/prevent-abbreviations": "off",
    "unicorn/explicit-length-check": "off",
    "lines-between-class-members": [
      "error",
      "always",
      { exceptAfterSingleLine: true },
    ],
    "@typescript-eslint/explicit-function-return-type": "off",
    "jest/expect-expect": [
      "error",
      {
        assertFunctionNames: ["expect", "request.get.expect"],
      },
    ],
  },
}
