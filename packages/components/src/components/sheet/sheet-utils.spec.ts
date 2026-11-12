import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  createSheetSwipeController,
  getSwipeAxis,
  getSwipeBackdropBackgroundColor,
  hasExcludedSwipeTarget,
  isScrolledToTop,
  SHEET_ARIA_ATTRIBUTES,
  SHEET_BACKGROUNDS,
  type SheetSwipeController,
  shouldDismissBySwipe,
} from './sheet-utils';

const withScrollMetrics = (element: HTMLElement, scrollHeight: number, clientHeight: number, scrollTop = 0): void => {
  Object.defineProperty(element, 'scrollHeight', { configurable: true, value: scrollHeight });
  Object.defineProperty(element, 'clientHeight', { configurable: true, value: clientHeight });
  element.scrollTop = scrollTop;
};

describe('SHEET_ARIA_ATTRIBUTES', () => {
  it('should list supported aria attributes', () => {
    expect(SHEET_ARIA_ATTRIBUTES).toStrictEqual(['aria-label', 'role']);
  });
});

describe('SHEET_BACKGROUNDS', () => {
  it('should list supported background values', () => {
    expect(SHEET_BACKGROUNDS).toStrictEqual(['canvas', 'surface']);
  });
});

describe('isScrolledToTop', () => {
  it('should be false when the sheet scroller is scrolled', () => {
    const scroller = document.createElement('div');
    scroller.style.overflowY = 'auto';
    withScrollMetrics(scroller, 400, 200, 12);
    const child = document.createElement('div');

    expect(isScrolledToTop([child, scroller], scroller)).toBe(false);
  });

  it('should be false when a nested scroll container is scrolled even if the sheet scroller is at the top', () => {
    const scroller = document.createElement('div');
    scroller.style.overflowY = 'auto';
    withScrollMetrics(scroller, 400, 200, 0);
    const nested = document.createElement('div');
    nested.style.overflowY = 'auto';
    withScrollMetrics(nested, 300, 100, 8);

    expect(isScrolledToTop([nested, scroller], scroller)).toBe(false);
  });

  it('should be true when every scroll container up to the sheet scroller is at the top', () => {
    const scroller = document.createElement('div');
    scroller.style.overflowY = 'auto';
    withScrollMetrics(scroller, 400, 200, 0);
    const nested = document.createElement('div');
    nested.style.overflowY = 'auto';
    withScrollMetrics(nested, 300, 100, 0);

    expect(isScrolledToTop([nested, scroller], scroller)).toBe(true);
  });
});

describe('hasExcludedSwipeTarget', () => {
  const ownDialog = document.createElement('dialog');

  it('should ignore form controls, labels, buttons, links, editable regions, canvas, draggable elements and nested dialogs', () => {
    const input = document.createElement('input');
    const textarea = document.createElement('textarea');
    const select = document.createElement('select');
    const label = document.createElement('label');
    const button = document.createElement('button');
    const link = document.createElement('a');
    link.href = '#target';
    const roleButton = document.createElement('div');
    roleButton.setAttribute('role', 'button');
    const editable = document.createElement('div');
    editable.setAttribute('contenteditable', 'true');
    const canvas = document.createElement('canvas');
    const draggable = document.createElement('div');
    draggable.setAttribute('draggable', 'true');
    const nestedDialog = document.createElement('dialog');

    for (const target of [
      input,
      textarea,
      select,
      label,
      button,
      link,
      roleButton,
      editable,
      canvas,
      draggable,
      nestedDialog,
    ]) {
      expect(hasExcludedSwipeTarget([target, ownDialog], ownDialog)).toBe(true);
    }
  });

  it('should allow a gesture starting on the swipe handle button itself', () => {
    const swipeHandle = document.createElement('button');
    const labelSpan = document.createElement('span');

    expect(hasExcludedSwipeTarget([labelSpan, swipeHandle, ownDialog], ownDialog, swipeHandle)).toBe(false);
  });

  it('should allow a gesture on non-interactive content or an anchor without href', () => {
    const content = document.createElement('p');
    const anchorWithoutHref = document.createElement('a');

    expect(hasExcludedSwipeTarget([content, ownDialog], ownDialog)).toBe(false);
    expect(hasExcludedSwipeTarget([anchorWithoutHref, ownDialog], ownDialog)).toBe(false);
  });
});

describe('getSwipeAxis', () => {
  it('should stay undecided until the gesture has moved 8px', () => {
    expect(getSwipeAxis(3, 4)).toBeNull();
  });

  it('should lock to the dominant axis', () => {
    expect(getSwipeAxis(2, 20)).toBe('y');
    expect(getSwipeAxis(20, 2)).toBe('x');
  });
});

