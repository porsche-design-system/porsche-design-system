module.exports = {
  preset: 'ts-jest',
  rootDir: '../../../',
  verbose: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/unit/config/setup.ts'],
  testMatch: ['**/tests/unit/specs/**/*.spec.{tsx,ts}'],
  collectCoverageFrom: ['!<rootDir>/node_modules/', 'projects/components-wrapper/src/!(lib)**'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  globals: {
    'ts-jest': {
      isolatedModules: true, // this fixes typing issues with jasmine
    },
  },
  clearMocks: true,
  restoreMocks: true,
};
