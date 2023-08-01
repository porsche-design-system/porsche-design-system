import { Component, Element, h, Host, type JSX, Prop } from '@stencil/core';
import { AllowedTypes, attachComponentCss, getPrefixedTagNames, validateProps } from '../../../utils';
import { getOptionIndex, MultiSelectOptionUpdateEvent } from './multi-select-option-utils';
import type { PropTypes, Theme } from '../../../types';
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
  @Element() public host!: HTMLElement;

  /** The option value. */
  @Prop() public value: string;

  /** The option selected state. */
  @Prop({ mutable: true }) public selected?: boolean = false; // eslint-disable-line @typescript-eslint/no-inferrable-types

  /** Disables the option. */
  @Prop() public disabled?: boolean = false; // eslint-disable-line @typescript-eslint/no-inferrable-types

  /** Adapts the select color depending on the theme. */
  private theme?: Theme = 'light';

  /** Hides options which are not matching the searchString **/
  private hidden = false;

  public componentDidUpdate(): void {
    this.host.dispatchEvent(
      new CustomEvent<MultiSelectOptionUpdateEvent>('internalOptionUpdate', {
        bubbles: true,
        detail: { optionElement: this.host as HTMLPMultiSelectOptionElement },
      })
    );
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.theme);

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
          <PrefixedTagNames.pCheckboxWrapper class="checkbox" theme={this.theme}>
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
