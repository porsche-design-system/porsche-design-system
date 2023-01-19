import '@testing-library/jest-dom';
import '@porsche-design-system/components-js/jsdom-polyfill';

beforeEach(() => {
  (window as any).PDS_SKIP_FETCH = true;
});
