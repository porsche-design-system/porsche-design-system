import eslintConfig from '@porsche-design-system/shared/eslint/index.js'

export default [
  ...eslintConfig,
  {
    ignores: [
      '.stencil',
      'coverage',
      'www',
      'src/types/aria-types.d.ts',
    ],
  },
];
