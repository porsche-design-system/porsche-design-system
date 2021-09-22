module.exports = {
  preset: 'jest-puppeteer',
  rootDir: '..',
  verbose: true,
  testMatch: ['**/specs/**/*.{e2e|vrt}.ts'],
  // modulePathIgnorePatterns: ['<rootDir>/dist'],
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

process.env.JEST_PUPPETEER_CONFIG = require.resolve(
  '@porsche-design-system/shared/testing/config/jest-puppeteer.config.js'
);
