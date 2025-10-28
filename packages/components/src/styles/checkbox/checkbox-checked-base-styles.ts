import type { JssStyle } from 'jss';
import { isDisabledOrLoading, isHighContrastMode, type Theme } from '../../utils';
import type { FormState } from '../../utils/form/form-state';
import { escapeHashCharacter } from '../../utils/svg/escapeHashCharacter';
import { getInlineSVGBackgroundImage } from '../../utils/svg/getInlineSVGBackgroundImage';
import { getHighContrastColors, getThemedColors } from '../colors';
import { getThemedFormStateColors } from '../form-state-color-styles';
import { prefersColorSchemeDarkMediaQuery } from '../prefers-color-scheme-dark-media-query';
import { getSchemedHighContrastMediaQuery } from '../schemed-high-contrast-media-query';

export const getCheckedSVGBackgroundImage = (fill: string): string => {
  return getInlineSVGBackgroundImage(
    `<path fill="${fill}" d="m20.22,7.47l-1.47-1.42-9.26,9.02-4.24-4.15-1.47,1.42,5.71,5.6,10.73-10.47Z"/>`
  );
};

export const getCheckboxCheckedBaseStyles = (
  theme: Theme,
  isDisabled?: boolean,
  isLoading?: boolean,
  state?: FormState
): JssStyle => {
  const { primaryColor, primaryInvertedColor, contrast40Color } = getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    primaryInvertedColor: primaryInvertedColorDark,
    contrast40Color: contrast40ColorDark,
  } = getThemedColors('dark');
  const { formStateColor } = getThemedFormStateColors(theme, state);
  const { formStateColor: formStateColorDark } = getThemedFormStateColors('dark', state);
  const { canvasTextColor } = getHighContrastColors();
  const disabledOrLoading = isDisabledOrLoading(isDisabled, isLoading);

  // TODO: needs to be extracted into a color function
  const checkedColor = isHighContrastMode
    ? canvasTextColor
    : disabledOrLoading
      ? contrast40Color
      : formStateColor || primaryColor;
  const checkedColorDark = isHighContrastMode
    ? canvasTextColor
    : disabledOrLoading
      ? contrast40ColorDark
      : formStateColorDark || primaryColorDark;

  const checkedIconColor = escapeHashCharacter(primaryInvertedColor);
  const checkedIconColorDark = escapeHashCharacter(primaryInvertedColorDark);

  return {
    borderColor: checkedColor,
    backgroundColor: checkedColor,
    backgroundImage: getCheckedSVGBackgroundImage(checkedIconColor),
    ...prefersColorSchemeDarkMediaQuery(theme, {
      backgroundImage: getCheckedSVGBackgroundImage(checkedIconColorDark),
      borderColor: checkedColorDark,
      backgroundColor: checkedColorDark,
    }),
    // This is a workaround for Blink based browsers, which do not reflect the high contrast system colors (e.g.: "Canvas" and "CanvasText") when added to background SVG's.
    ...(isHighContrastMode &&
      getSchemedHighContrastMediaQuery(
        {
          backgroundImage: getCheckedSVGBackgroundImage('white'),
        },
        {
          backgroundImage: getCheckedSVGBackgroundImage('black'),
        }
      )),
  };
};
