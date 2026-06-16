import {
  durationLg,
  durationMd,
  durationSm,
  durationXl,
  easeIn,
  easeInOut,
  easeOut,
} from '@porsche-design-system/tokens';
import type { TailwindThemeVariable } from './types';

// Motion — easing.
export const easeThemeVariables: TailwindThemeVariable[] = [
  {
    property: '--ease-in-out',
    value: easeInOut,
    classes: ['.ease-in-out'],
    description: 'Applies an **in-out** `transition-timing-function`.',
    group: 'motion',
  },
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

// Motion — duration.
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
  {
    property: '--transition-duration-xl',
    value: durationXl,
    classes: ['.duration-xl'],
    description: 'Applies a **very long** `transition-duration`.',
    group: 'motion',
  },
];

// Motion — infrastructure defaults (no Tailwind utility classes).
const defaultTransitionTimingFunction: TailwindThemeVariable = {
  property: '--default-transition-timing-function',
  value: easeInOut,
  description: 'Tailwind default `transition-timing-function` for the `transition-*` utilities.',
  group: 'motion',
};

const defaultTransitionDuration: TailwindThemeVariable = {
  property: '--default-transition-duration',
  value: durationSm,
  description: 'Tailwind default `transition-duration` for the `transition-*` utilities.',
  group: 'motion',
};

// Motion — deprecated aliases.
/** @deprecated Use `durationThemeVariables` (`--transition-duration-sm/md/lg/xl`) instead. */
export const motionDeprecatedThemeVariables: TailwindThemeVariable[] = [
  {
    property: '--transition-duration-short',
    value: '--theme(--transition-duration-sm)',
    comment: 'alias (deprecated)',
    description: 'Alias for `--transition-duration-sm`. **Deprecated** — use `--transition-duration-sm` instead.',
    group: 'motion',
  },
  {
    property: '--transition-duration-moderate',
    value: '--theme(--transition-duration-md)',
    comment: 'alias (deprecated)',
    description: 'Alias for `--transition-duration-md`. **Deprecated** — use `--transition-duration-md` instead.',
    group: 'motion',
  },
  {
    property: '--transition-duration-long',
    value: '--theme(--transition-duration-lg)',
    comment: 'alias (deprecated)',
    description: 'Alias for `--transition-duration-lg`. **Deprecated** — use `--transition-duration-lg` instead.',
    group: 'motion',
  },
  {
    property: '--transition-duration-very-long',
    value: '--theme(--transition-duration-xl)',
    comment: 'alias (deprecated)',
    description: 'Alias for `--transition-duration-xl`. **Deprecated** — use `--transition-duration-xl` instead.',
    group: 'motion',
  },
];

export const allMotionThemeVariables: TailwindThemeVariable[] = [
  defaultTransitionTimingFunction,
  ...easeThemeVariables,
  defaultTransitionDuration,
  ...durationThemeVariables,
  ...motionDeprecatedThemeVariables,
];
