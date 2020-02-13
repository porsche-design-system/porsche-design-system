import { JSX, Host, Component, Prop, h, Element, State } from '@stencil/core';
import cx from 'classnames';
import { BreakpointCustomizable, mapBreakpointPropToPrefixedClasses, prefix } from '../../../utils';
import { insertSlottedStyles } from '../../../utils/slotted-styles';
import { FormState } from '../../../types';

@Component({
  tag: 'p-textarea-wrapper',
  styleUrl: 'textarea-wrapper.scss',
  shadow: true
})
export class TextareaWrapper {

  @Element() public element!: HTMLElement;

  /** The label text. */
  @Prop() public label?: string = '';

  /** The validation state. */
  @Prop({ reflect: true }) public state?: FormState = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  @State() private textarea: HTMLTextAreaElement;
  @State() private disabled: boolean;

  public componentDidLoad() {

    this.setTextarea();
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

    ${tagName} textarea {
      border-color: #626669 !important;
      border-width: 1px !important;
      padding: calc(.75rem - 1px) !important;
    }

    ${tagName}[state='success'] textarea {
      border-color: #13d246 !important;
      border-width: 2px !important;
      padding: calc(.75rem - 2px) !important;
    }

    ${tagName}[state='error'] textarea {
      border-color: #e00000 !important;
      border-width: 2px !important;
      padding: calc(.75rem - 2px) !important;
    }
    `;

    insertSlottedStyles(this.element, style);
  }

  public render(): JSX.Element {

    const wrapperClasses = cx(prefix('textarea-wrapper__wrapper'));
    const labelClasses = cx(prefix('textarea-wrapper__label'));
    const labelTextClasses = cx(
      prefix('textarea-wrapper__label-text'),
      mapBreakpointPropToPrefixedClasses('textarea-wrapper__label-text-', this.hideLabel, ['hidden', 'visible']),
      this.disabled && prefix('textarea-wrapper__label-text--disabled')
    );
    const messageClasses = cx(
      prefix('textarea-wrapper__message'),
      prefix(`textarea-wrapper__message--${this.state}`)
    );

    return (
      <Host>
        <span class={wrapperClasses}>
          <label class={labelClasses}>
            <p-text class={labelTextClasses} color='inherit' tag='span' onClick={() => this.focusOnTextarea()}>
              {this.label ? this.label : <span><slot name='label'/></span>}
            </p-text>
            <slot/>
          </label>
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

  private setTextarea(): void {
    this.textarea = this.element.querySelector('textarea');
  }

  private setState(): void {
    this.disabled = this.textarea.disabled;
  }

  private focusOnTextarea(): void {
    this.textarea.focus();
  }

  private bindStateListener(): void {
    this.textarea.addEventListener('change', () => {
      this.setState();
    });
  }
}
