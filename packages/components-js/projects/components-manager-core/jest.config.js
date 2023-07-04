module.exports = {
  preset: 'ts-jest',
  rootDir: './',
  verbose: true,
  testEnvironment: 'jsdom',
  clearMocks: true,
  restoreMocks: true,
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          strict: false, // too many errors
          verbatimModuleSyntax: false,
        },
      },
    ],
  },
};