describe('shouldDismissBySwipe', () => {
  it('should dismiss once the drag passes the capped distance threshold', () => {
    expect(shouldDismissBySwipe(99, 0, 400)).toBe(false);
    expect(shouldDismissBySwipe(100, 0, 400)).toBe(true);
    expect(shouldDismissBySwipe(180, 0, 2000)).toBe(true);
    expect(shouldDismissBySwipe(179, 0, 2000)).toBe(false);
  });

  it('should dismiss a short downward flick, tolerate minor thumb-lift jitter, and cancel an intentional upward flick', () => {
    expect(shouldDismissBySwipe(21, 0.5, 400)).toBe(true);
    expect(shouldDismissBySwipe(20, 0.5, 400)).toBe(false);
    expect(shouldDismissBySwipe(160, -0.2, 400)).toBe(true);
    expect(shouldDismissBySwipe(160, -0.5, 400)).toBe(false);
  });
});

describe('getSwipeBackdropBackgroundColor', () => {
  it('should keep the full backdrop at the origin and fade it as the sheet moves down', () => {
    expect(getSwipeBackdropBackgroundColor(0, 400)).toBe(
      'color-mix(in srgb, var(--p-color-backdrop) 100%, transparent)'
    );
    expect(getSwipeBackdropBackgroundColor(100, 400)).toBe(
      'color-mix(in srgb, var(--p-color-backdrop) 75%, transparent)'
    );
  });

  it('should stop at 1% so the close transition still changes the background color', () => {
    expect(getSwipeBackdropBackgroundColor(1000, 400)).toBe(
      'color-mix(in srgb, var(--p-color-backdrop) 1%, transparent)'
    );
  });
});

