import type { AriaAttributes } from 'react';
import type { DropdownDirection, DropdownDirectionInternal, OptionMap } from '../select-wrapper/select-wrapper-utils';
import { getHighlightedOptionMapIndex } from '../select-wrapper/select-wrapper-utils';
import { attachCss, getHTMLElements } from '../../../../utils';
import type { Theme } from '../../../../types';
import { getComponentCss } from './select-wrapper-dropdown-styles';

export const OPTION_HEIGHT = 24; // optgroups are higher and ignored
export const SELECT_HEIGHT = 48; // TODO: should be used in select-wrapper
const MAX_CHILDREN = 10;

export const getRootAriaAttributes = (optionMaps: OptionMap[], open: boolean, filter: boolean): AriaAttributes => {
  const highlightedIndex = getHighlightedOptionMapIndex(optionMaps);
  return filter
    ? {}
    : {
        ...(highlightedIndex >= 0 && { 'aria-activedescendant': `option-${getHighlightedOptionMapIndex(optionMaps)}` }),
        'aria-expanded': open,
      };
};

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

export const determineDirection = (host: HTMLElement): DropdownDirectionInternal => {
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

export const addComponentCss = (
  host: HTMLElement,
  direction: DropdownDirection,
  isOpen: boolean,
  theme: Theme
): void => {
  attachCss(host, getComponentCss(direction === 'auto' ? determineDirection(host) : direction, isOpen, theme));
};
