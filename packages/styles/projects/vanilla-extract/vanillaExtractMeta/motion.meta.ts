import {
  durationLg,
  durationMd,
  durationSm,
  durationXl,
  easeIn,
  easeInOut,
  easeOut,
  motionDurationLong,
  motionDurationModerate,
  motionDurationShort,
  motionDurationVeryLong,
  motionEasingBase,
  motionEasingIn,
  motionEasingOut,
} from '../src/motion/';
import type { VanillaExtractMeta } from './meta.types';

export const motionMeta: VanillaExtractMeta = {
  duration: {
    durationSm: {
      name: 'durationSm',
      description: 'Holds a **short** `transition-duration` / `animation-duration`.',
      value: durationSm,
    },
    durationMd: {
      name: 'durationMd',
      description: 'Holds a **moderate** `transition-duration` / `animation-duration`.',
      value: durationMd,
    },
    durationLg: {
      name: 'durationLg',
      description: 'Holds a **long** `transition-duration` / `animation-duration`.',
      value: durationLg,
    },
    durationXl: {
      name: 'durationXl',
      description: 'Holds a **very long** `transition-duration` / `animation-duration`.',
      value: durationXl,
    },
  },
  ease: {
    easeIn: { name: 'easeIn', description: 'Holds an **in** `transition-timing-function`.', value: easeIn },
    easeInOut: {
      name: 'easeInOut',
      description: 'Holds an **in-out** `transition-timing-function`.',
      value: easeInOut,
    },
    easeOut: { name: 'easeOut', description: 'Holds an **out** `transition-timing-function`.', value: easeOut },
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use durationSm instead. */
  motionDurationShort: {
    name: 'motionDurationShort',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use durationSm instead.',
    value: motionDurationShort,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use durationMd instead. */
  motionDurationModerate: {
    name: 'motionDurationModerate',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use durationMd instead.',
    value: motionDurationModerate,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use durationLg instead. */
  motionDurationLong: {
    name: 'motionDurationLong',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use durationLg instead.',
    value: motionDurationLong,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use durationXl instead. */
  motionDurationVeryLong: {
    name: 'motionDurationVeryLong',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use durationXl instead.',
    value: motionDurationVeryLong,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use easeInOut instead. */
  motionEasingBase: {
    name: 'motionEasingBase',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use easeInOut instead.',
    value: motionEasingBase,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use easeIn instead. */
  motionEasingIn: {
    name: 'motionEasingIn',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use easeIn instead.',
    value: motionEasingIn,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use easeOut instead. */
  motionEasingOut: {
    name: 'motionEasingOut',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use easeOut instead.',
    value: motionEasingOut,
    deprecated: true,
  },
} as const;
