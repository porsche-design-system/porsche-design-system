import '@testing-library/jest-dom';
import '@porsche-design-system/components-react/jsdom-polyfill';
import { skipCheckForPorscheDesignSystemProviderDuringTests } from '@porsche-design-system/components-react';
import { ResizeObserver } from '@juggle/resize-observer';

skipCheckForPorscheDesignSystemProviderDuringTests();
global.ResizeObserver = ResizeObserver;
