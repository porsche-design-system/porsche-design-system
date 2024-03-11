import { beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import '@porsche-design-system/components-js/jsdom-polyfill';
import 'whatwg-fetch'; // not part of jsdom-polyfill anymore since we don't do fetch calls

beforeEach(() => {
  (window as unknown as Window & { PDS_SKIP_FETCH: boolean }).PDS_SKIP_FETCH = true;
});
