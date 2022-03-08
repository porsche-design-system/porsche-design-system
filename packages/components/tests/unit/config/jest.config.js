module.exports = {
  preset: 'ts-jest',
  rootDir: '../../../',
  testEnvironment: 'jsdom',
  verbose: true,
  setupFiles: ['<rootDir>/tests/unit/config/setup.ts'],
  testMatch: ['**/src/**/*.spec.ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  moduleNameMapper: {
    '^@stencil/core$': '<rootDir>/tests/unit/mocks/stencil-decorator.mocks.ts',
  },
  globals: {
    ROLLUP_REPLACE_IS_STAGING: 'production',
    'ts-jest': {
      isolatedModules: true, // disables type checking 😢
    },
  },
  clearMocks: true,
  restoreMocks: true,
};
