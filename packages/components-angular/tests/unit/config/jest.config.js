globalThis.ngJest = {
  ...globalThis.ngJest,
  skipNgcc: true,
};

module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/tests/unit/config/jest.setup.ts'],
  globalSetup: 'jest-preset-angular/global-setup',
  rootDir: '../../../',
  verbose: true,
  testMatch: ['**/tests/unit/specs/**/*.spec.ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  collectCoverageFrom: ['!<rootDir>/node_modules/', 'projects/angular-wrapper/src/!(lib)**'],
  globals: {
    'ts-jest': {
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
