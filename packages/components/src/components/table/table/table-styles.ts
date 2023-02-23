import {
  textSmallStyle,
  spacingStaticSmall,
  spacingStaticMedium,
  getMediaQueryMin,
} from '@porsche-design-system/utilities-v2';
import { buildSlottedStyles, getCss } from '../../../utils';
import { getBaseSlottedStyles, getThemedColors, addImportantToEachRule, hostHiddenStyles } from '../../../styles';

const { primaryColor } = getThemedColors('light');

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'block',
        ...hostHiddenStyles,
      }),
    },
    caption: {
      marginBottom: spacingStaticSmall,
      [getMediaQueryMin('m')]: {
        marginBottom: spacingStaticMedium,
      },
    },
    root: {
      position: 'relative',
    },
    table: {
      position: 'relative',
      width: '100%',
      display: 'table',
      ...textSmallStyle,
      textAlign: 'left',
      color: primaryColor,
      whiteSpace: 'nowrap',
    },
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(
    buildSlottedStyles(host, {
      ...getBaseSlottedStyles(),
      '& img': {
        verticalAlign: 'middle',
      },
    })
  );
};
