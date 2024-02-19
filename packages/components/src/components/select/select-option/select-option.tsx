import type { PropTypes } from '../../../types';
import type { SelectOptionInternalHTMLProps } from './select-option-utils';
import { validateSelectOption } from './select-option-utils';

import { Component, Element, h, Host, type JSX, Prop } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  getOptionAriaAttributes,
  getPrefixedTagNames,
  throwIfParentIsNotOfKind,
  validateProps,
} from '../../../utils';
import { getComponentCss } from './select-option-styles';

const propTypes: PropTypes<typeof SelectOption> = {
  value: AllowedTypes.string,
  disabled: AllowedTypes.boolean,
};

@Component({
  tag: 'p-select-option',
  shadow: true,
})
export class SelectOption {
  @Element() public host!: HTMLElement & SelectOptionInternalHTMLProps;

  /** The option value. */
  @Prop() public value?: string;

  /** Disables the option. */
  @Prop() public disabled?: boolean = false;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'p-select');
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    const { theme = 'light', selected, highlighted, hidden } = this.host;
    attachComponentCss(this.host, getComponentCss, theme);
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host onClick={!this.disabled && this.onClick}>
        <div
          role="option"
          class={{
            option: true,
            'option--selected': selected,
            'option--highlighted': highlighted,
            'option--disabled': this.disabled,
          }}
          {...getOptionAriaAttributes(selected, this.disabled, hidden, !!this.value)}
        >
          <slot onSlotchange={this.onSlotChange} />
          {selected && (
            <PrefixedTagNames.pIcon
              class="icon"
              aria-hidden="true"
              name="check"
              color={this.disabled ? 'state-disabled' : 'primary'}
              theme={theme}
            />
          )}
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

  private onSlotChange = (e: Event): void => {
    validateSelectOption(e.target as HTMLSlotElement, this.host);
  };
}
