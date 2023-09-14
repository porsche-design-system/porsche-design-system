import type { BreakpointCustomizable, Theme } from '../../types';
import { getCheckboxRadioJssStyle } from '../../styles/checkbox-radio-styles';
import type { FormState } from '../../utils/form/form-state';
import { getCss, isHighContrastMode, mergeDeep } from '../../utils';
import { getInlineSVGBackgroundImage } from '../../utils/svg/getInlineSVGBackgroundImage';
import {
  addImportantToEachRule,
  getHighContrastColors,
  getInvertedThemedColors,
  getThemedColors,
  prefersColorSchemeDarkMediaQuery,
} from '../../styles';
import { borderRadiusMedium, borderRadiusSmall } from '@porsche-design-system/utilities-v2';

export const getComponentCss = (
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  isDisabled: boolean,
  isLoading: boolean,
  theme: Theme
): string => {
  const { canvasColor } = getHighContrastColors();
  const checkedIconColor = isHighContrastMode
    ? canvasColor
    : getInvertedThemedColors(theme).primaryColor.replace(/#/g, '%23');
  const checkedIconColorDark = isHighContrastMode
    ? canvasColor
    : getInvertedThemedColors('dark').primaryColor.replace(/#/g, '%23');
  const indeterminateIconColor = isHighContrastMode
    ? canvasColor
    : getThemedColors(theme).primaryColor.replace(/#/g, '%23');
  const indeterminateIconColorDark = isHighContrastMode
    ? canvasColor
    : getThemedColors('dark').primaryColor.replace(/#/g, '%23');

  const getCheckedSVGBackgroundImage = (fill: string): string => {
    return getInlineSVGBackgroundImage(
      `<path fill="${fill}" d="m20.22,7.47l-1.47-1.42-9.26,9.02-4.24-4.15-1.47,1.42,5.71,5.6,10.73-10.47Z"/>`
    );
  };

  const getIndeterminateSVGBackgroundImage = (fill: string): string => {
    return getInlineSVGBackgroundImage(`<path fill="${fill}" d="m20,11v2H4v-2h16Z"/>`);
  };

  return getCss(
    mergeDeep(getCheckboxRadioJssStyle(hideLabel, state, isDisabled, isLoading, theme), {
      '@global': {
        '::slotted': addImportantToEachRule({
          '&(input)': {
            borderRadius: borderRadiusSmall,
          },
          ...(!isLoading && {
            '&(input:checked)': {
              backgroundImage: getCheckedSVGBackgroundImage(checkedIconColor),
              ...prefersColorSchemeDarkMediaQuery(theme, {
                backgroundImage: getCheckedSVGBackgroundImage(checkedIconColorDark),
              }),
            },
          }),
          '&(input:indeterminate)': {
            backgroundImage: getIndeterminateSVGBackgroundImage(indeterminateIconColor),
            ...prefersColorSchemeDarkMediaQuery(theme, {
              backgroundImage: getIndeterminateSVGBackgroundImage(indeterminateIconColorDark),
            }),
          },
          ...(!isDisabled && {
            '&(input:focus)::before': {
              borderRadius: borderRadiusMedium,
            },
          }),
        }),
      },
    })
  );
};
