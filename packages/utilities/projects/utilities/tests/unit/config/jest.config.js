module.exports = {
  preset: 'ts-jest',
  rootDir: '../../../',
  verbose: true,
  testEnvironment: 'jsdom',
  testMatch: ['**/src/jss/**/*.spec.ts', '**/tests/unit/specs/**/*.spec.(ts|tsx)'],
  globals: {
    'ts-jest': {
      isolatedModules: true, // this fixes typing issues with jasmine
    },
  },
  clearMocks: true,
  restoreMocks: true,
};
