import type { AriaAttributes } from 'react';
import type { DropdownDirectionInternal, OptionMap } from './select-wrapper-utils';
import { getHighlightedIndex } from './select-wrapper-utils';
import { getHTMLElements } from '../../../utils';

export const getRootAriaAttributes = (optionMaps: OptionMap[], hidden: boolean, filter: boolean): AriaAttributes => ({
  'aria-activedescendant': !filter && `option-${getHighlightedIndex(optionMaps)}`,
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

export const handleScroll = (rootElement: HTMLElement, highlightedIndex: number): void => {
  const rootElementHeightThreshold = 200; // ??
  const { scrollHeight, scrollTop } = rootElement;

  if (scrollHeight > rootElementHeightThreshold) {
    const fakeOptionHighlightedNode = getHTMLElements(rootElement, 'div')[highlightedIndex];

    if (fakeOptionHighlightedNode) {
      const { offsetTop, offsetHeight } = fakeOptionHighlightedNode;
      const scrollBottom = rootElementHeightThreshold + scrollTop;
      const elementBottom = offsetTop + offsetHeight;
      if (elementBottom > scrollBottom) {
        rootElement.scrollTop = elementBottom - rootElementHeightThreshold;
      } else if (offsetTop < scrollTop) {
        rootElement.scrollTop = offsetTop;
      }
    }
  }
};
