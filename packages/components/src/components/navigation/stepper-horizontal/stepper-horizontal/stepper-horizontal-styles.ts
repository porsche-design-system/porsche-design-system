import { getCss } from '../../../../utils';
import { addImportantToEachRule, getThemedColors } from '../../../../styles';
import { getFunctionalComponentHorizontalScrollWrapperStyles } from '../../../common/horizontal-scrolling/horizontal-scroll-wrapper-styles';
import type { Theme } from '../../../../types';

export const getComponentCss = (theme: Theme): string => {
  const { backgroundColor } = getThemedColors(theme);
  const gradientColorTransparent = backgroundColor + (backgroundColor.length === 4 ? '0' : '00');

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        counterReset: 'count',
      }),
      '::slotted(*:not(:last-child))': {
        marginRight: '1em',
      },
    },
    ...getFunctionalComponentHorizontalScrollWrapperStyles(backgroundColor, gradientColorTransparent),
  });
};
