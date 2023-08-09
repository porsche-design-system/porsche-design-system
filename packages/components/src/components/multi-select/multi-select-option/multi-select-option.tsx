import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import { AllowedTypes, attachComponentCss, getPrefixedTagNames, validateProps } from '../../../utils';
import { MultiSelectOptionInternalHTMLProps } from './multi-select-option-utils';
import type { PropTypes } from '../../../types';
import { ValidatorFunction } from '../../../types';
import { getComponentCss } from './multi-select-option-styles';
import { getOptionAriaAttributes } from '../../../utils/a11y/select/select-aria';

const propTypes: PropTypes<typeof MultiSelectOption> = {
  value: AllowedTypes.oneOf<ValidatorFunction>([AllowedTypes.string, AllowedTypes.number]),
  disabled: AllowedTypes.boolean,
};

@Component({
  tag: 'p-multi-select-option',
  shadow: true,
})
export class MultiSelectOption {
  @Element() public host!: HTMLElement & MultiSelectOptionInternalHTMLProps;

  /** The option value. */
  @Prop() public value: string | number;

  /** Disables the option. */
  @Prop() public disabled?: boolean = false; // eslint-disable-line @typescript-eslint/no-inferrable-types

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.host.theme || 'light');

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <li
        role="option"
        class={{
          option: true,
          'option--selected': this.host.selected,
          'option--highlighted': this.host.highlighted,
          'option--disabled': this.disabled,
        }}
        onClick={this.onClick}
        {...getOptionAriaAttributes(this.host.selected, this.disabled, this.host.hidden, !!this.value)}
      >
        <PrefixedTagNames.pCheckboxWrapper class="checkbox" theme={this.host.theme || 'light'}>
          <input type="checkbox" checked={this.host.selected} disabled={this.disabled} />
          <slot slot="label" />
        </PrefixedTagNames.pCheckboxWrapper>
      </li>
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
