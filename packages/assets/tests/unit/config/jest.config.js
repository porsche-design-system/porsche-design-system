const os = require('node:os');
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  rootDir: '../../../',
  testMatch: ['**/src/**/*.spec.ts', '**/tests/unit/specs/**/*.spec.(ts|tsx)'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          verbatimModuleSyntax: false,
        },
      },
    ],
  },
};

console.log('Amount of CPUs', os.cpus().length);
console.log('Total Memory in MB', os.totalmem() / 1024 / 1024);
console.log('Free Memory in MB', os.freemem() / 1024 / 1024);
