import {
  addImportantToEachRule,
  attachCss,
  buildGlobalStyles,
  buildHostStyles,
  getCss,
  getFocusStyles,
  getHoverStyles,
  getScreenReaderJssStyle,
  pxToRemWithUnit,
  transitionDuration,
  transitionTimingFunction,
} from '../../../../utils';
import { color, font, spacing } from '@porsche-design-system/utilities';

export const getComponentCss = (): string => {
  return getCss({
    ...buildHostStyles(
      addImportantToEachRule({
        display: 'table-cell',
        padding: `${pxToRemWithUnit(2)} ${pxToRemWithUnit(12)} ${pxToRemWithUnit(8)}`,
        borderBottom: `1px solid ${color.neutralContrast.medium}`,
        verticalAlign: 'bottom',
        fontWeight: font.weight.semibold,
        whiteSpace: 'nowrap',
      })
    ),
    ...buildGlobalStyles({
      button: {
        display: 'flex',
        alignItems: 'flex-end',
        padding: 0,
        boxSizing: 'border-box',
        appearance: 'none',
        border: 'none',
        fontFamily: font.family,
        ...font.size.small,
        fontWeight: font.weight.semibold,
        color: color.default,
        textDecoration: 'none',
        textAlign: 'left',
        background: 'transparent',
        cursor: 'pointer',
        ...getHoverStyles(),
        ...getFocusStyles({ offset: 1 }),
        '&:hover, &:focus': {
          '& .icon': {
            opacity: 1,
          },
        },
      },
    }),
    hidden: getScreenReaderJssStyle(),
    icon: {
      marginLeft: spacing['4'],
      opacity: 0,
      transition: `opacity ${transitionDuration} ${transitionTimingFunction}`,
      transform: 'rotate3d(0, 0, 1, 0deg)',
      transformOrigin: '50% 50%', // for iOS
      '&--asc': {
        transform: 'rotate3d(0, 0, 1, 180deg)',
      },
      '&--active': {
        opacity: 1,
      },
    },
  });
};

export const addComponentCss = (host: HTMLElement): void => {
  attachCss(host, getComponentCss());
};
