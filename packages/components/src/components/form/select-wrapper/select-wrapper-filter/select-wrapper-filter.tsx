import { Component, Element, h, Host, JSX, Listen, Prop } from '@stencil/core';
import type { FormState, Theme } from '../../../../types';
import { getAriaAttributes } from './select-wrapper-filter-utils';
import { addComponentCss } from './select-wrapper-filter-styles';
import { throwIfRootNodeIsNotOfKind } from '../../../../utils';

@Component({
  tag: 'p-select-wrapper-filter',
  shadow: true,
})
export class SelectWrapperFilter {
  @Element() public host!: HTMLElement;

  @Prop() public theme?: Theme = 'light';
  @Prop() public placeholder?: string;
  @Prop() public highlightedIndex?: number;

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
    throwIfRootNodeIsNotOfKind(this.host, 'pSelectWrapperDropdown');
  }

  public componentWillRender(): void {
    // TODO: this is executed way too often, for example on every character being entered
    addComponentCss(this.host, this.disabled, this.state, this.theme);
  }

  public render(): JSX.Element {
    return (
      <Host {...(!this.disabled && { tabindex: 0 })}>
        <input
          type="text"
          role="combobox"
          disabled={this.disabled}
          placeholder={this.placeholder}
          value={this.value}
          onInput={this.onChange}
          onMouseDown={this.onFilterClick}
          ref={(el) => (this.inputElement = el)}
          {...getAriaAttributes(this.isOpen, this.dropdownId, this.highlightedIndex)}
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
