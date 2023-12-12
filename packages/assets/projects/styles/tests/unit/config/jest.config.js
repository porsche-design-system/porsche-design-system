module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  rootDir: '../../../',
  testMatch: ['**/scripts/**/*.spec.ts'],
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
