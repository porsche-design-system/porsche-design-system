import type { EventEmitter } from '@stencil/core';

// Chromium keeps a closing dialog on the #top-layer during its fade-out via the `overlay` property combined with
// `transition-behavior: allow-discrete`. We must detect BOTH: `allow-discrete` alone is now widely supported (e.g.
// Firefox), but the `overlay` property itself is Chromium-only. Firefox supports `allow-discrete` yet NOT `overlay`,
// so it would drop out of the #top-layer immediately on `.close()` and fall back to a high `z-index` — which breaks as
// soon as an ancestor creates a new stacking context (e.g. `transform`/`isolation`, like nested `p-modal` within
// `p-flyout`). For browsers lacking the `overlay` transition we keep the dialog natively open during the fade-out and
// only call `.close()` once the transition has finished, which keeps it on the *real* #top-layer regardless of ancestor
// stacking contexts.
export const supportsOverlayTransition = (): boolean =>
  typeof CSS !== 'undefined' && CSS.supports('overlay: auto') && CSS.supports('transition-behavior: allow-discrete');

// Tracks the safety-net timeout per dialog used to force the deferred `.close()` in case `transitionend` never fires
// (e.g. with reduced motion or a zeroed `--p-transition-duration`).
const closeFallbackTimers = new WeakMap<HTMLDialogElement, ReturnType<typeof setTimeout>>();

export const setDialogVisibility = (isOpen: boolean, dialog: HTMLDialogElement, scrollArea: HTMLElement): void => {
  // `.showModal()` / `.close()` shall only be called when state changes and after render cycle has finished
  // (e.g. in `componentDidRender()`) to prepare visibility states of dialog in order to focus the dismiss button correctly
  if (isOpen === true && !dialog.open) {
    clearDialogCloseFallback(dialog); // re-opened during a deferred close: cancel the pending close
    scrollArea.scrollTo(0, 0); // reset scroll position each time dialog gets opened again
    dialog.inert = true; // This will prevent the autofocus of focusable elements inside the dialog (e.g. close button) element which is conflicting with our transition
    dialog.showModal(); // shows modal on `#top-layer`
    dialog.inert = false; // Re-enable focus on dialog element
    dialog.focus(); // set focus programmatically to dialog element to prevent transition bug in Safari
  } else if (isOpen === false && dialog.open) {
    if (supportsOverlayTransition()) {
      dialog.close(); // Chromium: `overlay` + `allow-discrete` keeps it on the #top-layer during the fade-out
    } else {
      // Safari/Firefox: keep the dialog open during the fade-out and close it on `transitionend` (see `onTransitionEnd`).
      // Schedule a safety-net timeout in case `transitionend` never fires.
      scheduleDialogCloseFallback(dialog);
    }
  }
};

// Closes the dialog after its fade-out transition has finished. No-op in Chromium where `.close()` already ran.
export const closeDialogAfterTransition = (dialog: HTMLDialogElement): void => {
  if (dialog?.open && !supportsOverlayTransition()) {
    clearDialogCloseFallback(dialog);
    dialog.close();
  }
};

export const clearDialogCloseFallback = (dialog: HTMLDialogElement): void => {
  const timer = closeFallbackTimers.get(dialog);
  if (timer) {
    clearTimeout(timer);
    closeFallbackTimers.delete(dialog);
  }
};

const scheduleDialogCloseFallback = (dialog: HTMLDialogElement): void => {
  clearDialogCloseFallback(dialog);
  // Derive the duration from the computed transition (respects reduced motion / overridden `--p-transition-duration`)
  // and add a small buffer so the timeout only fires if the expected `transitionend` was missed.
  const timeoutMs = getDialogTransitionDurationMs(dialog) + 50;
  closeFallbackTimers.set(
    dialog,
    setTimeout(() => closeDialogAfterTransition(dialog), timeoutMs)
  );
};

const parseCssTimeToMs = (value: string): number => {
  const trimmed = value.trim();
  const num = Number.parseFloat(trimmed);
  if (Number.isNaN(num)) {
    return 0;
  }
  return trimmed.endsWith('ms') ? num : num * 1000; // seconds otherwise
};

const getDialogTransitionDurationMs = (dialog: HTMLDialogElement): number => {
  const { transitionDuration, transitionDelay } = getComputedStyle(dialog);
  const durations = transitionDuration.split(',');
  const delays = transitionDelay.split(',');
  return durations.reduce((max, duration, index) => {
    const total = parseCssTimeToMs(duration) + parseCssTimeToMs(delays[index] ?? '0s');
    return total > max ? total : max;
  }, 0);
};

export const onCancelDialog = (e: Event, cb: () => void, disable = false): void => {
  e.preventDefault(); // prevent closing the dialog uncontrolled by ESC
  if (!disable) {
    cb();
  }
};

export const onClickDialog = (e: MouseEvent, cb: () => void, disable: boolean): void => {
  if (
    !disable &&
    ((e as MouseEvent & { target: HTMLElement }).target.className === 'scroller' ||
      (e as MouseEvent & { target: HTMLElement }).target.tagName === 'DIALOG')
  ) {
    cb(); // dismiss dialog when clicked on backdrop
  }
};

export const onTransitionEnd = (
  nativeEvent: TransitionEvent,
  isOpen: boolean,
  motionVisibleEndEvent: EventEmitter,
  motionHiddenEndEvent: EventEmitter,
  dialog?: HTMLDialogElement
): void => {
  // `background-color` has the longest duration on the dialog (backdrop) and is unique to it, so it's the single
  // reliable signal that the transition finished. The `target` guard prevents bubbled `transitionend` events from
  // descendants triggering this logic prematurely.
  if (nativeEvent.propertyName === 'background-color' && (!dialog || nativeEvent.target === dialog)) {
    if (isOpen) {
      motionVisibleEndEvent.emit(nativeEvent);
    } else {
      closeDialogAfterTransition(dialog); // Safari/Firefox: leave the #top-layer now; no-op in Chromium (already closed)
      motionHiddenEndEvent.emit(nativeEvent);
    }
  }
};
