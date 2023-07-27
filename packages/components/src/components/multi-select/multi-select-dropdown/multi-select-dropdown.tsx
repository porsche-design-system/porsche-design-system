import { Component, Element, h, Host, type JSX, Prop } from '@stencil/core';
import type { Theme } from '../../../types';
import { PropTypes } from '../../../types';
import { AllowedTypes, attachComponentCss, THEMES, validateProps } from '../../../utils';
import { getComponentCss } from './multi-select-dropdown-styles';
import {
  SELECT_DROPDOWN_DIRECTIONS_INTERNAL,
  SelectDropdownDirectionInternal,
} from '../../../utils/select/select-dropdown';

const propTypes: PropTypes<typeof MultiSelectDropdown> = {
  isOpen: AllowedTypes.boolean,
  direction: AllowedTypes.oneOf<SelectDropdownDirectionInternal>(SELECT_DROPDOWN_DIRECTIONS_INTERNAL),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

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
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.isOpen, this.direction, this.theme);
    return (
      <Host>
        <ul role="listbox" aria-multiselectable="true">
          <slot />
        </ul>
      </Host>
    );
  }
}
