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
  HTMLDialogElement.prototype.show = vi.fn();
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();

  // Mock for the Element Internals API
  HTMLElement.prototype.attachInternals = vi.fn(
    () =>
      ({
        setFormValue: vi.fn(),
        setValidity: vi.fn(),
      }) as unknown as ElementInternals
  );

  // Mock for requestAnimationFrame/cancelAnimationFrame (not available in jsdom)
  global.requestAnimationFrame = vi.fn((callback: FrameRequestCallback) => setTimeout(callback, 0) as unknown as number);
  global.cancelAnimationFrame = vi.fn((id: number) => clearTimeout(id));
});

beforeEach(() => {
  (window as unknown as Window & { PDS_SKIP_FETCH: boolean }).PDS_SKIP_FETCH = true;
});
