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
import type { BreakpointCustomizable, PropTypes } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  FORM_STATES,
  hasPropValueChanged,
  implicitSubmit,
  validateProps,
} from '../../utils';
import { InputBase } from '../common/input-base/input-base';
import { getComponentCss } from './input-text-styles';
import type {
  InputTextBlurEventDetail,
  InputTextChangeEventDetail,
  InputTextInputEventDetail,
  InputTextState,
} from './input-text-utils';

const propTypes: PropTypes<typeof InputText> = {
  label: AllowedTypes.string,
  description: AllowedTypes.string,
  placeholder: AllowedTypes.string,
  name: AllowedTypes.string,
  value: AllowedTypes.string,
  spellCheck: AllowedTypes.boolean,
  counter: AllowedTypes.boolean,
  required: AllowedTypes.boolean,
  loading: AllowedTypes.boolean,
  disabled: AllowedTypes.boolean,
  maxLength: AllowedTypes.number,
  minLength: AllowedTypes.number,
  form: AllowedTypes.string,
  autoComplete: AllowedTypes.string,
  state: AllowedTypes.oneOf<InputTextState>(FORM_STATES),
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
  tag: 'p-input-text',
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class InputText {
  @Element() public host!: HTMLElement;

  /** Sets the visible label text displayed above the input field. */
  @Prop() public label?: string = '';

  /** Controls whether the browser's built-in spell-checking is enabled for this field. */
  @Prop() public spellCheck?: boolean;

  /** Sets a supplementary description displayed below the label to provide additional context. */
  @Prop() public description?: string = '';

  /** Reduces the input height and padding for a more compact layout. */
  @Prop() public compact?: boolean = false;

  /** Sets the name submitted with the form data to identify this field's value on the server. */
  @Prop({ reflect: true }) public name: string;
  // The "name" property is reflected as an attribute to ensure compatibility with native form submission.
  // In the React wrapper, all props are synced as properties on the element ref, so reflecting "name" as an attribute ensures it is properly handled in the form submission process.

  /** Sets the current text value of the input field. */
  @Prop({ mutable: true }) public value?: string = '';

  /** Provides the browser with a data type hint to enable relevant autofill suggestions (e.g. `autocomplete='name'`). */
  @Prop() public autoComplete?: string;

  /** Makes the field read-only — the value is displayed but cannot be edited by the user. The value is still submitted with the form. */
  @Prop() public readOnly?: boolean = false;

  /** Associates the field with a form element by its ID when the field is not nested directly inside it. */
  @Prop({ reflect: true }) public form?: string; // The ElementInternals API automatically detects the form attribute

  /** Sets the maximum number of characters the user can enter. */
  @Prop() public maxLength?: number;

  /** Sets the minimum number of characters required for the field to be considered valid. */
  @Prop() public minLength?: number;

  /** Sets placeholder text shown inside the field when it is empty, to hint at the expected format. */
  @Prop() public placeholder?: string = '';

  /** Disables the field, preventing all input. The value is not submitted with the form. */
  @Prop({ mutable: true }) public disabled?: boolean = false;

  /** Marks the field as required — form submission is blocked while this field is empty. */
  @Prop() public required?: boolean = false;

  /** @experimental Disables the field and displays a loading spinner to indicate an ongoing operation. */
  @Prop() public loading?: boolean = false;

  /** Sets the validation state, controlling the visual appearance and style of the feedback message (`none`, `success`, `error`). */
  @Prop() public state?: InputTextState = 'none';

  /** Sets the validation feedback message displayed below the field when `state` is `success` or `error`. */
  @Prop() public message?: string = '';

  /** Hides the visible label while keeping it accessible to screen readers. Supports responsive breakpoint values. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Shows a live character counter below the field indicating how many characters have been entered relative to `maxLength`. */
  @Prop() public counter?: boolean = false;

  /** Emitted when the input loses focus after its value was changed. */
  @Event({ bubbles: true }) public change: EventEmitter<InputTextChangeEventDetail>;

  /** Emitted when the input loses focus, regardless of whether the value changed. */
  @Event({ bubbles: false }) public blur: EventEmitter<InputTextBlurEventDetail>;

  /** Emitted on every value change as the user types. */
  @Event({ bubbles: true }) public input: EventEmitter<InputTextInputEventDetail>;

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
      this.readOnly,
      this.counter
    );

    return (
      <InputBase
        host={this.host}
        label={this.label}
        description={this.description}
        id="input-text"
        refElement={(el: HTMLInputElement) => (this.inputElement = el)}
        onInput={this.onInput}
        onChange={this.onChange}
        onBlur={this.onBlur}
        onKeyDown={this.onKeyDown}
        name={this.name}
        form={this.form}
        type="text"
        required={this.required}
        placeholder={this.placeholder}
        maxLength={this.maxLength}
        minLength={this.minLength}
        value={this.value}
        readOnly={this.readOnly}
        autoComplete={this.autoComplete}
        disabled={this.disabled}
        state={this.state}
        message={this.message}
        spellCheck={this.spellCheck}
        loading={this.loading}
        initialLoading={this.initialLoading}
        {...(this.counter && {
          end: (
            <Fragment>
              <span class="sr-only" aria-live="polite">
                {this.maxLength
                  ? `You have ${this.maxLength - this.value.length} out of ${this.maxLength} characters left`
                  : `${this.value.length} characters entered`}
              </span>
              <span class="counter" aria-hidden="true" onClick={() => this.inputElement.focus()}>
                {this.maxLength ? `${this.value.length}/${this.maxLength}` : `${this.value.length}`}
              </span>
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
}
