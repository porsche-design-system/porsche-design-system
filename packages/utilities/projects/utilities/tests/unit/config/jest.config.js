module.exports = {
  projects: [
    {
      displayName: 'node',
      preset: 'ts-jest',
      testEnvironment: 'node',
      verbose: true,
      rootDir: './',
      testMatch: ['**/src/**/*.spec.ts', '**/tests/unit/specs/**/*.spec.ts'],
    },
    {
      displayName: 'dom',
      preset: 'ts-jest',
      testEnvironment: 'jsdom',
      verbose: true,
      rootDir: './',
      testMatch: ['**/tests/unit/specs/**/*.spec.tsx'],
      globals: {
        'ts-jest': {
          isolatedModules: true, // this fixes typing issues with jasmine
        },
      },
    },
  ],
};
