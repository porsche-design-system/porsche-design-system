export const BUTTON_TYPES = ['button', 'submit', 'reset'] as const;
export type ButtonType = typeof BUTTON_TYPES[number];
