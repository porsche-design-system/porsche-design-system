import type { Theme } from '../../types';

export type OptgroupInternalHTMLProps = {
  /** Optgroup theme (synchronized from p-select | p-multi-select) **/
  theme?: Theme;
};

export const updateOptionsDisabled = (host: HTMLElement, disabled: boolean): void => {
  Array.from(host.children).forEach(
    (child: HTMLPMultiSelectOptionElement | HTMLPSelectOptionElement) =>
      (child.disabled = disabled ? true : child.disabled)
  );
};
