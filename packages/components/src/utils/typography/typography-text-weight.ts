export const TYPOGRAPHY_TEXT_WEIGHTS = ['regular', 'semi-bold', 'bold'] as const;
export type TypographyTextWeight = (typeof TYPOGRAPHY_TEXT_WEIGHTS)[number];
