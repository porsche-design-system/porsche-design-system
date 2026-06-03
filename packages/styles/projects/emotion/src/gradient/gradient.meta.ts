import { gradientStopsFadeDark } from '@porsche-design-system/tokens';

export const gradientMeta = {
  gradientStopsFadeDark: {
    name: 'gradientStopsFadeDark',
    value: gradientStopsFadeDark,
    description: 'Holds color stops for a faded gradient, used as `background-image`.',
  },
} as const;

/** @deprecated since v4.0.0, will be removed with next major release. Use background: `linear-gradient(to bottom, ${gradientStopsFadeDark});` instead  */
export const deprecatedGradientToBottomStyleMeta = {
  name: 'gradientToBottomStyle',
  value: { background: `linear-gradient(to bottom, ${gradientStopsFadeDark})` } as const,
  description:
    'since v4.0.0, will be removed with next major release. Use background: `linear-gradient(to bottom, ${gradientStopsFadeDark})` instead',
} as const;

/** @deprecated since v4.0.0, will be removed with next major release. Use background: `linear-gradient(to left, ${gradientStopsFadeDark});` instead  */
export const deprecatedGradientToLeftStyleMeta = {
  name: 'gradientToLeftStyle',
  value: { background: `linear-gradient(to left, ${gradientStopsFadeDark})` } as const,
  description:
    'since v4.0.0, will be removed with next major release. Use background: `linear-gradient(to left, ${gradientStopsFadeDark})` instead',
} as const;

/** @deprecated since v4.0.0, will be removed with next major release. Use background: `linear-gradient(to right, ${gradientStopsFadeDark});` instead  */
export const deprecatedGradientToRightStyleMeta = {
  name: 'gradientToRightStyle',
  value: { background: `linear-gradient(to right, ${gradientStopsFadeDark})` } as const,
  description:
    'since v4.0.0, will be removed with next major release. Use background: `linear-gradient(to right, ${gradientStopsFadeDark})` instead',
} as const;

/** @deprecated since v4.0.0, will be removed with next major release. Use background: `linear-gradient(to top, ${gradientStopsFadeDark});` instead  */
export const deprecatedGradientToTopStyleMeta = {
  name: 'gradientToTopStyle',
  value: { background: `linear-gradient(to top, ${gradientStopsFadeDark})` } as const,
  description:
    'since v4.0.0, will be removed with next major release. Use background: `linear-gradient(to top, ${gradientStopsFadeDark})` instead',
} as const;

export const deprecatedGradientMeta = {
  gradientToBottomStyle: deprecatedGradientToBottomStyleMeta,
  gradientToLeftStyle: deprecatedGradientToLeftStyleMeta,
  gradientToRightStyle: deprecatedGradientToRightStyleMeta,
  gradientToTopStyle: deprecatedGradientToTopStyleMeta,
} as const;

// export const deprecatedGradientMeta = [
//   {
//     name: 'gradientToBottomStyle',
//     value: { background: `linear-gradient(to bottom, ${gradientStopsFadeDark})` } as const,
//     description: 'deprecated since v4.0.0, will be removed with next major release. Use background: `linear-gradient(to bottom, ${gradientStopsFadeDark})` instead',
//   },
//   {
//     name: 'gradientToLeftStyle',
//     value: { background: `linear-gradient(to left, ${gradientStopsFadeDark})` } as const,
//     description: 'deprecated since v4.0.0, will be removed with next major release. Use background: `linear-gradient(to left, ${gradientStopsFadeDark})` instead',
//   },
//   {
//     name: 'gradientToRightStyle',
//     value: { background: `linear-gradient(to right, ${gradientStopsFadeDark})` } as const,
//     description: 'deprecated since v4.0.0, will be removed with next major release. Use background: `linear-gradient(to right, ${gradientStopsFadeDark})` instead',
//   },
//   {
//     name: 'gradientToTopStyle',
//     value: { background: `linear-gradient(to top, ${gradientStopsFadeDark})` } as const,
//     description: 'deprecated since v4.0.0, will be removed with next major release. Use background: `linear-gradient(to top, ${gradientStopsFadeDark})` instead',
//   },
// ];
