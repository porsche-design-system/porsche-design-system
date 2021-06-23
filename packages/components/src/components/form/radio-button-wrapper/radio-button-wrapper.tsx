import { Component, Element, Host, JSX, h, Prop, forceUpdate } from '@stencil/core';
import {
  getClosestHTMLElement,
  getHTMLElementAndThrowIfUndefined,
  getPrefixedTagNames,
  getTagName,
  insertSlottedStyles,
  isLabelVisible,
  isMessageVisible,
  mapBreakpointPropToClasses,
  setAriaAttributes,
  observeMutations,
  unobserveMutations,
  getRole,
  isRequiredAndParentNotRequired,
} from '../../../utils';
import type { BreakpointCustomizable, FormState } from '../../../types';
import { P_ANIMATION_HOVER_DURATION } from '../../../styles';

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
    this.addSlottedStyles();
    this.observeMutations();
  }

  public componentWillLoad(): void {
    this.input = getHTMLElementAndThrowIfUndefined(this.host, 'input[type="radio"]');
    this.observeMutations();
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
    unobserveMutations(this.input);
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
          {isLabelVisible(this.host, this.label) && (
            <PrefixedTagNames.pText class={rootTextClasses} tag="span" color="inherit" onClick={this.labelClick}>
              {this.label || <slot name="label" />}
              {isRequiredAndParentNotRequired(this.host, this.input) && <span class="required" />}
            </PrefixedTagNames.pText>
          )}
          <slot />
        </label>
        {isMessageVisible(this.host, this.message, this.state) && (
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

  private observeMutations = (): void => {
    observeMutations(this.input, ['disabled'], () => forceUpdate(this.host));
  };

  private addSlottedStyles(): void {
    const tagName = getTagName(this.host);
    const style = `${tagName} a {
      color: inherit !important;
      text-decoration: underline !important;
      transition: color ${P_ANIMATION_HOVER_DURATION} ease !important;
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
