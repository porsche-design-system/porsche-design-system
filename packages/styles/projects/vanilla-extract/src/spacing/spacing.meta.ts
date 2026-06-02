import {
  spacingFluid2Xl,
  spacingFluidLg,
  spacingFluidMd,
  spacingFluidSm,
  spacingFluidXl,
  spacingFluidXs,
  spacingStatic2Xl,
  spacingStatic2Xs,
  spacingStaticLg,
  spacingStaticMd,
  spacingStaticSm,
  spacingStaticXl,
  spacingStaticXs,
} from '@porsche-design-system/tokens';

export const spacingMeta = {
  fluid: {
    spacingFluidXs: {
      name: 'spacingFluidXs',
      value: spacingFluidXs,
      description: 'Holds the **x-small fluid** spacing.',
    },
    spacingFluidSm: {
      name: 'spacingFluidSm',
      value: spacingFluidSm,
      description: 'Holds the **small fluid** spacing.',
    },
    spacingFluidMd: {
      name: 'spacingFluidMd',
      value: spacingFluidMd,
      description: 'Holds the **medium fluid** spacing.',
    },
    spacingFluidLg: {
      name: 'spacingFluidLg',
      value: spacingFluidLg,
      description: 'Holds the **large fluid** spacing.',
    },
    spacingFluidXl: {
      name: 'spacingFluidXl',
      value: spacingFluidXl,
      description: 'Holds the **x-large fluid** spacing.',
    },
    spacingFluid2Xl: {
      name: 'spacingFluid2Xl',
      value: spacingFluid2Xl,
      description: 'Holds the **2x-large fluid** spacing.',
    },
  },
  static: {
    spacingStatic2Xs: {
      name: 'spacingStatic2Xs',
      value: spacingStatic2Xs,
      description: 'Holds the **2x-small static** spacing.',
    },
    spacingStaticXs: {
      name: 'spacingStaticXs',
      value: spacingStaticXs,
      description: 'Holds the **x-small static** spacing.',
    },
    spacingStaticSm: {
      name: 'spacingStaticSm',
      value: spacingStaticSm,
      description: 'Holds the **small static** spacing.',
    },
    spacingStaticMd: {
      name: 'spacingStaticMd',
      value: spacingStaticMd,
      description: 'Holds the **medium static** spacing.',
    },
    spacingStaticLg: {
      name: 'spacingStaticLg',
      value: spacingStaticLg,
      description: 'Holds the **large static** spacing.',
    },
    spacingStaticXl: {
      name: 'spacingStaticXl',
      value: spacingStaticXl,
      description: 'Holds the **x-large static** spacing.',
    },
    spacingStatic2Xl: {
      name: 'spacingStatic2Xl',
      value: spacingStatic2Xl,
      description: 'Holds the **2x-large static** spacing.',
    },
  },
} as const;

