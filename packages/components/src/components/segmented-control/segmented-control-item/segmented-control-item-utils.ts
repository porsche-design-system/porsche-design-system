import type { SegmentedControlBackgroundColor } from '../segmented-control/segmented-control-utils';
import type { Theme } from '../../../types';
import type { AriaAttributes } from '../../../types';
import { getButtonBaseAriaAttributes, parseAndGetAriaAttributes } from '../../../utils';

export type SegmentedControlItemInternalHTMLProps = {
  selected: boolean;
  backgroundColor: SegmentedControlBackgroundColor;
  theme: Theme;
};

export const getButtonAttributes = (isSelected: boolean, isDisabled: boolean): AriaAttributes => ({
  ...getButtonBaseAriaAttributes(isDisabled, false),
  ...parseAndGetAriaAttributes({ 'aria-selected': isSelected }),
});

export const isFirstElementChild = (host: HTMLElement): boolean => host.parentElement.firstElementChild === host;

export const parentHasValue = (host: HTMLElement): boolean =>
  !!(host.parentElement as HTMLPSegmentedControlElement).value;

export const isSegmentedControlItemFocusable = (host: HTMLElement, isSelected: boolean): boolean =>
  isSelected || (!parentHasValue(host) && isFirstElementChild(host));
