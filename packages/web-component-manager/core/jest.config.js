module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.js?$': require.resolve('babel-jest'),
  },
};
