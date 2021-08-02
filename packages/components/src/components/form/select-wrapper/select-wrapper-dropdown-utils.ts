import { AriaAttributes } from 'react';
import { getHighlightedIndex, OptionMap } from './select-wrapper-utils';

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
