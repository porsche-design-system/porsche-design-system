import { gradientStopsFadeDark } from '@porsche-design-system/tokens';
import type { Meta, MetaEntry } from '../meta.types';

export const gradientMeta: Meta = {
  gradientStopsFadeDark: {
    name: 'gradientStopsFadeDark',
    value: gradientStopsFadeDark,
    description: 'Holds color stops for a faded gradient, used as `background-image`.',
  },
} as const;

/** @deprecated since v4.0.0, will be removed with next major release. Use background: `linear-gradient(to bottom, ${gradientStopsFadeDark});` instead  */
export const deprecatedGradientToBottomStyleMeta: MetaEntry = {
  name: 'gradientToBottomStyle',
  value: { background: `linear-gradient(to bottom, ${gradientStopsFadeDark});` } as const,
  description:
    'since v4.0.0, will be removed with next major release. Use background: `linear-gradient(to bottom, ${gradientStopsFadeDark});` instead',
} as const;

/** @deprecated since v4.0.0, will be removed with next major release. Use background: `linear-gradient(to left, ${gradientStopsFadeDark});` instead  */
export const deprecatedGradientToLeftStyleMeta: MetaEntry = {
  name: 'gradientToLeftStyle',
  value: { background: `linear-gradient(to left, ${gradientStopsFadeDark});` } as const,
  description:
    'since v4.0.0, will be removed with next major release. Use background: `linear-gradient(to left, ${gradientStopsFadeDark});` instead',
} as const;

/** @deprecated since v4.0.0, will be removed with next major release. background: `linear-gradient(to right, ${gradientStopsFadeDark});` instead  */
export const deprecatedGradientToRightStyleMeta: MetaEntry = {
  name: 'gradientToRightStyle',
  value: { background: `linear-gradient(to right, ${gradientStopsFadeDark});` } as const,
  description:
    'since v4.0.0, will be removed with next major release. background: `linear-gradient(to right, ${gradientStopsFadeDark});` instead',
} as const;

/** @deprecated since v4.0.0, will be removed with next major release. background: `linear-gradient(to top, ${gradientStopsFadeDark});` instead  */
export const deprecatedGradientToTopStyleMeta: MetaEntry = {
  name: 'gradientToTopStyle',
  value: { background: `linear-gradient(to top, ${gradientStopsFadeDark});` } as const,
  description:
    'since v4.0.0, will be removed with next major release. background: `linear-gradient(to top, ${gradientStopsFadeDark});` instead',
} as const;

export const deprecatedGradientMeta: Meta = {
  gradientToBottomStyle: deprecatedGradientToBottomStyleMeta,
  gradientToLeftStyle: deprecatedGradientToLeftStyleMeta,
  gradientToRightStyle: deprecatedGradientToRightStyleMeta,
  gradientToTopStyle: deprecatedGradientToTopStyleMeta,
} as const;
