import { Component, Element, forceUpdate, h, Host, JSX, Prop } from '@stencil/core';
import {
  getHTMLElement,
  getPrefixedTagNames,
  hasNamedSlot,
  insertSlottedStyles,
  isRequired,
  mapBreakpointPropToPrefixedClasses,
  prefix,
  setAriaAttributes,
  throwIfHTMLElementIsUndefined,
} from '../../../utils';
import type { BreakpointCustomizable, FormState } from '../../../types';

@Component({
  tag: 'p-textarea-wrapper',
  styleUrl: 'textarea-wrapper.scss',
  shadow: true,
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

  private textarea: HTMLTextAreaElement;
  private textareaObserver: MutationObserver;

  public connectedCallback(): void {
    this.setTextarea();
    this.initMutationObserver();
    this.addSlottedStyles();
  }

  public componentDidLoad(): void {
    this.setAriaAttributes();
  }

  public componentDidUpdate(): void {
    this.setAriaAttributes();
  }

  public disconnectedCallback(): void {
    this.textareaObserver.disconnect();
  }

  public render(): JSX.Element {
    const { disabled, readOnly } = this.textarea;
    const labelClasses = prefix('textarea-wrapper__label');
    const labelTextClasses = {
      [prefix('textarea-wrapper__label-text')]: true,
      [prefix('textarea-wrapper__label-text--disabled')]: disabled,
      ...mapBreakpointPropToPrefixedClasses('textarea-wrapper__label-text-', this.hideLabel, ['hidden', 'visible']),
    };
    const descriptionTextClasses = {
      [prefix('textarea-wrapper__description-text')]: true,
      [prefix('textarea-wrapper__description-text--disabled')]: disabled,
      ...mapBreakpointPropToPrefixedClasses('textarea-wrapper__description-text-', this.hideLabel, [
        'hidden',
        'visible',
      ]),
    };
    const fakeTextareaClasses = {
      [prefix('textarea-wrapper__fake-textarea')]: true,
      [prefix(`textarea-wrapper__fake-textarea--${this.state}`)]: true,
      [prefix('textarea-wrapper__fake-textarea--disabled')]: disabled,
      [prefix('textarea-wrapper__fake-textarea--readonly')]: readOnly,
    };
    const messageClasses = {
      [prefix('textarea-wrapper__message')]: true,
      [prefix(`textarea-wrapper__message--${this.state}`)]: true,
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host, ['p-text']);

    return (
      <Host>
        <label class={labelClasses}>
          {this.isLabelVisible && (
            <PrefixedTagNames.pText class={labelTextClasses} color="inherit" tag="span" onClick={this.labelClick}>
              {this.label || <slot name="label" />}
              {isRequired(this.textarea) && <span class={prefix('textarea-wrapper__required')} />}
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
    return !!this.label || hasNamedSlot(this.host, 'label');
  }

  private get isDescriptionVisible(): boolean {
    return !!this.description || hasNamedSlot(this.host, 'description');
  }

  private get isMessageVisible(): boolean {
    return !!(this.message || hasNamedSlot(this.host, 'message')) && ['success', 'error'].includes(this.state);
  }

  private setTextarea(): void {
    const selector = 'textarea';

    this.textarea = getHTMLElement(this.host, selector);
    throwIfHTMLElementIsUndefined(this.textarea, selector);
  }

  /*
   * This is a workaround to improve accessibility because the textarea and the label/description/message text are placed in different DOM.
   * Referencing ID's from outside the component is impossible because the web component’s DOM is separate.
   * We have to wait for full support of the Accessibility Object Model (AOM) to provide the relationship between shadow DOM and slots.
   */
  private setAriaAttributes(): void {
    setAriaAttributes(this.textarea, {
      label: this.label,
      message: this.message || this.description,
      state: this.state,
    });
  }

  private labelClick = (): void => {
    this.textarea.focus();
  };

  private initMutationObserver = (): void => {
    this.textareaObserver = new MutationObserver(() => forceUpdate(this.host));
    this.textareaObserver.observe(this.textarea, {
      attributeFilter: ['disabled', 'readonly'],
    });
  };

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
    }

    ${tagName} a:focus:not(:focus-visible) {
      outline-color: transparent !important;
    }`;

    insertSlottedStyles(this.host, style);
  }
}
