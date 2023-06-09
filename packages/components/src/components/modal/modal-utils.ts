import { getTagName } from '../../utils';
import type { SelectedAriaAttributes } from '../../types';

export const warnIfAriaAndHeadingPropsAreUndefined = (
  host: HTMLElement,
  heading: string,
  aria: SelectedAriaAttributes<ModalAriaAttribute>
): void => {
  // TODO: slotted heading doesn't count?
  if (!heading && !aria) {
    console.warn(
      `Either heading or aria attributes on ${getTagName(host)} have to be set in order to ensure accessibility.`
    );
  }
};

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
