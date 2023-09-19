import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  rootDir: '../../../',
  testMatch: ['**/tests/unit/specs/**/*.+(ts|tsx|js)'],
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
  prettierPath: null, // because prettier 3 doesn't work with inline snapshots: https://github.com/jestjs/jest/issues/14305
};

export default config;
