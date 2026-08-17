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
import type { DeprecatedScssVariable, ScssMeta } from '../types';

/** Motion token variables, keyed by size (`duration`) / variant (`ease`). Entries are addressable, e.g. `motion.duration.xl`. */
export const motion = {
  duration: {
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
  },
  ease: {
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
  },
} satisfies ScssMeta['motion'];

/** Deprecated `$pds-motion-*` aliases of the documented duration and easing scales. */
export const motionDeprecations = {
  durationLong: {
    name: '$pds-motion-duration-long',
    value: durationLg,
    deprecation: { replacement: scssIdentifier(motion.duration.lg) },
  },
  durationModerate: {
    name: '$pds-motion-duration-moderate',
    value: durationMd,
    deprecation: { replacement: scssIdentifier(motion.duration.md) },
  },
  durationShort: {
    name: '$pds-motion-duration-short',
    value: durationSm,
    deprecation: { replacement: scssIdentifier(motion.duration.sm) },
  },
  durationVeryLong: {
    name: '$pds-motion-duration-very-long',
    value: durationXlToken,
    deprecation: { replacement: scssIdentifier(motion.duration.xl) },
  },
  easingBase: {
    name: '$pds-motion-easing-base',
    value: easeInOutToken,
    deprecation: { replacement: scssIdentifier(motion.ease.inOut) },
  },
  easingIn: {
    name: '$pds-motion-easing-in',
    value: easeIn,
    deprecation: { replacement: scssIdentifier(motion.ease.in) },
  },
  easingOut: {
    name: '$pds-motion-easing-out',
    value: easeOut,
    deprecation: { replacement: scssIdentifier(motion.ease.out) },
  },
} satisfies Record<string, DeprecatedScssVariable>;
