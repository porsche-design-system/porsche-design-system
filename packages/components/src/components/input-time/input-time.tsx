import { AttachInternals, Component, Element, Event, type EventEmitter, h, type JSX, Prop, Watch } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  FORM_STATES,
  getPrefixedTagNames,
  hasPropValueChanged,
  hasShowPickerSupport,
  THEMES,
  validateProps,
} from '../../utils';
import { InputBase } from '../common/input-base/input-base';
import { implicitSubmit } from '../common/input-base/input-base-utils';
import { getComponentCss } from './input-time-styles';
import type {
  InputTimeBlurEventDetail,
  InputTimeChangeEventDetail,
  InputTimeInputEventDetail,
  InputTimeState,
} from './input-time-utils';

const propTypes: PropTypes<typeof InputTime> = {
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
  state: AllowedTypes.oneOf<InputTimeState>(FORM_STATES),
  message: AllowedTypes.string,
  hideLabel: AllowedTypes.breakpoint('boolean'),
  readOnly: AllowedTypes.boolean,
  compact: AllowedTypes.boolean,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed."}
 * @slot {"name": "description", "description": "Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed."}
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed."}
 * @slot {"name": "start", "description": "Shows content at the start of the input (e.g. unit prefix)."}
 * @slot {"name": "end", "description": "Shows content at the end of the input (e.g. toggle button, unit suffix)."}
 */
@Component({
  tag: 'p-input-time',
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class InputTime {
  @Element() public host!: HTMLElement;

  /** Text content for a user-facing label. */
  @Prop() public label?: string = '';

  /** efines the granularity of the time input. The step value is given in seconds. The default is 60 (one minute). You can also specify smaller increments (e.g., step='1' for seconds, step='0.001' for milliseconds). */
  @Prop() public step?: number = 60;

  /** Supplementary text providing more context or explanation for the input. */
  @Prop() public description?: string = '';

  /** A boolean value that, if present, renders the input field as a compact version. */
  @Prop() public compact?: boolean = false;

  /** The name of the input field, used when submitting the form data. */
  @Prop({ reflect: true }) public name: string;
  // The "name" property is reflected as an attribute to ensure compatibility with native form submission.
  // In the React wrapper, all props are synced as properties on the element ref, so reflecting "name" as an attribute ensures it is properly handled in the form submission process.

  /** The default time value for the input, in hh:mm or hh:mm:ss format (e.g., value='14:00'). */
  @Prop({ mutable: true }) public value?: string = '';

  /** Provides a hint to the browser about what type of data the field expects, which can assist with autofill features (e.g., auto-complete='on'). */
  @Prop() public autoComplete?: string;

  /** A boolean value that, if present, makes the input field uneditable by the user, but its value will still be submitted with the form. */
  @Prop() public readOnly?: boolean = false;

  /** Specifies the id of the <form> element that the input belongs to (useful if the input is not a direct descendant of the form). */
  @Prop({ reflect: true }) public form?: string; // The ElementInternals API automatically detects the form attribute

  /** Specifies the latest time that can be selected. The value must be a time string in hh:mm or hh:mm:ss format (e.g., max='17:30'). */
  @Prop() public max?: string;

  /** Specifies the earliest time that can be selected. The value must be a time string in hh:mm or hh:mm:ss format (e.g., min='09:00'). */
  @Prop() public min?: string;

  /** A boolean value that, if present, makes the input field unusable and unclickable. The value will not be submitted with the form. */
  @Prop() public disabled?: boolean = false;

  /** A boolean value that, if present, indicates that the input field must be filled out before the form can be submitted. */
  @Prop() public required?: boolean = false;

  /** @experimental Shows a loading indicator. */
  @Prop() public loading?: boolean = false;

  /** Indicates the validation or overall status of the input component. */
  @Prop() public state?: InputTimeState = 'none';

  /** Dynamic feedback text for validation or status. */
  @Prop() public message?: string = '';

  /** Controls the visibility of the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Controls the visual appearance of the component. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when the number input loses focus after its value was changed. */
  @Event({ bubbles: true }) public change: EventEmitter<InputTimeChangeEventDetail>;

  /** Emitted when the number input has lost focus. */
  @Event({ bubbles: false }) public blur: EventEmitter<InputTimeBlurEventDetail>;

  /** Emitted when the value has been changed as a direct result of a user action. */
  @Event({ bubbles: true }) public input: EventEmitter<InputTimeInputEventDetail>;

  @AttachInternals() private internals: ElementInternals;

  private initialLoading: boolean = false;
  private inputElement: HTMLInputElement;
  private defaultValue: string;

  @Watch('value')
  public onValueChange(newValue: string): void {
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
    this.internals?.setValidity(this.inputElement.validity, this.inputElement.validationMessage, this.inputElement);
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
      this.theme
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <InputBase
        host={this.host}
        label={this.label}
        description={this.description}
        id="input-time"
        refElement={(el: HTMLInputElement) => (this.inputElement = el)}
        onInput={this.onInput}
        onChange={this.onChange}
        onBlur={this.onBlur}
        onKeyDown={this.onKeyDown}
        name={this.name}
        form={this.form}
        type="time"
        required={this.required}
        max={this.max}
        min={this.min}
        value={this.value}
        readOnly={this.readOnly}
        autoComplete={this.autoComplete}
        disabled={this.disabled}
        state={this.state}
        message={this.message}
        theme={this.theme}
        step={this.step}
        loading={this.loading}
        initialLoading={this.initialLoading}
        {...(hasShowPickerSupport() && {
          end: (
            <PrefixedTagNames.pButtonPure
              hideLabel={true}
              theme={this.theme}
              class="button"
              type="button"
              icon="clock"
              disabled={this.disabled || this.readOnly}
              onClick={() => this.inputElement.showPicker()}
            >
              Open time picker
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
