import {
  durationLg,
  durationMd,
  durationSm,
  durationXl as durationXlToken,
  easeIn,
  easeInOut as easeInOutToken,
  easeOut,
} from '@porsche-design-system/tokens';
import type { ScssMeta, ScssRaw } from '../types';

/** Motion token variables, keyed by size (`duration`) / variant (`ease`). Entries are addressable, e.g. `motion.duration.xl`. */
export const motion = {
  duration: {
    sm: {
      name: '$duration-sm',
      value: durationSm,
      description: 'Holds a **short** `transition-duration` / `animation-duration`.',
      group: 'motion',
    },
    md: {
      name: '$duration-md',
      value: durationMd,
      description: 'Holds a **moderate** `transition-duration` / `animation-duration`.',
      group: 'motion',
    },
    lg: {
      name: '$duration-lg',
      value: durationLg,
      description: 'Holds a **long** `transition-duration` / `animation-duration`.',
      group: 'motion',
    },
    xl: {
      name: '$duration-xl',
      value: durationXlToken,
      description: 'Holds a **very long** `transition-duration` / `animation-duration`.',
      group: 'motion',
    },
  },
  ease: {
    inOut: {
      name: '$ease-in-out',
      value: easeInOutToken,
      description: 'Holds an **in-out** `transition-timing-function`.',
      group: 'motion',
    },
    in: {
      name: '$ease-in',
      value: easeIn,
      description: 'Holds an **in** `transition-timing-function`.',
      group: 'motion',
    },
    out: {
      name: '$ease-out',
      value: easeOut,
      description: 'Holds an **out** `transition-timing-function`.',
      group: 'motion',
    },
  },
} satisfies ScssMeta['motion'];

/**
 * Deprecated `$pds-motion-*` aliases (plumbing).
 * @deprecated Use the documented `$duration-*` / `$ease-*` variables.
 */
export const motionDeprecatedAliases: ScssRaw = {
  raw: `$pds-motion-duration-long: ${durationLg}; /* alias (deprecated) */
$pds-motion-duration-moderate: ${durationMd}; /* alias (deprecated) */
$pds-motion-duration-short: ${durationSm}; /* alias (deprecated) */
$pds-motion-duration-very-long: ${durationXlToken}; /* alias (deprecated) */
$pds-motion-easing-base: ${easeInOutToken}; /* alias (deprecated) */
$pds-motion-easing-in: ${easeIn}; /* alias (deprecated) */
$pds-motion-easing-out: ${easeOut}; /* alias (deprecated) */`,
};
