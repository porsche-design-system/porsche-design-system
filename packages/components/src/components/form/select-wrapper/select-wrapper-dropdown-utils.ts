import type { AriaAttributes } from 'react';
import type { DropdownDirection, DropdownDirectionInternal, OptionMap } from './select-wrapper-utils';
import { getHighlightedOptionMapIndex } from './select-wrapper-utils';
import {
  addImportantToEachRule,
  attachCss,
  buildGlobalStyles,
  buildHostStyles,
  getCss,
  getHTMLElements,
  isDark,
  pxToRemWithUnit,
  transitionDuration,
  transitionTimingFunction,
} from '../../../utils';
import type { JssStyle } from '../../../utils';
import type { Theme } from '../../../types';
import { color, font } from '@porsche-design-system/utilities';

export const getRootAriaAttributes = (optionMaps: OptionMap[], hidden: boolean, filter: boolean): AriaAttributes => ({
  'aria-activedescendant': !filter && `option-${getHighlightedOptionMapIndex(optionMaps)}`,
  'aria-expanded': !filter && !hidden,
});

export const getOptionAriaAttributes = ({
  value,
  highlighted,
  hidden,
  disabled,
  initiallyHidden,
}: OptionMap): AriaAttributes => ({
  'aria-selected': highlighted ? 'true' : null,
  'aria-disabled': disabled ? 'true' : null,
  'aria-hidden': hidden || initiallyHidden ? 'true' : null,
  'aria-label': !value ? 'Empty value' : null,
});

const OPTION_HEIGHT = 24; // opgroups are higher and ignored
const SELECT_HEIGHT = 48;
const MAX_CHILDREN = 10;

export const determineDropdownDirection = (host: HTMLElement): DropdownDirectionInternal => {
  const { length } = getHTMLElements(host.shadowRoot, '.option:not([aria-hidden="true"])');
  const { top: spaceTop } = host.getBoundingClientRect();

  const listHeight = length >= MAX_CHILDREN ? OPTION_HEIGHT * MAX_CHILDREN : OPTION_HEIGHT * length;
  const spaceBottom = window.innerHeight - spaceTop - SELECT_HEIGHT;
  return spaceBottom <= listHeight && spaceTop >= listHeight ? 'up' : 'down';
};

export const handleScroll = (host: HTMLElement, highlightedIndex: number): void => {
  const hostElementHeightThreshold = 200; // ??
  const { scrollHeight, scrollTop } = host;

  if (scrollHeight > hostElementHeightThreshold) {
    const fakeOptionHighlightedNode = getHTMLElements(host.shadowRoot, 'div')[highlightedIndex];

    if (fakeOptionHighlightedNode) {
      const { offsetTop, offsetHeight } = fakeOptionHighlightedNode;
      const scrollBottom = hostElementHeightThreshold + scrollTop;
      const elementBottom = offsetTop + offsetHeight;
      if (elementBottom > scrollBottom) {
        host.scrollTop = elementBottom - hostElementHeightThreshold;
      } else if (offsetTop < scrollTop) {
        host.scrollTop = offsetTop;
      }
    }
  }
};

const staticHostStyles: JssStyle = {
  fontFamily: font.family,
  ...font.size.small,
  display: 'block',
  position: 'absolute',
  zIndex: 10,
  left: 0,
  right: 0,
  maxHeight: pxToRemWithUnit(308),
  overflowY: 'auto',
  WebkitOverflowScrolling: 'touch',
  scrollBehavior: 'smooth',
  background: color.background.default,
  border: `1px solid ${color.neutralContrast.medium}`,
  scrollbarWidth: 'thin', // firefox
  scrollbarColor: 'auto', // firefox
  transition: `border-color ${transitionDuration} ${transitionTimingFunction}`,
  transform: 'translate3d(0,0,0)', // fix iOS bug if less than 5 items are displayed
  '&:focus': {
    outline: 'none',
  },
};

export const getComponentCss = (direction: DropdownDirectionInternal, hidden: boolean, theme: Theme): string => {
  const isDarkTheme = isDark(theme);
  const isDirectionDown = direction === 'down';
  const { darkTheme } = color;

  return getCss({
    ...buildHostStyles(
      addImportantToEachRule({
        ...staticHostStyles,
        '&:hover': {
          borderColor: isDarkTheme ? darkTheme.neutralContrast.high : color.neutralContrast.high,
        },
        ...(isDarkTheme && {
          borderColor: darkTheme.neutralContrast.medium,
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
        ...(hidden && {
          top: 'calc(100% - 3px)',
          opacity: 0,
          overflow: 'hidden',
          height: 1,
          pointerEvents: 'none',
        }),
      })
    ),
    ...buildGlobalStyles({
      a: {},
    }),
  });
};

export const addComponentCss = (
  host: HTMLElement,
  direction: DropdownDirection,
  hidden: boolean,
  theme: Theme
): void => {
  attachCss(host, getComponentCss(direction === 'auto' ? determineDropdownDirection(host) : direction, hidden, theme));
};
