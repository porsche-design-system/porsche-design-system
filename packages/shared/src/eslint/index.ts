import { type Linter } from 'eslint';
import globals from 'globals';
import eslintStylistic from '@stylistic/eslint-plugin';
import eslintJs from '@eslint/js';
import eslintTs from 'typescript-eslint';
// import eslintVitest from 'eslint-plugin-vitest';
// import eslintPlaywright from 'eslint-plugin-playwright';

const config: Linter.Config[] = [
  eslintJs.configs.recommended,
  eslintStylistic.configs['recommended-flat'],
  ...(eslintTs.configs.recommended as any), // typescript-eslint comes with outdated typings
  // eslintPlaywright.configs['flat/recommended'],
  // eslintVitest.configs.recommended,
  {
    rules: {
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
      'no-console': [
        'error',
        {
          allow: ['warn', 'error'],
        },
      ],
      curly: 'error',
      'id-blacklist': ['error', 'any', 'Number', 'number', 'String', 'string', 'Boolean', 'boolean', 'Undefined'],
      'no-empty-function': 'error',
      camelcase: 'error',
      'dot-notation': 'error',
      eqeqeq: ['error', 'smart'],
      'guard-for-in': 'error',
      'id-match': 'error',
      'no-duplicate-imports': 'error',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/utils-entry', '**/styles-entry'],
              caseSensitive: true,
              message: "Please don't use since it might cause circular dependencies.",
            },
          ],
          paths: [
            {
              name: '@porsche-design-system/styles',
              importNames: ['color'],
              message: 'Please use getThemedColors() instead.',
            },
            {
              name: '@porsche-design-system/styles',
              importNames: [
                'border',
                'borderRadius',
                'borderWidth',
                'fontSize',
                'gridWidth',
                'spacing',
                'spacingFluid',
                'spacingStatic',
                'theme',
                'themeLight',
                'themeDark',
              ],
              message:
                'Please use individual variables instead, e.g. `spacingFluidSmall instead of `spacing.fluid.small` for better tree-shaking and smaller chunk sizes.',
            },
          ],
        },
      ],
      'max-classes-per-file': 'error',
      'no-bitwise': 'error',
      'no-caller': 'error',
      'no-eval': 'error',
      'no-new-wrappers': 'error',
      'no-shadow': 'error',
      'no-throw-literal': 'error',
      'no-undef-init': 'error',
      'no-underscore-dangle': ['error', { allow: ['__dirname'] }],
      'object-shorthand': 'error',
      'one-var': ['error', 'never'],
      radix: 'error',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/consistent-type-assertions': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
        },
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
        },
      ],
      '@typescript-eslint/member-ordering': 'error',
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/prefer-function-type': 'error',
      '@typescript-eslint/unified-signatures': 'error',
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
      // '@typescript-eslint/unbound-method': 'error', // doesn't work because of missing parser configuration
      // '@typescript-eslint/no-redundant-type-constituents': 'error', // doesn't work because of missing parser configuration
      // '@typescript-eslint/no-unsafe-argument': 'error', // doesn't work because of missing parser configuration
    },
  },
  {
    files: ['scripts/**/*'],
    rules: {
      'no-console': 'off',
      'no-restricted-imports': 'off',
    },
  },
  {
    files: ['tests/**/*', 'src/**/*.spec.*'],
    rules: {
      'no-console': 'off',
      'no-empty-function': 'off',
      'dot-notation': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'off',
      'max-classes-per-file': 'off',
      'no-shadow': 'off',
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
