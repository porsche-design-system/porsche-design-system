import {
  addImportantToEachRule,
  attachCss,
  buildHostStyles,
  buildSlottedStyles,
  getBaseSlottedStyles,
  getCss,
  getFocusStyles,
  insertSlottedStyles,
  mediaQuery,
  pxToRemWithUnit,
} from '../../../../utils';
import { color, font, spacing } from '@porsche-design-system/utilities';

export const getComponentCss = (): string => {
  return getCss({
    ...buildHostStyles(
      addImportantToEachRule({
        display: 'block',
      })
    ),
    caption: {
      marginBottom: spacing['8'],
      [mediaQuery('m')]: {
        marginBottom: spacing['16'],
      },
    },
    root: {
      position: 'relative',
    },
    'scroll-area': {
      overflow: 'auto visible',
      ...getFocusStyles({ offset: -1 }),
    },
    table: {
      position: 'relative',
      width: '100%',
      display: 'table',
      fontFamily: font.family,
      fontWeight: font.weight.regular,
      ...font.size.small,
      textAlign: 'left',
      color: color.default,
      whiteSpace: 'nowrap',
    },
    'scroll-trigger': {
      position: 'absolute',
      top: 0,
      right: 1,
      width: 1,
      height: 1,
      visibility: 'hidden',
    },
    'scroll-indicator': {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      paddingLeft: spacing['32'],
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

export const addComponentCss = (host: HTMLElement): void => {
  attachCss(host, getComponentCss);
};

export const addSlottedCss = (host: HTMLElement): void => {
  insertSlottedStyles(host, getSlottedCss(host));
};
