import { beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import '@porsche-design-system/components-js/jsdom-polyfill';
import 'whatwg-fetch'; // not part of jsdom-polyfill anymore since we don't do fetch calls
import { vi } from 'vitest';

// Workaround for modal/flyout until jsdom supports dialog api or a generic polyfill exists
beforeAll(() => {
  HTMLDialogElement.prototype.show = vi.fn();
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
});

beforeEach(() => {
  (window as unknown as Window & { PDS_SKIP_FETCH: boolean }).PDS_SKIP_FETCH = true;
});
