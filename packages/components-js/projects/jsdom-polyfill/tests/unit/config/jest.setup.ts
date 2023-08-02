import '@testing-library/jest-dom';
import '@porsche-design-system/components-js/jsdom-polyfill';
import 'whatwg-fetch'; // not part of jsdom-polyfill anymore since we don't do fetch calls

beforeEach(() => {
  (window as any).PDS_SKIP_FETCH = true;
});
