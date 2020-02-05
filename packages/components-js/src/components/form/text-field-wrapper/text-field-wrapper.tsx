import { JSX, Host, Component, Prop, h, Element } from '@stencil/core';
import cx from 'classnames';
import { prefix } from '../../../utils';
import { insertSlottedStyles } from '../../../utils/slotted-styles';
import { FormState, FormStateColor } from '../../../types';

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
  }

  public render(): JSX.Element {

    const labelClasses = cx(prefix('text-field-wrapper__label'));
    const labelTextClasses = cx(prefix('text-field-wrapper__label-text'));
    const messageClasses = cx(prefix('text-field-wrapper__message'));

    return (
      <Host>
        <label class={labelClasses}>
          <p-text class={labelTextClasses} tag='span'>
            {this.label ? this.label : <slot name='label'/>}
          </p-text>
          <slot/>
        </label>
        {this.showMessage(this.state) &&
        <p-text class={messageClasses} color={this.getStateColor(this.state)}>
          {this.message ? this.message : <slot name='message'/>}
        </p-text>
        }
      </Host>
    );
  }

  private showMessage(state: FormState): boolean {
    return ['success', 'error'].includes(state);
  }

  private getStateColor(state: FormState): FormStateColor {
    switch (state) {
      case 'success':
        return 'notification-success';
      case 'error':
        return 'notification-error';
      default:
        return 'default';
    }
  }

  //
  // private isTypePassword(): boolean {
  //   const inputType: string = this.element.querySelector('input').type;
  //   return inputType === 'password';
  // }
  //
  // private togglePassword(): void {
  //   const input: HTMLInputElement = this.element.querySelector('input');
  //   const inputType: string = input.type;
  //   inputType === 'password' ? input.type = 'text' : input.type = 'password';
  // }
}
