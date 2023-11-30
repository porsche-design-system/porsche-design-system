const { config } = require('@porsche-design-system/shared/testing/jest.config');
module.exports = { ...config, setupFilesAfterEnv: [...config.setupFilesAfterEnv, '<rootDir>/config/jest.setup.ts'] };
