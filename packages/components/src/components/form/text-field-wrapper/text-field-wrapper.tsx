import { JSX, Host, Component, Prop, h, Element, State, forceUpdate } from '@stencil/core';
import {
  getHTMLElementAndThrowIfUndefined,
  getPrefixedTagNames,
  getTagName,
  handleButtonEvent,
  insertSlottedStyles,
  isDescriptionVisible,
  isLabelVisible,
  isMessageVisible,
  isRequired,
  mapBreakpointPropToPrefixedClasses,
  prefix,
  setAriaAttributes,
} from '../../../utils';
import type { BreakpointCustomizable, FormState } from '../../../types';

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

  @State() private showPassword = false;

  private input: HTMLInputElement;
  private isPasswordToggleable: boolean;
  private inputObserver: MutationObserver;

  public connectedCallback(): void {
    this.addSlottedStyles();
    // We have to initialize this.input in componentWillLoad to fix the Angular binding issues. To ensure the MutationObserver
    // is also active when the component gets reattached, this workaround is used. As soon as https://github.com/porscheui/porsche-design-system/issues/1013
    // is played, we can solve this by observing prop changes of child nodes.
    if (this.input) {
      this.initMutationObserver();
    }
  }

  public componentWillLoad(): void {
    this.setInput();
    this.isPasswordToggleable = this.input.type === 'password';
    this.initMutationObserver();
  }

  public componentDidRender(): void {
    /*
     * This is a workaround to improve accessibility because the input and the label/description/message text are placed in different DOM.
     * Referencing ID's from outside the component is impossible because the web component’s DOM is separate.
     * We have to wait for full support of the Accessibility Object Model (AOM) to provide the relationship between shadow DOM and slots
     */
    setAriaAttributes(this.input, {
      label: this.label,
      message: this.message || this.description,
      state: this.state,
    });
  }

  public disconnectedCallback(): void {
    this.inputObserver.disconnect();
  }

  public render(): JSX.Element {
    const { readOnly, disabled } = this.input;
    const containerClasses = prefix('text-field-wrapper__container');
    const labelClasses = prefix('text-field-wrapper__label');
    const labelTextClasses = {
      [prefix('text-field-wrapper__label-text')]: true,
      [prefix('text-field-wrapper__label-text--disabled')]: disabled,
      ...mapBreakpointPropToPrefixedClasses('text-field-wrapper__label-text-', this.hideLabel, ['hidden', 'visible']),
    };
    const descriptionTextClasses = {
      [prefix('text-field-wrapper__description-text')]: true,
      [prefix('text-field-wrapper__description-text--disabled')]: disabled,
      ...mapBreakpointPropToPrefixedClasses('text-field-wrapper__description-text-', this.hideLabel, [
        'hidden',
        'visible',
      ]),
    };
    const fakeInputClasses = {
      [prefix('text-field-wrapper__fake-input')]: true,
      [prefix(`text-field-wrapper__fake-input--${this.state}`)]: this.state !== 'none',
      [prefix('text-field-wrapper__fake-input--disabled')]: disabled,
      [prefix('text-field-wrapper__fake-input--readonly')]: readOnly,
      [prefix('text-field-wrapper__fake-input--password')]: this.isPasswordToggleable,
    };
    const buttonClasses = prefix('text-field-wrapper__button');
    const messageClasses = {
      [prefix('text-field-wrapper__message')]: true,
      [prefix(`text-field-wrapper__message--${this.state}`)]: this.state !== 'none',
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <div class={containerClasses}>
          <label class={labelClasses}>
            {isLabelVisible(this.host, this.label) && (
              <PrefixedTagNames.pText class={labelTextClasses} tag="span" color="inherit" onClick={this.labelClick}>
                {this.label || <slot name="label" />}
                {isRequired(this.input) && <span class={prefix('text-field-wrapper__required')} />}
              </PrefixedTagNames.pText>
            )}
            {isDescriptionVisible(this.host, this.description) && (
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
            <button type="button" class={buttonClasses} onClick={this.togglePassword} disabled={disabled}>
              <PrefixedTagNames.pIcon name={this.showPassword ? 'view-off' : 'view'} color="inherit" />
            </button>
          )}
          {this.isInputTypeSearch && (
            <button onClick={this.onSubmitHandler} type="submit" class={buttonClasses} disabled={disabled || readOnly}>
              <PrefixedTagNames.pIcon name="search" color="inherit" />
            </button>
          )}
        </div>
        {isMessageVisible(this.host, this.message, this.state) && (
          <PrefixedTagNames.pText class={messageClasses} color="inherit" role={this.state === 'error' ? 'alert' : null}>
            {this.message || <slot name="message" />}
          </PrefixedTagNames.pText>
        )}
      </Host>
    );
  }

  private setInput(): void {
    const types = ['text', 'number', 'email', 'tel', 'search', 'url', 'date', 'time', 'month', 'week', 'password'];
    const selector = types.map((type) => `input[type=${type}]`).join(',');

    this.input = getHTMLElementAndThrowIfUndefined(this.host, selector);
  }

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
        () => this.input.disabled
      );
    }
  };

  private initMutationObserver = (): void => {
    this.inputObserver = new MutationObserver(() => forceUpdate(this.host));
    this.inputObserver.observe(this.input, {
      attributeFilter: ['disabled', 'readonly'],
    });
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
