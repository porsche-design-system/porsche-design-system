import { Component, Element, Event, type EventEmitter, h, Host, type JSX, Prop } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes, Theme, ValidatorFunction } from '../../types';
import type { PinCodeLength, PinCodeState, PinCodeType, PinCodeUpdateEvent } from './pin-code-utils';
import {
  AllowedTypes,
  attachComponentCss,
  FORM_STATES,
  getPrefixedTagNames,
  hasDescription,
  hasLabel,
  hasMessage,
  hasPropValueChanged,
  isDisabledOrLoading,
  isParentFieldsetRequired,
  isWithinForm,
  THEMES,
  validateProps,
} from '../../utils';
import { getComponentCss } from './pin-code-styles';
import {
  initHiddenInput,
  inputConsistsOfDigits,
  inputIsSingleDigit,
  joinInputValues,
  PIN_CODE_LENGTHS,
  PIN_CODE_TYPES,
  syncHiddenInput,
  warnIfValueIsNotValid,
} from './pin-code-utils';
import { StateMessage } from '../common/state-message/state-message';
import { Required } from '../common/required/required';

const propTypes: PropTypes<typeof PinCode> = {
  label: AllowedTypes.string,
  description: AllowedTypes.string,
  name: AllowedTypes.string,
  length: AllowedTypes.oneOf<PinCodeLength>(PIN_CODE_LENGTHS),
  hideLabel: AllowedTypes.breakpoint('boolean'),
  state: AllowedTypes.oneOf<PinCodeState>(FORM_STATES),
  disabled: AllowedTypes.boolean,
  loading: AllowedTypes.boolean,
  required: AllowedTypes.boolean,
  message: AllowedTypes.string,
  type: AllowedTypes.oneOf<PinCodeType>(PIN_CODE_TYPES),
  value: AllowedTypes.oneOf<ValidatorFunction>([AllowedTypes.string, AllowedTypes.number]),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

@Component({
  tag: 'p-pin-code',
  shadow: true,
})
export class PinCode {
  @Element() public host!: HTMLElement;

  /** The label text. */
  @Prop() public label?: string = '';

  /** The description text. */
  @Prop() public description?: string = '';

  /** Name of the control. */
  @Prop() public name?: string;

  /** Number of characters of the Pin Code. */
  @Prop() public length?: PinCodeLength = 4;

  /** Show or hide label and description text. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** The validation state. */
  @Prop() public state?: PinCodeState = 'none';

  /** Disables the Pin Code. No events will be triggered while disabled state is active. */
  @Prop() public disabled?: boolean = false;

  /** Disables the Pin Code and shows a loading indicator. No events will be triggered while loading state is active. */
  @Prop() public loading?: boolean = false;

  /** Marks the Pin Code as required. */
  @Prop() public required?: boolean = false;

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Pin Code type. */
  @Prop() public type?: PinCodeType = 'number';

  /** Sets the initial value of the Pin Code. */
  @Prop({ mutable: true }) public value?: string = '';

  /** Adapts the color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when selected element changes. */
  @Event({ bubbles: false }) public update: EventEmitter<PinCodeUpdateEvent>;

  private isWithinForm: boolean;
  private hiddenInput: HTMLInputElement;
  private pinCodeElements: HTMLInputElement[] = [];

  public connectedCallback(): void {
    this.isWithinForm = isWithinForm(this.host);
  }

  public componentWillLoad(): void {
    if (this.isWithinForm) {
      this.hiddenInput = initHiddenInput(this.host, this.name, this.value, this.disabled, this.required);
    }
  }

  public componentWillRender(): void {
    // make sure initial value is not longer than pin code length
    if (this.value?.length > this.length) {
      this.value = this.value.slice(0, this.length);
      warnIfValueIsNotValid(this.length);
    }
    // check whether value consists of numbers only
    if (this.value && !inputConsistsOfDigits(this.value)) {
      this.value = '';
      warnIfValueIsNotValid();
    }
    if (this.isWithinForm) {
      syncHiddenInput(this.hiddenInput, this.name, this.value, this.disabled, this.required);
    }
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.hideLabel, this.state, this.disabled, this.loading, this.theme);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    // reset array of input elements
    this.pinCodeElements = [];

    return (
      <Host>
        <label class="label" htmlFor="current-input">
          {hasLabel(this.host, this.label) && (
            <span id="label" class="label__text">
              {this.label || <slot name="label" />}
              {!isParentFieldsetRequired(this.host) && this.required && <Required />}
            </span>
          )}
          {hasDescription(this.host, this.description) && (
            <span id="description" class="label__text">
              {this.description || <slot name="description" />}
            </span>
          )}
        </label>
        <div
          class="pin-code-container"
          onKeyDown={this.onKeyDown}
          onKeyUp={this.onKeyUp}
          onPaste={this.onPaste}
          onClick={this.onClick}
        >
          {this.loading && (
            <PrefixedTagNames.pSpinner
              class="spinner"
              size="inherit"
              theme={this.theme}
              aria={{ 'aria-label': 'Loading state:' }}
            />
          )}
          {this.isWithinForm && <slot name="hidden-input" />}
          {...Array.from({ length: this.length }).map((_value, index) => (
            <input
              id={index === this.value.length ? 'current-input' : null}
              type={this.type === 'number' ? 'text' : this.type}
              aria-label={`${index + 1}-${this.length}`}
              aria-describedby="label description state-message"
              aria-invalid={this.state === 'error' ? 'true' : null}
              aria-busy={this.loading}
              autoComplete="one-time-code"
              maxLength={1}
              pattern="\d*"
              inputMode="numeric" // get numeric keyboard on mobile
              value={this.value[index]}
              disabled={this.disabled}
              required={this.required}
              ref={(el) => this.pinCodeElements.push(el)}
            />
          ))}
        </div>
        {hasMessage(this.host, this.message, this.state) && (
          <StateMessage id="state-message" state={this.state} message={this.message} theme="light" host={this.host} />
        )}
      </Host>
    );
  }

  private onClick = (
    e: MouseEvent & { target: HTMLInputElement & { previousElementSibling: HTMLInputElement } }
  ): void => {
    const {
      target: { previousElementSibling, tagName, value },
    } = e;
    if (isDisabledOrLoading(this.disabled, this.loading) || tagName !== 'INPUT') {
      e.preventDefault();
    } // only allow focus on filled inputs or the first empty input
    else if (!value && previousElementSibling && !previousElementSibling.value) {
      this.pinCodeElements.find((pinCodeElement) => !pinCodeElement.value).focus();
    }
  };

  private onKeyDown = (
    e: KeyboardEvent & {
      target: HTMLInputElement & { previousElementSibling: HTMLInputElement; nextElementSibling: HTMLInputElement };
    }
  ): void => {
    const {
      key,
      target,
      target: { previousElementSibling, nextElementSibling },
    } = e;

    // disabled or loading and handle alphanumeric keys
    if (isDisabledOrLoading(this.disabled, this.loading)) {
      e.preventDefault();
    } // if input is valid overwrite old value
    else if (inputIsSingleDigit(key)) {
      e.preventDefault();
      target.value = key;
      if (nextElementSibling) {
        nextElementSibling.focus();
      }
      this.value = joinInputValues(this.pinCodeElements);
      this.updateValue();
    } // disabled or loading and handle alphanumeric keys
    else if (key?.length === 1 && !(e.ctrlKey || e.metaKey)) {
      e.preventDefault();
    } // handle backspace
    else if (key === 'Backspace') {
      // transfer focus backward, if the input value is empty, and it is not the first input field
      if (!target.value && previousElementSibling) {
        e.preventDefault();
        previousElementSibling.value = '';
        previousElementSibling.focus();
      } else {
        target.value = '';
      }
      this.value = joinInputValues(this.pinCodeElements);
      this.updateValue();
    } // workaround since 'Dead' key e.g. ^¨ can not be prevented with e.preventDefault()
    else if (key === 'Dead') {
      target.blur();
      setTimeout(() => target.focus());
    }
  };

  private onKeyUp = (e: KeyboardEvent & { target: HTMLInputElement }): void => {
    // needed to update value on auto-complete via keyboard suggestion
    const { target } = e;
    if (target.value?.length >= this.length) {
      this.value = target.value;
      this.updateValue();
    }
    this.focusFirstEmptyOrLastElement();
  };

  private onPaste = (e: ClipboardEvent): void => {
    // remove whitespaces and cut string if pasted value is longer than pin code length
    const optimizedPastedData = e.clipboardData.getData('Text').replace(/\s/g, '').slice(0, this.length);
    if (/^[0-9]+$/.test(optimizedPastedData) && optimizedPastedData !== this.value) {
      this.value = optimizedPastedData;
      this.updateValue();
      this.focusFirstEmptyOrLastElement();
    }
    e.preventDefault();
  };

  private updateValue = (): void => {
    this.update.emit({ value: this.value });
  };

  private focusFirstEmptyOrLastElement = (): void => {
    if (this.value.length === this.length) {
      this.pinCodeElements[this.value.length - 1]?.focus();
    } else {
      this.pinCodeElements[this.value.length]?.focus();
    }
  };
}
