import { Component, Element, Host, h, type JSX, Prop } from '@stencil/core';
import type { PropTypes, ValidatorFunction } from '../../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getClosestHTMLElement,
  getOptionAriaAttributes,
  getPrefixedTagNames,
  throwIfParentIsNotOfKind,
  validateProps,
} from '../../../utils';
import { getComponentCss } from './select-option-styles';
import { type SelectOptionInternalHTMLProps, validateSelectOption } from './select-option-utils';

const propTypes: PropTypes<typeof SelectOption> = {
  value: AllowedTypes.oneOf<ValidatorFunction>([AllowedTypes.string, AllowedTypes.number, AllowedTypes.null]),
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

  /** The option value. Selected when it strictly matches the p-select value (same type and value: `null`, `undefined`, `string` or `number`). */
  @Prop() public value?: string | number | null;

  /** Disables the option. */
  @Prop() public disabled?: boolean = false;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, ['p-select', 'p-optgroup']);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    const { selected: isSelected, highlighted, hidden } = this.host;
    const isDisabled = this.disabled || this.host.disabledParent;
    attachComponentCss(this.host, getComponentCss, isDisabled);
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      // TODO: get rid of ARIA sprouting and use `elementInternals` API when AXE-CORE supports it: https://github.com/dequelabs/axe-core/issues/4259
      <Host
        onClick={!isDisabled && this.onClick}
        role="option"
        {...getOptionAriaAttributes(isSelected, isDisabled, hidden, this.value !== undefined)}
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
          {isSelected && <PrefixedTagNames.pIcon class="icon" aria-hidden="true" name="check" color="primary" />}
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
    const hasSelectedSlot = Array.from(
      getClosestHTMLElement(this.host, getPrefixedTagNames(this.host).pSelect).children
    ).find((el) => el.slot === 'selected');
    if (!hasSelectedSlot) {
      validateSelectOption(e.target, this.host);
    }
  };
}
