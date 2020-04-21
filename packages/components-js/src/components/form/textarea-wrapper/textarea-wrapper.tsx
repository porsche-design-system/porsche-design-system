import { Component, Element, h, Host, JSX, Prop, State } from '@stencil/core';
import cx from 'classnames';
import {
  BreakpointCustomizable,
  mapBreakpointPropToPrefixedClasses,
  prefix,
  randomString,
  transitionListener
} from '../../../utils';
import { insertSlottedStyles } from '../../../utils/slotted-styles';
import { FormState } from '../../../types';

@Component({
  tag: 'p-textarea-wrapper',
  styleUrl: 'textarea-wrapper.scss',
  shadow: true
})
export class TextareaWrapper {

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

  private textarea: HTMLTextAreaElement;
  private labelId = randomString();

  public componentWillLoad(): void {
    this.setTextarea();
    this.setState();
    this.bindStateListener();
    this.addSlottedStyles();
  }

  public render(): JSX.Element {

    const labelClasses = cx(prefix('textarea-wrapper__label'));
    const labelTextClasses = cx(
      prefix('textarea-wrapper__label-text'),
      mapBreakpointPropToPrefixedClasses('textarea-wrapper__label-text-', this.hideLabel, ['hidden', 'visible']),
      this.disabled && prefix('textarea-wrapper__label-text--disabled')
    );
    const fakeTextareaClasses = cx(
      prefix('textarea-wrapper__fake-textarea'),
      prefix(`textarea-wrapper__fake-textarea--${this.state}`),
      this.disabled && prefix('textarea-wrapper__fake-textarea--disabled'),
      this.readonly && prefix('textarea-wrapper__fake-textarea--readonly')
    );
    const messageClasses = cx(
      prefix('textarea-wrapper__message'),
      prefix(`textarea-wrapper__message--${this.state}`)
    );

    return (
      <Host>
        <label class={labelClasses} id={this.state === 'error' && this.labelId}>
          {this.isLabelVisible &&
          <p-text class={labelTextClasses} color='inherit' tag='span' onClick={() => this.labelClick()}>
            {this.label ? this.label : <span><slot name='label'/></span>}
          </p-text>
          }
          <span class={fakeTextareaClasses}>
            <slot/>
          </span>
        </label>
        {this.isMessageVisible &&
        <p-text
          class={messageClasses}
          color='inherit'
          role={this.state === 'error' && 'alert'}
          aria-describedby={this.state === 'error' && this.labelId}
        >
          {this.message ? this.message : <span><slot name='message'/></span>}
        </p-text>
        }
      </Host>
    );
  }

  private get isLabelVisible(): boolean {
    return !!this.label || !!this.host.querySelector('[slot="label"]');
  }

  private get isMessageDefined(): boolean {
    return !!this.message || !!this.host.querySelector('[slot="message"]');
  }

  private get isMessageVisible(): boolean {
    return ['success', 'error'].includes(this.state) && this.isMessageDefined;
  }

  private setTextarea(): void {
    this.textarea = this.host.querySelector('textarea');
    this.textarea.setAttribute('aria-label', this.label);
  }

  private setState(): void {
    this.disabled = this.textarea.disabled;
    this.readonly = this.textarea.readOnly;
  }

  private labelClick(): void {
    this.textarea.focus();
  }

  private bindStateListener(): void {
    transitionListener(this.textarea, 'border-top-color', () => {
      this.setState();
    });
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
    }
    `;

    insertSlottedStyles(this.host, style);
  }
}
