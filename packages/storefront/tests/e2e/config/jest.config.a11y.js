const { config } = require('@porsche-design-system/shared/testing/jest.config');

module.exports = {
  ...config,
  testMatch: ['**/specs/**/*.a11y.ts'],
};
