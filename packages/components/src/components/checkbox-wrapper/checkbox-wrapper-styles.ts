import type { BreakpointCustomizable, Theme } from '../../types';
import { getCheckboxRadioJssStyle } from '../../styles/checkbox-radio-styles';
import type { FormState } from '../../utils/form/form-state';
import { getCss, mergeDeep } from '../../utils';
import { getInlineSVGBackgroundImage } from '../../utils/svg/getInlineSVGBackgroundImage';
import { addImportantToEachRule, getThemedColors } from '../../styles';
import { borderRadiusMedium, borderRadiusSmall } from '@porsche-design-system/utilities-v2';

export const getComponentCss = (
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  isDisabled: boolean,
  theme: Theme
): string => {
  const checkedIconColor = getThemedColors(theme === 'light' ? 'dark' : 'light').primaryColor.replace(/#/g, '%23');
  const indeterminateIconColor = getThemedColors(theme).primaryColor.replace(/#/g, '%23');

  return getCss(
    mergeDeep(getCheckboxRadioJssStyle(hideLabel, state, isDisabled, theme), {
      '@global': {
        '::slotted': addImportantToEachRule({
          '&(input)': {
            borderRadius: borderRadiusSmall,
          },
          '&(input:checked)': {
            backgroundImage: getInlineSVGBackgroundImage(
              `<path fill="${checkedIconColor}" d="m20.22,7.47l-1.47-1.42-9.26,9.02-4.24-4.15-1.47,1.42,5.71,5.6,10.73-10.47Z"/>`
            ),
          },
          '&(input:indeterminate)': {
            backgroundImage: getInlineSVGBackgroundImage(
              `<path fill="${indeterminateIconColor}" d="m20,11v2H4v-2h16Z"/>`
            ),
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
