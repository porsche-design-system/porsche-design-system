import { JSX, Host, Component, Prop, h, Element, State } from '@stencil/core';
import cx from 'classnames';
import { BreakpointCustomizable, mapBreakpointPropToPrefixedClasses, prefix } from '../../../utils';
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
  @Prop() public state?: FormState = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  @State() private isPasswordToggleable: boolean = false;
  @State() private showPassword: boolean = false;

  public componentDidLoad() {

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
    
    ${tagName} input {
      border-color: #626669 !important;
      border-width: 1px !important;
      padding: calc(.75rem - 1px) !important;
    }
    
    ${tagName}[state='success'] input {
      border-color: #13d246 !important;
      border-width: 2px !important;
      padding: calc(.75rem - 2px) !important;
    }
    
    ${tagName}[state='error'] input {
      border-color: #e00000 !important;
      border-width: 2px !important;
      padding: calc(.75rem - 2px) !important;
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
    const buttonClasses = cx(prefix('text-field-wrapper__button'));
    const messageClasses = cx(
      prefix('text-field-wrapper__message'),
      prefix(`text-field-wrapper__message--${this.state}`)
    );

    return (
      <Host>
        <span class={wrapperClasses}>
          <label class={labelClasses} onClick={() => this.setFocusToInput()}>
            <p-text class={labelTextClasses} tag='span'>
              {this.label ? this.label : <span><slot name='label'/></span>}
            </p-text>
            <slot/>
          </label>
          {this.isPasswordToggleable &&
          <button type='button' class={buttonClasses} onClick={() => this.togglePassword()}>
            <p-icon name={this.showPassword ? 'view-off' : 'view'} color='inherit'/>
          </button>
          }
        </span>
        {this.showMessage(this.state) &&
        <p-text class={messageClasses} color='inherit'>
          {this.message ? this.message : <span><slot name='message'/></span>}
        </p-text>
        }
      </Host>
    );
  }

  private showMessage(state: FormState): boolean {
    return ['success', 'error'].includes(state);
  }

  private setFocusToInput(): void {
    this.element.querySelector('input').focus();
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
    input.focus();
    this.showPassword = !this.showPassword;
  }
}
