import { colorBackdrop, ref } from '@porsche-design-system/stylesheets';
import type { DialogDismissReason } from '../../utils/dialog/dialog';

export const SHEET_ARIA_ATTRIBUTES = ['aria-label', 'role'] as const;
export type SheetAriaAttribute = (typeof SHEET_ARIA_ATTRIBUTES)[number];

export const SHEET_BACKGROUNDS = ['canvas', 'surface'] as const;
export type SheetBackground = (typeof SHEET_BACKGROUNDS)[number];

export type SheetDismissReason = 'dismiss-button' | 'backdrop' | 'escape' | 'swipe';
// Compile-time check so SheetDismissReason stays aligned with DialogDismissReason + 'swipe' while keeping a literal union for component-meta.
const _assertSheetDismissReason: Record<SheetDismissReason, true> = {
  'dismiss-button': true,
  backdrop: true,
  escape: true,
  swipe: true,
} satisfies Record<DialogDismissReason | 'swipe', true>;
void _assertSheetDismissReason;

export type SheetMotionVisibleEndEventDetail = TransitionEvent;
export type SheetMotionHiddenEndEventDetail = TransitionEvent;
export type SheetDismissEventDetail = { reason: SheetDismissReason };

export const SWIPE_START_THRESHOLD_PX = 8;
export const SWIPE_DISMISS_DISTANCE_RATIO = 0.25;
export const SWIPE_DISMISS_MAX_DISTANCE_PX = 180;
export const SWIPE_DISMISS_VELOCITY_PX_PER_MS = 0.5;
export const SWIPE_DISMISS_MIN_FLICK_PX = 20;
export const SWIPE_VELOCITY_DECAY_MS = 64;
export const SWIPE_SCROLL_LOCK_MS = 100;
export const SWIPE_MAX_BACKDROP_SCRUB = 0.99;

const isElement = (node: EventTarget): node is HTMLElement => node instanceof HTMLElement;

const EXCLUDED_SWIPE_TARGET_SELECTOR = [
  'input',
  'textarea',
  'select',
  'button',
  'label',
  'summary',
  'canvas',
  'dialog',
  'a[href]',
  'video[controls]',
  'audio[controls]',
  '[contenteditable]:not([contenteditable="false" i])',
  '[draggable="true"]',
  ':popover-open',
  ...[
    'button',
    'link',
    'slider',
    'spinbutton',
    'textbox',
    'combobox',
    'listbox',
    'menuitem',
    'option',
    'switch',
    'tab',
  ].map((role) => `[role="${role}"]`),
].join();

const isVerticallyScrollable = (element: HTMLElement): boolean => {
  if (element.scrollHeight <= element.clientHeight) {
    return false;
  }
  const { overflowY } = getComputedStyle(element);
  return overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay';
};

/** True when the sheet scroller and every scrollable ancestor between the touch and it are at the top. */
export const isScrolledToTop = (composedPath: EventTarget[], scroller: HTMLElement): boolean => {
  for (const node of composedPath) {
    if (node === scroller) {
      break;
    }
    if (isElement(node) && isVerticallyScrollable(node) && node.scrollTop > 0) {
      return false;
    }
  }
  return scroller.scrollTop <= 0;
};

/**
 * True when the touch starts on an interactive control, editable region, canvas, open popover or nested dialog.
 * This includes the swipe handle button, which is dragged through Pointer Events instead.
 */
export const hasExcludedSwipeTarget = (composedPath: EventTarget[], ownDialog: HTMLDialogElement): boolean => {
  for (const node of composedPath) {
    if (node === ownDialog) {
      return false;
    }
    if (node instanceof Element && node.matches(EXCLUDED_SWIPE_TARGET_SELECTOR)) {
      return true;
    }
  }
  return false;
};

/** Locks a gesture to an axis once it has moved past the start threshold. */
export const getSwipeAxis = (
  dx: number,
  dy: number,
  thresholdPx: number = SWIPE_START_THRESHOLD_PX
): 'x' | 'y' | null => {
  if (Math.hypot(dx, dy) < thresholdPx) {
    return null;
  }
  return Math.abs(dx) >= Math.abs(dy) ? 'x' : 'y';
};

