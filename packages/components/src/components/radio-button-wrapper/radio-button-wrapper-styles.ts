import type { BreakpointCustomizable, Theme } from '../../types';
import {
  addImportantToEachRule,
  getHighContrastColors,
  getInvertedThemedColors,
  prefersColorSchemeDarkMediaQuery,
} from '../../styles';
import { getCheckboxRadioJssStyle } from '../../styles/checkbox-radio-styles';
import { getCss, isHighContrastMode, mergeDeep } from '../../utils';
import type { FormState } from '../../utils/form/form-state';
import { getInlineSVGBackgroundImage } from '../../utils/svg/getInlineSVGBackgroundImage';

export const getComponentCss = (
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  isDisabled: boolean,
  isLoading: boolean,
  theme: Theme
): string => {
  const checkedIconColor = isHighContrastMode
    ? getHighContrastColors().canvasColor
    : getInvertedThemedColors(theme).primaryColor.replace(/#/g, '%23');
  const checkedIconColorDark = isHighContrastMode
    ? getHighContrastColors().canvasColor
    : getInvertedThemedColors('dark').primaryColor.replace(/#/g, '%23');

  const getCheckedSVGBackgroundImage = (fill: string): string => {
    return getInlineSVGBackgroundImage(`<circle fill="${fill}" cx="12" cy="12" r="6"/>`);
  };

  return getCss(
    mergeDeep(getCheckboxRadioJssStyle(hideLabel, state, isDisabled, isLoading, theme), {
      '@global': {
        '::slotted': addImportantToEachRule({
          '&(input)': {
            borderRadius: '50%',
          },
          '&(input:checked)': {
            backgroundImage: getCheckedSVGBackgroundImage(checkedIconColor),
            ...prefersColorSchemeDarkMediaQuery(theme, {
              backgroundImage: getCheckedSVGBackgroundImage(checkedIconColorDark),
            }),
          },
          ...(!isDisabled && {
            '&(input:focus)::before': {
              borderRadius: '50%',
            },
          }),
        }),
      },
    })
  );
};
