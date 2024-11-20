import type { Theme } from '../../types';

export type OptgroupInternalHTMLProps = {
  /** Optgroup theme (synchronized from p-select | p-multi-select) **/
  theme?: Theme;
};

type Child = HTMLPMultiSelectOptionElement | HTMLPSelectOptionElement;
export const updateOptionsDisabled = (host: HTMLElement, disabled: boolean): void => {
  for (const child of Array.from(host.children)) {
    (child as Child).disabled = disabled ? true : (child as Child).disabled;
  }
};
