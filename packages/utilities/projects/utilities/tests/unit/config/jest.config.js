module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  rootDir: '../../../',
  testMatch: ['**/src/jss/**/*.spec.ts', '**/src/scss/**/*.spec.ts', '**/tests/unit/specs/**/*.spec.ts'],
};
