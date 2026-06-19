import '@porsche-design-system/components-js/jsdom-polyfill';
import 'whatwg-fetch'; // not part of jsdom-polyfill anymore since we don't do fetch calls
import { afterEach, beforeAll, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';

const pendingRafHandles = new Set<ReturnType<typeof setTimeout>>();

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

  // Mock for requestAnimationFrame/cancelAnimationFrame (not available in jsdom).
  // Track pending handles so they can be cancelled in afterEach; without cleanup,
  // deferred callbacks fire after jsdom teardown causing "Node is not defined" errors.
  global.requestAnimationFrame = vi.fn((callback: FrameRequestCallback) => {
    const id = setTimeout(callback, 0);
    pendingRafHandles.add(id);
    return id as unknown as number;
  });
  global.cancelAnimationFrame = vi.fn((id: number) => {
    const handle = id as unknown as ReturnType<typeof setTimeout>;
    clearTimeout(handle);
    pendingRafHandles.delete(handle);
  });
});

afterEach(() => {
  // Cancel any pending rAF timers to prevent them from firing after jsdom teardown,
  // which would cause "Node is not defined" ReferenceErrors.
  for (const id of pendingRafHandles) {
    clearTimeout(id);
  }
  pendingRafHandles.clear();
});

beforeEach(() => {
  (window as unknown as Window & { PDS_SKIP_FETCH: boolean }).PDS_SKIP_FETCH = true;
});
