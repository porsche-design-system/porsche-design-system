import { Component, Element, Event, EventEmitter, h, Host, type JSX, Prop } from '@stencil/core';
import { AllowedTypes, getPrefixedTagNames, observeChildren, unobserveChildren, validateProps } from '../../../utils';
import { MultiSelectOptionUpdateEvent } from './multi-select-option-utils';
import { PropTypes } from '../../../utils/validation/validateProps';

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
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <PrefixedTagNames.pCheckboxWrapper>
          <input type="checkbox" onClick={this.onClick} checked={this.selected} disabled={this.disabled} />
          <span slot="label">
            <slot />
          </span>
        </PrefixedTagNames.pCheckboxWrapper>
      </Host>
    );
  }

  private onClick = (): void => {
    this.selected = !this.selected;
  };
}
