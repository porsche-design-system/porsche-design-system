module.exports = {
  preset: 'ts-jest',
  rootDir: '../../../',
  verbose: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/jsdom-polyfill/config/setup.ts'],
  testMatch: ['**/tests/jsdom-polyfill/specs/**/*.spec.tsx'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  globals: {
    'ts-jest': {
      isolatedModules: true, // this fixes typing issues with jasmine
    },
  },
  clearMocks: true,
  restoreMocks: true,
};
