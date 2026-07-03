import { colorPrimary, ref } from '@porsche-design-system/stylesheets';
import type { JssStyle } from '../../utils/jss';
import type { FormState } from '../../utils/form/form-state';
import { getInlineSVGBackgroundImage } from '../../utils/svg/getInlineSVGBackgroundImage';
import { getThemedFormStateColors } from '../form-state-color-styles';
import { forcedColorsMediaQuery } from '../media-query/forced-colors-media-query';

const indeterminateIcon = getInlineSVGBackgroundImage(`<path d="m20,11v2H4v-2h16Z"/>`);

export const getCheckboxIndeterminateBaseStyles = (isLoading: boolean, state: FormState): JssStyle => {
  const { formStateBorderColor } = getThemedFormStateColors(state);

  if (isLoading) {
    return {};
  }

  return {
    '&::before': {
      WebkitMask: `${indeterminateIcon} center/contain no-repeat`,
      mask: `${indeterminateIcon} center/contain no-repeat`,
      backgroundColor: state === 'none' ? ref(colorPrimary) : formStateBorderColor,
      ...forcedColorsMediaQuery({
        background: 'CanvasText',
      }),
    },
  };
};
