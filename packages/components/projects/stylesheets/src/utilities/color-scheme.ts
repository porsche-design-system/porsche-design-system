import type { ColorCssVariableMeta, ColorSchemeClassMeta, CssDeclaration, CssRule } from '../types';

// Utility classes controlling the CSS `color-scheme` property — documented `utility` leaves of the
// meta catalog. Emitted into `color-scheme.css`, which also contains the `light-dark()` polyfill
// generated from the theme-aware color variables (see `colorSchemePolyfillCssRule`).
export const colorScheme = [
  {
    selector: '.scheme-normal',
    declarations: [{ property: 'color-scheme', value: 'normal' }],
    usage: 'Set class="scheme-normal" on the html element or any container.',
    description:
      "Sets `color-scheme: normal`. The element isn't rendered with any color scheme at all — the browser default applies.",
  },
  {
    selector: '.scheme-dark',
    declarations: [{ property: 'color-scheme', value: 'dark' }],
    usage: 'Set class="scheme-dark" on the html element or any container.',
    description: 'Sets `color-scheme: dark`. Indicates the element supports only the dark color scheme.',
  },
  {
    selector: '.scheme-light',
    declarations: [{ property: 'color-scheme', value: 'light' }],
    usage: 'Set class="scheme-light" on the html element or any container.',
    description: 'Sets `color-scheme: light`. Indicates the element supports only the light color scheme.',
  },
  {
    selector: '.scheme-light-dark',
    declarations: [{ property: 'color-scheme', value: 'light dark' }],
    usage: 'Set class="scheme-light-dark" on the html element or any container.',
    description:
      'Sets `color-scheme: light dark`. Indicates the element supports both light and dark, chosen by user preference.',
  },
  {
    selector: '.scheme-only-dark',
    declarations: [{ property: 'color-scheme', value: 'only dark' }],
    usage: 'Set class="scheme-only-dark" on the html element or any container.',
    description:
      'Sets `color-scheme: only dark`. Forces the dark color scheme and prevents the browser from overriding it.',
  },
  {
    selector: '.scheme-only-light',
    declarations: [{ property: 'color-scheme', value: 'only light' }],
    usage: 'Set class="scheme-only-light" on the html element or any container.',
    description:
      'Sets `color-scheme: only light`. Forces the light color scheme and prevents the browser from overriding it.',
  },
] satisfies ColorSchemeClassMeta[];

// Maps the theme-aware color variables to their explicit light or dark values,
// consumed by the `light-dark()` polyfill below.
const toColorDeclarations = (
  colorVariables: ColorCssVariableMeta[],
  variant: 'valueLight' | 'valueDark'
): CssDeclaration[] => colorVariables.map((leaf) => ({ property: leaf.property, value: leaf[variant] }));

/**
 * Builds the `@supports not (color: light-dark(…))` polyfill rule that maps the
 * theme-aware color variables to explicit light/dark values per color-scheme class.
 */
export const colorSchemePolyfillCssRule = (colorVariables: ColorCssVariableMeta[]): CssRule => {
  const lightDeclarations = toColorDeclarations(colorVariables, 'valueLight');
  const darkDeclarations = toColorDeclarations(colorVariables, 'valueDark');

  return {
    selector: '@supports not (color: light-dark(white, black))',
    declarations: [
      {
        selector: ':root, .scheme-light, .scheme-only-light, .scheme-normal, .scheme-light-dark',
        declarations: lightDeclarations,
      },
      {
        selector: '.scheme-dark, .scheme-only-dark',
        declarations: darkDeclarations,
      },
      {
        selector: '@media (prefers-color-scheme: dark)',
        declarations: [{ selector: '.scheme-light-dark', declarations: darkDeclarations }],
      },
    ],
  };
};
