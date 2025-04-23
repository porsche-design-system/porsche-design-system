import { Component, Element, Host, type JSX, Prop, h } from '@stencil/core';
import type { PropTypes } from '../../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getOptionAriaAttributes,
  throwIfParentIsNotOfKind,
  validateProps,
} from '../../../utils';
import { getComponentCss } from './multi-select-option-styles';
import type { MultiSelectOptionInternalHTMLProps } from './multi-select-option-utils';

const propTypes: PropTypes<typeof MultiSelectOption> = {
  value: AllowedTypes.string,
  disabled: AllowedTypes.boolean,
};

/**
 * @slot {"name": "", "description": "Default slot for the option text." }
 */
@Component({
  tag: 'p-multi-select-option',
  shadow: true,
})
export class MultiSelectOption {
  @Element() public host!: HTMLElement & MultiSelectOptionInternalHTMLProps;

  /** The option value. */
  @Prop() public value: string;

  /** Disables the option. */
  @Prop() public disabled?: boolean = false;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, ['p-multi-select', 'p-optgroup']);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    const { theme = 'light', selected: isSelected, highlighted } = this.host;
    const isDisabled = this.disabled || this.host.disabledParent;

    attachComponentCss(this.host, getComponentCss, theme, isDisabled, isSelected);

    return (
      <Host onClick={!isDisabled && this.onClick}>
        <div
          role="option"
          {...getOptionAriaAttributes(isSelected, isDisabled, false, !!this.value)}
          class={{
            option: true,
            'option--selected': isSelected,
            'option--highlighted': highlighted,
            'option--disabled': isDisabled,
          }}
        >
          <span class="checkbox" aria-hidden="true" />
          <slot slot="label" />
        </div>
      </Host>
    );
  }

  private onClick = (): void => {
    this.host.dispatchEvent(
      new CustomEvent('internalOptionUpdate', {
        bubbles: true,
      })
    );
  };
}
