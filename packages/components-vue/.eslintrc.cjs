/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  files: [
    "**/*.vue",
    "**/*.js",
    "**/*.jsx",
    "**/*.cjs",
    "**/*.mjs",
    "**/*.ts",
    "**/*.tsx",
    "**/*.cts",
    "**/*.mts"
  ]
};
