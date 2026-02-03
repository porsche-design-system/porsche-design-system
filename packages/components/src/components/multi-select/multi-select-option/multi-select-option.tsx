import { Component, Element, Host, h, type JSX, Prop } from '@stencil/core';
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
  @Prop({ mutable: true }) public disabled?: boolean = false;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, ['p-multi-select', 'p-optgroup']);
  }

  public componentWillRender(): void {
    // Needs to be set explicitly if whole optgroup is disabled
    if (this.host.disabledParent === true) {
      this.disabled = true;
    }
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    const { selected: isSelected, highlighted, hidden } = this.host;
    const isDisabled = this.disabled || this.host.disabledParent;

    attachComponentCss(this.host, getComponentCss, isDisabled, isSelected);

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
          <span class="checkbox" aria-hidden="true" />
          <slot />
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
