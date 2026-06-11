import type { EventEmitter } from '@stencil/core';
import { vi } from 'vitest';
import {
  clearDialogCloseFallback,
  closeDialogAfterTransition,
  onCancelDialog,
  onClickDialog,
  onTransitionEnd,
  setDialogVisibility,
  supportsOverlayTransition,
} from './dialog';

const createMockDialog = (open: boolean): HTMLDialogElement => {
  const dialog = document.createElement('dialog');
  // jsdom doesn't implement showModal/close, so stub them and keep `open` in sync
  dialog.open = open;
  dialog.showModal = vi.fn(() => {
    dialog.open = true;
  });
  dialog.close = vi.fn(() => {
    dialog.open = false;
  });
  dialog.focus = vi.fn();
  return dialog;
};

const createScrollArea = (): HTMLElement => {
  const scrollArea = document.createElement('div');
  scrollArea.scrollTo = vi.fn();
  return scrollArea;
};

const createEventEmitterMock = (): EventEmitter => ({ emit: vi.fn() }) as unknown as EventEmitter;

// Mocks CSS.supports per query so we can simulate Chromium (both true), Firefox (allow-discrete only) and Safari (none).
const mockOverlaySupport = (support: { overlay?: boolean; allowDiscrete?: boolean } | boolean): void => {
  const { overlay, allowDiscrete } =
    typeof support === 'boolean' ? { overlay: support, allowDiscrete: support } : support;
  vi.stubGlobal('CSS', {
    supports: vi.fn((query: string) => {
      if (query === 'overlay: auto') {
        return overlay ?? false;
      }
      if (query === 'transition-behavior: allow-discrete') {
        return allowDiscrete ?? false;
      }
      return false;
    }),
  });
};

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe('supportsOverlayTransition()', () => {
  it('should return true when both `overlay` and `transition-behavior: allow-discrete` are supported', () => {
    mockOverlaySupport({ overlay: true, allowDiscrete: true });
    expect(supportsOverlayTransition()).toBe(true);
  });

  it('should return false when `overlay` is unsupported but `allow-discrete` is supported', () => {
    mockOverlaySupport({ overlay: false, allowDiscrete: true });
    expect(supportsOverlayTransition()).toBe(false);
  });

  it('should return false when neither `overlay` nor `allow-discrete` are supported', () => {
    mockOverlaySupport({ overlay: false, allowDiscrete: false });
    expect(supportsOverlayTransition()).toBe(false);
  });

  it('should return false when `overlay` is supported but `allow-discrete` is not', () => {
    mockOverlaySupport({ overlay: true, allowDiscrete: false });
    expect(supportsOverlayTransition()).toBe(false);
  });
});

describe('setDialogVisibility()', () => {
  it('should call showModal() and focus() when opening a closed dialog', () => {
    mockOverlaySupport(true);
    const dialog = createMockDialog(false);
    const scrollArea = createScrollArea();

    setDialogVisibility(true, dialog, scrollArea);

    expect(scrollArea.scrollTo).toHaveBeenCalledWith(0, 0);
    expect(dialog.showModal).toHaveBeenCalledTimes(1);
    expect(dialog.focus).toHaveBeenCalledTimes(1);
    expect(dialog.inert).toBe(false);
  });

  it('should not call showModal() when dialog is already open', () => {
    mockOverlaySupport(true);
    const dialog = createMockDialog(true);
    const scrollArea = createScrollArea();

    setDialogVisibility(true, dialog, scrollArea);

    expect(dialog.showModal).not.toHaveBeenCalled();
  });

  it('should close immediately on close when overlay transition is supported (Chromium)', () => {
    mockOverlaySupport(true);
    const dialog = createMockDialog(true);
    const scrollArea = createScrollArea();

    setDialogVisibility(false, dialog, scrollArea);

    expect(dialog.close).toHaveBeenCalledTimes(1);
  });

  it('should NOT close immediately on close when overlay transition is unsupported (Safari/Firefox)', () => {
    mockOverlaySupport(false);
    const dialog = createMockDialog(true);
    const scrollArea = createScrollArea();

    setDialogVisibility(false, dialog, scrollArea);

    expect(dialog.close).not.toHaveBeenCalled();
  });

  it('should NOT close immediately on close in Firefox (allow-discrete supported but overlay unsupported)', () => {
    mockOverlaySupport({ overlay: false, allowDiscrete: true });
    const dialog = createMockDialog(true);
    const scrollArea = createScrollArea();

    setDialogVisibility(false, dialog, scrollArea);

    expect(dialog.close).not.toHaveBeenCalled();
  });

  it('should close via fallback timeout when transitionend never fires (unsupported browsers)', () => {
    vi.useFakeTimers();
    mockOverlaySupport(false);
    const dialog = createMockDialog(true);
    const scrollArea = createScrollArea();

    setDialogVisibility(false, dialog, scrollArea);
    expect(dialog.close).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);
    expect(dialog.close).toHaveBeenCalledTimes(1);
  });

  it('should cancel a pending deferred close when the dialog is re-opened', () => {
    vi.useFakeTimers();
    mockOverlaySupport(false);
    const dialog = createMockDialog(true);
    const scrollArea = createScrollArea();

    setDialogVisibility(false, dialog, scrollArea); // schedules fallback close
    dialog.open = false; // simulate fully closed so re-open triggers showModal
    setDialogVisibility(true, dialog, scrollArea); // re-open cancels fallback

    vi.advanceTimersByTime(1000);
    expect(dialog.close).not.toHaveBeenCalled();
    expect(dialog.showModal).toHaveBeenCalledTimes(1);
  });
});

