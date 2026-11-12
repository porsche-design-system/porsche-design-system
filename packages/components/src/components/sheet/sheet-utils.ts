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

const EXCLUDED_SWIPE_TAGS = new Set(['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'LABEL', 'SUMMARY', 'CANVAS', 'DIALOG']);
const EXCLUDED_SWIPE_ROLES = new Set([
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
]);

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
    if (!isElement(node)) {
      continue;
    }
    if (isVerticallyScrollable(node) && node.scrollTop > 0) {
      return false;
    }
    if (node === scroller) {
      return scroller.scrollTop <= 0;
    }
  }
  return scroller.scrollTop <= 0;
};

/** True when the gesture starts on an interactive control, editable region, canvas, open popover or nested dialog. */
export const hasExcludedSwipeTarget = (
  composedPath: EventTarget[],
  ownDialog: HTMLDialogElement,
  swipeHandle?: HTMLElement
): boolean => {
  for (const node of composedPath) {
    if (!(node instanceof Element)) {
      continue;
    }
    if (node === ownDialog || node === swipeHandle) {
      return false;
    }
    const tagName = node.tagName.toUpperCase();
    const role = node.getAttribute('role');
    const contentEditable = node.getAttribute('contenteditable');
    const isEditable =
      (node instanceof HTMLElement && node.isContentEditable) ||
      (contentEditable !== null && contentEditable !== 'false' && contentEditable !== 'inherit');
    if (
      EXCLUDED_SWIPE_TAGS.has(tagName) ||
      (tagName === 'A' && node.hasAttribute('href')) ||
      ((tagName === 'VIDEO' || tagName === 'AUDIO') && node.hasAttribute('controls')) ||
      (role !== null && EXCLUDED_SWIPE_ROLES.has(role)) ||
      isEditable ||
      node.matches(':popover-open') ||
      node.getAttribute('draggable') === 'true'
    ) {
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
  /** Detaches all DOM listeners, cancels timers/frames, and clears inline styles on disconnect. */
  destroy: () => void;
};

/**
 * Manages downward swipe/drag dismissal (touch on non-interactive sheet surface + `.swipe-handle`, mouse on
 * `.swipe-handle`), backdrop `color-mix` scrubbing, snap-back, and consumer veto recovery for `p-sheet`.
 */
export const createSheetSwipeController = (options: SheetSwipeControllerOptions): SheetSwipeController => {
  const { getDialog, getScroller, getSheet, getSwipeHandle, isOpen, hasSwipeHandle, onSwipeDismiss } = options;

  let wasOpen = false;
  let swipeListenersAttached = false;
  let mouseListenersAttached = false;
  let listenedDialog: HTMLDialogElement | undefined;
  let listenedSheet: HTMLDivElement | undefined;
  let listenedSwipeHandle: HTMLButtonElement | undefined;

  let touchId: number | null = null;
  let isMousePointerActive = false;
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
  let suppressClick = false;
  let suppressClickTimer = 0;

  const clearSuppressClick = (): void => {
    suppressClick = false;
    window.clearTimeout(suppressClickTimer);
  };

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

  const resetGesture = (): void => {
    touchId = null;
    isMousePointerActive = false;
    axis = null;
    isDragging = false;
    velocityY = 0;
  };

  const trackedTouch = (event: TouchEvent): Touch | undefined =>
    Array.from(event.changedTouches).find((touch) => touch.identifier === touchId);

  const scheduleVetoCheck = (): void => {
    cancelAnimationFrame(vetoFrame);
    let frames = 0;
    const tick = (): void => {
      frames += 1;
      if (frames < 2) {
        vetoFrame = requestAnimationFrame(tick);
        return;
      }
      if (isOpen() && pendingSwipeDismiss) {
        pendingSwipeDismiss = false;
        clearSwipeStyles();
      }
    };
    vetoFrame = requestAnimationFrame(tick);
  };

  const beginGesture = (clientX: number, clientY: number): void => {
    startX = clientX;
    startY = clientY;
    lastY = clientY;
    lastTime = performance.now();
    velocityY = 0;
    axis = null;
    isDragging = false;
    dragDy = 0;
    sheetHeight = getSheet()?.getBoundingClientRect().height ?? 0;
  };

  const applyDragFrame = (clientY: number, dy: number): void => {
    const sheet = getSheet();
    const dialog = getDialog();
    if (!sheet || !dialog) {
      return;
    }
    const now = performance.now();
    const elapsed = now - lastTime;
    if (elapsed > 0) {
      velocityY = (clientY - lastY) / elapsed;
    }
    lastY = clientY;
    lastTime = now;
    dragDy = Math.max(0, dy);
    sheet.style.transition = 'none';
    sheet.style.transform = `translate3d(0, ${dragDy}px, 0)`;
    dialog.style.transition = 'none';
    dialog.style.backgroundColor = getSwipeBackdropBackgroundColor(dragDy, sheetHeight);
  };

  const finishGesture = (cancelled: boolean, armClickSuppression: boolean): void => {
    const wasDragging = isDragging;
    const releaseVelocityY = performance.now() - lastTime > SWIPE_VELOCITY_DECAY_MS ? 0 : velocityY;
    const shouldDismiss =
      wasDragging && !cancelled && isOpen() && shouldDismissBySwipe(dragDy, releaseVelocityY, sheetHeight);
    resetGesture();

    if (wasDragging && armClickSuppression) {
      suppressClick = true;
      window.clearTimeout(suppressClickTimer);
      // A synthetic click after mouseup dispatches synchronously in the same task; clear on the next macrotask so later
      // real clicks are never swallowed if mouseup occurred outside `.sheet`.
      suppressClickTimer = window.setTimeout(() => {
        suppressClick = false;
      }, 0);
    }

    if (!shouldDismiss) {
      if (wasDragging) {
        clearSwipeStyles();
      }
      return;
    }
    pendingSwipeDismiss = true;
    onSwipeDismiss();
    scheduleVetoCheck();
  };

  const onScroll = (): void => {
    lastScrollTime = performance.now();
  };

  const onClickCapture = (event: MouseEvent): void => {
    if (!suppressClick) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    clearSuppressClick();
  };

  const onTouchStart = (event: TouchEvent): void => {
    clearSuppressClick();
    const dialog = getDialog();
    if (!isOpen() || !hasSwipeHandle() || !dialog || touchId !== null || isMousePointerActive) {
      return;
    }
    const touch = event.changedTouches[0];
    if (!touch || performance.now() - lastScrollTime < SWIPE_SCROLL_LOCK_MS) {
      return;
    }
    if (hasExcludedSwipeTarget(event.composedPath(), dialog, getSwipeHandle())) {
      return;
    }
    touchId = touch.identifier;
    beginGesture(touch.clientX, touch.clientY);
  };

  const onTouchMove = (event: TouchEvent): void => {
    const touch = trackedTouch(event);
    const scroller = getScroller();
    if (!touch || !isOpen() || !scroller) {
      return;
    }
    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;
    if (!axis) {
      axis = getSwipeAxis(dx, dy);
      if (!axis) {
        return;
      }
      const canDrag = axis === 'y' && dy > 0 && event.cancelable && isScrolledToTop(event.composedPath(), scroller);
      if (!canDrag) {
        axis = 'x';
        return;
      }
      isDragging = true;
    }
    if (!isDragging) {
      return;
    }
    if (event.cancelable) {
      event.preventDefault();
    }
    applyDragFrame(touch.clientY, dy);
  };

  const onTouchEnd = (event: TouchEvent): void => {
    if (!trackedTouch(event)) {
      return;
    }
    // Touch drag calls `preventDefault()` on `touchmove`, so browsers do not synthesize a `click` on `touchend`.
    finishGesture(event.type.includes('cancel'), false);
  };

  const onTouchCancel = (event: TouchEvent): void => {
    if (!trackedTouch(event)) {
      return;
    }
    finishGesture(true, false);
  };

  const detachMouseMoveListeners = (): void => {
    if (!mouseListenersAttached) {
      return;
    }
    window.removeEventListener('mousemove', onWindowMouseMove);
    window.removeEventListener('mouseup', onWindowMouseUp);
    window.removeEventListener('blur', onWindowBlur);
    mouseListenersAttached = false;
  };

  const attachMouseMoveListeners = (): void => {
    if (mouseListenersAttached) {
      return;
    }
    window.addEventListener('mousemove', onWindowMouseMove);
    window.addEventListener('mouseup', onWindowMouseUp);
    window.addEventListener('blur', onWindowBlur);
    mouseListenersAttached = true;
  };

  const onHandleMouseDown = (event: MouseEvent): void => {
    clearSuppressClick();
    if (
      event.button !== 0 ||
      !isOpen() ||
      !hasSwipeHandle() ||
      touchId !== null ||
      isMousePointerActive ||
      performance.now() - lastScrollTime < SWIPE_SCROLL_LOCK_MS
    ) {
      return;
    }
    isMousePointerActive = true;
    beginGesture(event.clientX, event.clientY);
    attachMouseMoveListeners();
  };

  function onWindowMouseMove(event: MouseEvent): void {
    if (!isMousePointerActive) {
      return;
    }
    if (!isOpen()) {
      detachMouseMoveListeners();
      finishGesture(true, false);
      return;
    }
    if ((event.buttons & 1) === 0) {
      detachMouseMoveListeners();
      finishGesture(false, true);
      return;
    }
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    if (!axis) {
      axis = getSwipeAxis(dx, dy);
      if (!axis) {
        return;
      }
      const canDrag = axis === 'y' && dy > 0 && (getScroller()?.scrollTop ?? 0) <= 0;
      if (!canDrag) {
        axis = 'x';
        return;
      }
      isDragging = true;
    }
    if (!isDragging) {
      return;
    }
    event.preventDefault();
    applyDragFrame(event.clientY, dy);
  }

  function onWindowMouseUp(): void {
    if (!isMousePointerActive) {
      return;
    }
    detachMouseMoveListeners();
    finishGesture(false, true);
  }

  function onWindowBlur(): void {
    if (!isMousePointerActive) {
      return;
    }
    detachMouseMoveListeners();
    finishGesture(true, false);
  }

  const detachListeners = (): void => {
    if (!swipeListenersAttached) {
      return;
    }
    listenedSheet?.removeEventListener('touchstart', onTouchStart);
    listenedSheet?.removeEventListener('touchmove', onTouchMove);
    listenedSheet?.removeEventListener('touchend', onTouchEnd);
    listenedSheet?.removeEventListener('touchcancel', onTouchCancel);
    listenedSheet?.removeEventListener('click', onClickCapture, true);
    listenedSwipeHandle?.removeEventListener('mousedown', onHandleMouseDown);
    listenedDialog?.removeEventListener('scroll', onScroll, true);
    detachMouseMoveListeners();
    swipeListenersAttached = false;
    listenedDialog = undefined;
    listenedSheet = undefined;
    listenedSwipeHandle = undefined;
    resetGesture();
  };

  const syncListeners = (): void => {
    const dialog = getDialog();
    const sheet = getSheet();
    const swipeHandle = getSwipeHandle();
    if (isOpen() && hasSwipeHandle() && dialog && sheet && swipeHandle) {
      if (
        swipeListenersAttached &&
        listenedDialog === dialog &&
        listenedSheet === sheet &&
        listenedSwipeHandle === swipeHandle
      ) {
        return;
      }
      detachListeners();
      sheet.addEventListener('touchstart', onTouchStart, { passive: true });
      sheet.addEventListener('touchmove', onTouchMove, { passive: false });
      sheet.addEventListener('touchend', onTouchEnd, { passive: true });
      sheet.addEventListener('touchcancel', onTouchCancel, { passive: true });
      sheet.addEventListener('click', onClickCapture, true);
      swipeHandle.addEventListener('mousedown', onHandleMouseDown);
      dialog.addEventListener('scroll', onScroll, { capture: true, passive: true });
      listenedDialog = dialog;
      listenedSheet = sheet;
      listenedSwipeHandle = swipeHandle;
      swipeListenersAttached = true;
      return;
    }
    detachListeners();
  };

  const sync = (): void => {
    const open = isOpen();
    if (open) {
      if (!wasOpen) {
        pendingSwipeDismiss = false;
        clearSwipeStyles();
      }
    } else if (wasOpen) {
      cancelAnimationFrame(vetoFrame);
      const sheet = getSheet();
      const dialog = getDialog();
      if (pendingSwipeDismiss && sheet && dialog) {
        dialog.style.transition = '';
        dialog.style.backgroundColor = '';
        sheet.style.transition = '';
        sheet.style.transform = 'translate3d(0, 100%, 0)';
        pendingSwipeDismiss = false;
      } else {
        // Closed mid-drag (e.g. Escape or external prop update) without a swipe dismiss: clear inline drag styles so
        // the standard close transition runs and `motionHiddenEnd` fires.
        clearSwipeStyles();
      }
    }
    wasOpen = open;
    syncListeners();
  };

  const destroy = (): void => {
    detachListeners();
    cancelAnimationFrame(vetoFrame);
    clearSuppressClick();
    pendingSwipeDismiss = false;
    wasOpen = false;
  };

  return { sync, destroy };
};
