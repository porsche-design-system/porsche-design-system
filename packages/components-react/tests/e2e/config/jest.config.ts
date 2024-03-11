import { config } from '@porsche-design-system/shared/testing/jest.config';
export default {
  ...config,
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        isolatedModules: true,
        diagnostics: false,
        tsconfig: {
          moduleResolution: 'node',
          target: 'es2019',
          lib: ['es2019', 'dom'],
          esModuleInterop: true,
        },
      },
    ],
  },
};
