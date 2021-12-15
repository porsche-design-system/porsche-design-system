import { Component, Element, forceUpdate, h, Host, JSX, Prop } from '@stencil/core';
import {
  getHTMLElementAndThrowIfUndefined,
  getPrefixedTagNames,
  hasDescription,
  hasLabel,
  hasMessage,
  mapBreakpointPropToClasses,
  setAriaAttributes,
  observeAttributes,
  unobserveAttributes,
  isRequiredAndParentNotRequired,
  attachSlottedCss,
} from '../../../utils';
import type { BreakpointCustomizable, FormState } from '../../../types';
import { getSlottedCss } from './textarea-wrapper-styles';
import { StateMessage } from '../../common/state-message';
import { hasCounter, addInputEventListener, setCounterInnerHtml } from '../text-field-wrapper/text-field-wrapper-utils';

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
  private counterElement: HTMLSpanElement;

  public connectedCallback(): void {
    attachSlottedCss(this.host, getSlottedCss);
    this.observeAttributes();
  }

  public componentWillLoad(): void {
    this.textarea = getHTMLElementAndThrowIfUndefined(this.host, 'textarea');
    this.observeAttributes();
  }

  public componentDidLoad(): void {
    if (hasCounter(this.textarea)) {
      addInputEventListener(this.textarea, this.counterElement);
      setCounterInnerHtml(this.textarea, this.counterElement);
    }
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
    const { disabled } = this.textarea;
    const rootClasses = {
      ['root']: true,
      ['root--disabled']: disabled,
      [`root--${this.state}`]: this.state !== 'none',
      ...mapBreakpointPropToClasses('root-', this.hideLabel, ['hidden', 'visible']),
    };
    const textProps = { tag: 'span', color: 'inherit' };
    const labelProps = { ...textProps, onClick: this.onLabelClick };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <label class={rootClasses}>
          {hasLabel(this.host, this.label) && (
            <PrefixedTagNames.pText class="root__text" {...labelProps}>
              {this.label || <slot name="label" />}
              {isRequiredAndParentNotRequired(this.host, this.textarea) && <span class="required" />}
            </PrefixedTagNames.pText>
          )}
          {hasDescription(this.host, this.description) && (
            <PrefixedTagNames.pText class="root__text root__text--description" {...labelProps} size="x-small">
              {this.description || <slot name="description" />}
            </PrefixedTagNames.pText>
          )}
          <slot />
          {hasCounter(this.textarea) && (
            <PrefixedTagNames.pText
              class="counter"
              tag="span"
              color="inherit"
              aria-hidden="true"
              ref={(el) => (this.counterElement = el)}
            />
          )}
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
