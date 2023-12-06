import { config } from '@porsche-design-system/shared/testing/jest.config';
export default { ...config, setupFilesAfterEnv: [...config.setupFilesAfterEnv!, '<rootDir>/config/jest.setup.ts'] };
