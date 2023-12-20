export const HEADING_SIZES = ['small', 'medium', 'large', 'x-large', 'xx-large', 'inherit'] as const;
export type HeadingSize = (typeof HEADING_SIZES)[number];
