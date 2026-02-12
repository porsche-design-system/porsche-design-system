import { Component, Element, Host, h, type JSX, Prop, Watch } from '@stencil/core';
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
    throwIfParentIsNotOfKind(this.host, ['p-multi-select', 'p-optgroup']);
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
