module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  verbose: true,
  rootDir: '../../../',
  testMatch: ['**/tests/unit/specs/**/*.+(ts|tsx|js)'],
};