/** @deprecated since v4.0.0, will be removed with next major release. Use spacingFluidXs instead. */
const deprecatedSpacingFluidXSmall = {
  name: 'spacingFluidXSmall',
  value: spacingFluidXs,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use spacingFluidXs instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use spacingStaticXs instead. */
const deprecatedSpacingStaticXSmall = {
  name: 'spacingStaticXSmall',
  value: spacingStaticXs,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use spacingStaticXs instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use spacingFluidSm instead. */
const deprecatedSpacingFluidSmall = {
  name: 'spacingFluidSmall',
  value: spacingFluidSm,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use spacingFluidSm instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use spacingStaticSm instead. */
const deprecatedSpacingStaticSmall = {
  name: 'spacingStaticSmall',
  value: spacingStaticSm,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use spacingStaticSm instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use spacingFluidMd instead. */
const deprecatedSpacingFluidMedium = {
  name: 'spacingFluidMedium',
  value: spacingFluidMd,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use spacingFluidMd instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use spacingStaticMd instead. */
const deprecatedSpacingStaticMedium = {
  name: 'spacingStaticMedium',
  value: spacingStaticMd,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use spacingStaticMd instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use spacingFluidLg instead. */
const deprecatedSpacingFluidLarge = {
  name: 'spacingFluidLarge',
  value: spacingFluidLg,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use spacingFluidLg instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use spacingStaticLg instead. */
const deprecatedSpacingStaticLarge = {
  name: 'spacingStaticLarge',
  value: spacingStaticLg,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use spacingStaticLg instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use spacingFluidXl instead. */
const deprecatedSpacingFluidXLarge = {
  name: 'spacingFluidXLarge',
  value: spacingFluidXl,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use spacingFluidXl instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use spacingStaticXl instead. */
const deprecatedSpacingStaticXLarge = {
  name: 'spacingStaticXLarge',
  value: spacingStaticXl,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use spacingStaticXl instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use spacingFluid2Xl instead. */
const deprecatedSpacingFluidXXLarge = {
  name: 'spacingFluidXXLarge',
  value: spacingFluid2Xl,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use spacingFluid2Xl instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use spacingStatic2Xl instead. */
const deprecatedSpacingStaticXXLarge = {
  name: 'spacingStaticXXLarge',
  value: spacingStatic2Xl,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use spacingStatic2Xl instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use spacing variables directly instead. */
const deprecatedSpacing = {
  name: 'spacing',
  value: {
    static: {
      xSmall: spacingStaticXs,
      small: spacingStaticSm,
      medium: spacingStaticMd,
      large: spacingStaticLg,
      xLarge: spacingStaticXl,
      xxLarge: spacingStatic2Xl,
    },
    fluid: {
      xSmall: spacingFluidXs,
      small: spacingFluidSm,
      medium: spacingFluidMd,
      large: spacingFluidLg,
      xLarge: spacingFluidXl,
      xxLarge: spacingFluid2Xl,
    },
  } as const,
  description:
    'deprecated since v4.0.0, will be removed with next major release. Use spacing variables directly instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use spacing variables directly instead. */
const deprecatedSpacingFluid = {
  name: 'spacingFluid',
  value: {
    xSmall: spacingFluidXs,
    small: spacingFluidSm,
    medium: spacingFluidMd,
    large: spacingFluidLg,
    xLarge: spacingFluidXl,
    xxLarge: spacingFluid2Xl,
  } as const,
  description:
    'deprecated since v4.0.0, will be removed with next major release. Use spacing variables directly instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use spacing variables directly instead. */
const deprecatedSpacingStatic = {
  name: 'spacingStatic',
  value: {
    xSmall: spacingStaticXs,
    small: spacingStaticSm,
    medium: spacingStaticMd,
    large: spacingStaticLg,
    xLarge: spacingStaticXl,
    xxLarge: spacingStatic2Xl,
  } as const,
  description:
    'deprecated since v4.0.0, will be removed with next major release. Use spacing variables directly instead.',
};

export const deprecatedSpacingMeta = {
  spacingFluidXSmall: deprecatedSpacingFluidXSmall,
  spacingStaticXSmall: deprecatedSpacingStaticXSmall,
  spacingFluidSmall: deprecatedSpacingFluidSmall,
  spacingStaticSmall: deprecatedSpacingStaticSmall,
  spacingFluidMedium: deprecatedSpacingFluidMedium,
  spacingStaticMedium: deprecatedSpacingStaticMedium,
  spacingFluidLarge: deprecatedSpacingFluidLarge,
  spacingStaticLarge: deprecatedSpacingStaticLarge,
  spacingFluidXLarge: deprecatedSpacingFluidXLarge,
  spacingStaticXLarge: deprecatedSpacingStaticXLarge,
  spacingFluidXXLarge: deprecatedSpacingFluidXXLarge,
  spacingStaticXXLarge: deprecatedSpacingStaticXXLarge,
  spacing: deprecatedSpacing,
  spacingFluid: deprecatedSpacingFluid,
  spacingStatic: deprecatedSpacingStatic,
} as const;
