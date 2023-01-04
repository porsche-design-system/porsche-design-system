// TODO: add 'semi-bold'/'semiBold' and deprecate 'semibold'
export const TEXT_WEIGHTS = ['thin', 'regular', 'semibold', 'bold'] as const;
export type TextWeight = typeof TEXT_WEIGHTS[number];
