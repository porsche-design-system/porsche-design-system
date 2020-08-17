import { JSX, Host, Component, Prop, h, Element, State } from '@stencil/core';
import {
  BreakpointCustomizable,
  getPrefixedTagNames,
  handleButtonEvent,
  insertSlottedStyles,
  mapBreakpointPropToPrefixedClasses,
  prefix,
  transitionListener
} from '../../../utils';
import { ButtonType, FormState } from '../../../types';

@Component({
  tag: 'p-text-field-wrapper',
  styleUrl: 'text-field-wrapper.scss',
  shadow: true
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
  private searchButtonType: ButtonType = 'submit';
  private isPasswordToggleable: boolean;
  private isInputTypeSearch: boolean;

  public componentWillLoad(): void {
    this.setInput();
    this.setAriaAttributes();
    this.setState();
    this.updatePasswordToggleable();
    this.initInputTypeSearch();
    this.bindStateListener();
    this.addSlottedStyles();
  }

  public componentDidUpdate(): void {
    this.setAriaAttributes();
  }

  public render(): JSX.Element {
    const containerClasses = prefix('text-field-wrapper__container');
    const labelClasses = prefix('text-field-wrapper__label');
    const labelTextClasses = {
      [prefix('text-field-wrapper__label-text')]: true,
      [prefix('text-field-wrapper__label-text--disabled')]: this.disabled,
      ...mapBreakpointPropToPrefixedClasses('text-field-wrapper__label-text-', this.hideLabel, ['hidden', 'visible'])
    };
    const descriptionTextClasses = {
      [prefix('text-field-wrapper__description-text')]: true,
      [prefix('text-field-wrapper__description-text--disabled')]: this.disabled,
      ...mapBreakpointPropToPrefixedClasses('text-field-wrapper__description-text-', this.hideLabel, [
        'hidden',
        'visible'
      ])
    };
    const fakeInputClasses = {
      [prefix('text-field-wrapper__fake-input')]: true,
      [prefix(`text-field-wrapper__fake-input--${this.state}`)]: this.state !== 'none',
      [prefix('text-field-wrapper__fake-input--disabled')]: this.disabled,
      [prefix('text-field-wrapper__fake-input--readonly')]: this.readonly
    };
    const buttonClasses = prefix('text-field-wrapper__button');
    const messageClasses = {
      [prefix('text-field-wrapper__message')]: true,
      [prefix(`text-field-wrapper__message--${this.state}`)]: this.state !== 'none'
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host, ['p-icon', 'p-text']);

    return (
      <Host>
        <div class={containerClasses}>
          <label class={labelClasses}>
            {this.isLabelVisible && (
              <PrefixedTagNames.pText class={labelTextClasses} tag="span" color="inherit" onClick={this.labelClick}>
                {this.label || (
                  <span>
                    <slot name="label" />
                  </span>
                )}
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
                {this.description || (
                  <span>
                    <slot name="description" />
                  </span>
                )}
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
          <PrefixedTagNames.pText class={messageClasses} color="inherit" role={this.state === 'error' && 'alert'}>
            {this.message || (
              <span>
                <slot name="message" />
              </span>
            )}
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

  private get isMessageDefined(): boolean {
    return !!this.message || !!this.host.querySelector('[slot="message"]');
  }

  private get isMessageVisible(): boolean {
    return ['success', 'error'].includes(this.state) && this.isMessageDefined;
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
    if (this.label && this.message) {
      this.input.setAttribute('aria-label', `${this.label}. ${this.message}`);
    } else if (this.label && this.description) {
      this.input.setAttribute('aria-label', `${this.label}. ${this.description}`);
    } else if (this.label) {
      this.input.setAttribute('aria-label', this.label);
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

  private bindStateListener(): void {
    transitionListener(this.input, 'border-top-color', this.setState);
  }

  private updatePasswordToggleable(): void {
    this.isPasswordToggleable = this.input.type === 'password';
    if (this.isPasswordToggleable) {
      this.input.style.cssText = 'padding-right: 3rem !important';
    }
  }

  private togglePassword = (): void => {
    this.input.type = this.input.type === 'password' ? 'text' : 'password';
    this.showPassword = !this.showPassword;
    this.labelClick();
  };

  private initInputTypeSearch(): void {
    this.isInputTypeSearch = this.input.type === 'search';
    if (this.isInputTypeSearch) {
      this.input.style.cssText = 'padding-right: 3rem !important';
    }
  }

  private onSubmitHandler = (event: MouseEvent): void => {
    if (this.isInputTypeSearch) {
      handleButtonEvent(
        event,
        this.host,
        () => this.searchButtonType,
        () => this.disabled
      );
    }
  };

  private addSlottedStyles(): void {
    const tagName = this.host.tagName.toLowerCase();
    const style = `${tagName} a {
      outline: none transparent;
      color: inherit;
      text-decoration: underline;
      -webkit-transition: outline-color .24s ease, color .24s ease;
      transition: outline-color .24s ease, color .24s ease;
    }

    ${tagName} a:hover {
      color: #d5001c;
    }

    ${tagName} a:focus {
      outline: 2px solid #00d5b9;
      outline-offset: 1px;
    }

    ${tagName} input::-webkit-outer-spin-button {
      appearance: none !important;
      -webkit-appearance: none !important;
    }

    ${tagName} input::-webkit-inner-spin-button {
      appearance: none !important;
      -webkit-appearance: none !important;
    }

    ${tagName} input[type=password]::-webkit-contacts-auto-fill-button,
    ${tagName} input[type=password]::-webkit-credentials-auto-fill-button {
      margin-right: 2rem;
    }

    ${tagName} input[type=search]::-webkit-search-cancel-button {
      margin-right: 2rem;
    }
    `;

    insertSlottedStyles(this.host, style);
  }
}
