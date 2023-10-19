import type { Styles } from 'jss';
import type { Theme } from '../../../types';
import { getTransition, prefersColorSchemeDarkMediaQuery } from '../../../styles';
import { spacingStaticXSmall, textSmallStyle } from '@porsche-design-system/utilities-v2';
import { getThemedFormStateColors } from '../../../styles/form-state-color-styles';
import type { FormState } from '../../../utils/form/form-state';

export const getFunctionalComponentStateMessageStyles = (theme: Theme, state: FormState): Styles<'message'> => {
  return {
    message: {
      display: 'flex',
      gap: spacingStaticXSmall,
      marginTop: spacingStaticXSmall,
      ...textSmallStyle,
      color: getThemedFormStateColors(theme, state).formStateColor,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        color: getThemedFormStateColors('dark', state).formStateColor,
      }),
      transition: getTransition('color', 'short', 'base'),
    },
  };
};
