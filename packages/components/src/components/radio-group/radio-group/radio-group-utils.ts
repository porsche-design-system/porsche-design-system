import { forceUpdate } from '@stencil/core';
import { consoleWarn, type Theme } from '../../../utils';
import type { FormState } from '../../../utils/form/form-state';
import type { RadioGroupOptionInternalHTMLProps } from '../radio-group-option/radio-group-option-utils';
import type { GroupDirection } from '../../../styles/group-direction-styles';
export type RadioGroupState = FormState;

export type RadioGroupDirection = GroupDirection;
export type RadioGroupOption = HTMLPRadioGroupOptionElement & RadioGroupOptionInternalHTMLProps;

export type RadioGroupChangeEventDetail = Event;

export const resetSelectedRadioGroupOption = (options: RadioGroupOption[]): void => {
  const currentSelectedOption = options.find((option) => option.selected);
  if (currentSelectedOption) {
    currentSelectedOption.selected = false;
    forceUpdate(currentSelectedOption);
  }
};

export const updateRadioGroupOptions = (options: RadioGroupOption[], value: string): void => {
  resetSelectedRadioGroupOption(options);
  if (value === undefined) {
    // Option without value for empty selection
    const optionToSelect = options.find((option) => option.value === undefined);
    if (optionToSelect) {
      optionToSelect.selected = true;
      forceUpdate(optionToSelect);
    }
  } else {
    // TODO: Do we want to cover multiple options with the same value?
    const optionToSelect = options.find((option) => option.value === value);
    if (optionToSelect) {
      optionToSelect.selected = true;
      forceUpdate(optionToSelect);
    } else {
      consoleWarn('The provided value is not included in the options of the radio group:', value);
    }
  }
};

export const setSelectedRadioGroupOption = (options: RadioGroupOption[], selectedOption: RadioGroupOption): void => {
  resetSelectedRadioGroupOption(options);
  selectedOption.selected = true;
  forceUpdate(selectedOption);
};

export const syncRadioGroupChildrenProps = (
  children: RadioGroupOption[],
  theme: Theme,
  disabled: boolean,
  loading: boolean,
  state: RadioGroupState,
  name: string
): void => {
  for (const child of children) {
    child.theme = theme;
    child.disabledParent = disabled;
    child.name = name;
    child.loadingParent = loading;
    child.state = state;
    forceUpdate(child);
  }
};

/** Get the index of the currently active/focused option */
export function getActiveOptionIndex<T extends HTMLElement>(options: T[]): number {
  return options.findIndex((opt) => opt === document.activeElement || opt.contains(document.activeElement));
}

/**
 * Find the next enabled option index in the group.
 * Wraps around and skips disabled/loading options.
 */
export function findNextEnabledIndex<T extends { disabled?: boolean; loading?: boolean }>(
  options: T[],
  startIndex: number,
  step: number
): number {
  const len = options.length;
  let i = startIndex;

  for (let tries = 0; tries < len; tries++) {
    i = (i + step + len) % len; // wrap around
    const option = options[i];
    if (!option.disabled && !option.loading) return i;
  }

  return startIndex; // no enabled option found
}
