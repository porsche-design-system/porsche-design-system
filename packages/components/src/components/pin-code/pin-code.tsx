import { Component, Element, Event, type EventEmitter, h, Host, type JSX, Prop } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes, Theme, ValidatorFunction } from '../../types';
import type { PinCodeState, PinCodeType, PinCodeUpdateEvent } from './pin-code-utils';
import {
  AllowedTypes,
  attachComponentCss,
  FORM_STATES,
  hasDescription,
  hasLabel,
  hasMessage,
  hasPropValueChanged,
  THEMES,
  validateProps,
} from '../../utils';
import { getComponentCss } from './pin-code-styles';
import { inputIsSingleDigit, isWithinForm, PIN_CODE_TYPES } from './pin-code-utils';
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
  private isWithinForm: boolean;
  // TODO: private ariaElement: HTMLSpanElement;

  public componentWillLoad(): void {
    this.isWithinForm = isWithinForm(this.host);
  }

  public componentWillRender(): void {
    // make sure initial value is not too long
    if (this.value) {
      this.value.toString().slice(0, this.length);
    }
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.type, this.hideLabel, this.state, this.disabled, this.theme);

    // reset array of input elements
    this.pinCodeElements = [];

    return (
      <Host>
        <label class="label">
          {hasLabel(this.host, this.label) && (
            <span class="label__text">
              {this.label || <slot name="label" />}
              {this.required && <Required />}
            </span>
          )}
          {hasDescription(this.host, this.description) && (
            <span class="label__text">{this.description || <slot name="description" />}</span>
          )}
          <div class="pin-code-container" onKeyDown={this.onKeyDown} onPaste={this.onPaste} onClick={this.onClick}>
            {this.isWithinForm && <input name="hiddenInput" type="hidden" value={this.value} />}
            {...Array.from({ length: this.length }).map((_value, index) => (
              <input
                type={this.type === 'number' ? 'text' : this.type}
                // aria-label={}
                // aria-labelledby={}
                // aria-describedby={}
                autoComplete="one-time-code"
                pattern="\d*"
                inputMode="numeric" // get numeric keyboard on mobile
                maxLength={1}
                value={this.value?.[index]}
                disabled={this.disabled}
                required={this.required}
                ref={(el) => this.pinCodeElements.push(el)}
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

  private onClick = (
    e: MouseEvent & { target: HTMLInputElement & { previousElementSibling: HTMLInputElement } }
  ): void => {
    // only allow focus on filled or the first empty input
    if (!e.target.value && e.target.previousElementSibling && !e.target.previousElementSibling.value) {
      this.pinCodeElements.find((pinCodeElement) => !pinCodeElement.value).focus();
    }
  };

  private onKeyDown = (
    e: KeyboardEvent & {
      target: HTMLInputElement & { previousElementSibling: HTMLInputElement; nextElementSibling: HTMLInputElement };
    }
  ): void => {
    // if input is valid overwrite old value
    if (inputIsSingleDigit(e.key)) {
      e.target.value = e.key;
      if (e.target.nextElementSibling) {
        e.target.nextElementSibling.focus();
      } else {
        e.target.blur();
      }
      e.preventDefault();
      // TODO: could be a utility
      this.value = this.pinCodeElements.map((pinCodeElement) => pinCodeElement.value).join('');
      this.updateValue();
      // handle backspace
    } else if (e.key === 'Backspace') {
      // transfer focus backward, if the input value is empty, and it is not the first input field
      if (!e.target.value && e.target.previousElementSibling) {
        e.target.previousElementSibling.value = '';
        e.target.previousElementSibling.focus();
      } else {
        e.target.value = '';
      }
      e.preventDefault();
      // TODO: could be a utility
      this.value = this.pinCodeElements.map((pinCodeElement) => pinCodeElement.value).join('');
      this.updateValue();
    }
  };

  private onPaste = (e: ClipboardEvent): void => {
    // remove whitespaces and cut string if pasted value is too long
    const optimizedPastedData = e.clipboardData.getData('Text').replace(/\s/g, '').slice(0, this.length);
    if (/^[0-9]+$/.test(optimizedPastedData) && optimizedPastedData !== this.value) {
      this.value = optimizedPastedData;
      this.updateValue();
      // blur last input element
      if (optimizedPastedData.length === this.length) {
        this.pinCodeElements.map((pinCodeElement) => pinCodeElement.blur());
      } else {
        this.pinCodeElements.find((pinCodeElement) => !pinCodeElement.value).focus();
        this.pinCodeElements[this.value.length].focus();
        // TODO: Why is value of all elements empty in this check?
        // this.pinCodeElements.find((pinCodeElement) => !pinCodeElement.value).focus();
      }
    }
    e.preventDefault();
  };

  private updateValue = (): void => {
    this.update.emit({ value: this.value });
    // TODO: reminder to remove console.log
    /* eslint-disable no-console */
    console.log('value', this.value);
  };
}
