import { Component, Element, Event, type EventEmitter, h, type JSX, Prop } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../types';
import type { PinCodeLength, PinCodeState, PinCodeType, PinCodeUpdateEventDetail } from './pin-code-utils';
import {
  getConcatenatedInputValues,
  getSanitisedValue,
  initHiddenInput,
  isCurrentInput,
  isFormSubmittable,
  isInputSingleDigit,
  PIN_CODE_LENGTHS,
  PIN_CODE_TYPES,
  removeWhiteSpaces,
  syncHiddenInput,
} from './pin-code-utils';
import {
  AllowedTypes,
  attachComponentCss,
  FORM_STATES,
  getClosestHTMLElement,
  getPrefixedTagNames,
  hasPropValueChanged,
  isDisabledOrLoading,
  isWithinForm,
  THEMES,
  validateProps,
} from '../../utils';
import { getComponentCss } from './pin-code-styles';
import { messageId, StateMessage } from '../common/state-message/state-message';
import { descriptionId, labelId, Label } from '../common/label/label';
import { LoadingMessage } from '../common/loading-message/loading-message';
import { ControllerHost, LoadingController } from '../../controllers';

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
  @Event({ bubbles: false }) public update: EventEmitter<PinCodeUpdateEventDetail>;

  private controllerHost = new ControllerHost(this);
  private loadingCtrl = new LoadingController(this.controllerHost);
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
    this.value = getSanitisedValue(this.host, this.value, this.length);
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

    const currentInputId = 'current-input';

    return (
      <div class="root">
        <Label
          host={this.host}
          label={this.label}
          description={this.description}
          htmlFor={currentInputId}
          isRequired={this.required}
          isLoading={this.loading}
          isDisabled={this.disabled}
        />
        <div class="wrapper" onKeyDown={this.onKeyDown} onPaste={this.onPaste} onInput={this.onInput}>
          {Array.from(Array(this.length), (_, index) => (
            <input
              key={index}
              {...(isCurrentInput(index, this.value, this.length) && { id: currentInputId })}
              type={this.type === 'number' ? 'text' : this.type}
              aria-label={`${index + 1}-${this.length}`}
              aria-describedby={`${labelId} ${descriptionId} ${messageId}`}
              aria-invalid={this.state === 'error' ? 'true' : null}
              aria-disabled={this.loading ? 'true' : null}
              autoComplete="one-time-code"
              pattern="\d*"
              inputMode="numeric" // get numeric keyboard on mobile
              value={this.value[index] === ' ' ? null : this.value[index]}
              disabled={this.disabled}
              required={this.required}
              ref={(el) => this.inputElements.push(el)}
            />
          ))}
          {this.loading && (
            <PrefixedTagNames.pSpinner class="spinner" size="inherit" theme={this.theme} aria-hidden="true" />
          )}
        </div>
        <StateMessage state={this.state} message={this.message} theme={this.theme} host={this.host} />
        {this.isWithinForm && <slot name="internal-input" />}
        <LoadingMessage loading={this.loading} initialLoading={this.loadingCtrl.initialLoading} />
      </div>
    );
  }

  private onInput = (
    e: InputEvent & {
      target: HTMLInputElement;
    }
  ): void => {
    // needed to update value on auto-complete via keyboard suggestion
    const { target } = e;
    if (target.value.length >= this.length) {
      const sanitisedValue = removeWhiteSpaces(getSanitisedValue(this.host, target.value, this.length));
      this.updateValue(sanitisedValue);
      this.focusFirstEmptyOrLastInput(sanitisedValue);
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
      this.updateValue(getConcatenatedInputValues(this.inputElements));

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
      this.updateValue(getConcatenatedInputValues(this.inputElements));
    } // support native submit behavior
    else if (key === 'Enter') {
      if (isWithinForm && isFormSubmittable(this.host, this.form)) {
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
    const sanitisedPastedValue = removeWhiteSpaces(
      getSanitisedValue(this.host, e.clipboardData.getData('Text'), this.length)
    );
    if (sanitisedPastedValue !== this.value) {
      this.updateValue(sanitisedPastedValue);
      this.focusFirstEmptyOrLastInput(sanitisedPastedValue);
    }
    e.preventDefault();
  };

  private updateValue = (newValue: string): void => {
    this.value = newValue;
    this.update.emit({ value: newValue, isComplete: removeWhiteSpaces(newValue).length === this.length });
  };

  private focusFirstEmptyOrLastInput = (sanitisedValue: string): void => {
    this.inputElements[
      sanitisedValue.length === this.length ? sanitisedValue.length - 1 : sanitisedValue.length
    ]?.focus();
  };
}
