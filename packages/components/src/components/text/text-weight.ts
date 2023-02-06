// 'thin' is deprecated and will be mapped to 'regular'
// 'semibold' is deprecated and will be mapped to 'semi-bold'
export const TEXT_WEIGHTS = ['thin', 'regular', 'semibold', 'semi-bold', 'bold'] as const;
export type TextWeight = typeof TEXT_WEIGHTS[number];
