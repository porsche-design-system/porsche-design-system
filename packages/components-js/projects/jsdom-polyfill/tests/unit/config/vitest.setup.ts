import '@porsche-design-system/components-js/jsdom-polyfill';
import 'whatwg-fetch'; // not part of jsdom-polyfill anymore since we don't do fetch calls
import { beforeAll, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';

beforeAll(() => {
  // Mock for the Web Animations API (not available in jsdom)
  Element.prototype.animate = vi.fn(
    () => ({ onfinish: null, cancel: vi.fn(), finish: vi.fn() }) as unknown as Animation
  );

  // Mock for the Dialog API
  // `showModal` and `close` set/unset the native `open` attribute so that `dialog.open` reflects
  // the logical open state. Without this, `isShown()` in the TopLayerController always returns
  // `false` (causing repeated `showModal` calls) and buttons inside the dialog are not interactive
  // in jsdom because the dialog element is considered closed by the accessibility tree.
  HTMLDialogElement.prototype.show = vi.fn();
  HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
    this.setAttribute('open', '');
  });
  HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
    this.removeAttribute('open');
  });

  // Mock for the Element Internals API
  HTMLElement.prototype.attachInternals = vi.fn(
    () =>
      ({
        setFormValue: vi.fn(),
        setValidity: vi.fn(),
      }) as unknown as ElementInternals
  );
});

beforeEach(() => {
  (window as unknown as Window & { PDS_SKIP_FETCH: boolean }).PDS_SKIP_FETCH = true;
});
