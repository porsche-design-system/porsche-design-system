import { AttachInternals, Component, Element, Event, type EventEmitter, h, type JSX, Prop } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  FORM_STATES,
  getPrefixedTagNames,
  hasPropValueChanged,
  validateProps,
} from '../../utils';
import { Label } from '../common/label/label';
import { descriptionId, labelId } from '../common/label/label-utils';
import { loadingId, LoadingMessage } from '../common/loading-message/loading-message';
import { messageId, StateMessage } from '../common/state-message/state-message';
import { getComponentCss } from './pin-code-styles';
import {
  getConcatenatedInputValues,
  getSanitisedValue,
  type HTMLInputElementEventTarget,
  isCurrentInput,
  isFormSubmittable,
  isInputOnlyDigits,
  PIN_CODE_LENGTHS,
  PIN_CODE_TYPES,
  type PinCodeChangeEventDetail,
  type PinCodeLength,
  type PinCodeState,
  type PinCodeType,
  removeWhiteSpaces,
} from './pin-code-utils';
import { getFieldsetAriaAttributes } from '../fieldset/fieldset-utils';

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
  form: AllowedTypes.string,
  message: AllowedTypes.string,
  type: AllowedTypes.oneOf<PinCodeType>(PIN_CODE_TYPES),
  value: AllowedTypes.string,
  compact: AllowedTypes.boolean,
};

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "label-after", "description": "Places additional content after the label text (for content that should not be part of the label, e.g. external links or `p-popover`)."}
 * @slot {"name": "description", "description": "Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 *
 * @controlled { "props": ["value"], "event": "update", "isInternallyMutated": true }
 */
@Component({
  tag: 'p-pin-code',
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class PinCode {
  @Element() public host!: HTMLElement;

  /** The label text. */
  @Prop() public label?: string = '';

  /** The description text. */
  @Prop() public description?: string = '';

  /** Name of the control. */
  @Prop({ reflect: true }) public name?: string;
  // The "name" property is reflected as an attribute to ensure compatibility with native form submission.
  // In the React wrapper, all props are synced as properties on the element ref, so reflecting "name" as an attribute ensures it is properly handled in the form submission process.

  /** Number of characters of the Pin Code. */
  @Prop() public length?: PinCodeLength = 4;

  /** Show or hide label and description text. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** The validation state. */
  @Prop() public state?: PinCodeState = 'none';

  /** Disables the Pin Code. No events will be triggered while disabled state is active. */
  @Prop({ mutable: true }) public disabled?: boolean = false;

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

  /** A boolean value that, if present, renders the pin-code as a compact version. */
  @Prop() public compact?: boolean = false;

  /** The id of a form element the pin-code should be associated with. */
  @Prop({ reflect: true }) public form?: string; // The ElementInternals API automatically detects the form attribute

  /** Emitted when the pin-code has lost focus. */
  @Event({ bubbles: false }) public blur: EventEmitter<void>;

  /** Emitted when the input is changed. */
  @Event({ bubbles: true }) public change: EventEmitter<PinCodeChangeEventDetail>;

  @AttachInternals() private internals: ElementInternals;

  private initialLoading: boolean = false;
  private defaultValue: string;
  private inputElements: HTMLInputElement[] = [];

  public connectedCallback(): void {
    this.initialLoading = this.loading;
  }

  public componentWillLoad(): void {
    this.initialLoading = this.loading;
    this.value = getSanitisedValue(this.host, this.value, this.length);
    this.defaultValue = this.value;
  }

  public componentWillUpdate(): void {
    if (this.loading) {
      this.initialLoading = true;
    }
  }

  public componentDidLoad(): void {
    this.internals?.setFormValue(this.value);
    // The beforeinput event is the only event which fires and can be prevented reliably on all keyboard types
    for (const input of this.inputElements) {
      input.addEventListener('beforeinput', (event: InputEvent & HTMLInputElementEventTarget) => {
        const { data, inputType, target } = event;

        // This is equivalent to maxLength={1} but since some keyboard suggestions fire a single input event we cant use the maxLength attribute
        // This causes the keyboard suggestion to only work if input is empty
        const preventMultipleInput = inputType === 'insertText' && target.value.length > 0;
        const preventNonDigitInput = data && !isInputOnlyDigits(data);

        if (preventMultipleInput || preventNonDigitInput || this.loading) {
          event.preventDefault();
        }
      });
    }
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public formResetCallback(): void {
    this.internals?.setFormValue(this.defaultValue);
    this.value = this.defaultValue;
  }

  public formDisabledCallback(disabled: boolean): void {
    // Called when a parent fieldset is disabled or enabled
    this.disabled = disabled;
  }

  public formStateRestoreCallback(state: string): void {
    this.value = state;
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
      this.length,
      this.compact
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    // reset array of input elements
    this.inputElements = [];

    const currentInputId = 'current-input';

    return (
      <fieldset
        class="root"
        inert={this.disabled}
        disabled={this.disabled}
        {...getFieldsetAriaAttributes(this.required, this.state === 'error')}
        aria-describedby={this.loading ? loadingId : `${descriptionId} ${messageId}`}
        aria-labelledby={labelId}
      >
        <Label
          host={this.host}
          label={this.label}
          description={this.description}
          htmlFor={currentInputId}
          isRequired={this.required}
          isLoading={this.loading}
          isDisabled={this.disabled}
        />
        {/* biome-ignore lint/a11y/noStaticElementInteractions: ok */}
        <div class="wrapper" onKeyDown={this.onKeyDown} onPaste={this.onPaste} onInput={this.onInput}>
          {Array.from(new Array(this.length), (_, index) => (
            <input
              key={index}
              name={this.name}
              form={this.form}
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
              onBlur={this.onInputBlur}
              ref={(el) => this.inputElements.push(el)}
            />
          ))}
          {this.loading && <PrefixedTagNames.pSpinner class="spinner" size="inherit" aria-hidden="true" />}
        </div>
        <StateMessage state={this.state} message={this.message} host={this.host} />
        <LoadingMessage loading={this.loading} initialLoading={this.initialLoading} />
      </fieldset>
    );
  }

  private onInput = (event: InputEvent & HTMLInputElementEventTarget): void => {
    // Validation already happened in the beforeinput event
    const { target } = event;
    // Android keyboard suggestion calls single input event and inputs everything in the first input. By updating our value to what has been input, the component will update and distribute the values to the corresponding inputs.
    if (target.value.length >= this.length) {
      const sanitisedValue = removeWhiteSpaces(getSanitisedValue(this.host, target.value, this.length));
      this.updateValue(sanitisedValue);
      this.focusFirstEmptyOrLastInput(sanitisedValue);
    } else {
      // iOS keyboard suggestion calls separate input events for each digit
      this.updateValue(getConcatenatedInputValues(this.inputElements));
      target.nextElementSibling?.focus();
    }
  };

  private onKeyDown = (event: KeyboardEvent & HTMLInputElementEventTarget): void => {
    const {
      key,
      target,
      target: { previousElementSibling, nextElementSibling },
    } = event;
    if (key === 'Backspace' || key === 'Delete') {
      // transfer focus backward/forward, if the input value is empty
      if (!target.value) {
        event.preventDefault();
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
    } else if (key === 'Enter') {
      if (this.internals?.form && isFormSubmittable(this.host, this.internals?.form)) {
        this.internals?.form.requestSubmit();
      }
    }
    // workaround since 'Dead' key e.g. ^¨ can not be prevented with e.preventDefault()
    // workaround for ^ in firefox key: 'Process'
    else if (key === 'Dead' || key === 'Process') {
      target.blur();
      requestAnimationFrame(() => target.focus());
    }
  };

  private onPaste = (event: ClipboardEvent): void => {
    const sanitisedPastedValue = removeWhiteSpaces(
      getSanitisedValue(this.host, event.clipboardData.getData('Text'), this.length)
    );
    if (sanitisedPastedValue !== this.value) {
      this.updateValue(sanitisedPastedValue);
      this.focusFirstEmptyOrLastInput(sanitisedPastedValue);
    }
    event.preventDefault();
  };

  private updateValue = (newValue: string): void => {
    this.value = newValue;
    this.internals?.setFormValue(this.value);
    const details = { value: newValue, isComplete: removeWhiteSpaces(newValue).length === this.length };
    this.change.emit(details);
  };

  private focusFirstEmptyOrLastInput = (sanitisedValue: string): void => {
    this.inputElements[
      sanitisedValue.length === this.length ? sanitisedValue.length - 1 : sanitisedValue.length
    ]?.focus();
  };

  private onInputBlur = (e: FocusEvent): void => {
    e.stopPropagation();
    if (!e.relatedTarget || !this.inputElements.includes(e.relatedTarget as HTMLInputElement)) {
      this.blur.emit();
    }
  };
}
