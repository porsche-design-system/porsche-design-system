import { forceUpdate } from '@stencil/core';

export const updateParent = (host: HTMLElement): void => {
  forceUpdate(host.parentElement);
};

// Lets the parent re-match its `value` when an option receives its `value` after the parent already did the matching,
// e.g. when a framework sets the property after the element was connected.
export const dispatchInternalOptionValueChange = (host: HTMLElement): void => {
  host.dispatchEvent(new CustomEvent('internalOptionValueChange', { bubbles: true }));
};
