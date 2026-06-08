import {
  durationLg,
  durationMd,
  durationSm,
  durationXl,
  easeIn,
  easeInOut,
  easeOut,
} from '@porsche-design-system/tokens';
import type { Meta, MetaEntry } from '../meta.types';

export const motionMeta: Meta = {
  duration: {
    durationSm: { name: 'durationSm', value: durationSm, description: 'Holds a **short** `transition-duration` / `animation-duration`.' },
    durationMd: { name: 'durationMd', value: durationMd, description: 'Holds a **moderate** `transition-duration` / `animation-duration`.' },
    durationLg: { name: 'durationLg', value: durationLg, description: 'Holds a **long** `transition-duration` / `animation-duration`.' },
    durationXl: { name: 'durationXl', value: durationXl, description: 'Holds a **very long** `transition-duration` / `animation-duration`.' },
  },
  ease: {
    easeIn: { name: 'easeIn', value: easeIn, description: 'Holds an **in** `transition-timing-function`.' },
    easeInOut: { name: 'easeInOut', value: easeInOut, description: 'Holds an **in-out** `transition-timing-function`.' },
    easeOut: { name: 'easeOut', value: easeOut, description: 'Holds an **out** `transition-timing-function`.' },
  },
} as const;

/** @deprecated since v4.0.0, will be removed with next major release. Use durationSm instead. */
const deprecatedMotionDurationShortMeta: MetaEntry = {
  name: 'motionDurationShort',
  value: durationSm,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use durationSm instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use durationMd instead. */
const deprecatedMotionDurationModerateMeta: MetaEntry = {
  name: 'motionDurationModerate',
  value: durationMd,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use durationMd instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use durationLg instead. */
const deprecatedMotionDurationLongMeta: MetaEntry = {
  name: 'motionDurationLong',
  value: durationLg,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use durationLg instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use durationXl instead. */
const deprecatedMotionDurationVeryLongMeta: MetaEntry = {
  name: 'motionDurationVeryLong',
  value: durationXl,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use durationXl instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use easeInOut instead. */
const deprecatedMotionEasingBaseMeta: MetaEntry = {
  name: 'motionEasingBase',
  value: easeInOut,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use easeInOut instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use easeIn instead. */
const deprecatedMotionEasingInMeta: MetaEntry = {
  name: 'motionEasingIn',
  value: easeIn,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use easeIn instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use easeOut instead. */
const deprecatedMotionEasingOutMeta: MetaEntry = {
  name: 'motionEasingOut',
  value: easeOut,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use easeOut instead.',
};

export const deprecatedMotionMeta: Meta = {
  motionDurationShort: deprecatedMotionDurationShortMeta,
  motionDurationModerate: deprecatedMotionDurationModerateMeta,
  motionDurationLong: deprecatedMotionDurationLongMeta,
  motionDurationVeryLong: deprecatedMotionDurationVeryLongMeta,
  motionEasingBase: deprecatedMotionEasingBaseMeta,
  motionEasingIn: deprecatedMotionEasingInMeta,
  motionEasingOut: deprecatedMotionEasingOutMeta,
} as const;
