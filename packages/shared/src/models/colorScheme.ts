/**
 * The color schemes a page or an example can be switched between, as the utility classes PDS offers for them
 * (`.scheme-light`, … in the stylesheets and every styling solution). The Storefront, the generated examples and the
 * preview apps of the packages read them from here instead of listing them again.
 */

export const COLOR_SCHEMES = ['scheme-light', 'scheme-dark', 'scheme-light-dark'] as const;
export type ColorScheme = (typeof COLOR_SCHEMES)[number];

export const isColorScheme = (value: unknown): value is ColorScheme => COLOR_SCHEMES.includes(value as ColorScheme);

export const colorSchemeNameMap = {
  'scheme-light': 'Light',
  'scheme-dark': 'Dark',
  'scheme-light-dark': 'Light Dark',
} as const satisfies Record<ColorScheme, string>;
