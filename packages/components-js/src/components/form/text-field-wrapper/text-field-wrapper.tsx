import { JSX, Host, Component, Prop, h, Element } from '@stencil/core';
import cx from 'classnames';
import { prefix } from '../../../utils';
import { insertSlottedStyles } from '../../../utils/slotted-styles';

@Component({
  tag: 'p-text-field-wrapper',
  styleUrl: 'text-field-wrapper.scss',
  shadow: true
})
export class TextFieldWrapper {
  @Element() public element!: HTMLElement;

  /** The label text. */
  @Prop() public label: string = undefined;

  /** The state */
  @Prop() public state?: 'success' | 'error' = undefined;

  /** The error message. */
  @Prop() public messageError?: string = undefined;

  /** The success message. */
  @Prop() public messageSuccess?: string = undefined;

  public componentDidLoad() {

    const style = `a {
      outline: none transparent;
      color: inherit;
      text-decoration: underline;
      -webkit-transition: outline-color .24s ease, color .24s ease;
      transition: outline-color .24s ease, color .24s ease
    }
    
    a:hover {
      color: #d5001c
    }
    
    a:focus {
      outline: 2px solid #00d5b9;
      outline-offset: 1px
    }
    
    b, strong {
      font-weight: 700
    }
    
    span, cite, time {
      display: inline-block;
      vertical-align: top
    }`;

    insertSlottedStyles(this.element, style);
  }

  public render(): JSX.Element {

    const textFieldWrapperClasses = cx(prefix('text-field-wrapper'));

    const labelClasses = cx(prefix('text-field-wrapper__label'));

    // const textClasses = cx(prefix('text-field-wrapper__text'));

    const inputClasses = cx(
      prefix('text-field-wrapper__input'),
      this.state === 'error' && prefix('text-field-wrapper__input--error'),
      this.state === 'success' && prefix('text-field-wrapper__input--success')
    );
    //
    // const buttonClasses = cx(prefix('text-field-wrapper__button'));
    //
    // const iconClasses = cx(prefix('text-field-wrapper__icon'));

    return (
      <Host class={textFieldWrapperClasses}>
        <label class={labelClasses}>
          <p-text tag='span'>
            <span> { /* is needed to forward named slot to default slot in Stencil JS */}
              {this.label ? this.label : <slot name='label'/>}
            </span>
          </p-text>
          <span class={inputClasses}>
            <slot/>
          </span>
        </label>
        {(this.state === 'error' || this.state === 'success') &&
        <p-text color={this.getColorState(this.state)}>
          <span> { /* is needed to forward named slot to default slot in Stencil JS */}
            {this.state === 'error' && this.messageError && this.messageError}
            {this.state === 'error' && !this.messageError && <slot name='message-error'/>}
            {this.state === 'success' && this.messageSuccess && this.messageSuccess}
            {this.state === 'success' && !this.messageSuccess && <slot name='message-success'/>}
          </span>
        </p-text>
        }
      </Host>
    );
  }

  private getColorState(state: 'error' | 'success'): 'notification-success' | 'notification-error' | 'default' {
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
