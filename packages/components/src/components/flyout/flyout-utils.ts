// 'left' is deprecated and will be mapped to 'start'
// 'right' is deprecated and will be mapped to 'end'

import { getHasConstructableStylesheetSupport } from '../../utils';

/** @deprecated */
export const FLYOUT_POSITIONS_DEPRECATED = ['left', 'right'] as const;
/** @deprecated */
export type FlyoutPositionDeprecated = (typeof FLYOUT_POSITIONS_DEPRECATED)[number];

export const FLYOUT_POSITIONS = ['start', 'end', ...FLYOUT_POSITIONS_DEPRECATED] as const;
export type FlyoutPosition = (typeof FLYOUT_POSITIONS)[number];

export const FLYOUT_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type FlyoutAriaAttribute = (typeof FLYOUT_ARIA_ATTRIBUTES)[number];

export type FlyoutMotionVisibleEndEventDetail = TransitionEvent;
export type FlyoutMotionHiddenEndEventDetail = TransitionEvent;

/**
 * Map of flyout instances and their corresponding resize observers to update the experimental css property --p-flyout-sticky-top.
 */
export const stickyTopCssVarResizeObserverMap = new Map<HTMLElement, ResizeObserver>();
/**
 * Map of flyout instances and their corresponding css stylesheets including the experimental css property --p-flyout-sticky-top.
 */
export const stickyTopCssVarStyleSheetMap = new Map<HTMLElement, CSSStyleSheet>();

// Called once in didLoad for setup
export const addStickyTopCssVarStyleSheet = (host: HTMLElement): void => {
  if (getHasConstructableStylesheetSupport()) {
    stickyTopCssVarStyleSheetMap.set(host, new CSSStyleSheet());
    // It's very important to create and push the stylesheet after `attachComponentCss()` has been called, otherwise styles might replace each other.
    // TODO: for some reason unit test in Docker environment throws TS2339: Property 'push' does not exist on type 'readonly CSSStyleSheet[]'
    /* eslint-disable @typescript-eslint/prefer-ts-expect-error, @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    host.shadowRoot.adoptedStyleSheets.push(stickyTopCssVarStyleSheetMap.get(host));
    updateStickyTopCssVarStyleSheet(host, 0);
  }
};

// Called whenever component updates
export const handleUpdateStickyTopCssVar = (host: HTMLElement, hasHeader: boolean, header: HTMLElement): void => {
  if (getHasConstructableStylesheetSupport()) {
    // Create resize observer if none exists but is needed (State changes from !hasHeader -> hasHeader or initially)
    if (hasHeader && !stickyTopCssVarResizeObserverMap.has(host)) {
      stickyTopCssVarResizeObserverMap.set(host, getStickyTopResizeObserver(host));
      stickyTopCssVarResizeObserverMap.get(host).observe(header);
    }
    // Remove resize observer if one exists but isn't needed anymore (State changes from hasHeader -> !hasHeader)
    else if (!hasHeader && stickyTopCssVarResizeObserverMap.has(host)) {
      updateStickyTopCssVarStyleSheet(host, 0);
      stickyTopCssVarResizeObserverMap.get(host).disconnect();
      stickyTopCssVarResizeObserverMap.delete(host);
    }
  }
};

export const updateStickyTopCssVarStyleSheet = (host: HTMLElement, value: number): void => {
  // EXPERIMENTAL CSS variable
  stickyTopCssVarStyleSheetMap.get(host).replaceSync(`:host{--p-flyout-sticky-top:${value}px}`);
};

export const getStickyTopResizeObserver = (host: HTMLElement): ResizeObserver => {
  return new ResizeObserver((entries) => {
    for (const entry of entries) {
      updateStickyTopCssVarStyleSheet(host, Math.floor(entry.target.getBoundingClientRect().height));
    }
  });
};
