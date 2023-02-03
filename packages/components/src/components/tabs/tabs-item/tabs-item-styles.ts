import type { Theme } from '../../../types';
import { getCss } from '../../../utils';
import { addImportantToEachRule, getInsetJssStyle, getThemedColors } from '../../../styles';
import { hostHiddenStyles } from '../../../styles/host-hidden-styles';
import { borderRadiusSmall, borderWidthBase } from '@porsche-design-system/utilities-v2';

export const getComponentCss = (theme: Theme): string => {
  const { focusColor } = getThemedColors(theme);
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'block',
        position: 'relative',
        ...hostHiddenStyles,
        outline: 0,
        '&::before': {
          content: '""',
          position: 'absolute',
          ...getInsetJssStyle(-4),
        },
        '&(:focus)::before': {
          border: `${borderWidthBase} solid ${focusColor}`,
          borderRadius: borderRadiusSmall,
        },
        '&(:focus:not(:focus-visible))::before': {
          borderColor: 'transparent',
        },
      }),
    },
  });
};
