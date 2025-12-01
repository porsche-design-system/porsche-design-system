import type { HeadingTag } from '../../types';

export const ACCORDION_SIZES = ['small', 'medium'] as const;
export type AccordionSize = (typeof ACCORDION_SIZES)[number];

export type AccordionUpdateEventDetail = { open: boolean };

export type AccordionHeadingTag = HeadingTag;
