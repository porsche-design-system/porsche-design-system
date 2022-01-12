import { Component, Element, Host, JSX, h, Prop, forceUpdate } from '@stencil/core';
import {
  getClosestHTMLElement,
  getHTMLElementAndThrowIfUndefined,
  getPrefixedTagNames,
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
import { getComponentCss, getSlottedCss } from './radio-button-wrapper-styles';
import { StateMessage } from '../../common/state-message';
import { Required } from '../../common/required';

@Component({
  tag: 'p-radio-button-wrapper',
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
    attachSlottedCss(this.host, getSlottedCss);
    this.observeAttributes(); // on every reconnect
  }

  public componentWillLoad(): void {
    this.input = getHTMLElementAndThrowIfUndefined(this.host, 'input[type="radio"]');
    this.observeAttributes(); // once initially
  }

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, this.hideLabel, this.state, this.input.disabled);
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
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <label>
          {hasLabel(this.host, this.label) && (
            <PrefixedTagNames.pText class="label" tag="span" color="inherit" onClick={this.onLabelClick}>
              {this.label || <slot name="label" />}
              {isRequiredAndParentNotRequired(this.host, this.input) && <Required />}
            </PrefixedTagNames.pText>
          )}
          <slot />
        </label>
        {hasMessage(this.host, this.message, this.state) && (
          <StateMessage state={this.state} message={this.message} host={this.host} />
        )}
      </Host>
    );
  }

  private onLabelClick = (event: MouseEvent): void => {
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
