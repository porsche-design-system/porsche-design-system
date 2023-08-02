import { Component, Element, h, Host, type JSX, Prop } from '@stencil/core';
import { AllowedTypes, attachComponentCss, getPrefixedTagNames, validateProps } from '../../../utils';
import { getOptionIndex, MultiSelectOptionInternalHTMLProps } from './multi-select-option-utils';
import type { PropTypes } from '../../../types';
import { getComponentCss } from './multi-select-option-styles';
import { getOptionAriaAttributes } from '../../../utils/select/select-aria';

const propTypes: PropTypes<typeof MultiSelectOption> = {
  value: AllowedTypes.string,
  selected: AllowedTypes.boolean,
  disabled: AllowedTypes.boolean,
};

@Component({
  tag: 'p-multi-select-option',
  shadow: true,
})
export class MultiSelectOption {
  @Element() public host!: HTMLElement & MultiSelectOptionInternalHTMLProps;

  /** The option value. */
  @Prop() public value: string;

  /** The option selected state. */
  @Prop({ mutable: true }) public selected?: boolean = false; // eslint-disable-line @typescript-eslint/no-inferrable-types

  /** Disables the option. */
  @Prop() public disabled?: boolean = false; // eslint-disable-line @typescript-eslint/no-inferrable-types

  /** Hides options which are not matching the searchString **/
  private hidden = false;

  public componentDidUpdate(): void {
    this.host.dispatchEvent(
      new CustomEvent('internalOptionUpdate', {
        bubbles: true,
      })
    );
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.host.theme || 'light');

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <li
          id={`option-${getOptionIndex(this.host)}`}
          role="option"
          class={{
            ['option']: true,
            ['option--selected']: this.selected,
            ['option--disabled']: this.disabled,
            ['option--hidden']: this.hidden,
          }}
          onClick={this.onClick}
          {...getOptionAriaAttributes(this.selected, this.disabled, this.hidden, !!this.value)}
        >
          <PrefixedTagNames.pCheckboxWrapper class="checkbox" theme={this.host.theme}>
            <input type="checkbox" checked={this.selected} disabled={this.disabled} />
            <slot slot="label" />
          </PrefixedTagNames.pCheckboxWrapper>
        </li>
      </Host>
    );
  }

  private onClick = (): void => {
    this.selected = !this.selected;
  };
}
