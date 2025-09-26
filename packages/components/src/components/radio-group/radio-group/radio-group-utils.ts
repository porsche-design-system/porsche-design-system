import { forceUpdate } from '@stencil/core';
import { consoleWarn, type Theme } from '../../../utils';
import type { FormState } from '../../../utils/form/form-state';
import type { RadioGroupOptionInternalHTMLProps } from '../radio-group-option/radio-group-option-utils';
export type RadioGroupState = FormState;

export type RadioGroupOption = HTMLPRadioGroupOptionElement & RadioGroupOptionInternalHTMLProps;

export type RadioGroupChangeEventDetail = Event;
export type RadioGroupBlurEventDetail = Event;

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
      // TODO: Add select node
      consoleWarn('The provided value is not included in the options of the p-select:', value);
    }
  }
};

export const setSelectedRadioGroupOption = (options: RadioGroupOption[], selectedOption: RadioGroupOption): void => {
  resetSelectedRadioGroupOption(options);
  selectedOption.selected = true;
  forceUpdate(selectedOption);
};

export const syncRadioGroupChildrenProps = (children: RadioGroupOption[], theme: Theme): void => {
  for (const child of children.filter((child) => child.theme !== theme)) {
    child.theme = theme;
    forceUpdate(child);
  }
};

export const updateOptionsDisabled = (
  host: HTMLElement,
  disabled: boolean,
  loading: boolean,
  state: RadioGroupState,
  name: string
): void => {
  for (const child of Array.from(host.children)) {
    (child as RadioGroupOption).disabledParent = disabled;
    (child as RadioGroupOption).name = name;
    (child as RadioGroupOption).loadingParent = loading;
    (child as RadioGroupOption).state = state;
    forceUpdate(child);
  }
};
