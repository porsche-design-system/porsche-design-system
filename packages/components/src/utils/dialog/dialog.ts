import type { EventEmitter } from '@stencil/core';

// Shared by `p-modal`, `p-flyout`, `p-sheet` and `p-drilldown` so their `dismiss` payloads cannot diverge. All four
// render the same `DialogBase` and therefore have the same three dismissal paths. `p-popover` declares its own union
// instead: it has no backdrop, it closes via its own trigger rather than a dedicated dismiss button, and it adds a
// keyboard-only path when focus tabs out of the panel.
export type DialogDismissReason = 'dismiss-button' | 'backdrop' | 'escape';
export type DialogDismissEventDetail = { reason: DialogDismissReason };

export const showDialog = (dialog: HTMLDialogElement, scrollArea: HTMLElement): void => {
  // Must only be called when the dialog isn't already open and after the render cycle has finished (e.g. in
  // `componentDidRender()`), so visibility states are ready and the dismiss button can be focused correctly.
  // The "only when not already open" precondition is guaranteed by the caller (`createTopLayerController`'s `requestShow`
  // guards with `!isShown()`), since `showModal()` throws if the dialog is already open.
  scrollArea.scrollTo(0, 0); // reset scroll position each time dialog gets opened again
  dialog.inert = true; // This will prevent the autofocus of focusable elements inside the dialog (e.g. close button) element which is conflicting with our transition
  dialog.showModal(); // shows modal on `#top-layer`
  dialog.inert = false; // Re-enable focus on dialog element
  dialog.focus(); // set focus programmatically to dialog element to prevent transition bug in Safari
};

// Callers map this to the `escape` dismiss reason, which only holds because we never set `closedby`. With
// `closedby="any"` the native `cancel` fires for outside clicks too, indistinguishably, so they would be reported as
// `escape` and no test would catch it. Backdrop clicks are detected separately via `isDialogBackdropTarget`.
export const onCancelDialog = (e: Event, cb: () => void, disable = false): void => {
  e.preventDefault(); // prevent closing the dialog uncontrolled by ESC
  if (!disable) {
    cb();
  }
};

// A click/press lands on the backdrop when its target is the `<dialog>` element itself or the `.scroller` wrapper
// (both cover the area around the panel). Any deeper target means the interaction happened inside the panel content.
export const isDialogBackdropTarget = (e: Event): boolean => {
  const target = (e as Event & { target: HTMLElement }).target;
  return target.className === 'scroller' || target.tagName === 'DIALOG';
};

export const onClickDialog = (e: MouseEvent, cb: () => void, disable: boolean, isPointerDownInside = false): void => {
  // Skip dismissal when the pointer gesture *started* inside the panel (e.g. a text selection dragged out and released
  // on the backdrop). A `click` only fires on the nearest common ancestor of `mousedown`/`mouseup`, so such a gesture
  // retargets the resulting `click` to the backdrop and would otherwise wrongly dismiss. Mirrors `p-popover`.
  if (!disable && !isPointerDownInside && isDialogBackdropTarget(e)) {
    cb(); // dismiss dialog when clicked on backdrop
  }
};

export const onTransitionEnd = (
  nativeEvent: TransitionEvent,
  isOpen: boolean,
  motionVisibleEndEvent: EventEmitter,
  motionHiddenEndEvent: EventEmitter
): void => {
  // Use property which has the longest duration and prevent multiple ontransitionend events for each property
  if (nativeEvent.propertyName === 'background-color') {
    isOpen ? motionVisibleEndEvent.emit(nativeEvent) : motionHiddenEndEvent.emit(nativeEvent);
  }
};
