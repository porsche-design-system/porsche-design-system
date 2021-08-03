import type { DropdownDirectionInternal } from './select-wrapper-utils';
import {
  addImportantToEachRule,
  buildHostStyles,
  getCss,
  getScreenReaderJssStyle,
  isDark,
  pxToRemWithUnit,
  transitionDuration,
  transitionTimingFunction,
} from '../../../utils';
import type { Theme } from '../../../types';
import { color, font } from '@porsche-design-system/utilities';
import { OPTION_HEIGHT } from './select-wrapper-dropdown-utils';

const dropdownPositionVar = '--p-dropdown-position';

export const getComponentCss = (direction: DropdownDirectionInternal, isOpen: boolean, theme: Theme): string => {
  const isDarkTheme = isDark(theme);
  const isDirectionDown = direction === 'down';
  const { darkTheme } = color;

  return getCss({
    ...buildHostStyles({
      [dropdownPositionVar]: 'absolute',
      // borderColors are not set with !important to allow color override via parent
      borderColor: isDarkTheme ? darkTheme.neutralContrast.medium : color.neutralContrast.medium,
      '&:hover': {
        borderColor: isDarkTheme ? darkTheme.neutralContrast.high : color.neutralContrast.high,
      },
      ...addImportantToEachRule({
        fontFamily: font.family,
        ...font.size.small,
        display: 'block',
        position: `var(${dropdownPositionVar})`,
        zIndex: 10,
        left: 0,
        right: 0,
        maxHeight: pxToRemWithUnit(308),
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth',
        color: isDarkTheme ? darkTheme.default : color.default,
        background: color.background.default,
        borderWidth: '1px', // separate css property to allow color override via parent
        borderStyle: 'solid', // separate css property to allow color override via parent
        scrollbarWidth: 'thin', // firefox
        scrollbarColor: 'auto', // firefox
        transition: `border-color ${transitionDuration} ${transitionTimingFunction}`,
        transform: 'translate3d(0,0,0)', // fix iOS bug if less than 5 items are displayed
        outline: 'none',
        ...(isDarkTheme && {
          background: darkTheme.background.default,
        }),
        ...(isDirectionDown
          ? {
              top: 'calc(100% - 1px)',
              borderTop: 'none',
              boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.05), 0 12px 25px 0 rgba(0, 0, 0, 0.1)',
              '&::before': {
                content: '""',
                display: 'block',
                position: 'sticky',
                top: 0,
                width: '100%',
                height: '1px',
                background: isDarkTheme ? darkTheme.neutralContrast.low : color.neutralContrast.low,
              },
            }
          : {
              bottom: pxToRemWithUnit(47),
              borderBottom: 'none',
              boxShadow: '0 -2px 4px 0 rgba(0, 0, 0, 0.05), 0 -12px 25px 0 rgba(0, 0, 0, 0.075)',
              '&::after': {
                content: '""',
                display: 'block',
                position: 'sticky',
                bottom: 0,
                width: '100%',
                height: '1px',
                background: isDarkTheme ? darkTheme.neutralContrast.low : color.neutralContrast.low,
              },
            }),
        ...(!isOpen && {
          top: 'calc(100% - 3px)',
          opacity: 0,
          overflow: 'hidden',
          height: 1,
          pointerEvents: 'none',
        }),
      }),
    }),
    option: {
      display: 'flex',
      padding: `${pxToRemWithUnit(4)} ${pxToRemWithUnit(11)}`,
      minHeight: pxToRemWithUnit(OPTION_HEIGHT),
      cursor: 'pointer',
      textAlign: 'left',
      wordBreak: 'break-word',
      transition:
        `color ${transitionDuration} ${transitionTimingFunction},` +
        `background-color ${transitionDuration} ${transitionTimingFunction}`,
      '&[role="status"]': {
        cursor: 'not-allowed',
      },
      '&__sr': getScreenReaderJssStyle(),
      '&:not([aria-disabled]):not([role="status"]):hover': {
        color: isDarkTheme ? darkTheme.state.hover : color.state.hover,
        background: isDarkTheme ? color.default : color.background.surface,
      },
      '&--highlighted, &--selected': {
        color: isDarkTheme ? darkTheme.state.active : color.state.active,
        background: isDarkTheme ? color.default : color.background.surface,
      },
      '&--selected': {
        cursor: 'default',
        pointerEvents: 'none',
      },
      '&--disabled': {
        cursor: 'not-allowed',
        color: isDarkTheme ? darkTheme.state.disabled : color.state.disabled,
      },
      '&--hidden': {
        display: 'none',
      },
    },
    icon: {
      marginLeft: pxToRemWithUnit(4),
    },
    optgroup: {
      display: 'block',
      padding: `${pxToRemWithUnit(8)} ${pxToRemWithUnit(12)}`,
      marginTop: pxToRemWithUnit(8),
      fontWeight: font.weight.bold,
      '& ~ .option': {
        paddingLeft: pxToRemWithUnit(24),
      },
    },
  });
};
