import {
  durationLg,
  durationMd,
  durationSm,
  durationXl,
  easeIn,
  easeInOut,
  easeOut,
} from '@porsche-design-system/tokens';
import { prefix } from '../prefix';
import type { CssNode, TailwindThemeVariable } from '../types';

// Motion — easing. `easeInOut` is named on its own because it is referenced elsewhere (e.g. the
// skeleton animation composes the real variable rather than re-deriving its property name).
export const easeInOutThemeVariable: TailwindThemeVariable = {
  property: '--ease-in-out',
  value: easeInOut,
  classes: ['.ease-in-out'],
  description: 'Applies an **in-out** `transition-timing-function`.',
  group: 'motion',
};

export const easeThemeVariables: TailwindThemeVariable[] = [
  easeInOutThemeVariable,
  {
    property: '--ease-in',
    value: easeIn,
    classes: ['.ease-in'],
    description: 'Applies an **in** `transition-timing-function`.',
    group: 'motion',
  },
  {
    property: '--ease-out',
    value: easeOut,
    classes: ['.ease-out'],
    description: 'Applies an **out** `transition-timing-function`.',
    group: 'motion',
  },
];

// Motion — duration. `durationXl` is named on its own because it is referenced elsewhere (e.g. the
// skeleton animation composes the real variable rather than re-deriving its property name).
export const durationXlThemeVariable: TailwindThemeVariable = {
  property: '--transition-duration-xl',
  value: durationXl,
  classes: ['.duration-xl'],
  description: 'Applies a **very long** `transition-duration`.',
  group: 'motion',
};

export const durationThemeVariables: TailwindThemeVariable[] = [
  {
    property: '--transition-duration-sm',
    value: durationSm,
    classes: ['.duration-sm'],
    description: 'Applies a **short** `transition-duration`.',
    group: 'motion',
  },
  {
    property: '--transition-duration-md',
    value: durationMd,
    classes: ['.duration-md'],
    description: 'Applies a **moderate** `transition-duration`.',
    group: 'motion',
  },
  {
    property: '--transition-duration-lg',
    value: durationLg,
    classes: ['.duration-lg'],
    description: 'Applies a **long** `transition-duration`.',
    group: 'motion',
  },
  durationXlThemeVariable,
];

// Motion — infrastructure defaults (no Tailwind utility classes). Non-documented CSS-only
// plumbing: not part of `tailwindMeta`, but interleaved into the `@theme` block by the CSS
// assembly in `css.ts`.
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
const [durationSmVariable, durationMdVariable, durationLgVariable] = durationThemeVariables;
/** @deprecated Use `durationThemeVariables` (`--transition-duration-sm/md/lg/xl`) instead. */
export const motionDeprecatedThemeVariables: CssNode[] = [
  {
    property: '--transition-duration-short',
    value: prefix(durationSmVariable.property),
    comment: 'alias (deprecated)',
  },
  {
    property: '--transition-duration-moderate',
    value: prefix(durationMdVariable.property),
    comment: 'alias (deprecated)',
  },
  {
    property: '--transition-duration-long',
    value: prefix(durationLgVariable.property),
    comment: 'alias (deprecated)',
  },
  {
    property: '--transition-duration-very-long',
    value: prefix(durationXlThemeVariable.property),
    comment: 'alias (deprecated)',
  },
];

/**
 * Motion theme variables grouped exactly like the storefront API tables /
 * `tailwindMeta.motion`: the `duration`s and `easing`s (documented only — the
 * infrastructure defaults and deprecated aliases are excluded).
 */
export const motion = {
  duration: durationThemeVariables,
  easing: easeThemeVariables,
};
