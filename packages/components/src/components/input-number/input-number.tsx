import {
  AttachInternals,
  Component,
  Element,
  Event,
  type EventEmitter,
  Fragment,
  h,
  type JSX,
  Prop,
  Watch,
} from '@stencil/core';
import type { BreakpointCustomizable, PropTypes, ValidatorFunction } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  FORM_STATES,
  getPrefixedTagNames,
  hasPropValueChanged,
  implicitSubmit,
  syncFormState,
  validateProps,
} from '../../utils';
import { InputBase } from '../common/input-base/input-base';
import { getComponentCss } from './input-number-styles';
import type {
  InputNumberBlurEventDetail,
  InputNumberChangeEventDetail,
  InputNumberInputEventDetail,
  InputNumberState,
} from './input-number-utils';

const propTypes: PropTypes<typeof InputNumber> = {
  label: AllowedTypes.string,
  description: AllowedTypes.string,
  placeholder: AllowedTypes.string,
  name: AllowedTypes.string,
  value: AllowedTypes.oneOf<ValidatorFunction>([AllowedTypes.string, AllowedTypes.number, AllowedTypes.null]),
  step: AllowedTypes.number,
  controls: AllowedTypes.boolean,
  required: AllowedTypes.boolean,
  loading: AllowedTypes.boolean,
  disabled: AllowedTypes.boolean,
  max: AllowedTypes.number,
  min: AllowedTypes.number,
  form: AllowedTypes.string,
  autoComplete: AllowedTypes.string,
  state: AllowedTypes.oneOf<InputNumberState>(FORM_STATES),
  message: AllowedTypes.string,
  hideLabel: AllowedTypes.breakpoint('boolean'),
  readOnly: AllowedTypes.boolean,
  compact: AllowedTypes.boolean,
};

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed."}
 * @slot {"name": "label-after", "description": "Places additional content after the label text (for content that should not be part of the label, e.g. external links or `p-popover`)."}
 * @slot {"name": "description", "description": "Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed."}
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed."}
 * @slot {"name": "start", "description": "Shows content at the start of the input (e.g. unit prefix)."}
 * @slot {"name": "end", "description": "Shows content at the end of the input (e.g. toggle button, unit suffix)."}
 */
