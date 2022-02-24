module.exports = {
  preset: 'ts-jest',
  rootDir: '../../../',
  verbose: true,
  testMatch: ['**/tests/smoke/specs/**/*.smoke.ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  clearMocks: true,
  restoreMocks: true,
};
