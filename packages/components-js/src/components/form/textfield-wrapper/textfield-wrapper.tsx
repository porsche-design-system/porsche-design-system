import { JSX, Host, Component, Prop, h, Element } from '@stencil/core';
import cx from 'classnames';
import { prefix } from '../../../utils';

@Component({
  tag: 'p-textfield-wrapper',
  styleUrl: 'textfield-wrapper.scss',
  shadow: false
})
export class TextfieldWrapper {

  /** The label text. */
  @Prop() public label: string = undefined;

  /** The state */
  @Prop() public state?: 'success' | 'error' = undefined;

  /** The message. */
  @Prop() public message?: string = undefined;

  @Element() private element!: HTMLElement;

  public render(): JSX.Element {

    const textfieldWrapperClasses = cx(prefix('textfield-wrapper'));

    const labelClasses = cx(prefix('textfield-wrapper__label'));

    const inputClasses = cx(
      prefix('textfield-wrapper__input'),
      this.state === 'error' && prefix('textfield-wrapper__input--error'),
      this.state === 'success' && prefix('textfield-wrapper__input--success')
    );

    const buttonClasses = cx(prefix('textfield-wrapper__button'));

    const iconClasses = cx(prefix('textfield-wrapper__icon'));

    return (
      <Host class={textfieldWrapperClasses}>
        <label class={labelClasses}>
          <p-text size='small' tag='span'>{this.label}</p-text>
          <span class={inputClasses}>
            <slot/>
            {this.isTypePassword() &&
            <button type='button' onClick={() => this.togglePassword()} class={buttonClasses}>
              <p-icon
                class={iconClasses}
                color='inherit'
                size='small'
                name='view'
              />
            </button>
            }
          </span>
        </label>
        {this.message &&
        <p-text
          aria-live='assertive'
          aria-relevant='additions removals'
          aria-role={this.state === 'error' && 'alert'}
          color={this.getColorState(this.state)}
          size='small'
        >
          {this.message}
        </p-text>
        }
      </Host>
    );
  }

  private getColorState(state: 'error' | 'success'): 'notification-success' | 'notification-error' | 'default' {
    switch (state) {
      case 'success': return 'notification-success';
      case 'error':  return 'notification-error';
      default: return 'default';
    }
  }

  private isTypePassword(): boolean {
    const inputType: string = this.element.querySelector('input').type;
    return inputType === 'password';
  }

  private togglePassword(): void {
    const input: HTMLInputElement = this.element.querySelector('input');
    const inputType: string = input.type;
    inputType === 'password' ? input.type = 'text' : input.type = 'password';
  }
}
