import type { EventEmitter } from '@stencil/core';

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
  motionHiddenEndEvent: EventEmitter
): void => {
  // Use property which has the longest duration and prevent multiple ontransitionend events for each property
  if (nativeEvent.propertyName === 'background-color') {
    // eslint-disable-next-line no-unused-expressions
    isOpen ? motionVisibleEndEvent.emit(nativeEvent) : motionHiddenEndEvent.emit(nativeEvent);
  }
};
