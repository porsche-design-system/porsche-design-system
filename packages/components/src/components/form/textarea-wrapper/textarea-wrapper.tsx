import { Component, Element, h, Host, JSX, Prop, State } from '@stencil/core';
import {
  BreakpointCustomizable,
  getPrefixedTagNames,
  insertSlottedStyles,
  mapBreakpointPropToPrefixedClasses,
  prefix,
  transitionListener
} from '../../../utils';
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

  /** The description text. */
  @Prop() public description?: string = '';

  /** The validation state. */
  @Prop() public state?: FormState = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  @State() private disabled: boolean;
  @State() private readonly: boolean;

  private textarea: HTMLTextAreaElement;

  public componentWillLoad(): void {
    this.setTextarea();
    this.setAriaAttributes();
    this.setState();
    this.bindStateListener();
    this.addSlottedStyles();
  }

  public componentDidUpdate(): void {
    this.setAriaAttributes();
  }

  public render(): JSX.Element {
    const labelClasses = prefix('textarea-wrapper__label');
    const labelTextClasses = {
      [prefix('textarea-wrapper__label-text')]: true,
      [prefix('textarea-wrapper__label-text--disabled')]: this.disabled,
      ...mapBreakpointPropToPrefixedClasses('textarea-wrapper__label-text-', this.hideLabel, ['hidden', 'visible'])
    };
    const descriptionTextClasses = {
      [prefix('textarea-wrapper__description-text')]: true,
      [prefix('textarea-wrapper__description-text--disabled')]: this.disabled,
      ...mapBreakpointPropToPrefixedClasses('textarea-wrapper__description-text-', this.hideLabel, [
        'hidden',
        'visible'
      ])
    };
    const fakeTextareaClasses = {
      [prefix('textarea-wrapper__fake-textarea')]: true,
      [prefix(`textarea-wrapper__fake-textarea--${this.state}`)]: true,
      [prefix('textarea-wrapper__fake-textarea--disabled')]: this.disabled,
      [prefix('textarea-wrapper__fake-textarea--readonly')]: this.readonly
    };
    const messageClasses = {
      [prefix('textarea-wrapper__message')]: true,
      [prefix(`textarea-wrapper__message--${this.state}`)]: true
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host, ['p-text']);

    return (
      <Host>
        <label class={labelClasses}>
          {this.isLabelVisible && (
            <PrefixedTagNames.pText class={labelTextClasses} color="inherit" tag="span" onClick={this.labelClick}>
              {this.label || <slot name="label" />}
              {this.isRequired && <span class={prefix('textarea-wrapper__required')}></span>}
            </PrefixedTagNames.pText>
          )}
          {this.isDescriptionVisible && (
            <PrefixedTagNames.pText
              class={descriptionTextClasses}
              tag="span"
              color="inherit"
              size="x-small"
              onClick={this.labelClick}
            >
              {this.description || <slot name="description" />}
            </PrefixedTagNames.pText>
          )}
          <span class={fakeTextareaClasses}>
            <slot />
          </span>
        </label>
        {this.isMessageVisible && (
          <PrefixedTagNames.pText class={messageClasses} color="inherit" role={this.state === 'error' ? 'alert' : null}>
            {this.message || <slot name="message" />}
          </PrefixedTagNames.pText>
        )}
      </Host>
    );
  }

  private get isLabelVisible(): boolean {
    return !!this.label || !!this.host.querySelector('[slot="label"]');
  }

  private get isDescriptionVisible(): boolean {
    return !!this.description || !!this.host.querySelector('[slot="description"]');
  }

  private get isMessageDefined(): boolean {
    return !!this.message || !!this.host.querySelector('[slot="message"]');
  }

  private get isMessageVisible(): boolean {
    return ['success', 'error'].includes(this.state) && this.isMessageDefined;
  }

  private get isRequired(): boolean {
    return this.textarea.getAttribute('required') !== null;
  }

  private setTextarea(): void {
    this.textarea = this.host.querySelector('textarea');
  }

  /*
   * This is a workaround to improve accessibility because the textarea and the label/description/message text are placed in different DOM.
   * Referencing ID's from outside the component is impossible because the web component’s DOM is separate.
   * We have to wait for full support of the Accessibility Object Model (AOM) to provide the relationship between shadow DOM and slots.
   */
  private setAriaAttributes(): void {
    if (this.label) {
      const messageOrDescription = this.message || this.description;
      this.textarea.setAttribute(
        'aria-label',
        `${this.label}${messageOrDescription ? `. ${messageOrDescription}` : ''}`
      );
    }

    if (this.state === 'error') {
      this.textarea.setAttribute('aria-invalid', 'true');
    } else {
      this.textarea.removeAttribute('aria-invalid');
    }
  }

  private setState = (): void => {
    this.disabled = this.textarea.disabled;
    this.readonly = this.textarea.readOnly;
  };

  private labelClick = (): void => {
    this.textarea.focus();
  };

  private bindStateListener(): void {
    transitionListener(this.textarea, 'border-top-color', this.setState);
  }

  private addSlottedStyles(): void {
    const tagName = this.host.tagName.toLowerCase();
    const style = `${tagName} a {
      outline: none transparent !important;
      color: inherit !important;
      text-decoration: underline !important;
      -webkit-transition: color .24s ease !important;
      transition: color .24s ease !important;
      outline: transparent solid 1px !important;
      outline-offset: 1px !important;
    }

    ${tagName} a:hover {
      color: #d5001c !important;
    }

    ${tagName} a:focus {
      outline-color: currentColor !important;
    }`;

    insertSlottedStyles(this.host, style);
  }
}
