module.exports = {
  preset: 'jest-puppeteer',
  testRegex: './*\\.puppeteer\\.e2e\\.ts$',
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
};
