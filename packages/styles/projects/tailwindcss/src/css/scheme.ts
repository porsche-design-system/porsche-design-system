import { colorDarkVars, colorLightVars } from '../theme/color';
import type { CssRule } from '../types';

// The `@layer base` fallback applied for browsers without `light-dark()` support.
// Defaults every dynamic color variable to its light-scheme value.
export const schemeRootFallback: CssRule = {
  selector: '@layer base',
  declarations: [
    {
      raw: `/*
    Fallback for browsers without light-dark() support.
    The :root rule provides defaults; the @utility scheme-* blocks below
    handle per-scheme overrides via class selectors. Defining them as utilities
    (instead of plain class selectors) ensures Tailwind applies its configured
    prefix (e.g. tw:scheme-dark).
  */`,
    },
    {
      selector: '@supports not (color: light-dark(white, black))',
      declarations: [
        {
          selector: ':root, :host',
          declarations: colorLightVars,
        },
      ],
    },
  ],
};

// The documented `scheme-*` utilities. Defining them as `@utility` blocks (instead
// of plain class selectors) ensures Tailwind applies its configured prefix
// (e.g. `tw:scheme-dark`). Each block guards its declarations behind
// `@supports not (light-dark())` so they only apply as a fallback, deriving the
// values from the structured {@link colorLightVars} / {@link colorDarkVars} single source.
export const schemeUtilities: CssRule[] = [
  {
    selector: '@utility scheme-light',
    declarations: [
      {
        selector: '@supports not (color: light-dark(white, black))',
        declarations: colorLightVars,
      },
    ],
  },
  {
    selector: '@utility scheme-only-light',
    declarations: [
      {
        selector: '@supports not (color: light-dark(white, black))',
        declarations: colorLightVars,
      },
    ],
  },
  {
    selector: '@utility scheme-normal',
    declarations: [
      {
        selector: '@supports not (color: light-dark(white, black))',
        declarations: colorLightVars,
      },
    ],
  },
  {
    selector: '@utility scheme-dark',
    declarations: [
      {
        selector: '@supports not (color: light-dark(white, black))',
        declarations: colorDarkVars,
      },
    ],
  },
  {
    selector: '@utility scheme-only-dark',
    declarations: [
      {
        selector: '@supports not (color: light-dark(white, black))',
        declarations: colorDarkVars,
      },
    ],
  },
  {
    selector: '@utility scheme-light-dark',
    declarations: [
      {
        selector: '@supports not (color: light-dark(white, black))',
        declarations: [
          ...colorLightVars,
          {
            selector: '@media (prefers-color-scheme: dark)',
            declarations: colorDarkVars,
          },
        ],
      },
    ],
  },
];
