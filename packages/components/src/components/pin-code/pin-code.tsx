import { Component, Element, h, Host, type JSX, Prop } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../types';
import type { PinCodeState, PinCodeType } from './pin-code-utils';
import {
  AllowedTypes,
  attachComponentCss,
  FORM_STATES,
  getOnlyChildOfKindHTMLElementOrThrow,
  getShadowRootHTMLElements,
  hasDescription,
  hasLabel,
  hasMessage,
  THEMES,
  validateProps,
} from '../../utils';
import { getComponentCss } from './pin-code-styles';
import { isTypeNumber, PIN_CODE_TYPES } from './pin-code-utils';
import { StateMessage } from '../common/state-message/state-message';

const propTypes: PropTypes<typeof PinCode> = {
  label: AllowedTypes.string,
  description: AllowedTypes.string,
  length: AllowedTypes.number,
  hideLabel: AllowedTypes.boolean,
  state: AllowedTypes.oneOf<PinCodeState>(FORM_STATES),
  message: AllowedTypes.string,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  type: AllowedTypes.oneOf<PinCodeType>(PIN_CODE_TYPES),
  mask: AllowedTypes.boolean,
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

  /** Number of characters of the pin code. */
  @Prop() public length?: number = 4;

  /** Show or hide label and description text. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** The validation state. */
  @Prop() public state?: PinCodeState = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Mask the pin code. */
  @Prop() public mask?: boolean = true;

  /** Adapts the color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Pin code type. */
  @Prop() public type?: PinCodeType = 'number';

  // TODO: set initial value? length? what if value is too long? take only first caracters?
  /** Sets the initial value of the pin code. */
  @Prop() public value?: string | number;

  private input: HTMLInputElement;
  // TODO is it still needed for saving refs?
  private pinCodeElements: HTMLInputElement[] = [];
  // TODO: private ariaElement: HTMLSpanElement;

  // TODO: should not be needed with refs
  public connectedCallback(): void {
    this.setPinCodeElements();
  }

  // TODO: should not be needed with refs
  public componentDidRender(): void {
    this.setPinCodeElements();
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.type, this.hideLabel, this.state, this.theme);

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
                type={isTypeNumber(this.type) ? 'number' : 'text'}
                aria-describedby="otpCode"
                autoComplete="one-time-code"
                maxLength={1}
                onKeyDown={(e) => this.keyDownHandler(e, index)}
                onKeyUp={(e) => this.keyUpHandler(e, index)}
                pattern={isTypeNumber(this.type) ? 'd{1}' : '[a-zA-Z0-9]{1}'}
                value="" // TODO: value prop
                // TODO: use ref
              />
            ))}
            <slot name="hiddenInput" />
          </div>
        </label>
        {hasMessage(this.host, this.message, this.state) && (
          <StateMessage state={this.state} message={this.message} theme="light" host={this.host} />
        )}
      </Host>
    );
  }

  // TODO if possible use utilities instead of private functions

  private setPinCodeElements = (): void => {
    this.pinCodeElements = getShadowRootHTMLElements(this.host, 'input');
  };

  // TODO: index should not be needed with refs
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

  // TODO: index should not be needed with refs
  private keyUpHandler = (e: KeyboardEvent, index: number): void => {
    if (this.isValidInput(e.key) && !this.isLastPinInputField(index)) {
      this.setInputValue();
      this.pinCodeElements[index + 1].focus();
    }
  };

  private isValidInput = (key: string): boolean => {
    return key.length === 1 && ((this.type === 'number' && /\d/.test(key)) || this.type === 'alphanumeric');
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

  // TODO update event
  private setInputValue = (): void => {
    const pinCode = [];
    for (const pinCodeElement of this.pinCodeElements) {
      pinCode.push(pinCodeElement.value);
    }
    this.input.value = pinCode.join('');
  };
}