/** Distance or downward flick closes the sheet. An intentional upward flick cancels a long drag. */
export const shouldDismissBySwipe = (dy: number, velocityY: number, sheetHeight: number): boolean => {
  if (dy <= 0 || velocityY <= -SWIPE_DISMISS_VELOCITY_PX_PER_MS) {
    return false;
  }
  const distanceThreshold = Math.min(SWIPE_DISMISS_DISTANCE_RATIO * sheetHeight, SWIPE_DISMISS_MAX_DISTANCE_PX);
  return dy >= distanceThreshold || (velocityY >= SWIPE_DISMISS_VELOCITY_PX_PER_MS && dy > SWIPE_DISMISS_MIN_FLICK_PX);
};

/** Backdrop mix while dragging. Clamped so the close transition still has a background-color delta. */
export const getSwipeBackdropBackgroundColor = (dy: number, sheetHeight: number): string => {
  const progress = sheetHeight > 0 ? Math.min(Math.max(dy, 0) / sheetHeight, SWIPE_MAX_BACKDROP_SCRUB) : 0;
  const percent = Math.round((1 - progress) * 10000) / 100;
  return `color-mix(in srgb, ${ref(colorBackdrop)} ${percent}%, transparent)`;
};

export type SheetSwipeControllerOptions = {
  getDialog: () => HTMLDialogElement | undefined;
  getScroller: () => HTMLDivElement | undefined;
  getSheet: () => HTMLDivElement | undefined;
  getSwipeHandle: () => HTMLButtonElement | undefined;
  isOpen: () => boolean;
  hasSwipeHandle: () => boolean;
  onSwipeDismiss: () => void;
};

export type SheetSwipeController = {
  /** Reconciles DOM listeners and open/close inline style transitions after render. */
  sync: () => void;
  /** Detaches all DOM listeners, cancels frames, and clears inline styles on disconnect. */
  destroy: () => void;
  /** True once for the backdrop transition that restores an open sheet after a snap-back or veto, not an open. */
  consumeRecoveryTransition: (event: TransitionEvent) => boolean;
};

/**
 * Manages downward swipe dismissal for `p-sheet`: Touch Events on the non-interactive sheet surface (so native scrolling
 * and horizontal gestures keep working) and Pointer Events with pointer capture on `.swipe-handle` (mouse, pen and
 * touch). Also scrubs the backdrop, snaps back and recovers from a consumer veto.
 */
