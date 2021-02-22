module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  rootDir: '../../../',
  globals: {
    'ts-jest': {
      isolatedModules: true, // this fixes typing issues with jasmine
    },
  },
  testMatch: ['**/tests/unit/specs/**/*.+(ts|tsx|js)'],
};
