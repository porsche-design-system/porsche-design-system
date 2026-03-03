import type { Styles } from 'jss';
import { getHiddenTextJssStyle } from '../../../styles';
import { colorContrastMedium } from '../../../styles/css-variables';
import { getOptionJssStyle } from '../../../styles/select';

export const getFunctionalComponentNoResultsOptionStyles = (
  componentName: 'select-option' | 'multi-select-option',
  cssVarScalingName: string
): Styles => {
  return {
    'no-results': {
      ...getOptionJssStyle(componentName, cssVarScalingName),
      '&[role=option]': {
        cursor: 'not-allowed',
      },
      color: colorContrastMedium,
    },
    'sr-only': getHiddenTextJssStyle(),
  };
};
