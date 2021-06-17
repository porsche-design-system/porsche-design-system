const ACCORDION_HEADER_SIZE = ['small', 'medium'] as const;
export type AccordionHeaderSize = typeof ACCORDION_HEADER_SIZE[number];
export type AccordionChangeEvent = { open: boolean };
