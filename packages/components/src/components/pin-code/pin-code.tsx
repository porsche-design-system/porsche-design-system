import { Component, Element, h, Host, type JSX, Prop } from '@stencil/core';
import type { PropTypes, Theme } from '../../types';
import type { PinCodeType } from './pin-code-utils';
import {
  AllowedTypes,
  attachComponentCss,
  getOnlyChildOfKindHTMLElementOrThrow,
  getShadowRootHTMLElements,
  hasDescription,
  hasLabel,
  THEMES,
  validateProps,
} from '../../utils';
import { getComponentCss } from './pin-code-styles';
import { isTypeNumber, PIN_CODE_TYPES } from './pin-code-utils';

const propTypes: PropTypes<typeof PinCode> = {
  label: AllowedTypes.string,
  description: AllowedTypes.string,
  length: AllowedTypes.number,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  type: AllowedTypes.oneOf<PinCodeType>(PIN_CODE_TYPES),
  mask: AllowedTypes.boolean,
};

@Component({
  tag: 'p-pin-code',
  shadow: true,
})
export class PinCode {
  @Element() public host!: HTMLElement;

  /** The description text. */
  @Prop() public description?: string = '';

  /** The label text. */
  @Prop() public label?: string = '';

  /** Number of characters of the pin code. */
  @Prop() public length?: number = 4;

  /** Mask the pin code. */
  @Prop() public mask?: boolean = true;

  /** Adapts the color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Pin code type. */
  @Prop() public type?: PinCodeType = 'number';

  private input: HTMLInputElement;
  private pinCodeElements: HTMLInputElement[] = [];
  // TODO: private ariaElement: HTMLSpanElement;
  // TODO: private isWithinForm: boolean;

  public connectedCallback(): void {
    this.setPinCodeElements();
  }

  public componentWillLoad(): void {
    this.input = getOnlyChildOfKindHTMLElementOrThrow(this.host, ['hidden'].map((v) => `input[type=${v}]`).join());
  }

  public componentDidRender(): void {
    this.setPinCodeElements();
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss);

    const labelProps = {
      onClick: this.onLabelClick,
    };

    return (
      <Host>
        <label class="label">
          {hasLabel(this.host, this.label) && (
            <span class="label__text" {...labelProps}>
              {this.label || <slot name="label" />}
            </span>
          )}
          {hasDescription(this.host, this.description) && (
            <span class="label__text" {...labelProps}>
              {this.description || <slot name="description" />}
            </span>
          )}
          {...Array.from({ length: this.length }).map((_value, index) => (
            <input
              type={isTypeNumber(this.type) ? 'number' : 'text'}
              aria-describedby="otpCode"
              autoComplete="one-time-code"
              maxLength={1}
              onKeyDown={(e) => this.keyDownHandler(e, index)}
              onKeyUp={(e) => this.keyUpHandler(e, index)}
              pattern={isTypeNumber(this.type) ? 'd{1}' : '[a-zA-Z0-9]{1}'}
              value=""
            />
          ))}
          <slot name="hiddenInput" />
        </label>
      </Host>
    );
  }

  private setPinCodeElements = (): void => {
    this.pinCodeElements = getShadowRootHTMLElements(this.host, 'input');
  };

  private onLabelClick = (): void => {
    this.pinCodeElements[0].focus();
  };

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

  private setInputValue = (): void => {
    const pinCode = [];
    for (const pinCodeElement of this.pinCodeElements) {
      pinCode.push(pinCodeElement.value);
    }
    this.input.value = pinCode.join('');
  };
}
