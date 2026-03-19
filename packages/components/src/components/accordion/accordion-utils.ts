export const ACCORDIONS_BACKGROUNDS = ['canvas', 'surface', 'frosted', 'none'] as const;
export type AccordionBackground = (typeof ACCORDIONS_BACKGROUNDS)[number];

export const ACCORDION_ALIGN_MARKERS = ['start', 'end'] as const;
export type AccordionAlignMarker = (typeof ACCORDION_ALIGN_MARKERS)[number];

export type AccordionUpdateEventDetail = { open: boolean };

/** @deprecated */
export const ACCORDION_HEADINGS_DEPRECATED = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
/** @deprecated */
export type AccordionHeadingTag = (typeof ACCORDION_HEADINGS_DEPRECATED)[number];

export const ACCORDION_SIZES = ['small', 'medium'] as const;
/** @deprecated */
export type AccordionSize = (typeof ACCORDION_SIZES)[number];
