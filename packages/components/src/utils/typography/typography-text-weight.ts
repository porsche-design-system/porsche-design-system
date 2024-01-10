// 'thin' is deprecated and will be mapped to 'regular'
// 'semibold' is deprecated and will be mapped to 'semi-bold'
/** @deprecated */
export const TYPOGRAPHY_TEXT_WEIGHTS_DEPRECATED = ['thin', 'semibold'] as const;
/** @deprecated */
export type TypographyTextWeightDeprecated = (typeof TYPOGRAPHY_TEXT_WEIGHTS_DEPRECATED)[number];
export const TYPOGRAPHY_TEXT_WEIGHTS = ['regular', 'semi-bold', 'bold', ...TYPOGRAPHY_TEXT_WEIGHTS_DEPRECATED] as const;
export type TypographyTextWeight = (typeof TYPOGRAPHY_TEXT_WEIGHTS)[number];
