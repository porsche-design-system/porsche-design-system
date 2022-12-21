module.exports = {
  preset: 'ts-jest',
  rootDir: '../../../',
  verbose: true,
  testEnvironment: 'node',
  testMatch: ['**/tests/unit/specs/**/*.spec.ts', '!**/projects/**'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  clearMocks: true,
  restoreMocks: true,
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        // override tsconfig.json in package root
        tsconfig: {
          esModuleInterop: false,
        },
      },
    ],
  },
};
