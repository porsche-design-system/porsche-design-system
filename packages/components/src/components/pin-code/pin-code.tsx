import { Component, Element, Event, type EventEmitter, h, Host, type JSX, Prop } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../types';
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
  currentInputId,
  descriptionId,
  initHiddenInput,
  isInputSingleDigit,
  getInputValue,
  hiddenInputSlotName,
  labelId,
  PIN_CODE_LENGTHS,
  PIN_CODE_TYPES,
  stateMessageId,
  syncHiddenInput,
  getSanitisedValue,
  removeWhiteSpaces,
} from './pin-code-utils';
import { StateMessage } from '../common/state-message/state-message';
import { Required } from '../common/required/required';
import { getClosestHTMLElement } from '../../utils/dom';

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
  value: AllowedTypes.string,
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

  private form: HTMLFormElement;
  private isWithinForm: boolean;
  private hiddenInput: HTMLInputElement;
  private inputElements: HTMLInputElement[] = [];

  public componentWillLoad(): void {
    this.form = getClosestHTMLElement(this.host, 'form');
    this.isWithinForm = !!this.form;
    if (this.isWithinForm) {
      this.hiddenInput = initHiddenInput(this.host, this.name, this.value, this.disabled, this.required);
    }
  }

  public componentWillUpdate(): void {
    if (this.isWithinForm) {
      syncHiddenInput(this.hiddenInput, this.name, this.value, this.disabled, this.required);
    }
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.hideLabel,
      this.state,
      this.disabled,
      this.loading,
      this.isWithinForm,
      this.length,
      this.theme
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    // reset array of input elements
    this.inputElements = [];

    return (
      <Host>
        <label class="label" htmlFor={currentInputId}>
          {hasLabel(this.host, this.label) && (
            <span id={labelId} class="label__text">
              {this.label || <slot name="label" />}
              {!isParentFieldsetRequired(this.host) && this.required && <Required />}
            </span>
          )}
          {hasDescription(this.host, this.description) && (
            <span id={descriptionId} class="label__text">
              {this.description || <slot name="description" />}
            </span>
          )}
        </label>
        <div class="input-container" onKeyDown={this.onKeyDown} onPaste={this.onPaste} onInput={this.onInput}>
          {this.loading && (
            <PrefixedTagNames.pSpinner
              class="spinner"
              size="inherit"
              theme={this.theme}
              aria={{ 'aria-label': 'Loading state' }}
            />
          )}
          {this.isWithinForm && <slot name={hiddenInputSlotName} />}
          {Array.from(Array(this.length), (_, index) => (
            <input
              id={index === this.value.length ? currentInputId : null}
              type={this.type === 'number' ? 'text' : this.type}
              aria-label={`${index + 1}-${this.length}`}
              aria-describedby={`${labelId} ${descriptionId} ${stateMessageId}`}
              aria-invalid={this.state === 'error' ? 'true' : null}
              aria-busy={this.loading ? 'true' : null}
              autoComplete="one-time-code"
              pattern="\d*"
              inputMode="numeric" // get numeric keyboard on mobile
              value={this.value[index] === ' ' ? null : this.value[index]}
              disabled={this.disabled}
              required={this.required}
              ref={(el) => this.inputElements.push(el)}
            />
          ))}
        </div>
        {hasMessage(this.host, this.message, this.state) && (
          <StateMessage
            id={stateMessageId}
            state={this.state}
            message={this.message}
            theme={this.theme}
            host={this.host}
          />
        )}
      </Host>
    );
  }

  private onInput = (
    e: InputEvent & {
      target: HTMLInputElement;
    }
  ): void => {
    // needed to update value on auto-complete via keyboard suggestion
    const { target } = e;
    if (target.value?.length >= this.length) {
      const sanitisedValue = getSanitisedValue(target.value, this.length);
      this.value = sanitisedValue;
      this.emitUpdateEvent();
      this.focusFirstEmptyOrLastElement(sanitisedValue);
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
    // prevent default for disabled or loading, but do not impede tab key
    if (isDisabledOrLoading(this.disabled, this.loading) && key !== 'Tab') {
      e.preventDefault();
    } // if input is valid overwrite old value
    else if (isInputSingleDigit(key)) {
      e.preventDefault();
      target.value = key;
      this.value = getInputValue(this.inputElements);
      this.emitUpdateEvent();

      nextElementSibling?.focus();
    } // handle alphanumeric keys, allow copy/paste shortcut
    else if (key.length === 1 && !(e.ctrlKey || e.metaKey)) {
      e.preventDefault();
    } // handle backspace and delete
    else if (key === 'Backspace' || key === 'Delete') {
      // transfer focus backward/forward, if the input value is empty
      if (!target.value) {
        e.preventDefault();
        if (key === 'Backspace' && previousElementSibling) {
          previousElementSibling.value = '';
          previousElementSibling.focus();
        } else if (key === 'Delete' && nextElementSibling) {
          nextElementSibling.value = '';
          nextElementSibling.focus();
        }
      }
      target.value = '';
      this.inputElements.forEach((pinCodeElement) => {
        if (pinCodeElement === e.target) {
          pinCodeElement.value = '';
        }
      });

      this.value = getInputValue(this.inputElements);
      this.emitUpdateEvent();
    } // support native submit behavior
    else if (key === 'Enter') {
      if (
        isWithinForm &&
        (this.form.querySelectorAll('input').length === 1 || this.form.querySelector('button[type=submit]'))
      ) {
        this.form.requestSubmit();
      }
    } // workaround since 'Dead' key e.g. ^¨ can not be prevented with e.preventDefault()
    // workaround for ^ in firefox key: 'Process'
    else if (key === 'Dead' || key === 'Process') {
      target.blur();
      requestAnimationFrame(() => target.focus());
    }
  };

  private onPaste = (e: ClipboardEvent): void => {
    const sanitisedPastedValue = getSanitisedValue(e.clipboardData.getData('Text'), this.length);
    if (hasInputOnlyDigitsOrWhitespaces(sanitisedPastedValue) && sanitisedPastedValue !== this.value) {
      this.value = sanitisedPastedValue;
      this.emitUpdateEvent();
      this.focusFirstEmptyOrLastElement(sanitisedPastedValue);
    }
    e.preventDefault();
  };

  private emitUpdateEvent = (): void => {
    this.update.emit({ value: this.value, isComplete: getSanitisedValue(this.value).length === this.length });
  };

  private focusFirstEmptyOrLastElement = (sanitisedValue: string): void => {
    if (sanitisedValue.length === this.length) {
      this.pinCodeElements[sanitisedValue.length - 1]?.focus();
    } else {
      this.pinCodeElements[sanitisedValue.length]?.focus();
    }
  };

  private validateInitialValue = (): void => {
    // reset initial value if it does not consist of digits only
    if (this.value && !hasInputOnlyDigitsOrWhitespaces(this.value)) {
      this.value = '';
      warnIfInitialValueIsTransformed(this.host);
      this.emitUpdateEvent();
    }

    // make sure initial value is not longer than pin code length
    if (this.value?.length > this.length) {
      this.value = this.value.slice(0, this.length);
      warnIfInitialValueIsTransformed(this.host, this.length);
      this.emitUpdateEvent();
    }
  };
}
