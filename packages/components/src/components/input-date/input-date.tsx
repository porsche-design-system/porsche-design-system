import { AttachInternals, Component, Element, Event, type EventEmitter, h, type JSX, Prop, Watch } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  FORM_STATES,
  getPrefixedTagNames,
  hasPropValueChanged,
  hasShowPickerSupport,
  implicitSubmit,
  validateProps,
} from '../../utils';
import { InputBase } from '../common/input-base/input-base';
import { getComponentCss } from './input-date-styles';
import type {
  InputDateBlurEventDetail,
  InputDateChangeEventDetail,
  InputDateInputEventDetail,
  InputDateState,
} from './input-date-utils';

const propTypes: PropTypes<typeof InputDate> = {
  label: AllowedTypes.string,
  description: AllowedTypes.string,
  name: AllowedTypes.string,
  value: AllowedTypes.string,
  step: AllowedTypes.number,
  required: AllowedTypes.boolean,
  loading: AllowedTypes.boolean,
  disabled: AllowedTypes.boolean,
  max: AllowedTypes.string,
  min: AllowedTypes.string,
  form: AllowedTypes.string,
  autoComplete: AllowedTypes.string,
  state: AllowedTypes.oneOf<InputDateState>(FORM_STATES),
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
  tag: 'p-input-date',
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class InputDate {
  @Element() public host!: HTMLElement;

  /** Sets the visible label text displayed above the input field. */
  @Prop() public label?: string = '';

  /** Sets the stepping interval in days. The selected date must align with the `min` date by a multiple of this value. */
  @Prop() public step?: number = 1;

  /** Sets a supplementary description displayed below the label to provide additional context. */
  @Prop() public description?: string = '';

  /** Reduces the input height and padding for a more compact layout. */
  @Prop() public compact?: boolean = false;

  /** Sets the name submitted with the form data to identify this field's value on the server. */
  @Prop({ reflect: true }) public name: string;
  // The "name" property is reflected as an attribute to ensure compatibility with native form submission.
  // In the React wrapper, all props are synced as properties on the element ref, so reflecting "name" as an attribute ensures it is properly handled in the form submission process.

  /** Sets the current date value in YYYY-MM-DD format (e.g. `2025-07-02`). */
  @Prop({ mutable: true }) public value?: string = '';

  /** Provides the browser with a date autofill hint (e.g. `autocomplete='bday'` for a birthday field). */
  @Prop() public autoComplete?: string;

  /** Makes the field read-only — the date is displayed but cannot be changed. The value is still submitted with the form. */
  @Prop() public readOnly?: boolean = false;

  /** Associates the field with a form element by its ID when the field is not nested directly inside it. */
  @Prop({ reflect: true }) public form?: string; // The ElementInternals API automatically detects the form attribute

  /** Sets the latest selectable date in YYYY-MM-DD format. Dates after this are disabled in the picker. */
  @Prop() public max?: string;

  /** Sets the earliest selectable date in YYYY-MM-DD format. Dates before this are disabled in the picker. */
  @Prop() public min?: string;

  /** Disables the field, preventing date selection. The value is not submitted with the form. */
  @Prop({ mutable: true }) public disabled?: boolean = false;

  /** Marks the field as required — form submission is blocked while no date is selected. */
  @Prop() public required?: boolean = false;

  /** @experimental Disables the field and displays a loading spinner to indicate an ongoing operation. */
  @Prop() public loading?: boolean = false;

  /** Sets the validation state, controlling the visual appearance and style of the feedback message (`none`, `success`, `error`). */
  @Prop() public state?: InputDateState = 'none';

  /** Sets the validation feedback message displayed below the field when `state` is `success` or `error`. */
  @Prop() public message?: string = '';

  /** Hides the visible label while keeping it accessible to screen readers. Supports responsive breakpoint values. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Emitted when the input loses focus after its value was changed. */
  @Event({ bubbles: true }) public change: EventEmitter<InputDateChangeEventDetail>;

  /** Emitted when the input loses focus, regardless of whether the value changed. */
  @Event({ bubbles: false }) public blur: EventEmitter<InputDateBlurEventDetail>;

  /** Emitted on every value change as the user interacts with the date picker. */
  @Event({ bubbles: true }) public input: EventEmitter<InputDateInputEventDetail>;

  @AttachInternals() private internals: ElementInternals;

  private initialLoading: boolean = false;
  private inputElement: HTMLInputElement;
  private defaultValue: string;

  @Watch('value')
  public onValueChange(newValue: string): void {
    if (this.inputElement && this.inputElement.value !== newValue) {
      this.inputElement.value = newValue;
    }
    this.internals?.setFormValue(newValue);
  }

  public connectedCallback(): void {
    this.initialLoading = this.loading;
  }

  public componentWillLoad(): void {
    this.defaultValue = this.value;
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

  public formStateRestoreCallback(state: string): void {
    this.value = state;
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public componentDidLoad(): void {
    this.internals?.setFormValue(this.value);
  }

  public componentDidRender(): void {
    if (!this.disabled && !this.readOnly) {
      this.internals?.setValidity(
        this.inputElement.validity,
        this.inputElement.validationMessage || ' ',
        this.inputElement
      );
    }
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
      this.readOnly
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <InputBase
        host={this.host}
        label={this.label}
        description={this.description}
        id="input-date"
        refElement={(el: HTMLInputElement) => (this.inputElement = el)}
        onInput={this.onInput}
        onChange={this.onChange}
        onBlur={this.onBlur}
        onKeyDown={this.onKeyDown}
        name={this.name}
        form={this.form}
        type="date"
        required={this.required}
        max={this.max}
        min={this.min}
        value={this.value}
        readOnly={this.readOnly}
        autoComplete={this.autoComplete}
        disabled={this.disabled}
        state={this.state}
        message={this.message}
        step={this.step}
        loading={this.loading}
        initialLoading={this.initialLoading}
        {...(hasShowPickerSupport() && {
          end: (
            <PrefixedTagNames.pButtonPure
              tabIndex={this.disabled ? -1 : null}
              hideLabel={true}
              class="button"
              type="button"
              icon="calendar"
              disabled={this.disabled || this.readOnly}
              onClick={() => this.inputElement.showPicker()}
            >
              Open date picker
            </PrefixedTagNames.pButtonPure>
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
}
