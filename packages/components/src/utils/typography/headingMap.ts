import {
  headingXXXLargeStyle,
  headingLargeStyle,
  headingMediumStyle,
  headingSmallStyle,
  headingXLargeStyle,
  headingXXLargeStyle,
} from '@porsche-design-system/utilities-v2';
import { HeadingSize } from '../../types';
import { HeadlineVariantTypeDeprecated } from '../../components/headline/headline-utils';

export const headingMap: { [key in Exclude<HeadingSize | HeadlineVariantTypeDeprecated, 'inherit'>]: any } = {
  'large-title': headingXXXLargeStyle,
  'xx-large': headingXXLargeStyle,
  'x-large': headingXLargeStyle,
  large: headingLargeStyle,
  medium: headingMediumStyle,
  small: headingSmallStyle,
  'headline-1': headingXXLargeStyle, // deprecated
  'headline-2': headingXLargeStyle, // deprecated
  'headline-3': headingLargeStyle, // deprecated
  'headline-4': headingMediumStyle, // deprecated
  'headline-5': headingSmallStyle, // deprecated
};
