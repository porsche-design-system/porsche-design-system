import { getMaxTransitionDurationMs } from '../dom';
import { supportsOverlayTransition } from './supportsOverlayTransition';

export type TopLayerController = {
  /** Promote the element to the `#top-layer` (idempotent). Call when `open` turned `true`, after render. */
  requestShow: () => void;
  /** Let the element leave the `#top-layer` (e.g. `open` turned `false`), after fade-out styles are applied. */
  requestHide: () => void;
  /** Cancel a pending deferred hide (called automatically on `requestShow`; also call on disconnect). */
  cancel: () => void;
};

export type TopLayerOptions = {
  /** Returns the element used to read the computed transition duration. */
  getElement: () => HTMLElement | undefined;
  /** Returns whether the element is currently promoted to the `#top-layer` (shown). */
  isShown: () => boolean;
  /** Promotes the element to the `#top-layer` (e.g. `dialog.showModal()` / `element.showPopover()`). */
  show: () => void;
  /** Removes the element from the `#top-layer` (e.g. `dialog.close()` / `element.hidePopover()`). */
  hide: () => void;
};

// Extra time added on top of the computed transition duration before hiding. The timer starts in `requestHide()`,
// one frame before the transition actually begins, so this buffer biases the hide slightly *after* the visual
// transition ends — preventing the element from leaving the #top-layer too early and flickering.
const HIDE_BUFFER_MS = 50;

/**
 * Creates a controller that manages an element's presence on the `#top-layer`, keeping it there during its fade-out
 * animation in browsers that don't support the `overlay` transition (Safari/Firefox). On hide it defers the native
 * removal (`dialog.close()` / `element.hidePopover()`) until the fade-out has finished, scheduled via a timeout derived
 * from the element's computed transition duration. In Chromium the native removal happens immediately because the
 * `overlay` + `allow-discrete` transition keeps the element on the `#top-layer` while it fades out.
 *
 * Both `requestShow` and `requestHide` are idempotent (guarded by `isShown`), so they can safely be called on every
 * render. State is scoped to the controller instance, so no shared registry is required.
 *
 * @param {TopLayerOptions} options - Element-specific hooks (show state, show/hide actions, element getter).
 * @returns {TopLayerController} The controller used to request show, request hide, and cancel.
 */
export const createTopLayerController = (options: TopLayerOptions): TopLayerController => {
  const { getElement, isShown, show, hide } = options;
  let hideTimer: ReturnType<typeof setTimeout> | undefined;

  const cancel = (): void => {
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = undefined;
    }
  };

  const requestShow = (): void => {
    cancel(); // cancel any pending deferred hide first, so re-opening during fade-out wins (element may still be shown)
    if (isShown()) {
      return; // `showModal()` / `showPopover()` throw if the element is already shown
    }
    show();
  };

  const requestHide = (): void => {
    if (!isShown()) {
      return; // already hidden (or a deferred hide already completed)
    }
    if (supportsOverlayTransition()) {
      hide(); // Chromium: `overlay` + `allow-discrete` keeps it on the #top-layer during the fade-out
    } else {
      // Safari/Firefox: keep it on the real #top-layer during the fade-out and hide once the transition has finished.
      cancel(); // drop any in-flight deferred hide before re-scheduling
      const element = getElement();
      const timeoutMs = (element ? getMaxTransitionDurationMs(element) : 0) + HIDE_BUFFER_MS;
      hideTimer = setTimeout(() => {
        cancel();
        if (isShown()) {
          hide();
        }
      }, timeoutMs);
    }
  };

  return { requestShow, requestHide, cancel };
};
