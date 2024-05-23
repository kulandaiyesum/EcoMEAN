module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "no-console": "warn",
    "no-unused-vars": "warn",
    "no-undef": "error",
    "consistent-return": "off",
    "no-process-env": "off",
    "no-path-concat": "error",
    "no-sync": "warn",
    "prefer-arrow-callback": "warn",
    "prefer-const": "warn",
  },
  globals: {
    process: true,
    "process.env": true,
  },
};
