import { forceUpdate } from '@stencil/core';

export const updateChildren = (host: HTMLElement): void => {
  Array.from(host.children).forEach(forceUpdate);
};

export const updateParent = (host: HTMLElement): void => {
  forceUpdate(host.parentElement);
};
