module.exports = {
  preset: 'ts-jest',
  rootDir: '../../../',
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/tests/mocks/config/setup.js'],
  testMatch: ['**/tests/mocks/specs/**/*.test.tsx'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  globals: {
    'ts-jest': {
      isolatedModules: true // this fixes typing issues with jasmine
    }
  }
};
