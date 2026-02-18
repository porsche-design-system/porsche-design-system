import type { HeadingTag } from '../../utils';

export const ACCORDIONS_BACKGROUNDS = ['canvas', 'surface', 'frosted', 'none'] as const;
export type AccordionBackground = (typeof ACCORDIONS_BACKGROUNDS)[number];

export const ACCORDION_ALIGN_INDICATORS = ['start', 'end'] as const;
export type AccordionAlignIndicator = (typeof ACCORDION_ALIGN_INDICATORS)[number];

export type AccordionUpdateEventDetail = { open: boolean };

/** @deprecated */
export type AccordionHeadingTag = HeadingTag;
