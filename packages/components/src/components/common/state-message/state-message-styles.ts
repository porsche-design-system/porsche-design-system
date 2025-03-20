import type { JssStyle, Styles } from 'jss';
import type { Theme } from '../../../types';
import { getTransition, prefersColorSchemeDarkMediaQuery } from '../../../styles';
import { spacingStaticXSmall, textSmallStyle } from '@porsche-design-system/styles';
import { getThemedFormStateColors } from '../../../styles/form-state-color-styles';
import type { FormState } from '../../../utils/form/form-state';

export const getFunctionalComponentStateMessageStyles = (
  theme: Theme,
  state: FormState,
  additionalDefaultJssStyle?: JssStyle
): Styles<'message'> => {
  return {
    message: {
      ...(state === 'none'
        ? { position: 'absolute' } // Needed to breakout of grid gap if no status is set
        : {
            display: 'flex',
            gap: spacingStaticXSmall,
            ...textSmallStyle,
            color: getThemedFormStateColors(theme, state).formStateColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              color: getThemedFormStateColors('dark', state).formStateColor,
            }),
            transition: getTransition('color'),
            ...additionalDefaultJssStyle,
          }),
    },
  };
};
