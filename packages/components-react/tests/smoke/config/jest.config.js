module.exports = {
  preset: 'ts-jest/presets/default-esm',
  rootDir: '../../../',
  verbose: true,
  testEnvironment: 'node',
  testMatch: ['**/tests/smoke/specs/*.smoke.ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  clearMocks: true,
  restoreMocks: true,
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: {
          verbatimModuleSyntax: false,
        },
      },
    ],
  },
};
