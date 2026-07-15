import { durationLg, durationMd, durationSm, durationXl, easeIn, easeInOut, easeOut } from '../../src/motion/';
import type { EmotionMeta, EmotionToken } from '../types';

const duration = {
  sm: {
    name: 'durationSm',
    description: 'Holds a **short** `transition-duration` / `animation-duration`.',
    value: durationSm,
  },
  md: {
    name: 'durationMd',
    description: 'Holds a **moderate** `transition-duration` / `animation-duration`.',
    value: durationMd,
  },
  lg: {
    name: 'durationLg',
    description: 'Holds a **long** `transition-duration` / `animation-duration`.',
    value: durationLg,
  },
  xl: {
    name: 'durationXl',
    description: 'Holds a **very long** `transition-duration` / `animation-duration`.',
    value: durationXl,
  },
} satisfies Record<string, EmotionToken>;

const ease = {
  inOut: { name: 'easeInOut', description: 'Holds an **in-out** `transition-timing-function`.', value: easeInOut },
  in: { name: 'easeIn', description: 'Holds an **in** `transition-timing-function`.', value: easeIn },
  out: { name: 'easeOut', description: 'Holds an **out** `transition-timing-function`.', value: easeOut },
} satisfies Record<string, EmotionToken>;

export const motion = {
  duration,
  ease,
} satisfies EmotionMeta['motion'];
