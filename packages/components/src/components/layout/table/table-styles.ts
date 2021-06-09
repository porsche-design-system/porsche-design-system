import { color, font, spacing } from '@porsche-design-system/utilities';
import {
  buildHostStyles,
  getCss,
  mediaQuery,
  focus,
  transitionHoverDuration,
  transitionHoverBezier,
  hover,
  pxToRemWithUnit,
} from '../../../utils';

export const TABLE_COMPONENTS = [
  'table',
  'table-head',
  'table-head-row',
  'table-head-cell',
  'table-body',
  'table-row',
  'table-cell',
] as const;
type TableComponentType = typeof TABLE_COMPONENTS[number];

export const styles: { [key in TableComponentType]: string } = {
  table: getCss({
    ...buildHostStyles({
      display: 'block !important',
    }),
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
      right: 0,
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
  }),
  'table-head': getCss({
    ...buildHostStyles({
      display: 'table-header-group !important',
    }),
  }),
  'table-head-row': getCss({
    ...buildHostStyles({
      display: 'table-row !important',
    }),
  }),
  'table-head-cell': getCss({
    ...buildHostStyles({
      display: 'table-cell !important',
      padding: `${pxToRemWithUnit(2)} ${pxToRemWithUnit(12)} ${pxToRemWithUnit(8)} !important`,
      borderBottom: `1px solid ${color.neutralContrast.medium} !important`,
      verticalAlign: 'bottom !important',
      fontWeight: `${font.weight.bold} !important`,
      '& [data-hidden]': {
        position: 'absolute',
        width: 1,
        height: 1,
        display: 'block',
        margin: -1,
        padding: 0,
        overflow: 'hidden',
        border: 0,
        clip: 'rect(1px, 1px, 1px, 1px)',
        clipPath: 'inset(50%)',
      },
    }),
    button: {
      display: 'flex',
      alignItems: 'center',
      padding: 0,
      boxSizing: 'border-box',
      appearance: 'none',
      border: 'none',
      fontFamily: font.family,
      ...font.size.small,
      fontWeight: font.weight.bold,
      color: color.default,
      textDecoration: 'none',
      textAlign: 'left',
      background: 'transparent',
      cursor: 'pointer',
      ...hover(),
      ...focus({ offset: 1 }),
      '&:hover, &:focus': {
        '& .icon': {
          opacity: 1,
        },
      },
    },
    icon: {
      marginLeft: spacing['4'],
      opacity: 0,
      transition: `opacity ${transitionHoverDuration} ${transitionHoverBezier}`,
      '&--active': {
        opacity: 1,
      },
    },
  }),
  'table-body': getCss({
    ...buildHostStyles({
      display: 'table-row-group !important',
    }),
  }),
  'table-row': getCss({
    ...buildHostStyles({
      display: 'table-row !important',
      transition: `background-color ${transitionHoverDuration} ${transitionHoverBezier} !important`,
    }),
    ':host(:hover)': {
      backgroundColor: `${color.background.surface} !important`,
    },
  }),
  'table-cell': getCss({
    ...buildHostStyles({
      display: 'table-cell !important',
      padding: `${pxToRemWithUnit(12)} !important`,
      margin: '0 !important',
      verticalAlign: 'middle !important',
      borderBottom: `1px solid ${color.neutralContrast.low} !important`,
    }),
  }),
};

export const slottedStyles = {
  '& a': {
    color: 'inherit !important',
    textDecoration: 'underline !important',
    ...hover(),
    ...focus({ offset: 1 }),
  },
  '& b, & strong': {
    fontWeight: `${font.weight.bold} !important`,
  },
  '& em, & i': {
    fontStyle: 'normal !important',
  },
  '& img': {
    verticalAlign: 'middle !important',
  },
};
