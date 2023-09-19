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
import { escapeHashCharacter } from '../../utils/svg/escapeHashCharacter';

const getCheckedSVGBackgroundImage = (fill: string): string => {
  return getInlineSVGBackgroundImage(`<circle fill="${fill}" cx="12" cy="12" r="6"/>`);
};

export const getComponentCss = (
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  isDisabled: boolean,
  isLoading: boolean,
  theme: Theme
): string => {
  const checkedIconColor = isHighContrastMode
    ? getHighContrastColors().canvasColor
    : escapeHashCharacter(getInvertedThemedColors(theme).primaryColor);
  const checkedIconColorDark = isHighContrastMode
    ? getHighContrastColors().canvasColor
    : escapeHashCharacter(getInvertedThemedColors('dark').primaryColor);

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
