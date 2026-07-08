import { colorContrastMedium, ref } from '@porsche-design-system/stylesheets';
import type { Styles } from '../../../utils/css-serializer';
import { getHiddenTextCssStyle } from '../../../styles';
import { getOptionCssStyle } from '../../../styles/select';

export const getFunctionalComponentNoResultsOptionStyles = (
  componentName: 'select-option' | 'multi-select-option',
  cssVarScalingName: string
): Styles => {
  return {
    'no-results': {
      ...getOptionCssStyle(componentName, cssVarScalingName),
      '&[role=option]': {
        cursor: 'not-allowed',
      },
      color: ref(colorContrastMedium),
    },
    'sr-only': getHiddenTextCssStyle(),
  };
};
