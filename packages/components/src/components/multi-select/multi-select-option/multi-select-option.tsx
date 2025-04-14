import { Component, Element, Host, type JSX, Prop, h, AttachInternals } from '@stencil/core';
import type { PropTypes } from '../../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
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
  formAssociated: true,
})
export class MultiSelectOption {
  @Element() public host!: HTMLElement & MultiSelectOptionInternalHTMLProps;

  /** The option value. */
  @Prop() public value: string;

  /** Disables the option. */
  @Prop() public disabled?: boolean = false;

  @AttachInternals() private internals: ElementInternals;

  private isDisabled: boolean = false;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, ['p-multi-select', 'p-optgroup']);
  }

  public componentWillRender(): void {
    this.isDisabled = this.disabled || this.host.disabledParent;
    this.internals.role = 'option';
    this.internals.ariaSelected = String(this.host.selected);
    this.internals.ariaHidden = String(this.host.hidden);
    this.internals.ariaDisabled = String(this.isDisabled);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    const { theme = 'light', selected, highlighted } = this.host;
    attachComponentCss(this.host, getComponentCss, theme);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host onClick={!this.isDisabled && this.onClick}>
        <div
          class={{
            option: true,
            'option--selected': selected,
            'option--highlighted': highlighted,
            'option--disabled': this.isDisabled,
          }}
        >
          <PrefixedTagNames.pCheckbox
            id="checkbox"
            class="checkbox"
            theme={theme}
            checked={selected}
            disabled={this.isDisabled}
            aria-hidden="true"
          >
            <slot slot="label" />
          </PrefixedTagNames.pCheckbox>
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
