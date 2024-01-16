module.exports = {
  preset: 'ts-jest',
  rootDir: '../../../',
  testEnvironment: 'jsdom',
  verbose: true,
  setupFiles: ['<rootDir>/tests/unit/config/jest.setup.ts'],
  testMatch: ['**/src/**/*.spec.ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  moduleNameMapper: {
    '^@stencil/core$': '<rootDir>/tests/unit/mocks/stencil-decorator.mocks.ts',
  },
  globals: {
    ROLLUP_REPLACE_IS_STAGING: 'production',
    ROLLUP_REPLACE_CDN_BASE_URL: 'https://cdn.ui.porsche.com/porsche-design-system',
  },
  transform: {
    // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
      },
    ],
  },
  clearMocks: true,
  restoreMocks: true,
  prettierPath: null, // because prettier 3 doesn't work with inline snapshots: https://github.com/jestjs/jest/issues/14305
};
