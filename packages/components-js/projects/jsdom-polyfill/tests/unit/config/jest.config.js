module.exports = {
  preset: 'ts-jest',
  rootDir: '../../../',
  verbose: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/unit/config/jest.setup.ts'],
  testMatch: ['**/tests/unit/specs/**/*.spec.tsx'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  clearMocks: true,
  restoreMocks: true,
};
