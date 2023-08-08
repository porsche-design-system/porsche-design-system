import { Component, Element, Event, type EventEmitter, h, Host, type JSX, Prop } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes, Theme, ValidatorFunction } from '../../types';
import type { PinCodeState, PinCodeType } from './pin-code-utils';
import {
  AllowedTypes,
  attachComponentCss,
  FORM_STATES,
  getShadowRootHTMLElements,
  hasDescription,
  hasLabel,
  hasMessage,
  THEMES,
  validateProps,
} from '../../utils';
import { getComponentCss } from './pin-code-styles';
import { PIN_CODE_TYPES } from './pin-code-utils';
import { StateMessage } from '../common/state-message/state-message';
import { Required } from '../common/required/required';

const propTypes: PropTypes<typeof PinCode> = {
  label: AllowedTypes.string,
  description: AllowedTypes.string,
  length: AllowedTypes.number,
  hideLabel: AllowedTypes.breakpoint('boolean'),
  state: AllowedTypes.oneOf<PinCodeState>(FORM_STATES),
  disabled: AllowedTypes.boolean,
  required: AllowedTypes.boolean,
  message: AllowedTypes.string,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  type: AllowedTypes.oneOf<PinCodeType>(PIN_CODE_TYPES),
  value: AllowedTypes.oneOf<ValidatorFunction>([AllowedTypes.string, AllowedTypes.number]),
};

@Component({
  tag: 'p-pin-code',
  shadow: { delegatesFocus: true },
})
export class PinCode {
  @Element() public host!: HTMLElement;

  /** The description text. */
  @Prop() public description?: string = '';

  /** The label text. */
  @Prop() public label?: string = '';

  /** Number of characters of the Pin Code. */
  @Prop() public length?: number = 4;

  /** Show or hide label and description text. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** The validation state. */
  @Prop() public state?: PinCodeState = 'none';

  /** Disables the Pin Code. No events will be triggered while disabled state is active. */
  @Prop() public disabled?: boolean = false;

  /** Marks the Pin Code as required. */
  @Prop() public required?: boolean = false;

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Pin Code type. */
  @Prop() public type?: PinCodeType = 'number';

  /** Sets the initial value of the Pin Code. */
  @Prop() public value?: string | number;

  /** Emitted when selected element changes. */
  @Event({ bubbles: false }) public update: EventEmitter<PinCodeUpdateEvent>;

  /** Adapts the color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  private pinCodeElements: HTMLInputElement[] = [];
  // TODO: private ariaElement: HTMLSpanElement;

  public componentWillRender(): void {
    // make sure initial value is not too long
    this.value && this.value.toString().slice(0, this.length);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.type, this.hideLabel, this.state, this.disabled, this.theme);

    return (
      <Host>
        <label class="label">
          {hasLabel(this.host, this.label) && <span class="label__text">{this.label || <slot name="label" />}</span>}
          {hasDescription(this.host, this.description) && (
            <span class="label__text">{this.description || <slot name="description" />}</span>
          )}
          <div class="pin-code-container">
            {...Array.from({ length: this.length }).map((_value, index) => (
              <input
                type={this.type}
                aria-describedby="otpCode"
                autoComplete="one-time-code"
                maxLength={1}
                onKeyDown={(e) => this.keyDownHandler(e, index)}
                onKeyUp={(e) => this.keyUpHandler(e, index)}
                // TODO: onpaste
                pattern="[0-9]"
                inputMode="numeric"
                value={this.value ? this.value.toString().slice(index, index + 1) : this.value}
                ref={(el) => {
                  this.pinCodeElements.push(el);
                }}
              />
            ))}
          </div>
        </label>
        {hasMessage(this.host, this.message, this.state) && (
          <StateMessage state={this.state} message={this.message} theme="light" host={this.host} />
        )}
      </Host>
    );
  }

  // TODO if possible use utilities instead of private functions

  private keyDownHandler = (e: KeyboardEvent, index: number): void => {
    // delete old value if new input value is valid
    if (this.isValidInput(e.key)) {
      this.pinCodeElements[index].value = '';
    }
    // handle backspace
    if (
      e.key === 'Backspace' &&
      this.hasEmptyValue(index) &&
      !this.isFirstPinInputField(index) &&
      (!this.isLastPinInputField(index) || this.hasEmptyValue(index))
    ) {
      this.pinCodeElements[index - 1].focus();
    }
  };

  private keyUpHandler = (e: KeyboardEvent, index: number): void => {
    if (this.isValidInput(e.key) && !this.isLastPinInputField(index)) {
      this.pinCodeElements[index + 1].focus();
    }
    this.updateValue();
  };

  private isValidInput = (key: string): boolean => {
    return key.length === 1 && this.type === 'number' && /\d/.test(key);
  };

  private isLastPinInputField = (index: number): boolean => {
    return index + 1 === this.length;
  };

  private isFirstPinInputField = (index: number): boolean => {
    return index === 0;
  };

  private hasEmptyValue = (index: number): boolean => {
    return this.pinCodeElements[index].value.length === 0;
  };

  private updateValue = (): void => {
    const pinCode = [];
    for (const pinCodeElement of getShadowRootHTMLElements(this.host, 'input')) {
      pinCode.push(pinCodeElement.value);
    }
    this.value = pinCode.join('');
    this.update.emit({ value: this.value });
    console.log('value', this.value);
  };
}
