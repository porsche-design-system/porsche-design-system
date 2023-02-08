import {
  textSmallStyle,
  spacingStaticSmall,
  spacingStaticMedium,
  spacingStaticLarge,
  getMediaQueryMin,
} from '@porsche-design-system/utilities-v2';
import { buildSlottedStyles, getCss } from '../../../utils';
import {
  getBaseSlottedStyles,
  getFocusJssStyle,
  pxToRemWithUnit,
  getThemedColors,
  addImportantToEachRule,
  hostHiddenStyles,
} from '../../../styles';

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
    'scroll-area': {
      overflow: 'auto visible',
      ...getFocusJssStyle({ offset: -1 }),
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
    'scroll-trigger': {
      position: 'absolute',
      top: 0,
      right: '1px',
      width: '1px',
      height: '1px',
      visibility: 'hidden',
    },
    'scroll-indicator': {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      paddingLeft: spacingStaticLarge,
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      background: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%)',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: pxToRemWithUnit(48),
        pointerEvents: 'auto',
      },
    },
    'scroll-button': {
      padding: pxToRemWithUnit(12),
      pointerEvents: 'auto',
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
