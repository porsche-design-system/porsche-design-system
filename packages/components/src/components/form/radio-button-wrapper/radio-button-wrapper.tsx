import { Component, Element, Host, JSX, h, Prop, forceUpdate } from '@stencil/core';
import {
  getClosestHTMLElement,
  getHTMLElementAndThrowIfUndefined,
  getPrefixedTagNames,
  hasLabel,
  hasMessage,
  mapBreakpointPropToClasses,
  setAriaAttributes,
  observeAttributes,
  unobserveAttributes,
  getRole,
  isRequiredAndParentNotRequired,
} from '../../../utils';
import type { BreakpointCustomizable, FormState } from '../../../types';
import { addSlottedCss } from './radio-button-wrapper-styles';

@Component({
  tag: 'p-radio-button-wrapper',
  styleUrl: 'radio-button-wrapper.scss',
  shadow: true,
})
export class RadioButtonWrapper {
  @Element() public host!: HTMLElement;

  /** The label text. */
  @Prop() public label?: string = '';

  /** The validation state. */
  @Prop() public state?: FormState = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Show or hide label. For better accessibility it's recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  private input: HTMLInputElement;

  public connectedCallback(): void {
    addSlottedCss(this.host);
    this.observeAttributes();
  }

  public componentWillLoad(): void {
    this.input = getHTMLElementAndThrowIfUndefined(this.host, 'input[type="radio"]');
    this.observeAttributes();
  }

  public componentDidRender(): void {
    /*
     * This is a workaround to improve accessibility because the input and the label/description/message text are placed in different DOM.
     * Referencing ID's from outside the component is impossible because the web component’s DOM is separate.
     * We have to wait for full support of the Accessibility Object Model (AOM) to provide the relationship between shadow DOM and slots
     */
    setAriaAttributes(this.input, {
      label: this.label,
      message: this.message,
      state: this.state,
    });
  }

  public disconnectedCallback(): void {
    unobserveAttributes(this.input);
  }

  public render(): JSX.Element {
    const rootClasses = {
      ['root']: true,
      ['root--disabled']: this.input.disabled,
      [`root--${this.state}`]: this.state !== 'none',
    };
    const rootTextClasses = {
      ['root__text']: true,
      ...mapBreakpointPropToClasses('root__text-', this.hideLabel, ['hidden', 'visible']),
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <label class={rootClasses}>
          {hasLabel(this.host, this.label) && (
            <PrefixedTagNames.pText class={rootTextClasses} tag="span" color="inherit" onClick={this.labelClick}>
              {this.label || <slot name="label" />}
              {isRequiredAndParentNotRequired(this.host, this.input) && <span class="required" />}
            </PrefixedTagNames.pText>
          )}
          <slot />
        </label>
        {hasMessage(this.host, this.message, this.state) && (
          <PrefixedTagNames.pText class="message" color="inherit" role={getRole(this.state)}>
            {this.message || <slot name="message" />}
          </PrefixedTagNames.pText>
        )}
      </Host>
    );
  }

  private labelClick = (event: MouseEvent): void => {
    /**
     * we only want to simulate the checkbox click by label click
     */
    if (getClosestHTMLElement(event.target as HTMLElement, 'a') === null) {
      this.input.click();
    }
  };

  private observeAttributes = (): void => {
    observeAttributes(this.input, ['disabled', 'required'], () => forceUpdate(this.host));
  };
}
