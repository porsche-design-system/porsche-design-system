module.exports = {
  preset: '@stencil/core/testing',
  setupFiles: ['./tests/unit/config/jest.setup.js'],
  globals: {
    ROLLUP_REPLACE_IS_STAGING: 'production'
  },
  rootDir: '../../../',
  testTimeout: 10000,
};
