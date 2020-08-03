module.exports = {
  rootDir: '../../../',
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/tests/mocks/config/setup.js'],
  testMatch: ['**/tests/mocks/specs/**/*.test.tsx'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  }
};
