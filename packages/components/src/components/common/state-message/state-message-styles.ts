import {
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  ref,
  spacingStaticXs,
  typescaleSm,
} from '@porsche-design-system/stylesheets';
import type { CssStyle, Styles } from '../../../utils/css-serializer';
import { getTransition } from '../../../styles';
import { getThemedFormStateColors } from '../../../styles/form-state-color-styles';
import type { FormState } from '../../../utils/form/form-state';

export const getFunctionalComponentStateMessageStyles = (
  state: FormState,
  additionalDefaultCssStyle?: CssStyle
): Styles<'message'> => {
  return {
    message: {
      display: 'flex',
      gap: ref(spacingStaticXs),
      font: `${ref(fontWeightNormal)} ${ref(typescaleSm)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
      color: getThemedFormStateColors(state).formStateColor,
      transition: `${getTransition('color')}, ${getTransition('opacity')}`,
      ...additionalDefaultCssStyle,
      '&:empty': {
        opacity: '0',
        position: 'absolute',
      },
    },
  };
};