export const createSheetSwipeController = (options: SheetSwipeControllerOptions): SheetSwipeController => {
  const { getDialog, getScroller, getSheet, getSwipeHandle, isOpen, hasSwipeHandle, onSwipeDismiss } = options;

  let wasOpen = false;
  let listeners:
    | { dialog: HTMLDialogElement; sheet: HTMLDivElement; handle: HTMLButtonElement; abort: AbortController }
    | undefined;

  let touchId: number | null = null;
  let pointerId: number | null = null;
  let startX = 0;
  let startY = 0;
  let lastY = 0;
  let lastTime = 0;
  let velocityY = 0;
  let axis: 'x' | 'y' | null = null;
  let isDragging = false;
  let dragDy = 0;
  let sheetHeight = 0;
  let lastScrollTime = 0;
  let pendingSwipeDismiss = false;
  let vetoFrame = 0;
  let suppressHandleClick = false;
  let isRecovering = false;

  const clearSwipeStyles = (): void => {
    const sheet = getSheet();
    if (sheet) {
      sheet.style.transition = '';
      sheet.style.transform = '';
    }
    const dialog = getDialog();
    if (dialog) {
      dialog.style.transition = '';
      dialog.style.backgroundColor = '';
    }
  };

  /** Restores the still-open sheet from its drag position, which transitions the backdrop back. */
  const recoverSwipeStyles = (): void => {
    isRecovering ||= !!getDialog()?.style.backgroundColor;
    clearSwipeStyles();
  };

  const resetGesture = (): void => {
    touchId = null;
    pointerId = null;
    axis = null;
    isDragging = false;
    velocityY = 0;
  };

  const canBeginGesture = (): boolean =>
    touchId === null && pointerId === null && performance.now() - lastScrollTime >= SWIPE_SCROLL_LOCK_MS;

  const beginGesture = (clientX: number, clientY: number): void => {
    startX = clientX;
    startY = clientY;
    lastY = clientY;
    lastTime = performance.now();
    dragDy = 0;
    sheetHeight = getSheet()?.getBoundingClientRect().height ?? 0;
    suppressHandleClick = false;
  };

  const applyDragFrame = (clientY: number, dy: number): void => {
    const sheet = getSheet();
    const dialog = getDialog();
    if (!sheet || !dialog) {
      return;
    }
    const now = performance.now();
    if (now > lastTime) {
      velocityY = (clientY - lastY) / (now - lastTime);
    }
    lastY = clientY;
    lastTime = now;
    dragDy = Math.max(0, dy);
    sheet.style.transition = 'none';
    sheet.style.transform = `translate3d(0, ${dragDy}px, 0)`;
    dialog.style.transition = 'none';
    dialog.style.backgroundColor = getSwipeBackdropBackgroundColor(dragDy, sheetHeight);
  };

  /** Locks the axis once, then follows the pointer while the gesture is downward and the content is scrolled to the top. */
  const moveGesture = (event: TouchEvent | PointerEvent, clientX: number, clientY: number): void => {
    const dy = clientY - startY;
    if (!axis) {
      axis = getSwipeAxis(clientX - startX, dy);
      const scroller = getScroller();
      isDragging =
        axis === 'y' && dy > 0 && event.cancelable && !!scroller && isScrolledToTop(event.composedPath(), scroller);
    }
    if (isDragging) {
      event.preventDefault();
      applyDragFrame(clientY, dy);
    }
  };

  const scheduleVetoCheck = (): void => {
    cancelAnimationFrame(vetoFrame);
    // Two frames give a controlled consumer time to set `open = false` before a veto is assumed.
    vetoFrame = requestAnimationFrame(() => {
      vetoFrame = requestAnimationFrame(() => {
        if (isOpen() && pendingSwipeDismiss) {
          pendingSwipeDismiss = false;
          recoverSwipeStyles();
        }
      });
    });
  };

  const finishGesture = (cancelled: boolean): void => {
    const wasDragging = isDragging;
    const releaseVelocityY = performance.now() - lastTime > SWIPE_VELOCITY_DECAY_MS ? 0 : velocityY;
    const shouldDismiss =
      wasDragging && !cancelled && isOpen() && shouldDismissBySwipe(dragDy, releaseVelocityY, sheetHeight);
    // A pointer drag on the handle ends with a click on it. Touch drags call `preventDefault()` and never produce one.
    suppressHandleClick = wasDragging && pointerId !== null;
    resetGesture();

    if (shouldDismiss) {
      pendingSwipeDismiss = true;
      onSwipeDismiss();
      scheduleVetoCheck();
    } else if (wasDragging) {
      recoverSwipeStyles();
    }
  };

  const trackedTouch = (event: TouchEvent): Touch | undefined =>
    Array.from(event.changedTouches).find((touch) => touch.identifier === touchId);

  const onTouchStart = (event: TouchEvent): void => {
    const touch = event.changedTouches[0];
    const dialog = getDialog();
    if (touch && dialog && canBeginGesture() && !hasExcludedSwipeTarget(event.composedPath(), dialog)) {
      touchId = touch.identifier;
      beginGesture(touch.clientX, touch.clientY);
    }
  };

  const onTouchMove = (event: TouchEvent): void => {
    const touch = trackedTouch(event);
    if (touch) {
      moveGesture(event, touch.clientX, touch.clientY);
    }
  };

  const onTouchEnd = (event: TouchEvent): void => {
    if (trackedTouch(event)) {
      finishGesture(event.type === 'touchcancel');
    }
  };

  const onHandlePointerDown = (event: PointerEvent): void => {
    if (event.button === 0 && event.isPrimary && canBeginGesture()) {
      (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
      pointerId = event.pointerId;
      beginGesture(event.clientX, event.clientY);
    }
  };

  const onHandlePointerMove = (event: PointerEvent): void => {
    if (event.pointerId !== pointerId) {
      return;
    }
    // No button pressed means the release was missed, e.g. after the window lost focus mid-drag.
    if (event.buttons === 0) {
      finishGesture(true);
    } else {
      moveGesture(event, event.clientX, event.clientY);
    }
  };

  const onHandlePointerEnd = (event: PointerEvent): void => {
    if (event.pointerId === pointerId) {
      finishGesture(event.type !== 'pointerup');
    }
  };

  const onClickCapture = (event: MouseEvent): void => {
    // `detail === 0` is a keyboard activation, which is never the tail of a drag.
    if (suppressHandleClick && event.detail > 0 && getSwipeHandle()?.contains(event.target as Node)) {
      suppressHandleClick = false;
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const onScroll = (): void => {
    lastScrollTime = performance.now();
  };

  const detachListeners = (): void => {
    listeners?.abort.abort();
    listeners = undefined;
    resetGesture();
  };

  const syncListeners = (): void => {
    const dialog = getDialog();
    const sheet = getSheet();
    const handle = getSwipeHandle();
    if (!(isOpen() && hasSwipeHandle() && dialog && sheet && handle)) {
      // Disabling the feature while open must not leave the sheet displaced. The glide-out styles of a closed sheet stay.
      if (isOpen() && (isDragging || pendingSwipeDismiss)) {
        cancelAnimationFrame(vetoFrame);
        pendingSwipeDismiss = false;
        recoverSwipeStyles();
      }
      detachListeners();
      return;
    }
    if (listeners?.dialog === dialog && listeners.sheet === sheet && listeners.handle === handle) {
      return;
    }
    detachListeners();
    const abort = new AbortController();
    const { signal } = abort;
    sheet.addEventListener('touchstart', onTouchStart, { passive: true, signal });
    sheet.addEventListener('touchmove', onTouchMove, { passive: false, signal });
    sheet.addEventListener('touchend', onTouchEnd, { passive: true, signal });
    sheet.addEventListener('touchcancel', onTouchEnd, { passive: true, signal });
    sheet.addEventListener('click', onClickCapture, { capture: true, signal });
    handle.addEventListener('pointerdown', onHandlePointerDown, { signal });
    handle.addEventListener('pointermove', onHandlePointerMove, { signal });
    handle.addEventListener('pointerup', onHandlePointerEnd, { signal });
    handle.addEventListener('pointercancel', onHandlePointerEnd, { signal });
    handle.addEventListener('lostpointercapture', onHandlePointerEnd, { signal });
    dialog.addEventListener('scroll', onScroll, { capture: true, passive: true, signal });
    listeners = { dialog, sheet, handle, abort };
  };

  const sync = (): void => {
    const open = isOpen();
    if (open !== wasOpen) {
      isRecovering = false;
    }
    if (open && !wasOpen) {
      pendingSwipeDismiss = false;
      clearSwipeStyles();
    } else if (!open && wasOpen) {
      cancelAnimationFrame(vetoFrame);
      clearSwipeStyles();
      // Swipe dismiss glides out from the drag position. Any other close (e.g. Escape mid-drag) runs the standard
      // transition so `motionHiddenEnd` fires.
      const sheet = getSheet();
      if (pendingSwipeDismiss && sheet) {
        sheet.style.transform = 'translate3d(0, 100%, 0)';
      }
      pendingSwipeDismiss = false;
    }
    wasOpen = open;
    syncListeners();
  };

  const destroy = (): void => {
    detachListeners();
    cancelAnimationFrame(vetoFrame);
    pendingSwipeDismiss = false;
    suppressHandleClick = false;
    isRecovering = false;
    wasOpen = false;
  };

  const consumeRecoveryTransition = (event: TransitionEvent): boolean => {
    if (isRecovering && event.target === getDialog() && event.propertyName === 'background-color') {
      isRecovering = false;
      return true;
    }
    return false;
  };

  return { sync, destroy, consumeRecoveryTransition };
};
