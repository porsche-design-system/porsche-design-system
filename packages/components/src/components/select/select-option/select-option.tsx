import type { PropTypes } from '../../../types';
import { type SelectOptionInternalHTMLProps, validateSelectOption } from './select-option-utils';

import { Component, Element, Host, type JSX, Prop, h } from '@stencil/core';
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

/**
 * @slot {"name": "", "description": "Default slot for the option content." }
 */
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
    throwIfParentIsNotOfKind(this.host, ['p-select', 'p-optgroup']);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    const { theme = 'light', selected: isSelected, highlighted, hidden } = this.host;
    const isDisabled = this.disabled || this.host.disabledParent;
    attachComponentCss(this.host, getComponentCss, theme);
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      // TODO: get rid of ARIA sprouting and use `elementInternals` API when AXE-CORE supports it: https://github.com/dequelabs/axe-core/issues/4259
      <Host
        onClick={!isDisabled && this.onClick}
        role="option"
        {...getOptionAriaAttributes(isSelected, isDisabled, hidden, !!this.value)}
      >
        <div
          class={{
            option: true,
            'option--selected': isSelected,
            'option--highlighted': highlighted,
            'option--disabled': isDisabled,
          }}
        >
          <slot onSlotchange={this.onSlotChange} />
          {isSelected && (
            <PrefixedTagNames.pIcon
              class="icon"
              aria-hidden="true"
              name="check"
              color={isDisabled ? 'state-disabled' : 'primary'}
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

  private onSlotChange = (e: Event & { target: HTMLSlotElement }): void => {
    validateSelectOption(e.target, this.host);
  };
}
