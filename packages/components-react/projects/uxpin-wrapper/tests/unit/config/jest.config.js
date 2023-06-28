module.exports = {
  preset: 'ts-jest',
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
        tsconfig: {
          verbatimModuleSyntax: false,
        },
      },
    ],
  },
};
