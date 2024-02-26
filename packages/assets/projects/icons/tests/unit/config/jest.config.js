module.exports = {
  preset: 'ts-jest',
  rootDir: '../../../',
  verbose: true,
  testEnvironment: 'node',
  testMatch: ['**/tests/unit/specs/**/*.spec.ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  clearMocks: true,
  restoreMocks: true,
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        isolatedModules: true, // disable type-checking and compile each file as an isolated module
        diagnostics: false,
      },
    ],
  },
};
