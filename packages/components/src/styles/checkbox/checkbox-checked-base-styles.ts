import type { JssStyle } from 'jss';
import { isDisabledOrLoading } from '../../utils';
import type { FormState } from '../../utils/form/form-state';
import { escapeHashCharacter } from '../../utils/svg/escapeHashCharacter';
import { getInlineSVGBackgroundImage } from '../../utils/svg/getInlineSVGBackgroundImage';
import { colors } from '../colors';
import { getThemedFormStateColors } from '../form-state-color-styles';

export const getCheckedSVGBackgroundImage = (fill: string): string => {
  return getInlineSVGBackgroundImage(
    `<path fill="${fill}" d="m20.22,7.47l-1.47-1.42-9.26,9.02-4.24-4.15-1.47,1.42,5.71,5.6,10.73-10.47Z"/>`
  );
};

const { primaryColor, canvasColor, contrastDisabledColor } = colors;

export const getCheckboxCheckedBaseStyles = (
  isDisabled?: boolean,
  isLoading?: boolean,
  state?: FormState
): JssStyle => {
  const { formStateColor } = getThemedFormStateColors(state);
  const disabledOrLoading = isDisabledOrLoading(isDisabled, isLoading);

  // TODO: needs to be extracted into a color function
  const checkedColor = disabledOrLoading ? contrastDisabledColor : formStateColor || primaryColor;
  const checkedIconColor = escapeHashCharacter(canvasColor);

  return {
    borderColor: checkedColor,
    backgroundColor: checkedColor,
    backgroundImage: getCheckedSVGBackgroundImage(checkedIconColor),
  };
};
