import { Component, Element, h, Host, type JSX, Listen, Prop } from '@stencil/core';
import { MultiSelectOptionUpdateEvent } from '../multi-select-option/multi-select-option-utils';
import { createNativeSelect, nativeSelect, updateNativeOption, updateNativeSelectOptions } from './multi-select-utils';
import { AllowedTypes, validateProps } from '../../../utils';
import { PropTypes } from '../../../utils/validation/validateProps';

const propTypes: PropTypes<typeof MultiSelect> = {
  name: AllowedTypes.string,
};

@Component({
  tag: 'p-multi-select',
  shadow: true,
})
export class MultiSelect {
  @Element() public host!: HTMLElement;

  /** The label text. */
  @Prop() public name: string;

  private multiSelectOptions: HTMLElement[];

  @Listen('update')
  public updateOptionHandler(event: CustomEvent<MultiSelectOptionUpdateEvent>): void {
    const index = this.multiSelectOptions.findIndex((el) => el === event.detail.optionElement);
    const nativeOption = nativeSelect.children[index] as HTMLElement;
    updateNativeOption(nativeOption, event.detail.optionElement);
  }

  public connectedCallback(): void {
    createNativeSelect(this.host, this.name);
  }

  public componentDidLoad(): void {
    this.updateOptions();
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    return (
      <Host>
        <input name={this.name} />
        <slot onSlotchange={() => this.updateOptions()} />
      </Host>
    );
  }

  private updateOptions = (): void => {
    this.defineMultiSelectOptions();
    updateNativeSelectOptions(this.multiSelectOptions);
  };

  private defineMultiSelectOptions(): void {
    this.multiSelectOptions = Array.from(this.host.children).filter(
      (el) => el.tagName !== 'SELECT'
    ) as HTMLPStepperHorizontalItemElement[];
    // TODO: Validation
  }
}
