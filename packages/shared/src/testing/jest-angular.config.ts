import type { Config } from '@jest/types';

export const config: Config.InitialOptions = {
  preset: 'jest-puppeteer',
  rootDir: '..',
  verbose: true,
  testTimeout: 120000,
  testMatch: ['**/specs/**/*.e2e.ts'],
  setupFilesAfterEnv: ['@alex_neo/jest-expect-message'],
  moduleFileExtensions: ['ts', 'js', 'mjs'],
  resolver: 'jest-preset-angular/build/resolvers/ng-jest-resolver.js',
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  transform: {
    '^.+\\.mjs?$': 'jest-preset-angular',
    '^.+\\.ts?$': 'ts-jest',
  },
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
