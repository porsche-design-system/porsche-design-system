// 'left' is deprecated and will be mapped to 'start'
// 'right' is deprecated and will be mapped to 'end'
/** @deprecated */
export const TYPOGRAPHY_ALIGNS_DEPRECATED = ['left', 'right'] as const;
/** @deprecated */
export type TypographyAlignDeprecated = (typeof TYPOGRAPHY_ALIGNS_DEPRECATED)[number];
export const TYPOGRAPHY_ALIGNS = ['start', 'center', 'end', ...TYPOGRAPHY_ALIGNS_DEPRECATED] as const;
export type TypographyAlign = (typeof TYPOGRAPHY_ALIGNS)[number];
