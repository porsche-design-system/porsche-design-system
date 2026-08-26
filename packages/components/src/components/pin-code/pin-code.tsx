import { AttachInternals, Component, Element, Event, type EventEmitter, h, type JSX, Prop } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes, ValidatorFunction } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  FORM_STATES,
  getPrefixedTagNames,
  hasDescription,
  hasLabel,
  hasMessage,
  hasPropValueChanged,
  setAriaIDREF,
  validateProps,
} from '../../utils';
import { Label } from '../common/label/label';
import { descriptionId, labelId } from '../common/label/label-utils';
import { LoadingMessage, loadingId } from '../common/loading-message/loading-message';
import { messageId, StateMessage } from '../common/state-message/state-message';
import { getFieldsetAriaAttributes } from '../fieldset/fieldset-utils';
import { getComponentCss } from './pin-code-styles';
import {
  getConcatenatedInputValues,
  getPinCodeInputAriaLabel,
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
  value: AllowedTypes.oneOf<ValidatorFunction>([AllowedTypes.string, AllowedTypes.number, AllowedTypes.null]),
  compact: AllowedTypes.boolean,
};

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "label-after", "description": "Places additional content after the label text (for content that should not be part of the label, e.g. external links or `p-popover`)."}
 * @slot {"name": "description", "description": "Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 *
 * @controlled { "props": ["value"], "event": "change", "isInternallyMutated": true }
 */
@Component({
  tag: 'p-pin-code',
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class PinCode {
  @Element() public host!: HTMLElement;

  /** Sets the visible label text displayed above the pin code fields to identify their purpose. */
  @Prop() public label?: string = '';

  /** Sets a supplementary description displayed below the label to give users additional guidance about the pin code. */
  @Prop() public description?: string = '';

  /** Sets the name of the control submitted with the form data to identify the pin code value on the server. */
  @Prop({ reflect: true }) public name?: string;
  // The "name" property is reflected as an attribute to ensure compatibility with native form submission.
  // In the React wrapper, all props are synced as properties on the element ref, so reflecting "name" as an attribute ensures it is properly handled in the form submission process.

  /** Sets the number of individual input fields rendered, determining how many characters the pin code consists of. */
  @Prop() public length?: PinCodeLength = 4;

  /** Hides the visible label and description while keeping them accessible to screen readers. Supports responsive breakpoint values. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Sets the validation state of the pin code, which controls its visual appearance and feedback message style (`none`, `success`, `error`). */
  @Prop() public state?: PinCodeState = 'none';

  /** Prevents user interaction with all pin code fields and blocks events while the component is disabled. */
  @Prop({ mutable: true }) public disabled?: boolean = false;

  /** Disables the pin code fields and shows a loading spinner to indicate an ongoing background operation. */
  @Prop() public loading?: boolean = false;

  /** Marks the pin code as required so the form cannot be submitted until all fields are filled. */
  @Prop() public required?: boolean = false;

  /** Sets the validation feedback message displayed below the pin code when `state` is `success` or `error`. */
  @Prop() public message?: string = '';

  /** Controls whether the individual input fields mask their content as password dots (`password`) or show digits (`number`). */
  @Prop() public type?: PinCodeType = 'number';

  /** Sets the current concatenated value. Numbers are accepted for programmatic assignment, but user input updates the value as a string. */
  @Prop({ mutable: true }) public value?: string | number | null = '';

  /** Reduces the pin code field height and spacing for use in dense layouts where vertical space is limited. */
  @Prop() public compact?: boolean = false;

  /** Associates the pin code with a form element by its ID when it is not a direct descendant of that form. */
  @Prop({ reflect: true }) public form?: string; // The ElementInternals API automatically detects the form attribute

  /** Emitted when the pin code component loses focus after the user finishes entering characters. */
  @Event({ bubbles: false }) public blur: EventEmitter<void>;

  /** Emitted when the pin code value changes as the user types, carrying `{ value: string; isComplete: boolean }` in the event detail. */
  @Event({ bubbles: true }) public change: EventEmitter<PinCodeChangeEventDetail>;

  @AttachInternals() private internals: ElementInternals;

  private initialLoading: boolean = false;
  private defaultValue: string | number | null | undefined;
  private inputElements: HTMLInputElement[] = [];

  // Coerce number/null/undefined to string for internal handling
  private get parsedValue(): string {
    return String(this.value ?? '');
  }

  public connectedCallback(): void {
    this.initialLoading = this.loading;
  }

  public componentWillLoad(): void {
    this.initialLoading = this.loading;
    if (this.value !== null && this.value !== undefined) {
      this.value = getSanitisedValue(this.host, this.parsedValue, this.length);
    }
    this.defaultValue = this.value;
  }

  public componentWillUpdate(): void {
    if (this.loading) {
      this.initialLoading = true;
    }
  }

  public componentDidLoad(): void {
    this.internals?.setFormValue(this.parsedValue);
    // The beforeinput event is the only event which fires and can be prevented reliably on all keyboard types
    for (const input of this.inputElements) {
      input.addEventListener('beforeinput', this.onBeforeInput);
    }
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public formResetCallback(): void {
    this.internals?.setFormValue(String(this.defaultValue ?? '')); // coerce defaultValue to string for form value
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
    const inputDescriptionId = hasDescription(this.host, this.description) ? descriptionId : undefined;
    const inputMessageId = hasMessage(this.host, this.message, this.state) ? messageId : undefined;

    return (
      <fieldset
        class="root"
        disabled={this.disabled}
        {...getFieldsetAriaAttributes(this.required, this.state === 'error')}
        aria-describedby={setAriaIDREF(this.loading && loadingId, inputMessageId, inputDescriptionId)}
        aria-labelledby={hasLabel(this.host, this.label) ? labelId : null}
      >
        <Label
          host={this.host}
          label={this.label}
          description={this.description}
          htmlFor={currentInputId}
          isRequired={this.required}
          isLoading={this.loading}
          isDisabled={this.disabled}
          onClick={this.focusCurrentInput}
        />
        {/* dir overwrites default behavior in RTL mode, because pin codes are always numeric and should be treated in ltr direction. */}
        {/* biome-ignore lint/a11y/noStaticElementInteractions: ok */}
        <div class="wrapper" onKeyDown={this.onKeyDown} onPaste={this.onPaste} onInput={this.onInput} dir="ltr">
          {Array.from(new Array(this.length), (_, index) => (
            <input
              key={index}
              name={this.name}
              form={this.form}
              {...(isCurrentInput(index, this.parsedValue, this.length) && { id: currentInputId })}
              type={this.type === 'number' ? 'text' : this.type}
              aria-label={getPinCodeInputAriaLabel(index, this.length)}
              aria-describedby={setAriaIDREF(inputMessageId)}
              aria-invalid={this.state === 'error' ? 'true' : null}
              aria-disabled={this.loading ? 'true' : null}
              autoComplete="one-time-code"
              pattern="\d*"
              inputMode="numeric" // get numeric keyboard on mobile
              value={this.parsedValue[index] === ' ' ? null : this.parsedValue[index]}
              disabled={this.disabled}
              required={this.required}
              onFocus={this.onInputFocus}
              onMouseUp={this.onInputMouseUp}
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

  private onBeforeInput = (event: InputEvent & HTMLInputElementEventTarget): void => {
    const { data, inputType, target } = event;

    if (this.loading) {
      event.preventDefault();
      return;
    }

    const preventNonDigitInput = data && !isInputOnlyDigits(data);
    if (preventNonDigitInput) {
      event.preventDefault();
      return;
    }

    // Replace an occupied cell with a single typed digit, then move focus forward
    if (inputType === 'insertText' && target.value.length > 0 && data?.length === 1) {
      const isFullySelected = target.selectionStart === 0 && target.selectionEnd === target.value.length;
      event.preventDefault();
      if (!isFullySelected) {
        return;
      }
      target.value = data;
      this.updateValue(getConcatenatedInputValues(this.inputElements));
      if (target.nextElementSibling) {
        target.nextElementSibling.focus();
      } else {
        target.select();
      }
      return;
    }

    // Equivalent to maxLength={1}; some keyboard suggestions fire a single input event so we cannot use the maxLength attribute
    // Multi-character suggestions therefore only work when the cell is empty
    if (inputType === 'insertText' && target.value.length > 0) {
      event.preventDefault();
    }
  };

  private onInputFocus = (event: FocusEvent & HTMLInputElementEventTarget): void => {
    const { target } = event;
    if (target.value) {
      target.select();
    }
  };

  // WebKit places the caret on mouseup after focus, which would undo select() and block overwrite.
  private onInputMouseUp = (event: MouseEvent & HTMLInputElementEventTarget): void => {
    if (event.target.value) {
      event.preventDefault();
    }
  };

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
    if (key === 'ArrowLeft') {
      event.preventDefault();
      previousElementSibling?.focus();
    } else if (key === 'ArrowRight') {
      event.preventDefault();
      nextElementSibling?.focus();
    } else if (key === 'Home') {
      event.preventDefault();
      this.inputElements[0]?.focus();
    } else if (key === 'End') {
      event.preventDefault();
      this.inputElements[this.inputElements.length - 1]?.focus();
    } else if (key === 'Backspace' || key === 'Delete') {
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
    if (sanitisedPastedValue !== this.parsedValue) {
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

  // Chrome with delegatesFocus focuses always the current input when the label is clicked.
  private focusCurrentInput = (): void => {
    this.inputElements.find((input) => input.id === 'current-input')?.focus();
  };

  private onInputBlur = (e: FocusEvent): void => {
    e.stopPropagation();
    if (!e.relatedTarget || !this.inputElements.includes(e.relatedTarget as HTMLInputElement)) {
      this.blur.emit();
    }
  };
}
