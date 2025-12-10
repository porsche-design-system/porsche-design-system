import type { Styles } from 'jss';
import { colors, getHiddenTextJssStyle } from '../../../styles';
import { getOptionJssStyle } from '../../../styles/select';

const { contrastMediumColor } = colors;

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
      color: contrastMediumColor,
    },
    'sr-only': getHiddenTextJssStyle(),
  };
};
