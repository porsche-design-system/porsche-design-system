import type { TextSize } from '../../types';
import {
  textFluidLarge,
  textFluidMedium,
  textFluidSmall,
  textFluidXLarge,
  textFluidXSmall,
} from '@porsche-design-system/utilities-v2';

export const textMap: { [key in Exclude<TextSize, 'inherit'>]: any } = {
  'x-small': textFluidXSmall,
  small: textFluidSmall,
  medium: textFluidMedium,
  large: textFluidLarge,
  'x-large': textFluidXLarge,
};
