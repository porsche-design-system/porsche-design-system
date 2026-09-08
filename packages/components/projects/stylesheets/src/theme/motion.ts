import { durationLg, durationMd, durationSm, durationXl, easeIn, easeInOut, easeOut } from '@porsche-design-system/tokens';
import type { CssVariableTokens } from '../types';

export const motion = {
  duration: {
    sm: {
      type: 'motion',
      property: '--p-duration-sm',
      description: 'Applies a **short** `transition-duration`.',
      value: durationSm,
    },
    md: {
      type: 'motion',
      property: '--p-duration-md',
      description: 'Applies a **moderate** `transition-duration`.',
      value: durationMd,
    },
    lg: {
      type: 'motion',
      property: '--p-duration-lg',
      description: 'Applies a **long** `transition-duration`.',
      value: durationLg,
    },
    xl: {
      type: 'motion',
      property: '--p-duration-xl',
      description: 'Applies a **very long** `transition-duration`.',
      value: durationXl,
    },
  },
  ease: {
    inOut: {
      type: 'motion',
      property: '--p-ease-in-out',
      description: 'Applies an **in-out** `transition-timing-function`.',
      value: easeInOut,
    },
    in: {
      type: 'motion',
      property: '--p-ease-in',
      description: 'Applies an **in** `transition-timing-function`.',
      value: easeIn,
    },
    out: {
      type: 'motion',
      property: '--p-ease-out',
      description: 'Applies an **out** `transition-timing-function`.',
      value: easeOut,
    },
  },
} satisfies CssVariableTokens['motion'];
