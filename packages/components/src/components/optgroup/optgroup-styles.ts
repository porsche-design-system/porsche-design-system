import type { Theme } from '../../types';
import { getCss } from '../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getThemedColors,
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
} from '../../styles';
import { fontSizeTextXSmall, fontWeightSemiBold, spacingStaticSmall } from '@porsche-design-system/styles';
import type { Styles } from 'jss';
import { cssVariableSelectPaddingInlineStart } from '../select/select-option/select-option-styles';
import { cssVariableMultiSelectPaddingInlineStart } from '../multi-select/multi-select-option/multi-select-option-styles';

export const getComponentCss = (isDisabled: boolean, theme: Theme): string =>
  getCss({
    '@global': {
      ':host': addImportantToEachRule({
        ...colorSchemeStyles,
        ...hostHiddenStyles,
      }),
      '::slotted(*)': {
        [cssVariableSelectPaddingInlineStart]: '28px',
        [cssVariableMultiSelectPaddingInlineStart]: '28px',
      },
    },
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
      color: primaryColor,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        color: primaryColorDark,
      }),
      ...(isDisabled && {
        color: disabledColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: disabledColorDark,
        }),
      }),
      display: 'block',
      padding: `${spacingStaticSmall} 12px`,
      fontSize: fontSizeTextXSmall,
      fontWeight: fontWeightSemiBold,
    },
  };
};
