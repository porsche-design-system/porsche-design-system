import globals from 'globals';
import eslintJs from '@eslint/js';
import eslintTs from 'typescript-eslint';
import eslintStylistic from '@stylistic/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintVitest from 'eslint-plugin-vitest';
import eslintPlaywright from 'eslint-plugin-playwright';

export default [
  eslintJs.configs.recommended,
  // ...eslintTs.configs.recommended,
  eslintStylistic.configs['recommended-flat'],
  eslintPlaywright.configs['flat/recommended'],
  eslintVitest.configs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/quote-props': 'off',
      '@stylistic/semi': ['error', 'always'],
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
    ignores: [
      '.stencil',
      'coverage',
      'dist',
      'node_modules',
      'www',
    ],
  },
];

// import stylistic from '@stylistic/eslint-plugin';
// import preferArrow from 'eslint-plugin-prefer-arrow';
// import fp from 'eslint-plugin-fp';
// import tsEslint from '@typescript-eslint/eslint-plugin';
// import tsParser from '@typescript-eslint/parser';
// import js from "@eslint/js";

// export default [
//   {
//     plugins: {
//       '@stylistic': stylistic,
//       'prefer-arrow': preferArrow, // https://github.com/TristonJ/eslint-plugin-prefer-arrow
//       fp, // https://github.com/jfmengels/eslint-plugin-fp
//       '@typescript-eslint': tsEslint,
//     },
//     // extends: ['@stylistic', 'plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking'],
//     ignores: ['**/*.spec.ts'],
//     files: ["src/**/*.{ts,tsx}"],
//     languageOptions: {
//       parser: tsParser,
//       parserOptions: {
//         project: 'tsconfig.json',
//         sourceType: 'module',
//       },
//     },
//     rules: {
//       ...js.configs.recommended.rules,
//       ...stylistic.configs["recommended-flat"].rules,
//       // '@stylistic/adjacent-overload-signatures': 'error',
//       // '@stylistic/array-type': 'error',
//       // '@stylistic/no-empty-object-type': 'error',
//       // '@stylistic/no-unsafe-function-type': 'error',
//       // '@stylistic/no-wrapper-object-types': 'error',
//       // '@stylistic/class-name-casing': 'off',
//       // '@stylistic/no-unsafe-return': 'off',
//       // '@stylistic/no-unsafe-assignment': 'off',
//       // '@stylistic/no-unsafe-call': 'off',
//       // '@stylistic/no-unsafe-member-access': 'off',
//       // '@stylistic/restrict-template-expressions': 'off',
//       // '@stylistic/no-floating-promises': 'off',
//       // '@stylistic/consistent-type-assertions': 'error',
//       // '@stylistic/consistent-type-imports': 'error',
//       // '@stylistic/consistent-type-definitions': ['error', 'type'],
//       // '@stylistic/explicit-function-return-type': [
//       //   'warn',
//       //   {
//       //     allowExpressions: true,
//       //   },
//       // ],
//       // '@stylistic/explicit-member-accessibility': [
//       //   'error',
//       //   {
//       //     accessibility: 'explicit',
//       //   },
//       // ],
//       // '@stylistic/interface-name-prefix': 'off',
//       // '@stylistic/member-delimiter-style': [
//       //   'error',
//       //   {
//       //     multiline: {
//       //       delimiter: 'semi',
//       //       requireLast: true,
//       //     },
//       //     singleline: {
//       //       delimiter: 'semi',
//       //       requireLast: false,
//       //     },
//       //   },
//       // ],
//       // '@stylistic/member-ordering': 'error',
//       // '@stylistic/no-empty-function': 'error',
//       // '@stylistic/no-empty-interface': 'error',
//       // '@stylistic/no-explicit-any': 'off',
//       // '@stylistic/no-misused-new': 'error',
//       // '@stylistic/no-namespace': 'error',
//       // '@stylistic/no-parameter-properties': 'off',
//       // '@stylistic/no-use-before-define': 'off',
//       // 'no-unused-vars': [
//       //   'error',
//       //   {
//       //     vars: 'all',
//       //     args: 'after-used',
//       //     ignoreRestSiblings: false,
//       //     varsIgnorePattern: 'h',
//       //   },
//       // ],
//       // '@stylistic/no-var-requires': 'error',
//       // '@stylistic/prefer-for-of': 'off',
//       // '@stylistic/prefer-function-type': 'error',
//       // '@stylistic/prefer-namespace-keyword': 'error',
//       // '@stylistic/prefer-ts-expect-error': 'error',
//       '@stylistic/quotes': ['error', 'single'],
//       // '@stylistic/semi': ['error', 'always'],
//       // '@stylistic/triple-slash-reference': 'error',
//       // '@stylistic/type-annotation-spacing': 'off',
//       // '@stylistic/unified-signatures': 'error',
//       // '@stylistic/arrow-body-style': 'off',
//       // '@stylistic/arrow-parens': ['off', 'as-needed'],
//       // '@stylistic/camelcase': 'error',
//       // '@stylistic/comma-dangle': 'off',
//       // '@stylistic/complexity': 'off',
//       // '@stylistic/constructor-super': 'error',
//       // '@stylistic/curly': 'error',
//       // '@stylistic/dot-notation': 'error',
//       // '@stylistic/eol-last': 'off',
//       // '@stylistic/eqeqeq': ['error', 'smart'],
//       // '@stylistic/guard-for-in': 'error',
//       'id-blacklist': [
//         'error',
//         'any',
//         'Number',
//         'number',
//         'String',
//         'string',
//         'Boolean',
//         'boolean',
//         'Undefined',
//       ],
//       // '@stylistic/id-match': 'error',
//       // '@stylistic/import/no-duplicates': ['error', { 'prefer-inline': true }],
//       // '@stylistic/import/no-extraneous-dependencies': 'off',
//       // '@stylistic/import/order': 'off',
//       // '@stylistic/no-restricted-imports': [
//       //   'error',
//       //   {
//       //     patterns: [
//       //       {
//       //         group: ['**/utils-entry', '**/styles-entry'],
//       //         caseSensitive: true,
//       //         message: "Please don't use since it might cause circular dependencies.",
//       //       },
//       //     ],
//       //     paths: [
//       //       {
//       //         name: 'change-case',
//       //         message:
//       //           'Please use paramCaseToCamelCase() util instead or do it yourself instead of pulling in a library.',
//       //       },
//       //       {
//       //         name: '@porsche-design-system/utilities',
//       //         message: 'Please use @porsche-design-system/styles instead since the one used is not performant.',
//       //       },
//       //       {
//       //         name: '@porsche-design-system/styles',
//       //         importNames: ['color'],
//       //         message: 'Please use getThemedColors() instead.',
//       //       },
//       //       {
//       //         name: '@porsche-design-system/styles',
//       //         importNames: [
//       //           'border',
//       //           'borderRadius',
//       //           'borderWidth',
//       //           'fontSize',
//       //           'gridWidth',
//       //           'spacing',
//       //           'spacingFluid',
//       //           'spacingStatic',
//       //           'theme',
//       //           'themeLight',
//       //           'themeDark',
//       //         ],
//       //         message:
//       //           'Please use individual variables instead, e.g. `spacingFluidSmall instead of `spacing.fluid.small` for better tree-shaking and smaller chunk sizes.',
//       //       },
//       //     ],
//       //   },
//       // ],
//       // '@stylistic/linebreak-style': 'off',
//       // '@stylistic/max-classes-per-file': ['error', 1],
//       // '@stylistic/max-len': 'off',
//       // '@stylistic/new-parens': 'off',
//       // '@stylistic/newline-per-chained-call': 'off',
//       // '@stylistic/no-bitwise': 'error',
//       // '@stylistic/no-caller': 'error',
//       // '@stylistic/no-cond-assign': 'error',
//       'no-console': 'error',
//       'fp/no-throw': 'error',
//       // '@stylistic/no-debugger': 'error',
//       // '@stylistic/no-empty': 'error',
//       // '@stylistic/no-eval': 'error',
//       // '@stylistic/no-extra-semi': 'off',
//       // '@stylistic/no-fallthrough': 'off',
//       // '@stylistic/no-invalid-this': 'off',
//       // '@stylistic/no-irregular-whitespace': 'off',
//       // '@stylistic/no-multiple-empty-lines': 'off',
//       // '@stylistic/no-new-wrappers': 'error',
//       // '@stylistic/no-shadow': 'error',
//       // '@stylistic/no-throw-literal': 'error',
//       // '@stylistic/no-trailing-spaces': 'off',
//       // '@stylistic/no-undef-init': 'error',
//       // '@stylistic/no-underscore-dangle': 'error',
//       // '@stylistic/no-unsafe-finally': 'error',
//       'no-unused-expressions': 'error',
//       // '@stylistic/no-unused-labels': 'error',
//       // '@stylistic/no-var': 'error',
//       // '@stylistic/object-shorthand': 'error',
//       // '@stylistic/one-var': ['error', 'never'],
//       'prefer-arrow/prefer-arrow-functions': 'error',
//       // '@stylistic/prefer-const': 'error',
//       // '@stylistic/react/jsx-uses-vars': 'error',
//       // '@stylistic/quote-props': 'off',
//       // '@stylistic/radix': 'error',
//       // '@stylistic/space-before-function-paren': 'off',
//       // '@stylistic/space-in-parens': ['off', 'never'],
//       // '@stylistic/spaced-comment': 'error',
//       // '@stylistic/use-isnan': 'error',
//       // '@stylistic/valid-typeof': 'off',
//       '@typescript-eslint/unbound-method': 'error',
//       '@typescript-eslint/no-redundant-type-constituents': 'error',
//       '@typescript-eslint/no-unsafe-argument': 'error'
//     },
//   },
// ];
//
