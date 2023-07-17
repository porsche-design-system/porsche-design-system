module.exports = {
  preset: 'ts-jest',
  rootDir: '../../../',
  verbose: true,
  testEnvironment: 'jsdom',
  testMatch: ['**/tests/unit/specs/**/*.spec.{tsx,ts}'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  clearMocks: true,
  restoreMocks: true,
  testEnvironmentOptions: {
    // Force jest to use node imports, see https://github.com/vuejs/vue-jest/issues/479
    customExportConditions: ['node', 'node-addons'],
  },
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          verbatimModuleSyntax: false,
        },
      },
    ],

    '^.+\\.js$': 'babel-jest',
  },
};
