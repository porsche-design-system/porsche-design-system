import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import { AllowedTypes, attachComponentCss, getPrefixedTagNames, validateProps } from '../../../utils';
import { MultiSelectOptionInternalHTMLProps } from './multi-select-option-utils';
import type { PropTypes, ValidatorFunction } from '../../../types';
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
    const { theme = 'light', selected, highlighted, hidden, textContent } = this.host;
    attachComponentCss(this.host, getComponentCss, theme);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <div
        class={{
          option: true,
          'option--selected': selected,
          'option--highlighted': highlighted,
          'option--disabled': this.disabled,
        }}
        onClick={!this.disabled && this.onClick}
      >
        <PrefixedTagNames.pCheckboxWrapper class="checkbox" theme={theme}>
          <input
            role="option"
            type="checkbox"
            checked={selected}
            disabled={this.disabled}
            {...getOptionAriaAttributes(selected, this.disabled, hidden, !!this.value)}
            aria-label={textContent}
            tabindex="-1"
          />
          <slot slot="label" />
        </PrefixedTagNames.pCheckboxWrapper>
      </div>
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
