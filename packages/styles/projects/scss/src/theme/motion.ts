import { durationLg, durationMd, durationSm, durationXl, easeIn, easeInOut, easeOut } from '@porsche-design-system/tokens';
import type { ScssRaw, ScssVariable } from '../types';

/**
 * Motion theme variables grouped like the storefront API tables (`duration` / `easing`). The
 * deprecated `$pds-motion-*` aliases (plumbing) live alongside below.
 */
export const motion = {
  duration: [
    {
      name: '$duration-sm',
      value: durationSm,
      description: 'Holds a **short** `transition-duration` / `animation-duration`.',
      group: 'motion',
    },
    {
      name: '$duration-md',
      value: durationMd,
      description: 'Holds a **moderate** `transition-duration` / `animation-duration`.',
      group: 'motion',
    },
    {
      name: '$duration-lg',
      value: durationLg,
      description: 'Holds a **long** `transition-duration` / `animation-duration`.',
      group: 'motion',
    },
    {
      name: '$duration-xl',
      value: durationXl,
      description: 'Holds a **very long** `transition-duration` / `animation-duration`.',
      group: 'motion',
    },
  ],
  easing: [
    {
      name: '$ease-in-out',
      value: easeInOut,
      description: 'Holds an **in-out** `transition-timing-function`.',
      group: 'motion',
    },
    {
      name: '$ease-in',
      value: easeIn,
      description: 'Holds an **in** `transition-timing-function`.',
      group: 'motion',
    },
    {
      name: '$ease-out',
      value: easeOut,
      description: 'Holds an **out** `transition-timing-function`.',
      group: 'motion',
    },
  ],
} satisfies { duration: ScssVariable[]; easing: ScssVariable[] };

/**
 * Deprecated `$pds-motion-*` aliases. Plumbing: still emitted, not documented.
 * @deprecated Use the documented `$duration-*` / `$ease-*` variables instead.
 */
export const motionDeprecatedAliases: ScssRaw = {
  raw: [
    `$pds-motion-duration-long: ${durationLg}; /* alias (deprecated) */`,
    `$pds-motion-duration-moderate: ${durationMd}; /* alias (deprecated) */`,
    `$pds-motion-duration-short: ${durationSm}; /* alias (deprecated) */`,
    `$pds-motion-duration-very-long: ${durationXl}; /* alias (deprecated) */`,
    `$pds-motion-easing-base: ${easeInOut}; /* alias (deprecated) */`,
    `$pds-motion-easing-in: ${easeIn}; /* alias (deprecated) */`,
    `$pds-motion-easing-out: ${easeOut}; /* alias (deprecated) */`,
  ].join('\n'),
};
