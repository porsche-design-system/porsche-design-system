import { Component, Element, h, Host, type JSX, Prop } from '@stencil/core';
import type { Theme } from '../../../types';
import { attachComponentCss } from '../../../utils';
import { getComponentCss } from './multi-select-dropdown-styles';
import { MultiSelectDropdownDirection } from './multi-select-dropdown-utils';
import { determineDirection } from '../../select-wrapper/select-wrapper-dropdown/select-wrapper-dropdown-utils';

@Component({
  tag: 'p-multi-select-dropdown',
  shadow: true,
})
export class MultiSelectDropdown {
  @Element() public host!: HTMLElement;

  @Prop() public isOpen = false;

  @Prop() public direction?: MultiSelectDropdownDirection = 'auto';

  @Prop() public theme?: Theme = 'light';

  // TODO: Validation children must be options

  public render(): JSX.Element {
    attachComponentCss(
      this.host,
      getComponentCss,
      this.isOpen,
      this.direction === 'auto' ? determineDirection(this.host) : this.direction,
      this.theme
    );
    return (
      <Host>
        <ul role="listbox">
          <slot />
        </ul>
      </Host>
    );
  }
}
