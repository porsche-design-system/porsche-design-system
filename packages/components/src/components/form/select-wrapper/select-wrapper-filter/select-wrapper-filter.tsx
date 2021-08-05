import { Component, Element, h, Host, JSX, Listen, Prop } from '@stencil/core';
import type { FormState, Theme } from '../../../../types';
import type { OptionMap } from '../select-wrapper/select-wrapper-utils';
import { getAriaAttributes } from './select-wrapper-filter-utils';
import { addComponentCss } from './select-wrapper-filter-styles';

@Component({
  tag: 'p-select-wrapper-filter',
  shadow: true,
})
export class SelectWrapperFilter {
  @Element() public host!: HTMLElement;

  @Prop() public theme?: Theme = 'light';
  @Prop() public selectedOptionMap?: OptionMap;
  @Prop() public highlightedOptionMap?: OptionMap;

  @Prop() public value: string;
  @Prop() public disabled?: boolean = false;
  @Prop() public isOpen?: boolean = false;
  @Prop() public state?: FormState;
  @Prop() public dropdownId?: string;
  @Prop() public onClick?: () => void;
  @Prop() public onChange: (e: InputEvent) => void;

  private inputElement: HTMLInputElement;

  @Listen('focus', { capture: false })
  public onFocus(): void {
    this.inputElement.focus();
  }

  public connectedCallback(): void {
    // TODO: validate this is used within `p-select-wrapper`
  }

  public componentDidLoad(): void {
    // if (this.filter) {
    //   this.fakeFilter.addEventListener('click', this.onFilterInputClick); // span element
    //   this.filterInput.addEventListener('mousedown', this.onFilterInputClick);
    //   this.filterInput.addEventListener('keydown', this.onKeyboardEvents);
    //   this.filterInput.addEventListener('input', this.onFilterSearch);
    // }
  }

  public componentWillRender(): void {
    addComponentCss(this.host, this.disabled, this.state, this.theme);
  }

  public render(): JSX.Element {
    return (
      <Host tabindex={0}>
        <input
          type="text"
          role="combobox"
          disabled={this.disabled}
          placeholder={this.selectedOptionMap?.value}
          value={this.value}
          onInput={this.onChange}
          onMouseDown={this.onFilterClick}
          ref={(el) => (this.inputElement = el)}
          {...getAriaAttributes(this.isOpen, this.dropdownId, this.highlightedOptionMap?.key)}
          // aria-autocomplete="both"
          // aria-controls={this.dropdownId}
          // aria-expanded={booleanToString(this.isOpen)}
          // aria-activedescendant={`option-${this.highlightedOptionMap?.key}`}
        />
        <span onClick={this.onFilterClick} />
      </Host>
    );
  }

  private onFilterClick = (): void => {
    if (!this.disabled) {
      this.inputElement.focus();
      this.onClick();
    }
  };
}
