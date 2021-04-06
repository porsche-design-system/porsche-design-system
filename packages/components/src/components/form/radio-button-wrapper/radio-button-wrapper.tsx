import { Component, Element, Host, JSX, h, Prop } from '@stencil/core';
import {
  getClosestHTMLElement,
  getHTMLElementAndThrowIfUndefined,
  getPrefixedTagNames,
  getTagName,
  initAttributePropChangeListener,
  insertSlottedStyles,
  isLabelVisible,
  isMessageVisible,
  isRequired,
  mapBreakpointPropToPrefixedClasses,
  prefix,
  setAriaAttributes,
} from '../../../utils';
import type { BreakpointCustomizable, FormState } from '../../../types';

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
  }

  public componentWillLoad(): void {
    this.input = getHTMLElementAndThrowIfUndefined(this.host, 'input[type="radio"]');
    initAttributePropChangeListener(this.host, this.input, ['disabled']);
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

  public render(): JSX.Element {
    const labelClasses = prefix('radio-button-wrapper__label');
    const fakeRadioButtonClasses = {
      [prefix('radio-button-wrapper__fake-radio-button')]: true,
      [prefix('radio-button-wrapper__fake-radio-button--checked')]: checked,
      [prefix('radio-button-wrapper__fake-radio-button--disabled')]: disabled,
      [prefix(`radio-button-wrapper__fake-radio-button--${this.state}`)]: this.state !== 'none',
    };
    const labelTextClasses = {
      [prefix('radio-button-wrapper__label-text')]: true,
      [prefix('radio-button-wrapper__label-text--disabled')]: this.input.disabled,
      ...mapBreakpointPropToPrefixedClasses('radio-button-wrapper__label-text-', this.hideLabel, ['hidden', 'visible']),
    };
    const messageClasses = {
      [prefix('radio-button-wrapper__message')]: true,
      [prefix(`radio-button-wrapper__message--${this.state}`)]: this.state !== 'none',
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <label class={labelClasses}>
          {isLabelVisible(this.host, this.label) && (
            <PrefixedTagNames.pText class={labelTextClasses} tag="span" color="inherit" onClick={this.labelClick}>
              {this.label || <slot name="label" />}
              {isRequired(this.input) && <span class={prefix('radio-button-wrapper__required')} />}
            </PrefixedTagNames.pText>
          )}
          <span class={fakeRadioButtonClasses}>
            <slot />
          </span>
        </label>
        {isMessageVisible(this.host, this.message, this.state) && (
          <PrefixedTagNames.pText class={messageClasses} color="inherit" role={this.state === 'error' ? 'alert' : null}>
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
      this.input.focus();
      this.input.click();
    }
  };

  private addSlottedStyles(): void {
    const tagName = getTagName(this.host);
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
