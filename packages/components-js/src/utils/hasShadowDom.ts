export const hasShadowDom = (el: HTMLElement): boolean => !!el.shadowRoot && !!(el as any).attachShadow;
