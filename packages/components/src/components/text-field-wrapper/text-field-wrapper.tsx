import { Component, Element, Event, EventEmitter, forceUpdate, h, Host, JSX, Prop, State } from '@stencil/core';
import {
  addInputEventListenerForCounter,
  AllowedTypes,
  attachComponentCss,
  FORM_STATES,
  getOnlyChildOfKindHTMLElementOrThrow,
  getPrefixedTagNames,
  handleButtonEvent,
  hasDescription,
  hasLabel,
  hasMessage,
  isRequiredAndParentNotRequired,
  observeAttributes,
  observeProperties,
  setAriaAttributes,
  THEMES,
  unobserveAttributes,
  validateProps,
} from '../../utils';
import type { BreakpointCustomizable, IconName, PropTypes, Theme } from '../../types';
import type { FormState } from '../../utils/form/form-state';
import { getComponentCss } from './text-field-wrapper-styles';
import { StateMessage } from '../common/state-message/state-message';
import type { TextFieldWrapperUnitPosition } from './text-field-wrapper-utils';
import {
  addInputEventListenerForSearch,
  dispatchInputEvent,
  hasCounterAndIsTypeText,
  hasLocateAction,
  hasUnitAndIsTypeTextOrNumber,
  isType,
  isWithinForm,
  setInputStyles,
  throwIfUnitLengthExceeded,
  UNIT_POSITIONS,
} from './text-field-wrapper-utils';
import { Required } from '../common/required/required';

