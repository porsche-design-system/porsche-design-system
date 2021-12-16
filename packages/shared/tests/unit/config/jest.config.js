module.exports = {
  preset: 'ts-jest',
  rootDir: '../../../',
  verbose: true,
  testEnvironment: 'node',
  testMatch: ['**/tests/unit/specs/**/*.spec.ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  clearMocks: true,
  restoreMocks: true,
};
