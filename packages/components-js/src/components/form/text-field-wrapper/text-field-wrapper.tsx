import { JSX, Host, Component, Prop, h, Element, State } from '@stencil/core';
import cx from 'classnames';
import {
  BreakpointCustomizable,
  mapBreakpointPropToPrefixedClasses,
  prefix,
  transitionListener,
  insertSlottedStyles
} from '../../../utils';
import { FormState } from '../../../types';

@Component({
  tag: 'p-text-field-wrapper',
  styleUrl: 'text-field-wrapper.scss',
  shadow: true
})
export class TextFieldWrapper {

  @Element() public host!: HTMLElement;

  /** The label text. */
  @Prop() public label?: string = '';

  /** The validation state. */
  @Prop() public state?: FormState = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  @State() private disabled: boolean;
  @State() private readonly: boolean;
  @State() private showPassword: boolean = false;

  private input: HTMLInputElement;
  private isPasswordToggleable: boolean;

  public componentDidLoad() {
    this.setInput();
    this.setState();
    this.updatePasswordToggleable();
    this.bindStateListener();
    this.addSlottedStyles();
  }

  public render(): JSX.Element {

    const containerClasses = cx(prefix('text-field-wrapper__container'));
    const labelClasses = cx(prefix('text-field-wrapper__label'));
    const labelTextClasses = cx(
      prefix('text-field-wrapper__label-text'),
      mapBreakpointPropToPrefixedClasses('text-field-wrapper__label-text-', this.hideLabel, ['hidden', 'visible']),
      this.disabled && prefix('text-field-wrapper__label-text--disabled')
    );
    const fakeInputClasses = cx(
      prefix('text-field-wrapper__fake-input'),
      prefix(`text-field-wrapper__fake-input--${this.state}`),
      this.disabled && prefix('text-field-wrapper__fake-input--disabled'),
      this.readonly && prefix('text-field-wrapper__fake-input--readonly')
    );
    const buttonClasses = cx(prefix('text-field-wrapper__button'));
    const messageClasses = cx(
      prefix('text-field-wrapper__message'),
      this.state !== 'none' && prefix(`text-field-wrapper__message--${this.state}`)
    );

    return (
      <Host>
        <span class={containerClasses}>
          <label class={labelClasses}>
            <p-text class={labelTextClasses} tag='span' color='inherit' onClick={() => this.labelClick()}>
              {this.label ? this.label : <span><slot name='label'/></span>}
            </p-text>
            <span class={fakeInputClasses}>
              <slot/>
            </span>
          </label>
          {this.isPasswordToggleable &&
          <button type='button' class={buttonClasses} onClick={() => this.togglePassword()} disabled={this.disabled}>
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

  private get isMessageDefined(): boolean {
    return !!this.message || !!this.host.querySelector('[slot="message"]');
  }

  private get isMessageVisible(): boolean {
    return ['success', 'error'].includes(this.state) && this.isMessageDefined;
  }

  private setInput(): void {
    this.input = this.host.querySelector('input');
  }

  private setState(): void {
    this.disabled = this.input.disabled;
    this.readonly = this.input.readOnly;
  }

  private labelClick(): void {
    this.input.focus();
  }

  private bindStateListener(): void {
    transitionListener(this.input, 'border-top-color', () => {
      this.setState();
    });
  }

  private updatePasswordToggleable(): void {
    this.isPasswordToggleable = this.input.type === 'password';
    if (this.isPasswordToggleable) {
      this.input.style.cssText = 'padding-right: 3rem !important';
    }
  }

  private togglePassword(): void {
    this.input.type === 'password' ? this.input.type = 'text' : this.input.type = 'password';
    this.showPassword = !this.showPassword;
    this.labelClick();
  }

  private addSlottedStyles(): void {
    const tagName = this.host.tagName.toLowerCase();
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

    insertSlottedStyles(this.host, style);
  }
}
