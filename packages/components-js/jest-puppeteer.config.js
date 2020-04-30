module.exports = {
  preset: 'jest-puppeteer',
  // launch: {
  //   dumpio: true,
  //   headless: false,
  // },
  testRegex: './*\\.puppeteer\\.e2e\\.ts$',
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testTimeout: 10000
};
