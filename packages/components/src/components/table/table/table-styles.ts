import { textSmall, spacing, mediaQueryMin } from '@porsche-design-system/utilities-v2';
import { buildSlottedStyles, getCss } from '../../../utils';
import {
  addImportantToRule,
  getBaseSlottedStyles,
  getFocusJssStyle,
  pxToRemWithUnit,
  getThemedColors,
} from '../../../styles';

const { baseColor } = getThemedColors('light');
const { small: spacingSmall, medium: spacingMedium, large: spacingLarge } = spacing;

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': {
        display: addImportantToRule('block'),
      },
    },
    caption: {
      marginBottom: spacingSmall,
      [mediaQueryMin('m')]: {
        marginBottom: spacingMedium,
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
      ...textSmall,
      textAlign: 'left',
      color: baseColor,
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
      paddingLeft: spacingLarge,
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
