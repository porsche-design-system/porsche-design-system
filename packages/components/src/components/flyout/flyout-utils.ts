// 'left' is deprecated and will be mapped to 'start'
// 'right' is deprecated and will be mapped to 'end'

/** @deprecated */
export const FLYOUT_POSITIONS_DEPRECATED = ['left', 'right'] as const;
/** @deprecated */
export type FlyoutPositionDeprecated = (typeof FLYOUT_POSITIONS_DEPRECATED)[number];

export const FLYOUT_POSITIONS = ['start', 'end', ...FLYOUT_POSITIONS_DEPRECATED] as const;
export type FlyoutPosition = (typeof FLYOUT_POSITIONS)[number];

export const FLYOUT_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type FlyoutAriaAttribute = (typeof FLYOUT_ARIA_ATTRIBUTES)[number];

export type StickyTopCssVarState = { ro: ResizeObserver; sheet: CSSStyleSheet } | undefined;
export let stickyTopCssVarState: StickyTopCssVarState;

export const handleUpdateStickyTopCssVar = (host: HTMLElement, hasHeader: boolean, header: HTMLElement) => {
  if (hasHeader && !stickyTopCssVarState) {
    stickyTopCssVarState = addUpdateStickyTopCssVar(host, header);
  }
  if (!hasHeader && stickyTopCssVarState) {
    removeUpdateStickyTopCssVar(host, stickyTopCssVarState);
    stickyTopCssVarState = undefined;
  }
};

export const addUpdateStickyTopCssVar = (host: HTMLElement, header: HTMLElement): StickyTopCssVarState => {
  const sheet = new CSSStyleSheet();
  // TODO: for some reason unit test in Docker environment throws TS2339: Property 'push' does not exist on type 'readonly CSSStyleSheet[]'
  /* eslint-disable @typescript-eslint/prefer-ts-expect-error, @typescript-eslint/ban-ts-comment */
  // @ts-ignore
  host.shadowRoot.adoptedStyleSheets.push(sheet);

  const ro = new ResizeObserver((entries) => {
    for (const entry of entries) {
      // EXPERIMENTAL CSS variable
      sheet.replaceSync(`:host{--p-flyout-sticky-top:${Math.ceil(entry.target.getBoundingClientRect().height)}px}`);
    }
  });
  ro.observe(header);

  return { ro, sheet };
};

export const removeUpdateStickyTopCssVar = (host: HTMLElement, state: StickyTopCssVarState): void => {
  state.ro.disconnect(); // Remove resize observer
  const sheetIndex = host.shadowRoot.adoptedStyleSheets.indexOf(state.sheet);
  if (sheetIndex !== -1) {
    host.shadowRoot.adoptedStyleSheets.splice(sheetIndex, 1);
  }
};
