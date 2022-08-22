import { Component, Element, Event, EventEmitter, forceUpdate, h, Host, JSX, Prop, State } from '@stencil/core';
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
  observeProperties,
  setAriaAttributes,
  unobserveAttributes,
  validateProps,
} from '../../../utils';
import type { BreakpointCustomizable, PropTypes } from '../../../types';
import { FORM_STATES } from '../form-state';
import type { FormState } from '../form-state';
import { getComponentCss, getSlottedCss } from './text-field-wrapper-styles';
import { StateMessage } from '../../common/state-message/state-message';
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
import { Required } from '../../common/required/required';
import { addInputEventListenerForCounter } from '../form-utils';
import type { IconName } from '../../../types';

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

  /** Emitted when the action button is clicked. */
  @Event({ bubbles: false }) public action?: EventEmitter<void>;

  @State() private showPassword = false;

  @State() private isClearable = false;

  // We need to trigger a re-render if the input `type` changes after being mounted so we track the input type
  @State() private inputType = 'text';

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
    attachSlottedCss(this.host, getSlottedCss);
    this.observeAttributes(); // on every reconnect
  }

  public componentWillLoad(): void {
    this.initInput();
    this.observeAttributes(); // once initially

    observeProperties(this.input, ['type'], () => {
      console.log('type change!', this.input.type);
      this.initInput();
    });

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
      this.isWithinForm,
      this.hasAction,
      this.hasAction && this.actionLoading
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
    const disabledOrReadOnly = disabled || readOnly;

    const labelProps = {
      tag: 'span',
      color: 'inherit',
      onClick: this.onLabelClick,
    };

    const iconProps = {
      color: 'inherit',
      'aria-hidden': 'true',
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
              <PrefixedTagNames.pIcon name={this.showPassword ? 'view-off' : 'view'} {...iconProps} />
            </button>
          ) : (
            this.isSearch && [
              <button
                type="button"
                tabIndex={-1}
                hidden={!this.isClearable}
                disabled={disabledOrReadOnly}
                onClick={this.onClear}
              >
                <PrefixedTagNames.pIcon name="close" {...iconProps} />
              </button>,
              this.hasAction && (
                <button
                  type="button"
                  hidden={this.isClearable}
                  disabled={disabledOrReadOnly}
                  onClick={!this.actionLoading ? () => this.action.emit() : null}
                >
                  <span class="sr-only">Locate me</span>
                  {this.actionLoading ? (
                    <PrefixedTagNames.pSpinner size="inherit" />
                  ) : (
                    // hardcoded locate icon
                    <PrefixedTagNames.pIcon name="locate" {...iconProps} />
                  )}
                </button>
              ),
              this.isWithinForm ? (
                <button type="submit" disabled={disabledOrReadOnly} onClick={this.onSubmit}>
                  <span class="sr-only">Search</span>
                  <PrefixedTagNames.pIcon name="search" {...iconProps} />
                </button>
              ) : (
                <PrefixedTagNames.pIcon class="icon" name="search" {...iconProps} />
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

  private initInput = () => {
    this.input = getOnlyChildOfKindHTMLElementOrThrow(
      this.host,
      ['text', 'number', 'email', 'tel', 'search', 'url', 'date', 'time', 'month', 'week', 'password']
        .map((type) => `input[type=${type}]`)
        .join(',')
    );
    this.inputType = this.input.type;
    this.isSearch = isType(this.inputType, 'search');
    this.isPassword = isType(this.inputType, 'password');
    this.isWithinForm = isWithinForm(this.host);
    this.hasAction = hasLocateAction(this.actionIcon);
    this.hasCounter = hasCounterAndIsTypeText(this.input);
    this.isCounterVisible = this.showCharacterCount && this.hasCounter;
    this.hasUnit = !this.isCounterVisible && hasUnitAndIsTypeTextOrNumber(this.input, this.unit);
  };

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
    setInputStyles(
      this.input,
      this.unitOrCounterElement,
      this.isCounterVisible ? 'suffix' : this.unitPosition,
      this.state
    );
  };
}
