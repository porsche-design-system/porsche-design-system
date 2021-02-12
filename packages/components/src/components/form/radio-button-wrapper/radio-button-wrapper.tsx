import { JSX, Host, h, Component, Prop, Element, forceUpdate } from '@stencil/core';
import {
  getClosestHTMLElement,
  getHTMLElementAndThrowIfUndefined,
  getPrefixedTagNames,
  hasNamedSlot,
  insertSlottedStyles,
  isRequired,
  mapBreakpointPropToPrefixedClasses,
  prefix,
  setAriaAttributes,
  transitionListener,
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
    this.setInput();
    this.bindStateListener();
    this.addSlottedStyles();
  }

  public componentDidLoad(): void {
    this.setAriaAttributes();
  }

  public componentDidUpdate(): void {
    this.setAriaAttributes();
  }

  public render(): JSX.Element {
    const { checked, disabled } = this.input;
    const labelClasses = prefix('radio-button-wrapper__label');
    const fakeRadioButtonClasses = {
      [prefix('radio-button-wrapper__fake-radio-button')]: true,
      [prefix('radio-button-wrapper__fake-radio-button--checked')]: checked,
      [prefix('radio-button-wrapper__fake-radio-button--disabled')]: disabled,
      [prefix(`radio-button-wrapper__fake-radio-button--${this.state}`)]: this.state !== 'none',
    };
    const labelTextClasses = {
      [prefix('radio-button-wrapper__label-text')]: true,
      [prefix('radio-button-wrapper__label-text--disabled')]: disabled,
      ...mapBreakpointPropToPrefixedClasses('radio-button-wrapper__label-text-', this.hideLabel, ['hidden', 'visible']),
    };
    const messageClasses = {
      [prefix('radio-button-wrapper__message')]: true,
      [prefix(`radio-button-wrapper__message--${this.state}`)]: this.state !== 'none',
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host, ['p-text']);

    return (
      <Host>
        <label class={labelClasses}>
          {this.isLabelVisible && (
            <PrefixedTagNames.pText class={labelTextClasses} tag="span" color="inherit" onClick={this.labelClick}>
              {this.label || <slot name="label" />}
              {isRequired(this.input) && <span class={prefix('radio-button-wrapper__required')} />}
            </PrefixedTagNames.pText>
          )}
          <span class={fakeRadioButtonClasses}>
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

  private get isMessageVisible(): boolean {
    return !!(this.message || hasNamedSlot(this.host, 'message')) && ['success', 'error'].includes(this.state);
  }

  private setInput(): void {
    this.input = getHTMLElementAndThrowIfUndefined(this.host, 'input[type="radio"]');
  }

  /*
   * This is a workaround to improve accessibility because the input and the label/description/message text are placed in different DOM.
   * Referencing ID's from outside the component is impossible because the web component’s DOM is separate.
   * We have to wait for full support of the Accessibility Object Model (AOM) to provide the relationship between shadow DOM and slots
   */
  private setAriaAttributes(): void {
    setAriaAttributes(this.input, {
      label: this.label,
      message: this.message,
      state: this.state,
    });
  }

  private labelClick = (event: MouseEvent): void => {
    /**
     * we only want to simulate the checkbox click by label click
     * for real shadow dom, else the native behaviour works out of the box
     */
    if (this.host.shadowRoot?.host && getClosestHTMLElement(event.target as HTMLElement, 'a') === null) {
      this.input.focus();
      this.input.click();
    }
  };

  private bindStateListener(): void {
    transitionListener(this.input, 'border-top-color', () => forceUpdate(this.host));
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
    }

    ${tagName} a:focus:not(:focus-visible) {
      outline-color: transparent !important;
    }`;

    insertSlottedStyles(this.host, style);
  }
}
