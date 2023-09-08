export const THEMES = ['light', 'dark', 'auto'] as const;
export type Theme = (typeof THEMES)[number];
