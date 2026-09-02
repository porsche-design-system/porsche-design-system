import {
  durationLg,
  durationMd,
  durationSm,
  durationXl as durationXlToken,
  easeIn,
  easeInOut as easeInOutToken,
  easeOut,
} from '@porsche-design-system/tokens';
import { scssIdentifier } from '../deprecation';
import type { ScssCatalog } from '../types';

/** The documented duration scale. */
const duration = {
  sm: {
    name: '$duration-sm',
    value: durationSm,
    description: 'Holds a **short** `transition-duration` / `animation-duration`.',
  },
  md: {
    name: '$duration-md',
    value: durationMd,
    description: 'Holds a **moderate** `transition-duration` / `animation-duration`.',
  },
  lg: {
    name: '$duration-lg',
    value: durationLg,
    description: 'Holds a **long** `transition-duration` / `animation-duration`.',
  },
  xl: {
    name: '$duration-xl',
    value: durationXlToken,
    description: 'Holds a **very long** `transition-duration` / `animation-duration`.',
  },
};

/** The documented easing scale. */
const ease = {
  inOut: {
    name: '$ease-in-out',
    value: easeInOutToken,
    description: 'Holds an **in-out** `transition-timing-function`.',
  },
  in: {
    name: '$ease-in',
    value: easeIn,
    description: 'Holds an **in** `transition-timing-function`.',
  },
  out: {
    name: '$ease-out',
    value: easeOut,
    description: 'Holds an **out** `transition-timing-function`.',
  },
};

/** Motion declarations, keyed by size (`duration`) / variant (`ease`), plus the deprecated `$pds-motion-*` aliases beside their replacements. */
export const motion = {
  duration: {
    ...duration,
    short: {
      name: '$pds-motion-duration-short',
      value: durationSm,
      description: 'Holds a **short** `transition-duration` / `animation-duration`.',
      deprecation: { replacement: scssIdentifier(duration.sm) },
    },
    moderate: {
      name: '$pds-motion-duration-moderate',
      value: durationMd,
      description: 'Holds a **moderate** `transition-duration` / `animation-duration`.',
      deprecation: { replacement: scssIdentifier(duration.md) },
    },
    long: {
      name: '$pds-motion-duration-long',
      value: durationLg,
      description: 'Holds a **long** `transition-duration` / `animation-duration`.',
      deprecation: { replacement: scssIdentifier(duration.lg) },
    },
    veryLong: {
      name: '$pds-motion-duration-very-long',
      value: durationXlToken,
      description: 'Holds a **very long** `transition-duration` / `animation-duration`.',
      deprecation: { replacement: scssIdentifier(duration.xl) },
    },
  },
  ease: {
    ...ease,
    easingBase: {
      name: '$pds-motion-easing-base',
      value: easeInOutToken,
      description: 'Holds an **in-out** `transition-timing-function`.',
      deprecation: { replacement: scssIdentifier(ease.inOut) },
    },
    easingIn: {
      name: '$pds-motion-easing-in',
      value: easeIn,
      description: 'Holds an **in** `transition-timing-function`.',
      deprecation: { replacement: scssIdentifier(ease.in) },
    },
    easingOut: {
      name: '$pds-motion-easing-out',
      value: easeOut,
      description: 'Holds an **out** `transition-timing-function`.',
      deprecation: { replacement: scssIdentifier(ease.out) },
    },
  },
} satisfies ScssCatalog;
