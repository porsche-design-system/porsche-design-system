import { durationLg, durationMd, durationSm, durationXl, easeIn, easeInOut, easeOut } from '@porsche-design-system/tokens';
import { prefix } from '../prefix';
import type { CssNode, TailwindMeta } from '../types';

/**
 * Motion token variables grouped like `tokensMeta` / the storefront API tables: the `duration`s
 * and `ease`s (documented only — the infrastructure defaults and deprecated aliases below are
 * excluded). Access a single variable via its path, e.g. `motion.ease.inOut`.
 */
export const motion = {
  duration: {
    sm: {
      property: '--transition-duration-sm',
      value: durationSm,
      classes: ['.duration-sm'],
      description: 'Applies a **short** `transition-duration`.',
      group: 'motion',
    },
    md: {
      property: '--transition-duration-md',
      value: durationMd,
      classes: ['.duration-md'],
      description: 'Applies a **moderate** `transition-duration`.',
      group: 'motion',
    },
    lg: {
      property: '--transition-duration-lg',
      value: durationLg,
      classes: ['.duration-lg'],
      description: 'Applies a **long** `transition-duration`.',
      group: 'motion',
    },
    xl: {
      property: '--transition-duration-xl',
      value: durationXl,
      classes: ['.duration-xl'],
      description: 'Applies a **very long** `transition-duration`.',
      group: 'motion',
    },
  },
  ease: {
    inOut: {
      property: '--ease-in-out',
      value: easeInOut,
      classes: ['.ease-in-out'],
      description: 'Applies an **in-out** `transition-timing-function`.',
      group: 'motion',
    },
    in: {
      property: '--ease-in',
      value: easeIn,
      classes: ['.ease-in'],
      description: 'Applies an **in** `transition-timing-function`.',
      group: 'motion',
    },
    out: {
      property: '--ease-out',
      value: easeOut,
      classes: ['.ease-out'],
      description: 'Applies an **out** `transition-timing-function`.',
      group: 'motion',
    },
  },
} satisfies TailwindMeta['motion'];

// Named references for plumbing that composes the real variable (e.g. the skeleton animation
// references these rather than re-deriving their property names).
export const durationXlThemeVariable = motion.duration.xl;
export const easeInOutThemeVariable = motion.ease.inOut;

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

// Motion — deprecated aliases. Non-documented CSS-only plumbing. Each points at the corresponding
// canonical duration variable via the prefix helper so they stay in sync; the deprecation note
// lives in the rendered CSS `comment`.
/** @deprecated Use `motion.duration` (`--transition-duration-sm/md/lg/xl`) instead. */
export const motionDeprecatedThemeVariables: CssNode[] = [
  {
    property: '--transition-duration-short',
    value: prefix(motion.duration.sm.property),
    comment: 'alias (deprecated)',
  },
  {
    property: '--transition-duration-moderate',
    value: prefix(motion.duration.md.property),
    comment: 'alias (deprecated)',
  },
  {
    property: '--transition-duration-long',
    value: prefix(motion.duration.lg.property),
    comment: 'alias (deprecated)',
  },
  {
    property: '--transition-duration-very-long',
    value: prefix(motion.duration.xl.property),
    comment: 'alias (deprecated)',
  },
];
