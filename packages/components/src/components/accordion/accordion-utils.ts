import type { HeadingTag } from '../../utils';

export const ACCORDIONS_BACKGROUNDS = ['canvas', 'surface', 'frosted', 'none'] as const;
export type AccordionBackground = (typeof ACCORDIONS_BACKGROUNDS)[number];

export const ACCORDION_ALIGN_MARKERS = ['start', 'end'] as const;
export type AccordionAlignMarker = (typeof ACCORDION_ALIGN_MARKERS)[number];

export type AccordionUpdateEventDetail = { open: boolean };

/** @deprecated */
export type AccordionHeadingTag = HeadingTag;

export const ACCORDION_SIZES = ['small', 'medium'] as const;
/** @deprecated */
export type AccordionSize = (typeof ACCORDION_SIZES)[number];
