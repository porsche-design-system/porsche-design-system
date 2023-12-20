export const MODAL_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type ModalAriaAttribute = (typeof MODAL_ARIA_ATTRIBUTES)[number];

export const clickStartedInScrollbarTrack = (host: HTMLElement, e: MouseEvent): boolean => {
  const hasScrollbars = host.scrollHeight > host.offsetHeight;

  if (!hasScrollbars) {
    return false;
  } else {
    const hasOverlayScrollbars = host.scrollWidth === host.offsetWidth;
    return e.clientX > host.clientWidth - (hasOverlayScrollbars ? 17 : 0);
  }
};
