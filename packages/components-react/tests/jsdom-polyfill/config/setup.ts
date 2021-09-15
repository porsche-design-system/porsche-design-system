import '@testing-library/jest-dom';

import { skipCheckForPorscheDesignSystemProviderDuringTests } from '@porsche-design-system/components-react';
import '@porsche-design-system/components-react/jsdom-polyfill';
skipCheckForPorscheDesignSystemProviderDuringTests();
