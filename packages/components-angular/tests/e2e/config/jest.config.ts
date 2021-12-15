import { config } from '@porsche-design-system/shared/testing/jest.config';

export default {
  ...config,
  moduleFileExtensions: ['ts', 'js', 'mjs'],
  resolver: 'jest-preset-angular/build/resolvers/ng-jest-resolver.js',
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  transform: {
    '^.+\\.mjs?$': 'jest-preset-angular',
    '^.+\\.ts?$': 'ts-jest',
  },
};
