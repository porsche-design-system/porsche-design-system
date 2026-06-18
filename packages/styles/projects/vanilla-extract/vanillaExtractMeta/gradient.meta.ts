import {
  gradientStopsFadeDark,
  gradientToBottomStyle,
  gradientToLeftStyle,
  gradientToRightStyle,
  gradientToTopStyle,
} from '../src/gradient/';
import type { VanillaExtractMeta } from './meta.types';

export const gradientMeta: VanillaExtractMeta = {
  gradientStopsFadeDark: {
    name: 'gradientStopsFadeDark',
    description: 'Holds color stops for a faded gradient, used as `background-image`.',
    value: gradientStopsFadeDark,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use background: `linear-gradient(to bottom, ${gradientStopsFadeDark});` instead  */
  gradientToBottomStyle: {
    name: 'gradientToBottomStyle',
    description:
      'since v4.0.0, will be removed with next major release. Use background: `linear-gradient(to bottom, ${gradientStopsFadeDark});` instead',
    value: gradientToBottomStyle,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use background: `linear-gradient(to left, ${gradientStopsFadeDark});` instead  */
  gradientToLeftStyle: {
    name: 'gradientToLeftStyle',
    description:
      'since v4.0.0, will be removed with next major release. Use background: `linear-gradient(to left, ${gradientStopsFadeDark});` instead',
    value: gradientToLeftStyle,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. background: `linear-gradient(to right, ${gradientStopsFadeDark});` instead  */
  gradientToRightStyle: {
    name: 'gradientToRightStyle',
    description:
      'since v4.0.0, will be removed with next major release. background: `linear-gradient(to right, ${gradientStopsFadeDark});` instead',
    value: gradientToRightStyle,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. background: `linear-gradient(to top, ${gradientStopsFadeDark});` instead  */
  gradientToTopStyle: {
    name: 'gradientToTopStyle',
    description:
      'since v4.0.0, will be removed with next major release. background: `linear-gradient(to top, ${gradientStopsFadeDark});` instead',
    value: gradientToTopStyle,
    deprecated: true,
  },
} as const;
