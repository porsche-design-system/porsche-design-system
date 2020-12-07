import { JSX, Host, Component, Prop, h, Element, State } from '@stencil/core';
import {
  BreakpointCustomizable,
  getPrefixedTagNames,
  handleButtonEvent,
  insertSlottedStyles,
  mapBreakpointPropToPrefixedClasses,
  prefix,
} from '../../../utils';
import { FormState } from '../../../types';

@Component({
  tag: 'p-text-field-wrapper',
  styleUrl: 'text-field-wrapper.scss',
  shadow: true,
})
export class TextFieldWrapper {
  @Element() public host!: HTMLElement;

  /** The label text. */
  @Prop() public label?: string = '';

  /** The description text. */
  @Prop() public description?: string = '';

  /** The validation state. */
  @Prop() public state?: FormState = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Show or hide label and description text. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  @State() private disabled: boolean;
  @State() private readonly: boolean;
  @State() private showPassword = false;

  private input: HTMLInputElement;
  private isPasswordToggleable: boolean;
  private inputObserver: MutationObserver;

  public connectedCallback(): void {
    this.setInput();
    this.isPasswordToggleable = this.input.type === 'password';
    this.setAriaAttributes();
    this.setState();
    this.initMutationObserver();
    this.addSlottedStyles();
  }

  public componentDidUpdate(): void {
    this.setAriaAttributes();
  }

  public disconnectedCallback(): void {
    this.inputObserver.disconnect();
  }

  public render(): JSX.Element {
    const containerClasses = prefix('text-field-wrapper__container');
    const labelClasses = prefix('text-field-wrapper__label');
    const labelTextClasses = {
      [prefix('text-field-wrapper__label-text')]: true,
      [prefix('text-field-wrapper__label-text--disabled')]: this.disabled,
      ...mapBreakpointPropToPrefixedClasses('text-field-wrapper__label-text-', this.hideLabel, ['hidden', 'visible']),
    };
    const descriptionTextClasses = {
      [prefix('text-field-wrapper__description-text')]: true,
      [prefix('text-field-wrapper__description-text--disabled')]: this.disabled,
      ...mapBreakpointPropToPrefixedClasses('text-field-wrapper__description-text-', this.hideLabel, [
        'hidden',
        'visible',
      ]),
    };
    const fakeInputClasses = {
      [prefix('text-field-wrapper__fake-input')]: true,
      [prefix(`text-field-wrapper__fake-input--${this.state}`)]: this.state !== 'none',
      [prefix('text-field-wrapper__fake-input--disabled')]: this.disabled,
      [prefix('text-field-wrapper__fake-input--readonly')]: this.readonly,
    };
    const buttonClasses = prefix('text-field-wrapper__button');
    const messageClasses = {
      [prefix('text-field-wrapper__message')]: true,
      [prefix(`text-field-wrapper__message--${this.state}`)]: this.state !== 'none',
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host, ['p-icon', 'p-text']);

    return (
      <Host>
        <div class={containerClasses}>
          <label class={labelClasses}>
            {this.isLabelVisible && (
              <PrefixedTagNames.pText class={labelTextClasses} tag="span" color="inherit" onClick={this.labelClick}>
                {this.label || <slot name="label" />}
                {this.isRequired && <span class={prefix('text-field-wrapper__required')}></span>}
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
            <span class={fakeInputClasses}>
              <slot />
            </span>
          </label>
          {this.isPasswordToggleable && (
            <button type="button" class={buttonClasses} onClick={this.togglePassword} disabled={this.disabled}>
              <PrefixedTagNames.pIcon name={this.showPassword ? 'view-off' : 'view'} color="inherit" />
            </button>
          )}
          {this.isInputTypeSearch && (
            <button
              onClick={this.onSubmitHandler}
              type="submit"
              class={buttonClasses}
              disabled={this.disabled || this.readonly}
            >
              <PrefixedTagNames.pIcon name="search" color="inherit" />
            </button>
          )}
        </div>
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

  private get isMessageVisible(): boolean {
    return !!(this.message || this.host.querySelector('[slot="message"]')) && ['success', 'error'].includes(this.state);
  }

  private get isRequired(): boolean {
    return this.input.getAttribute('required') !== null;
  }

  private setInput(): void {
    this.input = this.host.querySelector('input');
  }

  /*
   * This is a workaround to improve accessibility because the input and the label/description/message text are placed in different DOM.
   * Referencing ID's from outside the component is impossible because the web component’s DOM is separate.
   * We have to wait for full support of the Accessibility Object Model (AOM) to provide the relationship between shadow DOM and slots
   */
  private setAriaAttributes(): void {
    if (this.label) {
      const messageOrDescription = this.message || this.description;
      this.input.setAttribute('aria-label', `${this.label}${messageOrDescription ? `. ${messageOrDescription}` : ''}`);
    }

    if (this.state === 'error') {
      this.input.setAttribute('aria-invalid', 'true');
    } else {
      this.input.removeAttribute('aria-invalid');
    }
  }

  private setState = (): void => {
    this.disabled = this.input.disabled;
    this.readonly = this.input.readOnly;
  };

  private labelClick = (): void => {
    this.input.focus();
  };

  private get isInputTypeSearch(): boolean {
    return this.input.type === 'search';
  }

  private togglePassword = (): void => {
    this.input.type = this.input.type === 'password' ? 'text' : 'password';
    this.showPassword = !this.showPassword;
    this.labelClick();
  };

  private onSubmitHandler = (event: MouseEvent): void => {
    if (this.isInputTypeSearch) {
      handleButtonEvent(
        event,
        this.host,
        () => 'submit',
        () => this.disabled
      );
    }
  };

  private initMutationObserver = (): void => {
    this.inputObserver = new MutationObserver((): void => {
      this.setState();
    });
    this.inputObserver.observe(this.input, {
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
    }

    ${tagName} input::-webkit-outer-spin-button,
    ${tagName} input::-webkit-inner-spin-button {
      -webkit-appearance: none !important;
      appearance: none !important;
    }

    ${tagName} input[type="text"]::-webkit-contacts-auto-fill-button,
    ${tagName} input[type="text"]::-webkit-credentials-auto-fill-button {
      margin-right: 2.4375rem !important;
    }`;

    insertSlottedStyles(this.host, style);
  }
}
