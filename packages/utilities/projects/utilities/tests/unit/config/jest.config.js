module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  rootDir: '../../../',
  testMatch: ['**/src/**/*.spec.ts', '**/tests/unit/specs/**/*.spec.(ts|tsx)'],
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
