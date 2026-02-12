import { spacingStaticXSmall, textSmallStyle } from '@porsche-design-system/emotion';
import type { JssStyle, Styles } from 'jss';
import { getTransition } from '../../../styles';
import { getThemedFormStateColors } from '../../../styles/form-state-color-styles';
import type { FormState } from '../../../utils/form/form-state';

export const getFunctionalComponentStateMessageStyles = (
  state: FormState,
  additionalDefaultJssStyle?: JssStyle
): Styles<'message'> => {
  return {
    message: {
      display: 'flex',
      gap: spacingStaticXSmall,
      ...textSmallStyle,
      color: getThemedFormStateColors(state).formStateColor,
      transition: `${getTransition('color')}, ${getTransition('opacity')}`,
      ...additionalDefaultJssStyle,
      '&:empty': {
        opacity: '0',
        position: 'absolute',
      },
    },
  };
};
