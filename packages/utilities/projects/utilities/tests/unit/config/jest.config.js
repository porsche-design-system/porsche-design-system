module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  verbose: true,
  rootDir: '../../../',
  testMatch: ['**/src/**/*.spec.ts', '**/tests/unit/specs/**/*.spec.(ts|tsx)'],
  globals: {
    'ts-jest': {
      isolatedModules: true, // this fixes typing issues with jasmine
    },
  },
};