describe('createSheetSwipeController', () => {
  let dialog: HTMLDialogElement;
  let scroller: HTMLDivElement;
  let sheet: HTMLDivElement;
  let swipeHandle: HTMLButtonElement;
  let openState = true;
  let swipeHandleEnabled = true;
  let onSwipeDismiss = vi.fn<() => void>();
  let controller: SheetSwipeController;
  let advanceTime = (_ms: number): void => undefined;

  const dispatchTouchOn = (
    target: HTMLElement,
    type: 'touchstart' | 'touchmove' | 'touchend' | 'touchcancel',
    clientY: number,
    cancelable = true
  ): Event => {
    const event = new Event(type, { bubbles: true, cancelable, composed: true });
    Object.defineProperty(event, 'changedTouches', {
      value: [{ identifier: 1, clientX: 20, clientY }],
    });
    target.dispatchEvent(event);
    return event;
  };

  beforeEach(() => {
    dialog = document.createElement('dialog');
    scroller = document.createElement('div');
    sheet = document.createElement('div');
    sheet.getBoundingClientRect = () => ({ height: 400 }) as DOMRect;
    swipeHandle = document.createElement('button');
    sheet.appendChild(swipeHandle);
    scroller.appendChild(sheet);
    dialog.appendChild(scroller);
    document.body.appendChild(dialog);

    openState = true;
    swipeHandleEnabled = true;
    onSwipeDismiss = vi.fn<() => void>();

    let now = 1_000;
    vi.spyOn(performance, 'now').mockImplementation(() => now);
    advanceTime = (ms: number) => {
      now += ms;
    };

    controller = createSheetSwipeController({
      getDialog: () => dialog,
      getScroller: () => scroller,
      getSheet: () => sheet,
      getSwipeHandle: () => swipeHandle,
      isOpen: () => openState,
      hasSwipeHandle: () => swipeHandleEnabled,
      onSwipeDismiss,
    });
    controller.sync();
  });

  afterEach(() => {
    controller.destroy();
    dialog.remove();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('should attach DOM listeners only while open and swipeHandle is enabled, and detach on close or destroy', () => {
    dispatchTouchOn(sheet, 'touchstart', 100);
    advanceTime(100);
    const move = dispatchTouchOn(sheet, 'touchmove', 220);

    expect(move.defaultPrevented).toBe(true);
    expect(sheet.style.transform).toBe('translate3d(0, 120px, 0)');
    expect(dialog.style.backgroundColor).toContain('color-mix');

    dispatchTouchOn(sheet, 'touchend', 220);
    expect(onSwipeDismiss).toHaveBeenCalledTimes(1);

    openState = false;
    controller.sync();
    expect(sheet.style.transform).toBe('translate3d(0, 100%, 0)');
    expect(dialog.style.backgroundColor).toBe('');

    // Listeners are detached while closed
    onSwipeDismiss.mockClear();
    dispatchTouchOn(sheet, 'touchstart', 100);
    advanceTime(100);
    dispatchTouchOn(sheet, 'touchmove', 260);
    dispatchTouchOn(sheet, 'touchend', 260);
    expect(onSwipeDismiss).not.toHaveBeenCalled();
  });

  it('should clear inline drag styles and cancel the gesture if the sheet closes mid-drag', () => {
    swipeHandle.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, button: 0, clientX: 20, clientY: 100 }));
    advanceTime(50);
    window.dispatchEvent(new MouseEvent('mousemove', { buttons: 1, clientX: 20, clientY: 160, cancelable: true }));

    expect(sheet.style.transition).toBe('none');
    expect(dialog.style.transition).toBe('none');
    expect(dialog.style.backgroundColor).toContain('color-mix');

    // Sheet closes externally (e.g. Escape) before mouseup
    openState = false;
    controller.sync();

    expect(sheet.style.transition).toBe('');
    expect(sheet.style.transform).toBe('');
    expect(dialog.style.transition).toBe('');
    expect(dialog.style.backgroundColor).toBe('');

    window.dispatchEvent(new MouseEvent('mouseup', { button: 0, clientX: 20, clientY: 280 }));
    expect(onSwipeDismiss).not.toHaveBeenCalled();
  });

  it('should not swallow subsequent button clicks after a short touch drag', () => {
    const innerButton = document.createElement('button');
    const clickSpy = vi.fn();
    innerButton.addEventListener('click', clickSpy);
    sheet.appendChild(innerButton);

    dispatchTouchOn(sheet, 'touchstart', 100);
    advanceTime(200);
    dispatchTouchOn(sheet, 'touchmove', 120);
    dispatchTouchOn(sheet, 'touchend', 120);

    expect(onSwipeDismiss).not.toHaveBeenCalled();
    expect(sheet.style.transform).toBe('');

    innerButton.click();
    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it('should decay flick velocity when the user pauses before lifting their finger', () => {
    dispatchTouchOn(sheet, 'touchstart', 100);
    advanceTime(30);
    // 30px in 30ms => 1.0 px/ms (fast flick, but short distance < 100px)
    dispatchTouchOn(sheet, 'touchmove', 130);
    // User holds still for 200ms (> 64ms decay window) before lifting
    advanceTime(200);
    dispatchTouchOn(sheet, 'touchend', 130);

    expect(onSwipeDismiss).not.toHaveBeenCalled();
    expect(sheet.style.transform).toBe('');
  });

  it('should snap back on touchcancel, window blur, scroll lock, and consumer veto', () => {
    // Scroll lock blocks immediate touch drag
    scroller.dispatchEvent(new Event('scroll'));
    advanceTime(40);
    dispatchTouchOn(sheet, 'touchstart', 100);
    advanceTime(50);
    dispatchTouchOn(sheet, 'touchmove', 250);
    dispatchTouchOn(sheet, 'touchend', 250);
    expect(onSwipeDismiss).not.toHaveBeenCalled();

    // Advance past 100ms scroll lock; touchcancel snaps back
    advanceTime(200);
    dispatchTouchOn(sheet, 'touchstart', 100);
    advanceTime(50);
    dispatchTouchOn(sheet, 'touchmove', 220);
    expect(sheet.style.transform).toBe('translate3d(0, 120px, 0)');
    dispatchTouchOn(sheet, 'touchcancel', 220);
    expect(onSwipeDismiss).not.toHaveBeenCalled();
    expect(sheet.style.transform).toBe('');

    // Window blur during mouse drag snaps back
    swipeHandle.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, button: 0, clientX: 20, clientY: 100 }));
    advanceTime(50);
    window.dispatchEvent(new MouseEvent('mousemove', { buttons: 1, clientX: 20, clientY: 180, cancelable: true }));
    expect(sheet.style.transform).toBe('translate3d(0, 80px, 0)');
    window.dispatchEvent(new Event('blur'));
    expect(sheet.style.transform).toBe('');

    // Consumer veto (sheet stays open across 2 animation frames) snaps back
    const frames: FrameRequestCallback[] = [];
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      frames.push(cb);
      return frames.length;
    });
    dispatchTouchOn(sheet, 'touchstart', 100);
    advanceTime(80);
    dispatchTouchOn(sheet, 'touchmove', 260);
    dispatchTouchOn(sheet, 'touchend', 260);
    expect(onSwipeDismiss).toHaveBeenCalledTimes(1);
    frames.at(-1)?.(0);
    frames.at(-1)?.(0);
    expect(sheet.style.transform).toBe('');
    expect(dialog.style.backgroundColor).toBe('');
  });
});
