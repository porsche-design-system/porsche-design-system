import { Component, Element, forceUpdate, h, Host, JSX, Prop } from '@stencil/core';
import {
  getHTMLElementAndThrowIfUndefined,
  getPrefixedTagNames,
  hasDescription,
  hasLabel,
  hasMessage,
  setAriaAttributes,
  observeAttributes,
  unobserveAttributes,
  isRequiredAndParentNotRequired,
  attachSlottedCss,
  attachComponentCss,
} from '../../../utils';
import type { BreakpointCustomizable, FormState } from '../../../types';
import { getComponentCss, getSlottedCss } from './textarea-wrapper-styles';
import { StateMessage } from '../../common/state-message/state-message';
import {
  hasCounter,
  addInputEventListener,
  setCounterInnerHtml,
  setAriaElementInnerHtml,
} from '../text-field-wrapper/text-field-wrapper-utils';
import { Required } from '../../common/required/required';

@Component({
  tag: 'p-textarea-wrapper',
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
  private counterElement: HTMLSpanElement;
  private ariaElement: HTMLSpanElement;
  private hasCounter: boolean;

  public connectedCallback(): void {
    attachSlottedCss(this.host, getSlottedCss);
    this.observeAttributes(); // on every reconnect
  }

  public componentWillLoad(): void {
    this.textarea = getHTMLElementAndThrowIfUndefined(this.host, 'textarea');
    this.observeAttributes(); // once initially
    this.hasCounter = hasCounter(this.textarea);
  }

  public componentDidLoad(): void {
    if (this.hasCounter) {
      addInputEventListener(this.textarea, this.counterElement, this.ariaElement);
      setCounterInnerHtml(this.textarea, this.counterElement); // initial value
      setAriaElementInnerHtml(this.textarea, this.ariaElement); // initial value
    }
  }

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, this.hideLabel, this.state, this.hasCounter);
  }

  public componentDidRender(): void {
    /*
     * This is a workaround to improve accessibility because the textarea and the label/description/message text are placed in different DOM.
     * Referencing ID's from outside the component is impossible because the web component’s DOM is separate.
     * We have to wait for full support of the Accessibility Object Model (AOM) to provide the relationship between shadow DOM and slots.
     */
    setAriaAttributes(this.textarea, {
      label: this.label,
      message: this.message || this.description,
      state: this.state,
    });
  }

  public disconnectedCallback(): void {
    unobserveAttributes(this.textarea);
  }

  public render(): JSX.Element {
    const labelClasses = {
      ['label']: true,
      ['label--disabled']: this.textarea.disabled,
    };

    const labelProps = {
      tag: 'span',
      color: 'inherit',
      onClick: this.onLabelClick,
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <label class={labelClasses}>
          {hasLabel(this.host, this.label) && (
            <PrefixedTagNames.pText class="label__text" {...labelProps}>
              {this.label || <slot name="label" />}
              {isRequiredAndParentNotRequired(this.host, this.textarea) && <Required />}
            </PrefixedTagNames.pText>
          )}
          {hasDescription(this.host, this.description) && (
            <PrefixedTagNames.pText class="label__text label__text--description" {...labelProps} size="x-small">
              {this.description || <slot name="description" />}
            </PrefixedTagNames.pText>
          )}
          {this.hasCounter && (
            <PrefixedTagNames.pText
              class="counter"
              {...labelProps}
              aria-hidden="true"
              ref={(el) => (this.counterElement = el)}
            />
          )}
          <slot />
          {this.hasCounter && <span class="sr-only" ref={(el) => (this.ariaElement = el)} aria-live="polite" />}
        </label>
        {hasMessage(this.host, this.message, this.state) && (
          <StateMessage state={this.state} message={this.message} host={this.host} />
        )}
      </Host>
    );
  }

  private onLabelClick = (): void => {
    this.textarea.focus();
  };

  private observeAttributes = (): void => {
    observeAttributes(this.textarea, ['disabled', 'readonly', 'required'], () => forceUpdate(this.host));
  };
}
