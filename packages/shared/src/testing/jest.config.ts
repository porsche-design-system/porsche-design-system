import type { Config } from '@jest/types';

export const config: Config.InitialOptions = {
  preset: 'jest-puppeteer',
  rootDir: '..',
  verbose: true,
  testTimeout: 120000,
  testMatch: ['**/specs/**/*.{e2e,vrt,smoke}.ts'],
  // modulePathIgnorePatterns: ['<rootDir>/dist'],
  setupFilesAfterEnv: ['@alex_neo/jest-expect-message'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  maxWorkers: 4,
  globals: {
    'ts-jest': {
      isolatedModules: true, // disable type-checking and compile each file as an isolated module
      tsconfig: {
        target: 'es2019',
        lib: ['es2019', 'dom'],
      },
    },
  },
};

process.env.JEST_PUPPETEER_CONFIG = require.resolve('@porsche-design-system/shared/testing/jest-puppeteer.config.js');
