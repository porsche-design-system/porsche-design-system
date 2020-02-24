import { JSX, Host, Component, Prop, h, Element, State } from '@stencil/core';
import cx from 'classnames';
import {
  BreakpointCustomizable,
  mapBreakpointPropToPrefixedClasses,
  prefix,
  transitionListener,
  insertSlottedStyles
} from '../../../utils';

@Component({
  tag: 'p-radio-button-wrapper',
  styleUrl: 'radio-button-wrapper.scss',
  shadow: true
})
export class RadioButtonWrapper {

  @Element() public element!: HTMLElement;

  /** The label text. */
  @Prop() public label?: string = '';

  /** The validation state. */
  @Prop() public state?: 'error' | 'none' = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Show or hide label. For better accessibility it's recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  @State() private input: HTMLInputElement;
  @State() private checked: boolean;
  @State() private disabled: boolean;

  public componentDidLoad() {

    this.setInput();
    this.setState();
    this.inputChangeListener();

    const tagName = this.element.tagName.toLowerCase();
    const style = `${tagName} a {
      outline: none transparent;
      color: inherit;
      text-decoration: underline;
      -webkit-transition: outline-color .24s ease, color .24s ease;
      transition: outline-color .24s ease, color .24s ease;
    }

    ${tagName} a:hover {
      color: #d5001c;
    }

    ${tagName} a:focus {
      outline: 2px solid #00d5b9;
      outline-offset: 1px;
    }`;

    insertSlottedStyles(this.element, style);
  }

  public render(): JSX.Element {

    const labelClasses = cx(prefix('radio-button-wrapper__label'));
    const labelTextClasses = cx(
      prefix('radio-button-wrapper__label-text'),
      mapBreakpointPropToPrefixedClasses('radio-button-wrapper__label-text-', this.hideLabel, ['hidden', 'visible']),
      this.disabled && prefix('radio-button-wrapper__label-text--disabled')
    );
    const inputWrapperClasses = cx(prefix('radio-button-wrapper__input-wrapper'));
    const inputStyleClasses = cx(
      prefix('radio-button-wrapper__input-style'),
      this.checked && prefix(`radio-button-wrapper__input-style--checked`),
      this.disabled && prefix(`radio-button-wrapper__input-style--disabled`),
      this.state !== 'none' && prefix(`radio-button-wrapper__input-style--${this.state}`)
    );
    const messageClasses = cx(
      prefix('radio-button-wrapper__message'),
      this.state !== 'none' && prefix(`radio-button-wrapper__message--${this.state}`)
    );

    return (
      <Host>
        <label class={labelClasses}>
          <span class={inputWrapperClasses}>
            <span class={inputStyleClasses}>
              <slot/>
            </span>
          </span>
          <p-text class={labelTextClasses} tag='span' color='inherit' onClick={() => this.clickOnInput()}>
            {this.label ? this.label : <span><slot name='label'/></span>}
          </p-text>
        </label>
        {this.isMessageVisible &&
        <p-text class={messageClasses} color='inherit'>
          {this.message ? this.message : <span><slot name='message'/></span>}
        </p-text>
        }
      </Host>
    );
  }

  private get isMessageDefined(): boolean {
    return !!this.message || !!this.element.querySelector('[slot="message"]');
  }

  private get isMessageVisible(): boolean {
    return ['error'].includes(this.state) && this.isMessageDefined;
  }

  private setInput(): void {
    this.input = this.element.querySelector('input[type="radio"]');
  }

  private clickOnInput(): void {
    this.input.click();
  }

  private setState(): void {
    this.checked = this.input.checked;
    this.disabled = this.input.disabled;
  }

  private inputChangeListener(): void {
    transitionListener(this.input, 'border-top-color', () => {
      this.setState();
    });
  }
}
