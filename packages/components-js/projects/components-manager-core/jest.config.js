module.exports = {
  preset: 'ts-jest',
  verbose: true,
  rootDir: './',
  globals: {
    'ts-jest': {
      isolatedModules: true, // this fixes typing issues with jasmine
    },
  },
};
