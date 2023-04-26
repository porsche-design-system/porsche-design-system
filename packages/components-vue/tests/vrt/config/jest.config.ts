// we use cjs syntax because of the following error: ESM syntax is not allowed in a CommonJS module when 'verbatimModuleSyntax' is enabled.
// might need to be solved by ts-jest: https://github.com/jestjs/jest/issues/14047
const config = require('@porsche-design-system/shared/testing/jest.config').config;
module.exports = { ...config, setupFilesAfterEnv: [...config.setupFilesAfterEnv!, '<rootDir>/config/jest.setup.ts'] };
