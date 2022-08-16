import { breakpoint } from '@porsche-design-system/utilities-v2';
import type { Breakpoint } from '@porsche-design-system/utilities-v2';

export const mediaQueries = Object.entries(breakpoint)
  .filter(([key]: [Breakpoint, string]) => key !== 'xxl')
  .map(([, val]) => `(min-width:${val})`);

export let mediaQueryLists = mediaQueries.map(window.matchMedia);

// for unit tests
// TODO: check tree shaking
export const overrideMediaQueryLists = (override: MediaQueryList[]): void => {
  mediaQueryLists = override;
};

export const breakpointChangeCallbackMap: Map<HTMLElement, () => void> = new Map();

export const observeBreakpointChange = (node: HTMLElement, callback: () => void): void => {
  // node might not be defined in connectedCallback
  if (node) {
    if (breakpointChangeCallbackMap.size === 0) {
      mediaQueryLists.forEach((mediaQueryList) => {
        mediaQueryList.addEventListener('change', handleBreakpointChange);
      });
    }
    breakpointChangeCallbackMap.set(node, callback);
  }
};

export const unobserveBreakpointChange = (node: HTMLElement): void => {
  breakpointChangeCallbackMap.delete(node);
  if (breakpointChangeCallbackMap.size === 0) {
    mediaQueryLists.forEach((mediaQueryList) => {
      mediaQueryList.removeEventListener('change', handleBreakpointChange);
    });
  }
};

export const handleBreakpointChange = (): void => {
  breakpointChangeCallbackMap.forEach((breakpointChangeCallback) => {
    breakpointChangeCallback();
  });
};
