import { Component, Element, Host, h, type JSX, Prop, Watch } from '@stencil/core';
import type { PropTypes } from '../../../types';
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
  @Prop({ mutable: true }) public disabled?: boolean = false;

  /** Stores the option's own disabled state (not inherited from optgroup). */
  private ownDisabled: boolean;

  @Watch('disabled')
  public onDisabledChange(newValue: boolean): void {
    // Only update ownDisabled if not currently overridden by parent optgroup
    if (!this.host.disabledParent) {
      this.ownDisabled = newValue;
    }
  }

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, ['p-select', 'p-optgroup']);
  }

  public componentWillLoad(): void {
    // Store the initial disabled value set by the user
    this.ownDisabled = this.disabled;
  }

  public componentWillRender(): void {
    // If parent optgroup is disabled, the option should be disabled
    // If parent optgroup is not disabled (or no optgroup), use the option's own disabled state
    if (this.host.disabledParent) {
      this.disabled = true;
    } else {
      this.disabled = this.ownDisabled;
    }
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    const { selected: isSelected, highlighted, hidden } = this.host;
    const isDisabled = this.disabled || this.host.disabledParent;
    attachComponentCss(this.host, getComponentCss, this.disabled);
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
