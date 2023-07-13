import { Component, Element, Event, EventEmitter, h, Host, type JSX, Prop } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  observeChildren,
  unobserveChildren,
  validateProps,
} from '../../../utils';
import { MultiSelectOptionUpdateEvent } from './multi-select-option-utils';
import type { PropTypes, Theme } from '../../../types';
import { getComponentCss } from './multi-select-option-styles';

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
  @Prop({ mutable: true }) public selected = false;

  /** Disables the option. */
  @Prop() public disabled = false;

  /** Emitted when the option state changes. */
  @Event({ bubbles: true }) public update: EventEmitter<MultiSelectOptionUpdateEvent>;

  /** Adapts the select color depending on the theme. */
  private theme?: Theme = 'light';

  public connectedCallback(): void {
    // TODO: Validation
    // TODO: hidden prop?
    observeChildren(this.host, () => {
      this.update.emit({ optionElement: this.host as HTMLPMultiSelectOptionElement });
    });
  }

  public componentDidUpdate(): void {
    this.update.emit({ optionElement: this.host as HTMLPMultiSelectOptionElement });
  }

  public disconnectedCallback(): void {
    unobserveChildren(this.host);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.theme);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <li
          class={{
            ['option']: true,
            ['option--selected']: this.selected,
            ['option--disabled']: this.disabled,
          }}
          onClick={this.onClick}
        >
          <PrefixedTagNames.pCheckboxWrapper>
            <input type="checkbox" checked={this.selected} disabled={this.disabled} />
            <span slot="label">
              <slot />
            </span>
          </PrefixedTagNames.pCheckboxWrapper>
        </li>
      </Host>
    );
  }

  private onClick = (): void => {
    this.selected = !this.selected;
  };
}
