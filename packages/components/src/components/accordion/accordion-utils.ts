import type { HeadingTag } from '../heading/heading-tag';

export const ACCORDION_SIZES = ['small', 'medium'] as const;
export type AccordionSize = (typeof ACCORDION_SIZES)[number];

/** @deprecated */
export type AccordionUpdateEvent = { open: boolean };
export type AccordionUpdateEventDetail = AccordionUpdateEvent;

export type AccordionTag = HeadingTag;
