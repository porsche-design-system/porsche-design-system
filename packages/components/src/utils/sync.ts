import { forceUpdate } from '@stencil/core';

export const updateParent = (host: HTMLElement): void => {
  forceUpdate(host.parentElement);
};
