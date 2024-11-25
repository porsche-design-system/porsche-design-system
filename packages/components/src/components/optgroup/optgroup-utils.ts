import { forceUpdate } from '@stencil/core';
import type { Theme } from '../../types';
import type { MultiSelectOption } from '../multi-select/multi-select/multi-select-utils';
import type { SelectOption } from '../select/select/select-utils';

export type OptgroupInternalHTMLProps = {
  /** Optgroup theme (synchronized from p-select | p-multi-select) **/
  theme?: Theme;
};

type Child = SelectOption | MultiSelectOption;
export const updateOptionsDisabled = (host: HTMLElement, disabled: boolean): void => {
  for (const child of Array.from(host.children)) {
    (child as Child).disabledParent = disabled;
    forceUpdate(child);
  }
};
