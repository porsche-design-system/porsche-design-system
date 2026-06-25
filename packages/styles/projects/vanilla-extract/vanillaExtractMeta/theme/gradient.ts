import { gradientStopsFadeDark } from '../../src/gradient/';
import type { VanillaExtractMeta } from '../types';

export const gradient = {
  stopsFadeDark: {
    name: 'gradientStopsFadeDark',
    description: 'Holds color stops for a faded gradient, used as `background-image`.',
    value: gradientStopsFadeDark,
  },
} satisfies VanillaExtractMeta['gradient'];
