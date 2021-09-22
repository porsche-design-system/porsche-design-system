module.exports = {
  preset: 'jest-puppeteer',
  rootDir: '../../../',
  verbose: true,
  testMatch: ['**/tests/e2e-jest/specs/**/*.e2e.ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  setupFilesAfterEnv: ['@alex_neo/jest-expect-message'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      isolatedModules: true, // this fixes typing issues with jasmine
      tsconfig: {
        target: 'es2019',
        lib: ['es2019', 'dom'],
      },
    },
  },
};
