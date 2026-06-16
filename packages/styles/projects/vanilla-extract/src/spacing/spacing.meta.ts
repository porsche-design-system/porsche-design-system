import type { Meta } from '..';
import {
  spacing,
  spacingFluid,
  spacingFluid2Xl,
  spacingFluidLarge,
  spacingFluidLg,
  spacingFluidMd,
  spacingFluidMedium,
  spacingFluidSm,
  spacingFluidSmall,
  spacingFluidXLarge,
  spacingFluidXl,
  spacingFluidXSmall,
  spacingFluidXs,
  spacingFluidXXLarge,
  spacingStatic,
  spacingStatic2Xl,
  spacingStatic2Xs,
  spacingStaticLarge,
  spacingStaticLg,
  spacingStaticMd,
  spacingStaticMedium,
  spacingStaticSm,
  spacingStaticSmall,
  spacingStaticXLarge,
  spacingStaticXl,
  spacingStaticXSmall,
  spacingStaticXs,
  spacingStaticXXLarge,
} from '.';

export const spacingMeta: Meta = {
  fluid: {
    spacingFluidXs: {
      name: 'spacingFluidXs',
      description: 'Holds the **x-small fluid** spacing.',
      value: spacingFluidXs,
    },
    spacingFluidSm: {
      name: 'spacingFluidSm',
      description: 'Holds the **small fluid** spacing.',
      value: spacingFluidSm,
    },
    spacingFluidMd: {
      name: 'spacingFluidMd',
      description: 'Holds the **medium fluid** spacing.',
      value: spacingFluidMd,
    },
    spacingFluidLg: {
      name: 'spacingFluidLg',
      description: 'Holds the **large fluid** spacing.',
      value: spacingFluidLg,
    },
    spacingFluidXl: {
      name: 'spacingFluidXl',
      description: 'Holds the **x-large fluid** spacing.',
      value: spacingFluidXl,
    },
    spacingFluid2Xl: {
      name: 'spacingFluid2Xl',
      description: 'Holds the **2x-large fluid** spacing.',
      value: spacingFluid2Xl,
    },
  },
  static: {
    spacingStatic2Xs: {
      name: 'spacingStatic2Xs',
      description: 'Holds the **2x-small static** spacing.',
      value: spacingStatic2Xs,
    },
    spacingStaticXs: {
      name: 'spacingStaticXs',
      description: 'Holds the **x-small static** spacing.',
      value: spacingStaticXs,
    },
    spacingStaticSm: {
      name: 'spacingStaticSm',
      description: 'Holds the **small static** spacing.',
      value: spacingStaticSm,
    },
    spacingStaticMd: {
      name: 'spacingStaticMd',
      description: 'Holds the **medium static** spacing.',
      value: spacingStaticMd,
    },
    spacingStaticLg: {
      name: 'spacingStaticLg',
      description: 'Holds the **large static** spacing.',
      value: spacingStaticLg,
    },
    spacingStaticXl: {
      name: 'spacingStaticXl',
      description: 'Holds the **x-large static** spacing.',
      value: spacingStaticXl,
    },
    spacingStatic2Xl: {
      name: 'spacingStatic2Xl',
      description: 'Holds the **2x-large static** spacing.',
      value: spacingStatic2Xl,
    },
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use spacingFluidXs instead. */
  spacingFluidXSmall: {
    name: 'spacingFluidXSmall',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use spacingFluidXs instead.',
    value: spacingFluidXSmall,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use spacingStaticXs instead. */
  spacingStaticXSmall: {
    name: 'spacingStaticXSmall',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use spacingStaticXs instead.',
    value: spacingStaticXSmall,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use spacingFluidSm instead. */
  spacingFluidSmall: {
    name: 'spacingFluidSmall',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use spacingFluidSm instead.',
    value: spacingFluidSmall,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use spacingStaticSm instead. */
  spacingStaticSmall: {
    name: 'spacingStaticSmall',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use spacingStaticSm instead.',
    value: spacingStaticSmall,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use spacingFluidMd instead. */
  spacingFluidMedium: {
    name: 'spacingFluidMedium',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use spacingFluidMd instead.',
    value: spacingFluidMedium,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use spacingStaticMd instead. */
  spacingStaticMedium: {
    name: 'spacingStaticMedium',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use spacingStaticMd instead.',
    value: spacingStaticMedium,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use spacingFluidLg instead. */
  spacingFluidLarge: {
    name: 'spacingFluidLarge',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use spacingFluidLg instead.',
    value: spacingFluidLarge,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use spacingStaticLg instead. */
  spacingStaticLarge: {
    name: 'spacingStaticLarge',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use spacingStaticLg instead.',
    value: spacingStaticLarge,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use spacingFluidXl instead. */
  spacingFluidXLarge: {
    name: 'spacingFluidXLarge',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use spacingFluidXl instead.',
    value: spacingFluidXLarge,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use spacingStaticXl instead. */
  spacingStaticXLarge: {
    name: 'spacingStaticXLarge',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use spacingStaticXl instead.',
    value: spacingStaticXLarge,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use spacingFluid2Xl instead. */
  spacingFluidXXLarge: {
    name: 'spacingFluidXXLarge',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use spacingFluid2Xl instead.',
    value: spacingFluidXXLarge,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use spacingStatic2Xl instead. */
  spacingStaticXXLarge: {
    name: 'spacingStaticXXLarge',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use spacingStatic2Xl instead.',
    value: spacingStaticXXLarge,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use spacing variables directly instead. */
  spacing: {
    name: 'spacing',
    description:
      'deprecated since v4.0.0, will be removed with next major release. Use spacing variables directly instead.',
    value: spacing,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use spacing variables directly instead. */
  spacingFluid: {
    name: 'spacingFluid',
    description:
      'deprecated since v4.0.0, will be removed with next major release. Use spacing variables directly instead.',
    value: spacingFluid,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use spacing variables directly instead. */
  spacingStatic: {
    name: 'spacingStatic',
    description:
      'deprecated since v4.0.0, will be removed with next major release. Use spacing variables directly instead.',
    value: spacingStatic,
    deprecated: true,
  },
} as const;
