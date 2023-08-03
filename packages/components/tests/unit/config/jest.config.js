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
  clearMocks: true,
  restoreMocks: true,
};
