import { Component, Element, Event, EventEmitter, h, Host, type JSX, Prop, Watch } from '@stencil/core';
import { AllowedTypes, getPrefixedTagNames, validateProps } from '../../../utils';
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

  @Watch('value')
  public valueChangeHandler(): void {
    this.update.emit({ optionElement: this.host });
  }

  // TODO: Validation
  // TODO: Should slot content change also trigger update?

  public render(): JSX.Element {
    validateProps(this, propTypes);
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <PrefixedTagNames.pCheckboxWrapper>
          <span slot="label">
            <slot />
          </span>
          <input type="checkbox" onClick={this.onClick} checked={this.selected} disabled={this.disabled} />
        </PrefixedTagNames.pCheckboxWrapper>
      </Host>
    );
  }

  private onClick = (): void => {
    this.selected = !this.selected;
    this.update.emit({ optionElement: this.host });
  };
}
