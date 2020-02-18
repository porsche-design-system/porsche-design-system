import { JSX, Host, Component, Prop, h, Element, State } from '@stencil/core';
import cx from 'classnames';
import { BreakpointCustomizable, mapBreakpointPropToPrefixedClasses, prefix, transitionListener } from '../../../utils';
import { insertSlottedStyles } from '../../../utils/slotted-styles';
import { FormState } from '../../../types';

@Component({
  tag: 'p-text-field-wrapper',
  styleUrl: 'text-field-wrapper.scss',
  shadow: true
})
export class TextFieldWrapper {

  @Element() public element!: HTMLElement;

  /** The label text. */
  @Prop() public label?: string = '';

  /** The validation state. */
  @Prop({ reflect: true }) public state?: FormState = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  @State() private input: HTMLInputElement;
  @State() private disabled: boolean;
  @State() private readonly: boolean;
  @State() private isPasswordToggleable: boolean = false;
  @State() private showPassword: boolean = false;

  public componentDidLoad() {

    this.setInput();
    this.setState();
    this.bindStateListener();

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
    }

    ${tagName} input[type='number']::-webkit-outer-spin-button {
      appearance: none !important;
      -webkit-appearance: none !important;
    }

    ${tagName} input[type='number']::-webkit-inner-spin-button {
      appearance: none !important;
      -webkit-appearance: none !important;
    }
    `;

    insertSlottedStyles(this.element, style);
    this.updatePasswordToggleable();
  }

  public render(): JSX.Element {

    const wrapperClasses = cx(prefix('text-field-wrapper__wrapper'));
    const labelClasses = cx(prefix('text-field-wrapper__label'));
    const labelTextClasses = cx(
      prefix('text-field-wrapper__label-text'),
      mapBreakpointPropToPrefixedClasses('text-field-wrapper__label-text-', this.hideLabel, ['hidden', 'visible'])
    );
    const inputContainerClasses = cx(
      prefix('text-field-wrapper__container'),
      prefix(`text-field-wrapper__container--${this.state}`),
      this.disabled && prefix('text-field-wrapper__container--disabled'),
      this.readonly && prefix('text-field-wrapper__container--readonly')
    );
    const buttonClasses = cx(prefix('text-field-wrapper__button'));
    const messageClasses = cx(
      prefix('text-field-wrapper__message'),
      prefix(`text-field-wrapper__message--${this.state}`)
    );

    return (
      <Host>
        <span class={wrapperClasses}>
          <label class={labelClasses}>
            <p-text class={labelTextClasses} tag='span' onClick={() => this.focusOnInput()}>
              {this.label ? this.label : <span><slot name='label'/></span>}
            </p-text>
            <span class={inputContainerClasses}>
              <slot/>
            </span>
          </label>
          {this.isPasswordToggleable &&
          <button type='button' class={buttonClasses} onClick={() => this.togglePassword()}>
            <p-icon name={this.showPassword ? 'view-off' : 'view'} color='inherit'/>
          </button>
          }
        </span>
        {this.isMessageVisible &&
        <p-text class={messageClasses} color='inherit'>
          {this.message ? this.message : <span><slot name='message'/></span>}
        </p-text>
        }
      </Host>
    );
  }

  private get isMessageSlotDefined(): boolean {
    return !!this.element.querySelector('span[slot="message"]');
  }

  private get isMessageVisible(): boolean {
    return ['success', 'error'].includes(this.state) && (!!this.message || this.isMessageSlotDefined);
  }

  private setInput(): void {
    this.input = this.element.querySelector('input');
  }

  private setState(): void {
    this.disabled = this.input.disabled;
    this.readonly = this.input.readOnly;
  }

  private focusOnInput(): void {
    this.input.focus();
  }

  private bindStateListener(): void {
    transitionListener(this.input, 'border-top-color', () => {
      this.setState();
    });
  }

  private updatePasswordToggleable(): void {
    const input = this.element.querySelector('input');
    this.isPasswordToggleable = input.type === 'password';
    if (this.isPasswordToggleable) {
      input.style.cssText = 'padding-right: 3rem !important';
    }
  }

  private togglePassword(): void {
    const input = this.element.querySelector('input');
    input.type === 'password' ? input.type = 'text' : input.type = 'password';
    this.showPassword = !this.showPassword;
    this.focusOnInput();
  }
}
