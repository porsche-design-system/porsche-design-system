module.exports = {
  preset: 'ts-jest',
  verbose: true,
  rootDir: './',
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  globals: {
    'ts-jest': {
      isolatedModules: true, // this fixes typing issues with jasmine
    },
  },
};
