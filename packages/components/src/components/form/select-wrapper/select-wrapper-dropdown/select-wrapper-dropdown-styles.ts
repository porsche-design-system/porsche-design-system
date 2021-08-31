import type { DropdownDirection, DropdownDirectionInternal } from '../select-wrapper/select-wrapper-utils';
import {
  addImportantToEachRule,
  attachCss,
  buildHostStyles,
  getCss,
  getTextHiddenJssStyle,
  isDark,
  pxToRemWithUnit,
  transitionDuration,
  transitionTimingFunction,
} from '../../../../utils';
import type { Theme } from '../../../../types';
import { color, font } from '@porsche-design-system/utilities';
import { determineDirection } from './select-wrapper-dropdown-utils';
import { OPTION_HEIGHT } from '../select-wrapper/select-wrapper-styles';

const dropdownPositionVar = '--p-dropdown-position';

export const getComponentCss = (direction: DropdownDirectionInternal, isOpen: boolean, theme: Theme): string => {
  const isDirectionDown = direction === 'down';
  const isDarkTheme = isDark(theme);
  const {
    default: textColor,
    background: { default: backgroundColor },
    neutralContrast: { low: contrastLowColor, medium: contrastMediumColor, high: contrastHighColor },
    state: { hover: hoverColor, active: activeColor, disabled: disabledColor },
  } = isDarkTheme ? color.darkTheme : color;
  const highlightedSelectedColor = isDarkTheme ? color.default : color.background.surface; // strange that surfaceColor isn't used for dark theme

  return getCss({
    ...buildHostStyles({
      [dropdownPositionVar]: 'absolute',
      // borderColors are not set with !important to allow color override via parent
      borderColor: contrastMediumColor,
      '&:hover': {
        borderColor: contrastHighColor,
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
        color: textColor,
        background: backgroundColor,
        borderWidth: '1px', // separate css property to allow color override via parent
        borderStyle: 'solid', // separate css property to allow color override via parent
        scrollbarWidth: 'thin', // firefox
        scrollbarColor: 'auto', // firefox
        transition: `border-color ${transitionDuration} ${transitionTimingFunction}`,
        transform: 'translate3d(0,0,0)', // fix iOS bug if less than 5 items are displayed
        outline: 'none',
        ...(isDirectionDown
          ? {
              top: 'calc(100%-1px)',
              borderTop: 'none',
              boxShadow: '0 2px 4px 0 rgba(0,0,0,.05), 0 12px 25px 0 rgba(0,0,0,.1)',
              '&::before': {
                content: '""',
                display: 'block',
                position: 'sticky',
                top: 0,
                width: '100%',
                height: '1px',
                background: contrastLowColor,
              },
            }
          : {
              bottom: pxToRemWithUnit(47),
              borderBottom: 'none',
              boxShadow: '0 -2px 4px 0 rgba(0,0,0,.05), 0 -12px 25px 0 rgba(0,0,0,.075)',
              '&::after': {
                content: '""',
                display: 'block',
                position: 'sticky',
                bottom: 0,
                width: '100%',
                height: '1px',
                background: contrastLowColor,
              },
            }),
        ...(!isOpen && {
          top: 'calc(100%-3px)',
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
      '&__sr': getTextHiddenJssStyle(true),
      '&:not([aria-disabled]):not([role="status"]):hover': {
        color: hoverColor,
        background: highlightedSelectedColor,
      },
      '&--highlighted, &--selected': {
        color: activeColor,
        background: highlightedSelectedColor,
      },
      '&--selected': {
        cursor: 'default',
        pointerEvents: 'none',
      },
      '&--disabled': {
        cursor: 'not-allowed',
        color: disabledColor,
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
      '&~$option': {
        paddingLeft: pxToRemWithUnit(24),
      },
    },
  });
};

export const addComponentCss = (
  host: HTMLElement,
  direction: DropdownDirection,
  isOpen: boolean,
  theme: Theme
): void => {
  attachCss(host, getComponentCss(direction === 'auto' ? determineDirection(host) : direction, isOpen, theme));
};
