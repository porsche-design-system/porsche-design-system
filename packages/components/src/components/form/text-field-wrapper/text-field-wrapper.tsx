import { Component, Element, forceUpdate, h, Host, JSX, Prop, State } from '@stencil/core';
import {
  getHTMLElementAndThrowIfUndefined,
  getPrefixedTagNames,
  getTagName,
  handleButtonEvent,
  insertSlottedStyles,
  isDescriptionVisible,
  isLabelVisible,
  isMessageVisible,
  isRequiredAndParentNotRequired,
  mapBreakpointPropToClasses,
  observeMutations,
  setAriaAttributes,
  getRole,
  unobserveMutations,
} from '../../../utils';
import type { BreakpointCustomizable, FormState } from '../../../types';
import { P_ANIMATION_HOVER_DURATION } from '../../../styles';

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
  private isPassword: boolean;

  public connectedCallback(): void {
    this.addSlottedStyles();
    this.observeMutations();
  }

  public componentWillLoad(): void {
    this.setInput();
    this.observeMutations();
    this.isPassword = this.input.type === 'password';
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
    unobserveMutations(this.input);
  }

  public render(): JSX.Element {
    const { readOnly, disabled } = this.input;
    const rootClasses = {
      ['root']: true,
      [`root--${this.state}`]: this.state !== 'none',
      ['root--password']: this.isPassword,
    };
    const labelClasses = {
      ['label']: true,
      ['label--disabled']: disabled,
      ...mapBreakpointPropToClasses('label-', this.hideLabel, ['hidden', 'visible']),
    };

    const textProps = { tag: 'span', color: 'inherit' };
    const labelProps = { ...textProps, onClick: this.labelClick };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <div class={rootClasses}>
          <label class={labelClasses}>
            {isLabelVisible(this.host, this.label) && (
              <PrefixedTagNames.pText class="label__text" {...labelProps}>
                {this.label || <slot name="label" />}
                {isRequiredAndParentNotRequired(this.host, this.input) && <span class="required" />}
              </PrefixedTagNames.pText>
            )}
            {isDescriptionVisible(this.host, this.description) && (
              <PrefixedTagNames.pText class="label__text label__text--description" {...labelProps} size="x-small">
                {this.description || <slot name="description" />}
              </PrefixedTagNames.pText>
            )}
            <slot />
          </label>
          {this.isPassword ? (
            <button type="button" onClick={this.togglePassword} disabled={disabled}>
              <PrefixedTagNames.pIcon name={this.showPassword ? 'view-off' : 'view'} color="inherit" />
            </button>
          ) : (
            this.input.type === 'search' && (
              <button type="submit" onClick={this.onSubmitHandler} disabled={disabled || readOnly}>
                <PrefixedTagNames.pIcon name="search" color="inherit" />
              </button>
            )
          )}
        </div>
        {isMessageVisible(this.host, this.message, this.state) && (
          <PrefixedTagNames.pText class="message" {...textProps} role={getRole(this.state)}>
            {this.message || <slot name="message" />}
          </PrefixedTagNames.pText>
        )}
      </Host>
    );
  }

  private setInput(): void {
    const selector = ['text', 'number', 'email', 'tel', 'search', 'url', 'date', 'time', 'month', 'week', 'password']
      .map((type) => `input[type=${type}]`)
      .join(',');

    this.input = getHTMLElementAndThrowIfUndefined(this.host, selector);
  }

  private labelClick = (): void => {
    this.input.focus();
  };

  private togglePassword = (): void => {
    this.input.type = this.input.type === 'password' ? 'text' : 'password';
    this.showPassword = !this.showPassword;
    this.labelClick();
  };

  private onSubmitHandler = (event: MouseEvent): void => {
    handleButtonEvent(
      event,
      this.host,
      () => 'submit',
      () => this.input.disabled
    );
  };

  private observeMutations = (): void => {
    observeMutations(this.input, ['disabled', 'readonly'], () => forceUpdate(this.host));
  };

  private addSlottedStyles(): void {
    const tagName = getTagName(this.host);
    const style = `${tagName} a {
      outline: none transparent !important;
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
    }

    ${tagName} input::-webkit-outer-spin-button,
    ${tagName} input::-webkit-inner-spin-button,
    ${tagName} input[type="search"]::-webkit-search-decoration {
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
