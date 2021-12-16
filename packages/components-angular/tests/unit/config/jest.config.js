module.exports = {
  preset: 'jest-preset-angular',
  rootDir: '../../../',
  verbose: true,
  testMatch: ['**/tests/unit/specs/**/*.spec.ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  collectCoverageFrom: ['!<rootDir>/node_modules/', 'projects/components-wrapper/src/!(lib)**'],
  globals: {
    'ts-jest': {
      isolatedModules: true, // this fixes typing issues with jasmine
      tsconfig: {
        moduleResolution: 'node',
        target: 'es2019',
        lib: ['es2019', 'dom'],
        esModuleInterop: true,
      },
    },
  },
  clearMocks: true,
  restoreMocks: true,
};
