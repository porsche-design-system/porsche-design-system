import type { Config } from '@jest/types';

const defaultWorkers = process.env.CI === 'true' ? 1 : 2;
const maxWorkers = process.env.TYPE === 'VRT' ? defaultWorkers : defaultWorkers * 2;

console.log('Running Jest with maxWorkers:', maxWorkers);

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
  maxWorkers: maxWorkers,
  testSequencer: '@signed/jest-alphabetical-sequencer',
  globals: {
    'ts-jest': {
      isolatedModules: true, // disable type-checking and compile each file as an isolated module
      diagnostics: false,
      tsconfig: {
        moduleResolution: 'node',
        target: 'es2019',
        lib: ['es2019', 'dom'],
        esModuleInterop: true,
      },
    },
  },
};

process.env.JEST_PUPPETEER_CONFIG = require.resolve('@porsche-design-system/shared/testing/jest-puppeteer.config.js');
