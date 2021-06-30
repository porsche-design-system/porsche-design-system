module.exports = {
  preset: 'ts-jest',
  rootDir: './',
  verbose: true,
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      isolatedModules: true, // this fixes typing issues with jasmine
    },
  },
  clearMocks: true,
  restoreMocks: true,
};
