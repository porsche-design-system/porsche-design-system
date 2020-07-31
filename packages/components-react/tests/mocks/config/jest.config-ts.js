module.exports = {
  rootDir: '../../../',
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/tests/mocks/config/setup.ts'],
  testMatch: ['**/tests/mocks/specs/**/*.test.tsx'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  modulePathIgnorePatterns: ['<rootDir>/dist']
};
