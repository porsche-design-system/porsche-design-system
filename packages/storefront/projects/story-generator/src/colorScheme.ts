/** The color scheme classes a generated example document can be rendered in. */
export const COLOR_SCHEMES = ['scheme-light', 'scheme-dark', 'scheme-light-dark'] as const;
export type ColorScheme = (typeof COLOR_SCHEMES)[number];
