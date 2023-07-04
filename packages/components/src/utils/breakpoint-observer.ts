import { breakpoint } from '@porsche-design-system/utilities-v2';
import { hasWindow } from './has-window';

export const mediaQueries = Object.values(breakpoint).map((v) => `(min-width:${v}px)`);

export let mediaQueryLists = hasWindow && window.matchMedia ? mediaQueries.map(window.matchMedia) : [];

// for unit tests
export const overrideMediaQueryLists = (override: MediaQueryList[]): void => {
  mediaQueryLists = override;
};

export const breakpointChangeCallbackMap: Map<HTMLElement, () => void> = new Map();

export const observeBreakpointChange = (node: HTMLElement, callback: () => void): void => {
  // node might not be defined in connectedCallback
  if (node) {
    if (breakpointChangeCallbackMap.size === 0) {
      mediaQueryLists.forEach((mediaQueryList) => {
        // matchmedia-polyfill only implements addListener in jsdom-polyfill
        mediaQueryList.addEventListener?.('change', handleBreakpointChange);
      });
    }
    breakpointChangeCallbackMap.set(node, callback);
  }
};

export const unobserveBreakpointChange = (node: HTMLElement): void => {
  breakpointChangeCallbackMap.delete(node);
  if (breakpointChangeCallbackMap.size === 0) {
    mediaQueryLists.forEach((mediaQueryList) => {
      // matchmedia-polyfill only implements removeListener in jsdom-polyfill
      mediaQueryList.removeEventListener?.('change', handleBreakpointChange);
    });
  }
};

export const handleBreakpointChange = (): void => {
  breakpointChangeCallbackMap.forEach((breakpointChangeCallback) => {
    breakpointChangeCallback();
  });
};
