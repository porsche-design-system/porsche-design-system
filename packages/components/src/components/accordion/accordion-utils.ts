export const ACCORDIONS_BACKGROUNDS = ['canvas', 'frosted', 'none'] as const;
export type AccordionBackground = (typeof ACCORDIONS_BACKGROUNDS)[number];

export const ACCORDION_ALIGN_ICONS = ['start', 'end'] as const;
export type AccordionAlignIcon = (typeof ACCORDION_ALIGN_ICONS)[number];

export type AccordionUpdateEventDetail = { open: boolean };
