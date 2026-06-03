import {
  durationLg,
  durationMd,
  durationSm,
  durationXl,
  easeIn,
  easeInOut,
  easeOut,
} from '@porsche-design-system/tokens';

export const motionMeta = {
  duration: {
    durationSm: {
      name: 'durationSm',
      value: durationSm,
      description: 'Holds a **short** `transition-duration` / `animation-duration`.',
    },
    durationMd: {
      name: 'durationMd',
      value: durationMd,
      description: 'Holds a **moderate** `transition-duration` / `animation-duration`.',
    },
    durationLg: {
      name: 'durationLg',
      value: durationLg,
      description: 'Holds a **long** `transition-duration` / `animation-duration`.',
    },
    durationXl: {
      name: 'durationXl',
      value: durationXl,
      description: 'Holds a **very long** `transition-duration` / `animation-duration`.',
    },
  },
  ease: {
    easeIn: { name: 'easeIn', value: easeIn, description: 'Holds an **in** `transition-timing-function`.' },
    easeInOut: {
      name: 'easeInOut',
      value: easeInOut,
      description: 'Holds an **in-out** `transition-timing-function`.',
    },
    easeOut: { name: 'easeOut', value: easeOut, description: 'Holds an **out** `transition-timing-function`.' },
  },
} as const;

/** @deprecated since v4.0.0, will be removed with next major release. Use durationSm instead. */
export const deprecatedMotionDurationShortMeta = {
  name: 'motionDurationShort',
  value: durationSm,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use durationSm instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use durationMd instead. */
export const deprecatedMotionDurationModerateMeta = {
  name: 'motionDurationModerate',
  value: durationMd,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use durationMd instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use durationLg instead. */
export const deprecatedMotionDurationLongMeta = {
  name: 'motionDurationLong',
  value: durationLg,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use durationLg instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use durationXl instead. */
export const deprecatedMotionDurationVeryLongMeta = {
  name: 'motionDurationVeryLong',
  value: durationXl,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use durationXl instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use easeInOut instead. */
export const deprecatedMotionEasingBaseMeta = {
  name: 'motionEasingBase',
  value: easeInOut,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use easeInOut instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use easeIn instead. */
export const deprecatedMotionEasingInMeta = {
  name: 'motionEasingIn',
  value: easeIn,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use easeIn instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use easeOut instead. */
export const deprecatedMotionEasingOutMeta = {
  name: 'motionEasingOut',
  value: easeOut,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use easeOut instead.',
};

export const deprecatedMotionMeta = {
  motionDurationShort: deprecatedMotionDurationShortMeta,
  motionDurationModerate: deprecatedMotionDurationModerateMeta,
  motionDurationLong: deprecatedMotionDurationLongMeta,
  motionDurationVeryLong: deprecatedMotionDurationVeryLongMeta,
  motionEasingBase: deprecatedMotionEasingBaseMeta,
  motionEasingIn: deprecatedMotionEasingInMeta,
  motionEasingOut: deprecatedMotionEasingOutMeta,
} as const;

// export const deprecatedMotionMeta = [
//   {
//     name: 'motionDurationShort',
//     value: durationSm,
//     description: 'deprecated since v4.0.0, will be removed with next major release. Use durationSm instead.',
//   },
//   {
//     name: 'motionDurationModerate',
//     value: durationMd,
//     description: 'deprecated since v4.0.0, will be removed with next major release. Use durationMd instead.',
//   },
//   {
//     name: 'motionDurationLong',
//     value: durationLg,
//     description: 'deprecated since v4.0.0, will be removed with next major release. Use durationLg instead.',
//   },
//   {
//     name: 'motionDurationVeryLong',
//     value: durationXl,
//     description: 'deprecated since v4.0.0, will be removed with next major release. Use durationXl instead.',
//   },
//   {
//     name: 'motionEasingBase',
//     value: easeInOut,
//     description: 'deprecated since v4.0.0, will be removed with next major release. Use easeInOut instead.',
//   },
//   {
//     name: 'motionEasingIn',
//     value: easeIn,
//     description: 'deprecated since v4.0.0, will be removed with next major release. Use easeIn instead.',
//   },
//   {
//     name: 'motionEasingOut',
//     value: easeOut,
//     description: 'deprecated since v4.0.0, will be removed with next major release. Use easeOut instead.',
//   },
// ];
