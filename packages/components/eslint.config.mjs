import eslintConfig from '@porsche-design-system/shared/eslint/index.js';

export default [
  ...eslintConfig,
  {
    rules: {
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
      // '@stylistic/explicit-member-accessibility': [
      //   'error',
      //   {
      //     accessibility: 'explicit',
      //   },
      // ],

      // '@stylistic/member-ordering': 'error',
      // '@stylistic/no-empty-function': 'error',
      // '@stylistic/no-empty-interface': 'error',

      // '@stylistic/no-var-requires': 'error',

      // '@stylistic/prefer-function-type': 'error',
      // '@stylistic/prefer-ts-expect-error': 'error',

      // '@stylistic/unified-signatures': 'error',
      // '@stylistic/camelcase': 'error',

      'curly': 'error',
      // '@stylistic/dot-notation': 'error',
      // '@stylistic/eqeqeq': ['error', 'smart'],
      // '@stylistic/guard-for-in': 'error',
      'id-blacklist': ['error', 'any', 'Number', 'number', 'String', 'string', 'Boolean', 'boolean', 'Undefined'],
      // '@stylistic/id-match': 'error',
      // '@stylistic/import/no-duplicates': ['error', { 'prefer-inline': true }],
      // '@stylistic/no-restricted-imports': [
      //   'error',
      //   {
      //     patterns: [
      //       {
      //         group: ['**/utils-entry', '**/styles-entry'],
      //         caseSensitive: true,
      //         message: "Please don't use since it might cause circular dependencies.",
      //       },
      //     ],
      //     paths: [
      //       {
      //         name: 'change-case',
      //         message:
      //           'Please use paramCaseToCamelCase() util instead or do it yourself instead of pulling in a library.',
      //       },
      //       {
      //         name: '@porsche-design-system/utilities',
      //         message: 'Please use @porsche-design-system/styles instead since the one used is not performant.',
      //       },
      //       {
      //         name: '@porsche-design-system/styles',
      //         importNames: ['color'],
      //         message: 'Please use getThemedColors() instead.',
      //       },
      //       {
      //         name: '@porsche-design-system/styles',
      //         importNames: [
      //           'border',
      //           'borderRadius',
      //           'borderWidth',
      //           'fontSize',
      //           'gridWidth',
      //           'spacing',
      //           'spacingFluid',
      //           'spacingStatic',
      //           'theme',
      //           'themeLight',
      //           'themeDark',
      //         ],
      //         message:
      //           'Please use individual variables instead, e.g. `spacingFluidSmall instead of `spacing.fluid.small` for better tree-shaking and smaller chunk sizes.',
      //       },
      //     ],
      //   },
      // ],
      // '@stylistic/max-classes-per-file': ['error', 1],
      // '@stylistic/no-bitwise': 'error',
      // '@stylistic/no-caller': 'error',

      // '@stylistic/no-eval': 'error',
      // '@stylistic/no-new-wrappers': 'error',
      // '@stylistic/no-shadow': 'error',
      // '@stylistic/no-throw-literal': 'error',
      // '@stylistic/no-undef-init': 'error',
      // '@stylistic/no-underscore-dangle': 'error',

      // '@stylistic/object-shorthand': 'error',
      // '@stylistic/one-var': ['error', 'never'],

      // '@stylistic/react/jsx-uses-vars': 'error',
      // '@stylistic/radix': 'error',

      // '@typescript-eslint/unbound-method': 'error',
      // '@typescript-eslint/no-redundant-type-constituents': 'error',
      // '@typescript-eslint/no-unsafe-argument': 'error',
    }
  },
  {
    ignores: [
      '.stencil',
      'coverage',
      'www',
      'src/types/aria-types.d.ts',
    ],
  },
];
