import type { AriaAttributes } from 'react';
import type { DropdownDirectionInternal, OptionMap } from '../select-wrapper/select-wrapper-utils';
import { getHighlightedOptionMapIndex } from '../select-wrapper/select-wrapper-utils';
import { getHTMLElements } from '../../../../utils';

export const OPTION_HEIGHT = 24; // optgroups are higher and ignored
export const SELECT_HEIGHT = 48; // TODO: should be used in select-wrapper with JSS at some point
const MAX_CHILDREN = 10;

export const getAriaAttributes = (optionMaps: OptionMap[], isOpen: boolean, hasFilter: boolean): AriaAttributes => {
  const highlightedIndex = getHighlightedOptionMapIndex(optionMaps);
  return hasFilter
    ? {}
    : {
        ...(highlightedIndex >= 0 && { 'aria-activedescendant': `option-${highlightedIndex}` }),
        'aria-expanded': isOpen ? 'true' : 'false',
      };
};

export const getOptionAriaAttributes = (option: OptionMap): AriaAttributes => ({
  'aria-selected': option.highlighted ? 'true' : null,
  'aria-disabled': option.disabled ? 'true' : null,
  'aria-hidden': option.hidden || option.initiallyHidden ? 'true' : null,
  'aria-label': option.value ? null : 'Empty value',
});

export const determineDirection = (host: HTMLElement): DropdownDirectionInternal => {
  const { length } = getHTMLElements(host.shadowRoot, '.option:not([aria-hidden="true"])');
  const { top } = host.getBoundingClientRect();

  const listHeight = length >= MAX_CHILDREN ? OPTION_HEIGHT * MAX_CHILDREN : OPTION_HEIGHT * length;
  const spaceBottom = window.innerHeight - top - SELECT_HEIGHT;
  return spaceBottom <= listHeight && top >= listHeight ? 'up' : 'down';
};

export const handleScroll = (host: HTMLElement, highlightedIndex: number): void => {
  const hostElementHeightThreshold = 200; // ??
  const { scrollHeight, scrollTop } = host;

  if (scrollHeight > hostElementHeightThreshold) {
    const highlightedNode = getHTMLElements(host.shadowRoot, 'div')[highlightedIndex];

    if (highlightedNode) {
      const { offsetTop, offsetHeight } = highlightedNode;
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
