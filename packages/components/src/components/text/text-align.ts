// 'left' is deprecated and will be mapped to 'start'
// 'right' is deprecated and will be mapped to 'end'
/** @deprecated */
export const TEXT_ALIGNS_DEPRECATED = ['left', 'right'] as const;
/** @deprecated */
export type TextAlignDeprecated = (typeof TEXT_ALIGNS_DEPRECATED)[number];
export const TEXT_ALIGNS = ['start', 'center', 'end', ...TEXT_ALIGNS_DEPRECATED] as const;
export type TextAlign = (typeof TEXT_ALIGNS)[number];
