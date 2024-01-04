import type { HeadingTag } from '../heading/heading-tag';

export const ACCORDION_SIZES = ['small', 'medium'] as const;
export type AccordionSize = (typeof ACCORDION_SIZES)[number];

/** @deprecated */
export type AccordionUpdateEvent = AccordionUpdateEventDetail;
export type AccordionUpdateEventDetail = { open: boolean };

export type AccordionTag = HeadingTag;
