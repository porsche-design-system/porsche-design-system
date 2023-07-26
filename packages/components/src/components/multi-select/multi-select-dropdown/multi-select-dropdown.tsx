import { Component, Element, h, Host, type JSX, Prop } from '@stencil/core';
import type { Theme } from '../../../types';
import { attachComponentCss } from '../../../utils';
import { getComponentCss } from './multi-select-dropdown-styles';
import { SelectDropdownDirectionInternal } from '../../../utils/select/select-dropdown';

@Component({
  tag: 'p-multi-select-dropdown',
  shadow: true,
})
export class MultiSelectDropdown {
  @Element() public host!: HTMLElement;

  @Prop() public isOpen = false;

  @Prop() public direction: SelectDropdownDirectionInternal;

  @Prop() public theme?: Theme = 'light';

  public render(): JSX.Element {
    attachComponentCss(this.host, getComponentCss, this.isOpen, this.direction, this.theme);
    return (
      <Host>
        <ul role="listbox">
          <slot />
        </ul>
      </Host>
    );
  }
}
