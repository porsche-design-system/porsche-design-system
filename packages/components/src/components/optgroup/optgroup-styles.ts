import { fontSizeTextXSmall, fontWeightSemiBold, spacingStaticSmall } from '@porsche-design-system/styles';
import type { Styles } from 'jss';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getThemedColors,
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
} from '../../styles';
import type { Theme } from '../../types';
import { getCss } from '../../utils';

const cssVarInternalOptgroupScaling = '--p-internal-optgroup-scaling';
const scalingVar = `var(${cssVarInternalOptgroupScaling}, 1)`;

export const getComponentCss = (isDisabled: boolean, theme: Theme): string =>
  getCss({
    '@global': {
      ':host': addImportantToEachRule({
        ...colorSchemeStyles,
        ...hostHiddenStyles,
      }),
      '::slotted(*)': {
        '--p-internal-select-option-padding-left': '28px',
        '--p-internal-multi-select-option-padding-left': '28px',
      },
    },
    ...getOptgroupStyles(isDisabled, theme),
  });

export const getOptgroupStyles = (isDisabled: boolean, theme: Theme): Styles => {
  const { primaryColor, disabledColor } = getThemedColors(theme);
  const { primaryColor: primaryColorDark, disabledColor: disabledColorDark } = getThemedColors('dark');

  const gap = `max(2px, ${scalingVar} * ${spacingStaticSmall})`;
  const padding = `max(2px, ${scalingVar} * ${spacingStaticSmall}) max(4px, ${scalingVar} * 12px)`;

  return {
    optgroup: {
      display: 'flex',
      flexDirection: 'column',
      gap,
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
      padding,
      fontSize: fontSizeTextXSmall,
      fontWeight: fontWeightSemiBold,
    },
  };
};
