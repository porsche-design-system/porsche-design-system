import {
  durationLg,
  durationMd,
  durationSm,
  durationXl,
  easeIn,
  easeInOut,
  easeOut,
} from '@porsche-design-system/tokens';
import { tailwindIdentifier } from '../deprecation';
import { prefix } from '../prefix';
import type { CssNode, TailwindCatalog } from '../types';

/** The documented duration scale. */
const durations = {
  sm: {
    property: '--transition-duration-sm',
    value: durationSm,
    classes: ['.duration-sm'],
    description: 'Applies a **short** `transition-duration`.',
  },
  md: {
    property: '--transition-duration-md',
    value: durationMd,
    classes: ['.duration-md'],
    description: 'Applies a **moderate** `transition-duration`.',
  },
  lg: {
    property: '--transition-duration-lg',
    value: durationLg,
    classes: ['.duration-lg'],
    description: 'Applies a **long** `transition-duration`.',
  },
  xl: {
    property: '--transition-duration-xl',
    value: durationXl,
    classes: ['.duration-xl'],
    description: 'Applies a **very long** `transition-duration`.',
  },
};

/** The documented easing scale. */
const eases = {
  inOut: {
    property: '--ease-in-out',
    value: easeInOut,
    classes: ['.ease-in-out'],
    description: 'Applies an **in-out** `transition-timing-function`.',
  },
  in: {
    property: '--ease-in',
    value: easeIn,
    classes: ['.ease-in'],
    description: 'Applies an **in** `transition-timing-function`.',
  },
  out: {
    property: '--ease-out',
    value: easeOut,
    classes: ['.ease-out'],
    description: 'Applies an **out** `transition-timing-function`.',
  },
};

/**
 * Motion declarations grouped like `tokensMeta` / the storefront API tables. Each deprecated alias
 * points at the corresponding canonical duration variable via the prefix helper so the values stay
 * in sync, and records it as the structured replacement.
 */
export const motion = {
  duration: {
    ...durations,
    short: {
      property: '--transition-duration-short',
      value: prefix(durations.sm.property),
      description: 'Applies a **short** `transition-duration`.',
      deprecation: { replacement: tailwindIdentifier(durations.sm) },
    },
    moderate: {
      property: '--transition-duration-moderate',
      value: prefix(durations.md.property),
      description: 'Applies a **moderate** `transition-duration`.',
      deprecation: { replacement: tailwindIdentifier(durations.md) },
    },
    long: {
      property: '--transition-duration-long',
      value: prefix(durations.lg.property),
      description: 'Applies a **long** `transition-duration`.',
      deprecation: { replacement: tailwindIdentifier(durations.lg) },
    },
    veryLong: {
      property: '--transition-duration-very-long',
      value: prefix(durations.xl.property),
      description: 'Applies a **very long** `transition-duration`.',
      deprecation: { replacement: tailwindIdentifier(durations.xl) },
    },
  },
  ease: eases,
} satisfies TailwindCatalog;

// Named references for plumbing that composes the real variable (e.g. the skeleton animation
// references these rather than re-deriving their property names).
export const durationXlThemeVariable = durations.xl;
export const easeInOutThemeVariable = eases.inOut;

// Motion — infrastructure defaults (no Tailwind utility classes). Non-documented CSS-only
// plumbing: not part of `tailwindMeta`, but interleaved into the `@theme` block by the CSS
// assembly in `css/index.ts`.
export const defaultTransitionTimingFunction: CssNode = {
  property: '--default-transition-timing-function',
  value: easeInOut,
};

export const defaultTransitionDuration: CssNode = {
  property: '--default-transition-duration',
  value: durationSm,
};
