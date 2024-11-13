import type { Theme } from '../../types';
import type { SelectOption } from '../select/select/select-utils';
import type { MultiSelectOption } from '../multi-select/multi-select/multi-select-utils';
import { forceUpdate } from '@stencil/core';

export type OptgroupInternalHTMLProps = {
  /** Optgroup theme (synchronized from p-select | p-multi-select) **/
  theme?: Theme;
};

export const updateOptionsDisabled = (host: HTMLElement, disabled: boolean): void => {
  Array.from(host.children).forEach((child: SelectOption | MultiSelectOption) => {
    child.disabledParent = disabled;
    forceUpdate(child);
  });
};
