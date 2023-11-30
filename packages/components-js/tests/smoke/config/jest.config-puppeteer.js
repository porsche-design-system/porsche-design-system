const { config } = require('@porsche-design-system/shared/testing/jest.config');

// we have a separate node setup because our package.smoke.ts relies on third party package
// `@arethetypeswrong/core` which is in esm format, therefore we need a different jest preset
// to handle it while this config is using the jest-puppeteer preset
module.exports = {
  ...config,
  testMatch: ['**/specs/puppeteer/**/*.{e2e,vrt,smoke}.ts'],
};
