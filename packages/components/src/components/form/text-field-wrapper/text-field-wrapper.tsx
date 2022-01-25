import { Component, Element, forceUpdate, h, Host, JSX, Prop, State } from '@stencil/core';
import {
  attachComponentCss,
  attachSlottedCss,
  getHTMLElementAndThrowIfUndefined,
  getPrefixedTagNames,
  handleButtonEvent,
  hasDescription,
  hasLabel,
  hasMessage,
  isRequiredAndParentNotRequired,
  observeAttributes,
  setAriaAttributes,
  unobserveAttributes,
} from '../../../utils';
import type { BreakpointCustomizable, FormState } from '../../../types';
import { getComponentCss, getSlottedCss } from './text-field-wrapper-styles';
import { StateMessage } from '../../common/state-message/state-message';
import type { TextFieldWrapperUnitPosition } from './text-field-wrapper-utils';
import {
  addInputEventListener,
  hasCounterAndIsTypeText,
  hasUnitAndIsTypeNumber,
  setCharacterCountInnerHtml,
  setCounterInnerHtml,
  setInputStyles,
  throwIfUnitLengthExceeded,
} from './text-field-wrapper-utils';
import { Required } from '../../common/required/required';

@Component({
  tag: 'p-text-field-wrapper',
  shadow: true,
})
export class TextFieldWrapper {
  @Element() public host!: HTMLElement;

  /** The label text. */
  @Prop() public label?: string = '';

  /** The unit text. */
  @Prop() public unit?: string = '';

  /** The unit position. */
  @Prop() public unitPosition?: TextFieldWrapperUnitPosition = 'prefix';

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
  private unitOrCounterElement: HTMLElement;
  private characterCountElement: HTMLSpanElement;
  private isPassword: boolean;
  private hasCounter: boolean;
  private hasUnit: boolean;

  public connectedCallback(): void {
    attachSlottedCss(this.host, getSlottedCss);
    this.observeAttributes(); // on every reconnect
  }

  public componentWillLoad(): void {
    this.input = getHTMLElementAndThrowIfUndefined(
      this.host,
      ['text', 'number', 'email', 'tel', 'search', 'url', 'date', 'time', 'month', 'week', 'password']
        .map((type) => `input[type=${type}]`)
        .join(',')
    );
    this.observeAttributes(); // once initially
    this.isPassword = this.input.type === 'password';
    this.hasCounter = hasCounterAndIsTypeText(this.input);
    this.hasUnit = hasUnitAndIsTypeNumber(this.input, this.unit);
  }

  public componentWillRender(): void {
    throwIfUnitLengthExceeded(this.unit);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.hideLabel,
      this.state,
      this.hasUnit || this.hasCounter,
      this.hasCounter ? 'suffix' : this.unitPosition,
      this.isPassword
    );
  }

  public componentDidRender(): void {
    // needs to happen after render in order to have unitOrCounterElement defined
    this.setInputStyles();

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

  public componentDidLoad(): void {
    if (this.hasCounter) {
      addInputEventListener(this.input, this.unitOrCounterElement, this.characterCountElement, this.setInputStyles);
      setCounterInnerHtml(this.input, this.unitOrCounterElement); // initial value
      setCharacterCountInnerHtml(this.input, this.characterCountElement);
    }
  }

  public disconnectedCallback(): void {
    unobserveAttributes(this.input);
  }

  public render(): JSX.Element {
    const { readOnly, disabled, type } = this.input;
    const labelClasses = {
      ['label']: true,
      ['label--disabled']: disabled,
    };

    const labelProps = {
      tag: 'span',
      color: 'inherit',
      onClick: this.onLabelClick,
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <div class="root">
          <label class={labelClasses}>
            {hasLabel(this.host, this.label) && (
              <PrefixedTagNames.pText class="label__text" {...labelProps}>
                {this.label || <slot name="label" />}
                {isRequiredAndParentNotRequired(this.host, this.input) && <Required />}
              </PrefixedTagNames.pText>
            )}
            {hasDescription(this.host, this.description) && (
              <PrefixedTagNames.pText class="label__text label__text--description" {...labelProps} size="x-small">
                {this.description || <slot name="description" />}
              </PrefixedTagNames.pText>
            )}
            {(this.hasUnit || this.hasCounter) && (
              <PrefixedTagNames.pText
                class="unit"
                {...labelProps}
                ref={(el) => (this.unitOrCounterElement = el)}
                aria-hidden="true"
              >
                {this.unit}
              </PrefixedTagNames.pText>
            )}
            <slot />
            {this.hasCounter && (
              <span class="sr-only" ref={(el) => (this.characterCountElement = el)} aria-live="polite" />
            )}
          </label>
          {this.isPassword ? (
            <button
              type="button"
              onClick={this.togglePassword}
              disabled={disabled}
              aria-pressed={this.showPassword ? 'true' : 'false'}
            >
              <span class="sr-only">Toggle password visibility</span>
              <PrefixedTagNames.pIcon
                name={this.showPassword ? 'view-off' : 'view'}
                color="inherit"
                aria-hidden="true"
              />
            </button>
          ) : (
            type === 'search' && (
              <button type="submit" onClick={this.onSubmit} disabled={disabled || readOnly}>
                <span class="sr-only">Search</span>
                <PrefixedTagNames.pIcon name="search" color="inherit" aria-hidden="true" />
              </button>
            )
          )}
        </div>
        {hasMessage(this.host, this.message, this.state) && (
          <StateMessage state={this.state} message={this.message} host={this.host} />
        )}
      </Host>
    );
  }

  private onLabelClick = (): void => {
    this.input.focus();
  };

  private togglePassword = (): void => {
    this.input.type = this.input.type === 'password' ? 'text' : 'password';
    this.showPassword = !this.showPassword;
    this.onLabelClick();
  };

  private onSubmit = (event: MouseEvent): void => {
    handleButtonEvent(
      event,
      this.host,
      () => 'submit',
      () => this.input.disabled
    );
  };

  private observeAttributes = (): void => {
    observeAttributes(this.input, ['disabled', 'readonly', 'required'], () => forceUpdate(this.host));
  };

  private setInputStyles = (): void => {
    setInputStyles(this.input, this.unitOrCounterElement, this.hasCounter ? 'suffix' : this.unitPosition, this.state);
  };
}
