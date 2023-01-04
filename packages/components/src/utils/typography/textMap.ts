import type { TextSize } from '../../types';
import {
  textLargeFluid,
  textMediumFluid,
  textSmallFluid,
  textXLargeFluid,
  textXSmallFluid,
} from '@porsche-design-system/utilities-v2';

export const textMap: { [key in Exclude<TextSize, 'inherit'>]: any } = {
  'x-small': textXSmallFluid,
  small: textSmallFluid,
  medium: textMediumFluid,
  large: textLargeFluid,
  'x-large': textXLargeFluid,
};
