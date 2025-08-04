import { fontWeightSemiBold, spacingStaticSmall, textXSmallStyle } from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getThemedColors,
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
} from '../../styles';
import type { Theme } from '../../types';
import { getCss } from '../../utils';

export const cssVarInternalOptgroupScaling = '--p-internal-optgroup-scaling';
const scalingVar = `var(${cssVarInternalOptgroupScaling}, 1)`;

export const getComponentCss = (isDisabled: boolean, theme: Theme): string => {
  const { primaryColor, disabledColor } = getThemedColors(theme);
  const { primaryColor: primaryColorDark, disabledColor: disabledColorDark } = getThemedColors('dark');

  const padding = `max(2px, ${scalingVar} * ${spacingStaticSmall}) max(4px, ${scalingVar} * 12px)`;
  const gap = `max(2px, ${scalingVar} * ${spacingStaticSmall})`;

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        ...colorSchemeStyles,
        ...hostHiddenStyles,
      }),
      '::slotted(*)': {
        '--p-internal-select-option-padding-left': '28px',
        '--p-internal-multi-select-option-padding-left': '28px',
      },
      '[role="group"]': {
        display: 'flex',
        flexDirection: 'column',
        gap,
      },
      '[role="presentation"]': {
        padding,
        font: textXSmallStyle.font.replace(' 400 ', ` ${fontWeightSemiBold} `),
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
      },
    },
  });
};
