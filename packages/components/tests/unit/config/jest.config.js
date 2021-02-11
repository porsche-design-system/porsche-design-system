module.exports = {
  preset: 'ts-jest',
  rootDir: '../../../',
  verbose: true,
  setupFiles: ['<rootDir>/tests/unit/config/setup.ts'],
  testMatch: ['**/tests/unit/**/*.spec.ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  globals: {
    'ROLLUP_REPLACE_IS_STAGING': 'production',
    'ts-jest': {
      isolatedModules: true, // this fixes typing issues with jasmine
    },
  },
  clearMocks: true,
  restoreMocks: true,
};
