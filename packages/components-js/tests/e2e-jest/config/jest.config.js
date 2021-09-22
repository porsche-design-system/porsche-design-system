module.exports = {
  preset: 'jest-puppeteer',
  rootDir: '../../../',
  verbose: true,
  testMatch: ['**/tests/e2e-jest/specs/**/*.e2e.ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  // setupFilesAfterEnv: ['expect-puppeteer'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      isolatedModules: true, // this fixes typing issues with jasmine
    },
  },
};
