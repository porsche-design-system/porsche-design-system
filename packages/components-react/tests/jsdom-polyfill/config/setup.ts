import '@testing-library/jest-dom';
import '@porsche-design-system/components-react/jsdom-polyfill';
import {
  skipCheckForPorscheDesignSystemProviderDuringTests,
  skipPorscheDesignSystemCDNRequestsDuringTests,
} from '@porsche-design-system/components-react';

skipPorscheDesignSystemCDNRequestsDuringTests();
skipCheckForPorscheDesignSystemProviderDuringTests();
