import { type Linter } from 'eslint';
import globals from 'globals';
import eslintJs from '@eslint/js';
import eslintTs from 'typescript-eslint';
import eslintStylistic from '@stylistic/eslint-plugin';
// import eslintVitest from 'eslint-plugin-vitest';
// import eslintPlaywright from 'eslint-plugin-playwright';
// import eslintFunctionalProgramming from 'eslint-plugin-fp';

const config: Linter.Config[] = [
  eslintJs.configs.recommended,
  eslintStylistic.configs['recommended-flat'],
  ...(eslintTs.configs.recommended as any), // typescript-eslint comes with outdated typings
  // eslintPlaywright.configs['flat/recommended'],
  // eslintVitest.configs.recommended,
  // eslintFunctionalProgramming.configs.recommended,
  {
    rules: {
      'no-console': [
        'error',
        {
          allow: ['warn', 'error'],
        },
      ],
      '@stylistic/comma-dangle': 'off',
      '@stylistic/arrow-parens': 'off',
      '@stylistic/quote-props': 'off',
      '@stylistic/brace-style': 'off',
      '@stylistic/operator-linebreak': 'off',
      '@stylistic/multiline-ternary': 'off',
      '@stylistic/indent': 'off',
      '@stylistic/jsx-one-expression-per-line': 'off',
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'semi',
            requireLast: true,
          },
          singleline: {
            delimiter: 'semi',
            requireLast: false,
          },
        },
      ],
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          varsIgnorePattern: 'h',
        },
      ],
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },
  {
    ignores: ['dist', 'node_modules'],
  },
];

export default config;

// import stylistic from '@stylistic/eslint-plugin';
// import preferArrow from 'eslint-plugin-prefer-arrow';
// import fp from 'eslint-plugin-fp';
// import tsEslint from '@typescript-eslint/eslint-plugin';
// import tsParser from '@typescript-eslint/parser';
// import js from "@eslint/js";
