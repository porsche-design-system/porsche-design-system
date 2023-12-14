// 'thin' is deprecated and will be mapped to 'regular'
// 'semibold' is deprecated and will be mapped to 'semi-bold'
/** @deprecated */
export const TEXT_WEIGHTS_DEPRECATED = ['thin', 'semibold'] as const;
/** @deprecated */
export type TextWeightDeprecated = (typeof TEXT_WEIGHTS_DEPRECATED)[number];
export const TEXT_WEIGHTS = ['regular', 'semi-bold', 'bold', ...TEXT_WEIGHTS_DEPRECATED] as const;
export type TextWeight = (typeof TEXT_WEIGHTS)[number];