const propTypes: PropTypes<typeof TextFieldWrapper> = {
  label: AllowedTypes.string,
  unit: AllowedTypes.string,
  unitPosition: AllowedTypes.oneOf<TextFieldWrapperUnitPosition>(UNIT_POSITIONS),
  description: AllowedTypes.string,
  state: AllowedTypes.oneOf<FormState>(FORM_STATES),
  message: AllowedTypes.string,
  hideLabel: AllowedTypes.breakpoint('boolean'),
  showCharacterCount: AllowedTypes.boolean,
  actionIcon: AllowedTypes.oneOf<Extract<IconName, 'locate'>>(['locate', undefined]),
  actionLoading: AllowedTypes.boolean,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
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

  /** Action icon can be set to `locate` for `input type="search"` in order to display an action button. */
  @Prop() public actionIcon?: Extract<IconName, 'locate'>;

  /** Disables the action button and shows a loading indicator. No events will be triggered while loading state is active. */
  @Prop() public actionLoading?: boolean = false;

  /** Adapts the color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when the action button is clicked. */
  @Event({ bubbles: false }) public action?: EventEmitter<void>;

  @State() private showPassword = false;

  @State() private isClearable = false;

  private input: HTMLInputElement;
  private unitOrCounterElement: HTMLElement;
  private ariaElement: HTMLSpanElement;
  private isSearch: boolean;
  private isPassword: boolean;
  private isWithinForm: boolean;
  private hasAction: boolean;
  private hasCounter: boolean;
  private isCounterVisible: boolean;
  private hasUnit: boolean;

  public connectedCallback(): void {
    this.observeAttributes(); // on every reconnect
  }

  public componentWillLoad(): void {
    this.input = getOnlyChildOfKindHTMLElementOrThrow(
      this.host,
      ['text', 'number', 'email', 'tel', 'search', 'url', 'date', 'time', 'month', 'week', 'password']
        .map((type) => `input[type=${type}]`)
        .join()
    );
    this.observeAttributes(); // once initially
    this.isSearch = isType(this.input.type, 'search');
    this.isPassword = isType(this.input.type, 'password');
    this.isWithinForm = isWithinForm(this.host);
    this.hasAction = hasLocateAction(this.actionIcon);
    this.hasCounter = hasCounterAndIsTypeText(this.input);
    this.isCounterVisible = this.showCharacterCount && this.hasCounter;
    this.hasUnit = !this.isCounterVisible && hasUnitAndIsTypeTextOrNumber(this.input, this.unit);

    if (this.isSearch) {
      this.isClearable = !!this.input.value;
      // detect programmatic value changes like it happens in frameworks
      observeProperties(this.input, ['value'], () => (this.isClearable = !!this.input.value));
    }
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
    validateProps(this, propTypes);
    throwIfUnitLengthExceeded(this.unit);
    const { readOnly, disabled, type } = this.input;

    attachComponentCss(
      this.host,
      getComponentCss,
      disabled,
      this.hideLabel,
      this.state,
      this.hasUnit || this.isCounterVisible,
      this.isCounterVisible ? 'suffix' : this.unitPosition,
      this.isPassword ? 'password' : type,
      this.isWithinForm,
      this.theme
    );

    const disabledOrReadOnly = disabled || readOnly;

    const labelProps = {
      onClick: this.onLabelClick,
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <div class="root">
          <label class="label">
            {hasLabel(this.host, this.label) && (
              <span class="label__text" {...labelProps}>
                {this.label || <slot name="label" />}
                {isRequiredAndParentNotRequired(this.host, this.input) && <Required />}
              </span>
            )}
            {hasDescription(this.host, this.description) && (
              <span class="label__text" {...labelProps}>
                {this.description || <slot name="description" />}
              </span>
            )}
            {(this.hasUnit || this.isCounterVisible) && (
              <span class="unit" ref={(el) => (this.unitOrCounterElement = el)} aria-hidden="true">
                {this.unit}
              </span>
            )}
            <slot />
            {this.hasCounter && <span class="sr-only" ref={(el) => (this.ariaElement = el)} aria-live="polite" />}
          </label>
          {this.isPassword ? (
            <PrefixedTagNames.pButtonPure
              class="button"
              type="button"
              hideLabel={true}
              icon={this.showPassword ? 'view-off' : 'view'}
              disabled={disabled}
              theme={this.theme}
              onClick={this.togglePassword}
              aria={{ 'aria-pressed': this.showPassword ? 'true' : 'false' }}
            >
              Toggle password visibility
            </PrefixedTagNames.pButtonPure>
          ) : (
            this.isSearch && [
              // TODO: create an own component, which would fix SSR support too
              this.isWithinForm ? (
                <PrefixedTagNames.pButtonPure
                  key="btn-submit"
                  class="button"
                  type="submit"
                  icon="search"
                  disabled={disabledOrReadOnly}
                  theme={this.theme}
                  onClick={this.onSubmit}
                  hideLabel={true}
                >
                  Search
                </PrefixedTagNames.pButtonPure>
              ) : (
                <PrefixedTagNames.pIcon
                  key="icon"
                  class="icon"
                  name="search"
                  color="contrast-medium"
                  theme={this.theme}
                  aria-hidden="true"
                />
              ),
              <PrefixedTagNames.pButtonPure
                key="btn-clear"
                class="button"
                type="button"
                icon="close"
                hideLabel={true}
                tabIndex={-1}
                hidden={!this.isClearable}
                theme={this.theme}
                disabled={disabledOrReadOnly}
                onClick={this.onClear}
                aria-hidden="true"
              />,
              this.hasAction && (
                <PrefixedTagNames.pButtonPure
                  key="btn-action"
                  class="button"
                  type="button"
                  icon="locate"
                  hidden={this.isClearable}
                  disabled={disabledOrReadOnly}
                  theme={this.theme}
                  onClick={!this.actionLoading ? () => this.action.emit() : null}
                  hideLabel={true}
                  loading={this.actionLoading}
                >
                  Locate me
                </PrefixedTagNames.pButtonPure>
              ),
            ]
          )}
        </div>
        {hasMessage(this.host, this.message, this.state) && (
          <StateMessage state={this.state} message={this.message} theme="light" host={this.host} />
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

  private onClear = (): void => {
    this.onLabelClick();
    this.input.value = '';
    dispatchInputEvent(this.input);
  };

  private observeAttributes = (): void => {
    observeAttributes(this.input, ['disabled', 'readonly', 'required'], () => forceUpdate(this.host));
  };

  private setInputStyles = (): void => {
    setInputStyles(this.input, this.unitOrCounterElement, this.isCounterVisible ? 'suffix' : this.unitPosition);
  };
}
