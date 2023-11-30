const { config } = require('@porsche-design-system/shared/testing/jest.config');

// we have a separate node setup because our package.smoke.ts relies on third party package
// `@arethetypeswrong/core` which is in esm format, therefore we need a different jest preset
// to handle it while the other config is using the jest-puppeteer preset
module.exports = {
  ...config,
  testMatch: ['**/specs/node/**/*.{e2e,vrt,smoke}.ts'],
  // based on https://stackoverflow.com/questions/68520619/jest-typescript-with-es-module-in-node-modules-error-must-use-import-to-load-e
  extensionsToTreatAsEsm: ['.ts'],
  verbose: true,
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)?$': ['ts-jest', { useESM: true }],
  },
};
