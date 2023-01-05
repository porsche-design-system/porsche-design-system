// TODO: add 'semi-bold'/'semiBold' and deprecate 'semibold', deprecate 'thin' and map to 'regular'
export const TEXT_WEIGHTS = ['thin', 'regular', 'semibold', 'bold'] as const;
export type TextWeight = typeof TEXT_WEIGHTS[number];
