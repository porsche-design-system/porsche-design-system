import { JSX, Host, Component, Prop, h, Element } from '@stencil/core';
import cx from 'classnames';
import { prefix } from '../../../utils';
// import { IconName } from '../../icon/icon/icon-name';

@Component({
  tag: 'p-textfield',
  styleUrl: 'textfield.scss',
  shadow: false
})
export class Textfield {

  /** The label text. */
  @Prop() public label?: string = undefined;

  /** The state */
  @Prop() public state?: 'success' | 'error' = undefined;

  /** The message. */
  @Prop() public message?: string = undefined;

  // private slots: NodeListOf<HTMLSlotElement>;
  @Element() private element!: HTMLElement;

  public render(): JSX.Element {
    const textfieldClasses = cx(prefix('textfield'), this.state === 'error' && prefix('textfield--error'), this.state === 'success' && prefix('textfield--success'));
    const formElementWrapperClasses = cx(prefix('textfield__form-element-wrapper'));
    const iconButtonClasses = cx(prefix('textfield__icon-button'));
    const iconClasses = cx(prefix('textfield__icon'));
    const labelClasses = cx(prefix('textfield__label'));
    const messageClasses = cx(prefix('textfield__message'), this.state === 'error' && prefix('textfield__message--error'), this.state === 'success' && prefix('textfield__message--success'));

    return (
      <Host class={textfieldClasses}>
        <label class={labelClasses}>
          <p-text size='small' color='inherit' tag='span'>
            {this.label}
          </p-text>
          <span class={formElementWrapperClasses}>
            <slot />
            {this.isTypePassword() &&
              <button type='button' onClick={() => this.togglePassword()} class={iconButtonClasses}>
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
            class={messageClasses}
            aria-live='assertive'
            aria-relevant='additions removals'
            aria-role={this.state === 'error' && 'alert'}
            color='inherit'
            size='small'
          >
              {this.message}
          </p-text>
        }
      </Host>
    );
  }

  private isTypePassword():boolean {
    const inputType = this.element.querySelector('input').type;
    return inputType === 'password';
  }

  private togglePassword():void {
    const input = this.element.querySelector('input');
    const inputType = input.type;
    inputType === 'password' ? input.type='text' :  input.type='password';
  }

}
