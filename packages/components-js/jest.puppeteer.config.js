// raw puppeteer tests instead of stencil e2e-test -> necessary to use request interception to test race conditions
module.exports = {
  preset: 'jest-puppeteer',
  testRegex: './*\\.e2e\\.ts$',
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testTimeout: 10000
};
