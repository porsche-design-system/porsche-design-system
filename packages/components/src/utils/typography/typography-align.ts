export const TYPOGRAPHY_ALIGNS = ['start', 'center', 'end', 'inherit'] as const;
export type TypographyAlign = (typeof TYPOGRAPHY_ALIGNS)[number];
