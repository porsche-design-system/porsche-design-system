import type { JssStyle } from 'jss';
import { isDisabledOrLoading } from '../../utils';
import type { FormState } from '../../utils/form/form-state';
import { getInlineSVGBackgroundImage } from '../../utils/svg/getInlineSVGBackgroundImage';
import { colors } from '../colors';
import { getTransition } from '../common-styles';
import { getThemedFormStateColors } from '../form-state-color-styles';

const checkedSVGBackgroundImage = getInlineSVGBackgroundImage(
  `<path d="m20.22,7.47l-1.47-1.42-9.26,9.02-4.24-4.15-1.47,1.42,5.71,5.6,10.73-10.47Z"/>`
);

const { canvasColor, disabledColor } = colors;

export const getCheckboxCheckedBaseStyles = (
  isDisabled?: boolean,
  isLoading?: boolean,
  state?: FormState
): JssStyle => {
  const disabledOrLoading = isDisabledOrLoading(isDisabled, isLoading);

  const { formStateBorderHoverColor } = getThemedFormStateColors(state);
  const checkedColor = disabledOrLoading ? disabledColor : formStateBorderHoverColor;

  return {
    borderColor: checkedColor,
    backgroundColor: checkedColor,
    '&::before': {
      WebkitMask: `${checkedSVGBackgroundImage} center/24px 24px no-repeat`,
      mask: `${checkedSVGBackgroundImage} center/24px 24px no-repeat`,
      backgroundColor: canvasColor,
      transition: getTransition('background-color'),
    },
  };
};
