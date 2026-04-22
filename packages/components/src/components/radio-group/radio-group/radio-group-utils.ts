import { forceUpdate } from '@stencil/core';
import type { GroupDirection } from '../../../styles/group-direction-styles';
import { consoleWarn } from '../../../utils';
import type { FormState } from '../../../utils/form/form-state';
import type { RadioGroupOptionInternalHTMLProps } from '../radio-group-option/radio-group-option-utils';
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
  const optionToSelect = options.find((option) => option.value === value);
  if (optionToSelect) {
    optionToSelect.selected = true;
    forceUpdate(optionToSelect);
  } else {
    if (value !== '') {
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
  disabled: boolean,
  loading: boolean,
  state: RadioGroupState,
  name: string
): void => {
  for (const child of children) {
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

/** Aligns with p-radio-group-option render: interaction is blocked when disabled/disabledParent or option/group loading. */
export function isRadioGroupOptionFocusable(option: RadioGroupOption): boolean {
  const isDisabled = option.disabled || option.disabledParent;
  if (isDisabled) return false;
  const isOptionLoading = option.loading && !option.selected;
  const isLoading = isOptionLoading || option.loadingParent;
  return !isLoading;
}

export function getCheckedOptionIndex(options: RadioGroupOption[]): number {
  return options.findIndex((opt) => isRadioGroupOptionFocusable(opt) && opt.selected);
}

export function getFirstEnabledOptionIndex(options: RadioGroupOption[]): number {
  return options.findIndex((opt) => isRadioGroupOptionFocusable(opt));
}

/**
 * Find the next focusable option index in the group.
 * Wraps around and skips disabled and non-interactive (loading) options.
 */
export function findNextEnabledIndex(options: RadioGroupOption[], startIndex: number, step: number): number {
  const len = options.length;
  let i = startIndex;

  for (let tries = 0; tries < len; tries++) {
    i = (i + step + len) % len; // wrap around
    const option = options[i];
    if (isRadioGroupOptionFocusable(option)) return i;
  }

  return startIndex; // no focusable option found
}
