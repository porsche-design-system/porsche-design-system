import { forceUpdate } from '@stencil/core';
import type { MultiSelectOption } from '../multi-select/multi-select/multi-select-utils';
import type { SelectOption } from '../select/select/select-utils';

type Child = SelectOption | MultiSelectOption;
export const updateOptionsDisabled = (host: HTMLElement, disabled: boolean): void => {
  for (const child of Array.from(host.children)) {
    (child as Child).disabledParent = disabled;
    forceUpdate(child);
  }
};
