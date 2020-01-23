export function hasShadowDom(el: HTMLElement) {
  return !!el.shadowRoot && !!(el as any).attachShadow;
}