describe('closeDialogAfterTransition()', () => {
  it('should close an open dialog when overlay transition is unsupported', () => {
    mockOverlaySupport(false);
    const dialog = createMockDialog(true);

    closeDialogAfterTransition(dialog);

    expect(dialog.close).toHaveBeenCalledTimes(1);
  });

  it('should be a no-op when overlay transition is supported (already closed in Chromium)', () => {
    mockOverlaySupport(true);
    const dialog = createMockDialog(true);

    closeDialogAfterTransition(dialog);

    expect(dialog.close).not.toHaveBeenCalled();
  });

  it('should be a no-op when dialog is undefined', () => {
    mockOverlaySupport(false);
    expect(() => closeDialogAfterTransition(undefined as unknown as HTMLDialogElement)).not.toThrow();
  });
});

describe('clearDialogCloseFallback()', () => {
  it('should clear a pending fallback timer', () => {
    vi.useFakeTimers();
    mockOverlaySupport(false);
    const dialog = createMockDialog(true);
    const scrollArea = createScrollArea();

    setDialogVisibility(false, dialog, scrollArea);
    clearDialogCloseFallback(dialog);

    vi.advanceTimersByTime(1000);
    expect(dialog.close).not.toHaveBeenCalled();
  });
});

describe('onTransitionEnd()', () => {
  it('should emit motionVisibleEnd on background-color transitionend when open', () => {
    const dialog = createMockDialog(true);
    const motionVisibleEnd = createEventEmitterMock();
    const motionHiddenEnd = createEventEmitterMock();
    const event = { propertyName: 'background-color', target: dialog } as unknown as TransitionEvent;

    onTransitionEnd(event, true, motionVisibleEnd, motionHiddenEnd, dialog);

    expect(motionVisibleEnd.emit).toHaveBeenCalledWith(event);
    expect(motionHiddenEnd.emit).not.toHaveBeenCalled();
  });

  it('should close the dialog and emit motionHiddenEnd on background-color transitionend when closing (unsupported)', () => {
    mockOverlaySupport(false);
    const dialog = createMockDialog(true);
    const motionVisibleEnd = createEventEmitterMock();
    const motionHiddenEnd = createEventEmitterMock();
    const event = { propertyName: 'background-color', target: dialog } as unknown as TransitionEvent;

    onTransitionEnd(event, false, motionVisibleEnd, motionHiddenEnd, dialog);

    expect(dialog.close).toHaveBeenCalledTimes(1);
    expect(motionHiddenEnd.emit).toHaveBeenCalledWith(event);
    expect(motionVisibleEnd.emit).not.toHaveBeenCalled();
  });

  it('should ignore transitionend for other properties', () => {
    const dialog = createMockDialog(true);
    const motionVisibleEnd = createEventEmitterMock();
    const motionHiddenEnd = createEventEmitterMock();
    const event = { propertyName: 'opacity', target: dialog } as unknown as TransitionEvent;

    onTransitionEnd(event, true, motionVisibleEnd, motionHiddenEnd, dialog);

    expect(motionVisibleEnd.emit).not.toHaveBeenCalled();
    expect(motionHiddenEnd.emit).not.toHaveBeenCalled();
  });

  it('should ignore bubbled transitionend from descendants (target is not the dialog)', () => {
    const dialog = createMockDialog(true);
    const child = document.createElement('div');
    const motionVisibleEnd = createEventEmitterMock();
    const motionHiddenEnd = createEventEmitterMock();
    const event = { propertyName: 'background-color', target: child } as unknown as TransitionEvent;

    onTransitionEnd(event, true, motionVisibleEnd, motionHiddenEnd, dialog);

    expect(motionVisibleEnd.emit).not.toHaveBeenCalled();
    expect(motionHiddenEnd.emit).not.toHaveBeenCalled();
  });
});

describe('onCancelDialog()', () => {
  it('should preventDefault and call callback when not disabled', () => {
    const cb = vi.fn();
    const event = { preventDefault: vi.fn() } as unknown as Event;

    onCancelDialog(event, cb);

    expect(event.preventDefault).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('should preventDefault but not call callback when disabled', () => {
    const cb = vi.fn();
    const event = { preventDefault: vi.fn() } as unknown as Event;

    onCancelDialog(event, cb, true);

    expect(event.preventDefault).toHaveBeenCalledTimes(1);
    expect(cb).not.toHaveBeenCalled();
  });
});

describe('onClickDialog()', () => {
  it('should call callback when clicking the backdrop (DIALOG target)', () => {
    const cb = vi.fn();
    const event = { target: { tagName: 'DIALOG', className: '' } } as unknown as MouseEvent;

    onClickDialog(event, cb, false);

    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('should call callback when clicking the scroller', () => {
    const cb = vi.fn();
    const event = { target: { tagName: 'DIV', className: 'scroller' } } as unknown as MouseEvent;

    onClickDialog(event, cb, false);

    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('should not call callback when disabled', () => {
    const cb = vi.fn();
    const event = { target: { tagName: 'DIALOG', className: '' } } as unknown as MouseEvent;

    onClickDialog(event, cb, true);

    expect(cb).not.toHaveBeenCalled();
  });
});