@Component({
  tag: 'p-input-number',
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class InputNumber {
  @Element() public host!: HTMLElement;

  /** Sets the visible label text displayed above the input field. */
  @Prop() public label?: string = '';

  /** Sets the stepping granularity — the value must be a multiple of this number. Also controls step button increment size. */
  @Prop() public step?: number = 1;

  /** Sets a supplementary description displayed below the label to provide additional context. */
  @Prop() public description?: string = '';

  /** Reduces the input height and padding for a more compact layout. */
  @Prop() public compact?: boolean = false;

  /** Sets the name submitted with the form data to identify this field's value on the server. */
  @Prop({ reflect: true }) public name: string;
  // The "name" property is reflected as an attribute to ensure compatibility with native form submission.
  // In the React wrapper, all props are synced as properties on the element ref, so reflecting "name" as an attribute ensures it is properly handled in the form submission process.

  /** Sets the current numeric value. Strings and numbers are accepted for programmatic assignment, but user input updates the value as a string to mirror native input behavior. */
  @Prop({ mutable: true }) public value?: string | number | null = '';

  /** Provides the browser with a data type hint to enable relevant autofill suggestions (e.g. `autocomplete='postal-code'`). */
  @Prop() public autoComplete?: string;

  /** Makes the field read-only — the value is displayed but cannot be edited. The value is still submitted with the form. */
  @Prop() public readOnly?: boolean = false;

  /** Associates the field with a form element by its ID when the field is not nested directly inside it. */
  @Prop({ reflect: true }) public form?: string; // The ElementInternals API automatically detects the form attribute

  /** Sets the maximum allowed numeric value. Values above this are invalid. */
  @Prop() public max?: number;

  /** Sets the minimum allowed numeric value. Values below this are invalid. */
  @Prop() public min?: number;

  /** Sets placeholder text shown inside the field when it is empty, to hint at the expected format. */
  @Prop() public placeholder?: string = '';

  /** Disables the field, preventing all input. The value is not submitted with the form. */
  @Prop({ mutable: true }) public disabled?: boolean = false;

  /** Marks the field as required — form submission is blocked while this field is empty. */
  @Prop() public required?: boolean = false;

  /** @experimental Disables the field and displays a loading spinner to indicate an ongoing operation. */
  @Prop() public loading?: boolean = false;

  /** Sets the validation state, controlling the visual appearance and style of the feedback message (`none`, `success`, `error`). */
  @Prop() public state?: InputNumberState = 'none';

  /** Sets the validation feedback message displayed below the field when `state` is `success` or `error`. */
  @Prop() public message?: string = '';

  /** Hides the visible label while keeping it accessible to screen readers. Supports responsive breakpoint values. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Shows increment/decrement spin buttons inside the field to adjust the numeric value by clicking. */
  @Prop() public controls?: boolean = false;

  /** Emitted when the number input loses focus after its value was changed. The component value and native event target value are strings after user input. */
  @Event({ bubbles: true }) public change: EventEmitter<InputNumberChangeEventDetail>;

  /** Emitted when the number input has lost focus. */
  @Event({ bubbles: false }) public blur: EventEmitter<InputNumberBlurEventDetail>;

  /** Emitted when the value has been changed as a direct result of a user action. The component value and native event target value are strings. */
  @Event({ bubbles: true }) public input: EventEmitter<InputNumberInputEventDetail>;

  @AttachInternals() private internals: ElementInternals;

  private initialLoading: boolean = false;
  private inputElement: HTMLInputElement;
  private defaultValue: string | number | null;

  // Native input.value is always a string; coerce number/null/undefined to mirror native behavior.
  private get parsedValue(): string {
    return String(this.value ?? '');
  }

  @Watch('value')
  public onValueChange(): void {
    if (this.inputElement && this.inputElement.value !== this.parsedValue) {
      this.inputElement.value = this.parsedValue;
    }
  }

  public connectedCallback(): void {
    this.initialLoading = this.loading;
  }

  public componentWillLoad(): void {
    this.defaultValue = this.value; // preserve original type so reset can restore the consumer's exact input
    this.initialLoading = this.loading;
  }

  public componentWillUpdate(): void {
    if (this.loading) {
      this.initialLoading = true;
    }
  }

  public formResetCallback(): void {
    this.value = this.defaultValue; // triggers value watcher
  }

  public formDisabledCallback(disabled: boolean): void {
    // Called when a parent fieldset is disabled or enabled
    this.disabled = disabled;
  }

  public formStateRestoreCallback(state: string | null): void {
    this.value = state;
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public componentDidRender(): void {
    syncFormState(this.internals, this.inputElement, {
      disabled: this.disabled,
      readOnly: this.readOnly,
      value: this.parsedValue,
    });
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);

    attachComponentCss(
      this.host,
      getComponentCss,
      this.disabled,
      this.loading,
      this.hideLabel,
      this.state,
      this.compact,
      this.readOnly,
      this.controls
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <InputBase
        host={this.host}
        label={this.label}
        description={this.description}
        id="input-number"
        refElement={(el: HTMLInputElement) => (this.inputElement = el)}
        onWheel={(e) => (e.target as HTMLInputElement).blur()} // prevent React default scroll-to-[increment|decrement] on number inputs
        onInput={this.onInput}
        onChange={this.onChange}
        onBlur={this.onBlur}
        onKeyDown={this.onKeyDown}
        name={this.name}
        form={this.form}
        type="number"
        required={this.required}
        placeholder={this.placeholder}
        max={this.max}
        min={this.min}
        value={this.parsedValue}
        readOnly={this.readOnly}
        autoComplete={this.autoComplete}
        disabled={this.disabled}
        state={this.state}
        message={this.message}
        step={this.step}
        loading={this.loading}
        initialLoading={this.initialLoading}
        {...(this.controls && {
          end: (
            <Fragment>
              <PrefixedTagNames.pButtonPure
                tabIndex={-1}
                hideLabel={true}
                class="button"
                type="button"
                icon="minus"
                disabled={this.disabled || this.readOnly}
                onClick={() => this.onStep('down')}
              >
                Decrement value by {this.step}
              </PrefixedTagNames.pButtonPure>
              <PrefixedTagNames.pButtonPure
                tabIndex={-1}
                hideLabel={true}
                class="button"
                type="button"
                icon="plus"
                disabled={this.disabled || this.readOnly}
                onClick={() => this.onStep('up')}
              >
                Increment value by {this.step}
              </PrefixedTagNames.pButtonPure>
            </Fragment>
          ),
        })}
      />
    );
  }

  private onKeyDown = (e: KeyboardEvent): void => {
    implicitSubmit(e, this.internals, this.host);
  };

  private onChange = (e: Event): void => {
    e.stopPropagation();
    e.stopImmediatePropagation();
    this.change.emit(e);
  };

  private onBlur = (e: Event): void => {
    e.stopPropagation();
    e.stopImmediatePropagation();
    this.blur.emit(e);
  };

  private onInput = (e: InputEvent): void => {
    e.stopPropagation();
    e.stopImmediatePropagation();
    const target = e.target as HTMLInputElement;
    this.value = target.value; // triggers value watcher
    this.input.emit(e);
  };

  private onStep = (step: 'up' | 'down'): void => {
    this.inputElement[step === 'up' ? 'stepUp' : 'stepDown']();
    // Triggers onInput/onChange functions
    this.inputElement.dispatchEvent(new window.InputEvent('input', { bubbles: true, composed: true }));
    this.inputElement.dispatchEvent(new window.Event('change', { bubbles: true, composed: true }));
    this.inputElement.focus();
  };
}
