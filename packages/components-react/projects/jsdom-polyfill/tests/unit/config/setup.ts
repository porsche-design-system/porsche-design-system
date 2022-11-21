import '@testing-library/jest-dom';
import '@porsche-design-system/components-react/jsdom-polyfill';
import { skipCheckForPorscheDesignSystemProviderDuringTests } from '@porsche-design-system/components-react';

skipCheckForPorscheDesignSystemProviderDuringTests();

beforeEach(() => {
  // silence output of warnings and errors
  jest.spyOn(global.console, 'warn').mockImplementation(() => {});
  jest.spyOn(global.console, 'error').mockImplementation(() => {});
});
