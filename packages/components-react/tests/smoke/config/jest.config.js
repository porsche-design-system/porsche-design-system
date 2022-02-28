module.exports = {
  preset: 'ts-jest',
  rootDir: '../../../',
  verbose: true,
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  testMatch: ['**/tests/smoke/specs/**/*.smoke.ts'],
};
