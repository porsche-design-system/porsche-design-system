import { Component, Element, forceUpdate, h, Host, JSX, Prop, State } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  attachSlottedCss,
  getOnlyChildOfKindHTMLElementOrThrow,
  getPrefixedTagNames,
  handleButtonEvent,
  hasDescription,
  hasLabel,
  hasMessage,
  isRequiredAndParentNotRequired,
  observeAttributes,
  setAriaAttributes,
  unobserveAttributes,
  validateProps,
} from '../../../utils';
import type { PropTypes } from '../../../utils';
import type { BreakpointCustomizable, FormState } from '../../../types';
import { FORM_STATES } from '../../../types';
import { getComponentCss, getSlottedCss } from './text-field-wrapper-styles';
import { StateMessage } from '../../common/state-message/state-message';
import type { TextFieldWrapperUnitPosition } from './text-field-wrapper-utils';
import {
  addInputEventListenerForCounter,
  addInputEventListenerForSearch,
  hasCounterAndIsTypeText,
  hasUnitAndIsTypeTextOrNumber,
  isType,
  isWithinForm,
  setInputStyles,
  throwIfUnitLengthExceeded,
  UNIT_POSITIONS,
} from './text-field-wrapper-utils';
import { Required } from '../../common/required/required';

const propTypes: PropTypes<typeof TextFieldWrapper> = {
  label: AllowedTypes.string,
  unit: AllowedTypes.string,
  unitPosition: AllowedTypes.oneOf<TextFieldWrapperUnitPosition>(UNIT_POSITIONS),
  description: AllowedTypes.string,
  state: AllowedTypes.oneOf<FormState>(FORM_STATES),
  message: AllowedTypes.string,
  hideLabel: AllowedTypes.breakpoint('boolean'),
  showCharacterCount: AllowedTypes.boolean,
};

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

  /** Show or hide max character count. */
  @Prop() public showCharacterCount?: boolean = true;

  @State() private showPassword = false;

  @State() private isClearable = false;

  private input: HTMLInputElement;
  private unitOrCounterElement: HTMLElement;
  private ariaElement: HTMLSpanElement;
  private isSearch: boolean;
  private isPassword: boolean;
  private isWithinForm: boolean;
  private hasCounter: boolean;
  private isCounterVisible: boolean;
  private hasUnit: boolean;

  public connectedCallback(): void {
    attachSlottedCss(this.host, getSlottedCss);
    this.observeAttributes(); // on every reconnect
  }

  public componentWillLoad(): void {
    this.input = getOnlyChildOfKindHTMLElementOrThrow(
      this.host,
      ['text', 'number', 'email', 'tel', 'search', 'url', 'date', 'time', 'month', 'week', 'password']
        .map((type) => `input[type=${type}]`)
        .join(',')
    );
    this.observeAttributes(); // once initially
    this.isSearch = isType(this.input.type, 'search');
    this.isPassword = isType(this.input.type, 'password');
    this.isWithinForm = isWithinForm(this.host);
    this.hasCounter = hasCounterAndIsTypeText(this.input);
    this.isCounterVisible = this.showCharacterCount && this.hasCounter;
    this.hasUnit = !this.isCounterVisible && hasUnitAndIsTypeTextOrNumber(this.input, this.unit);
    this.isClearable = !!this.input.value;
  }

  public componentDidLoad(): void {
    if (this.hasCounter) {
      addInputEventListenerForCounter(
        this.input,
        this.ariaElement,
        this.isCounterVisible && this.unitOrCounterElement,
        this.setInputStyles
      );
    } else if (this.isSearch) {
      addInputEventListenerForSearch(this.input, (hasValue) => (this.isClearable = hasValue));
    }
  }

  public componentWillRender(): void {
    validateProps(this, propTypes);
    throwIfUnitLengthExceeded(this.unit);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.input.disabled,
      this.hideLabel,
      this.state,
      this.hasUnit || this.isCounterVisible,
      this.isCounterVisible ? 'suffix' : this.unitPosition,
      this.isPassword ? 'password' : this.input.type,
      this.isWithinForm
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

  public disconnectedCallback(): void {
    unobserveAttributes(this.input);
  }

  public render(): JSX.Element {
    const { readOnly, disabled } = this.input;

    const labelProps = {
      tag: 'span',
      color: 'inherit',
      onClick: this.onLabelClick,
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <div class="root">
          <label class="label">
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
            {(this.hasUnit || this.isCounterVisible) && (
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
            {this.hasCounter && <span class="sr-only" ref={(el) => (this.ariaElement = el)} aria-live="polite" />}
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
            this.isSearch && [
              <button
                type="button"
                onClick={this.onClear}
                disabled={disabled || readOnly}
                hidden={!this.isClearable}
                tabIndex={-1}
              >
                <span class="sr-only">Clear</span>
                <PrefixedTagNames.pIcon name="close" color="inherit" aria-hidden="true" />
              </button>,
              this.isWithinForm ? (
                <button type="submit" onClick={this.onSubmit} disabled={disabled || readOnly}>
                  <span class="sr-only">Search</span>
                  <PrefixedTagNames.pIcon name="search" color="inherit" aria-hidden="true" />
                </button>
              ) : (
                <PrefixedTagNames.pIcon name="search" color="inherit" aria-hidden="true" />
              ),
            ]
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
    this.input.type = isType(this.input.type, 'password') ? 'text' : 'password';
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

  // TODO: unit test
  private onClear = (): void => {
    this.input.value = '';
    this.isClearable = false;
    this.onLabelClick();
    // TODO: emit event?
  };

  private observeAttributes = (): void => {
    observeAttributes(this.input, ['disabled', 'readonly', 'required'], () => forceUpdate(this.host));
  };

  private setInputStyles = (): void => {
    setInputStyles(
      this.input,
      this.unitOrCounterElement,
      this.isCounterVisible ? 'suffix' : this.unitPosition,
      this.state
    );
  };
}
