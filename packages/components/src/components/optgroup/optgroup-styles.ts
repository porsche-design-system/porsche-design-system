import type { Theme } from '../../types';
import { getCss } from '../../utils';
import { addImportantToEachRule, getThemedColors, prefersColorSchemeDarkMediaQuery } from '../../styles';
import { fontSizeTextXSmall, fontWeightSemiBold, spacingStaticSmall } from '@porsche-design-system/utilities-v2';
import type { Styles } from 'jss';
import { cssVariableSelectPaddingLeft } from '../select/select-option/select-option-styles';
import { cssVariableMultiSelectPaddingLeft } from '../multi-select/multi-select-option/multi-select-option-styles';

export const getComponentCss = (isDisabled: boolean, theme: Theme): string =>
  getCss({
    '@global': addImportantToEachRule({
      '::slotted(*)': {
        [cssVariableSelectPaddingLeft]: '24px',
        [cssVariableMultiSelectPaddingLeft]: '24px',
      },
    }),
    ...getOptgroupStyles(isDisabled, theme),
  });

export const getOptgroupStyles = (isDisabled: boolean, theme: Theme): Styles => {
  const { primaryColor, disabledColor } = getThemedColors(theme);
  const { primaryColor: primaryColorDark, disabledColor: disabledColorDark } = getThemedColors('dark');

  return {
    optgroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: spacingStaticSmall,
    },
    label: {
      ...(isDisabled && {
        color: disabledColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: disabledColorDark,
        }),
      }),
      ...(!isDisabled && {
        color: primaryColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: primaryColorDark,
        }),
      }),
      display: 'block',
      padding: '3px 14px',
      fontSize: fontSizeTextXSmall,
      fontWeight: fontWeightSemiBold,
    },
  };
};
