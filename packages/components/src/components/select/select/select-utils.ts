import { FormState } from '../../../utils/form/form-state';
import {
  consoleWarn,
  determineDropdownDirection,
  SelectDropdownDirection,
  SelectDropdownDirectionInternal,
} from '../../../utils';
import { SelectOptionInternalHTMLProps } from '../select-option/select-option-utils';
import { forceUpdate } from '@stencil/core';

export type SelectState = FormState;
export type SelectDirection = SelectDropdownDirection;
export type SelectOption = HTMLPSelectOptionElement & SelectOptionInternalHTMLProps;

export type SelectUpdateEventDetail = {
  name: string;
  value: string;
};

export const setSelectedOption = (options: SelectOption[], newValue: string, oldValue?: string): void => {
  const newSelectedOption = options.find((option) => option.value === newValue);

  if (newSelectedOption) {
    if (oldValue) {
      const oldSelectedOption = options.find((option) => option.value === oldValue);
      oldSelectedOption.selected = false;
      forceUpdate(oldSelectedOption);
    }
    newSelectedOption.selected = true;
    forceUpdate(newSelectedOption);
  } else {
    consoleWarn('The provided value is not included in the options of the p-select:', newValue);
  }
};

// TODO: This is copied from multi-select, extract and reuse in both components
export const getSelectDropdownDirection = (
  direction: SelectDropdownDirection,
  host: HTMLElement,
  options: SelectOption[]
): SelectDropdownDirectionInternal => {
  if (direction !== 'auto') {
    return direction;
  } else if (host) {
    const visibleOptionsLength = options.filter((option) => !option.hidden).length;
    return determineDropdownDirection(host, visibleOptionsLength);
  } else {
    return 'down';
  }
};
