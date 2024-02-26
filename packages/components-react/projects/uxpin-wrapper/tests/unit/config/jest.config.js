module.exports = {
  preset: 'ts-jest/presets/default-esm',
  rootDir: '../../../',
  verbose: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/unit/config/jest.setup.ts'],
  testMatch: ['**/tests/unit/specs/**/*.spec.{tsx,ts}'],
  collectCoverageFrom: ['!<rootDir>/node_modules/', 'projects/uxpin-wrapper/src/!(lib)**'],
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
