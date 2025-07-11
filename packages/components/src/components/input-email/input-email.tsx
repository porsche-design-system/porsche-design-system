import { AttachInternals, Component, Element, Event, type EventEmitter, type JSX, Prop, Watch, h } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../types';
import {
  AllowedTypes,
  FORM_STATES,
  THEMES,
  attachComponentCss,
  hasPropValueChanged,
  validateProps,
  getPrefixedTagNames,
} from '../../utils';
import { InputBase } from '../common/input-base/input-base';
import { getComponentCss } from './input-email-styles';
import {
  INPUT_EMAIL_AUTO_COMPLETE,
  type InputEmailAutoComplete,
  type InputEmailBlurEventDetail,
  type InputEmailChangeEventDetail,
  type InputEmailInputEventDetail,
  type InputEmailState,
} from './input-email-utils';

const propTypes: PropTypes<typeof InputEmail> = {
  label: AllowedTypes.string,
  description: AllowedTypes.string,
  placeholder: AllowedTypes.string,
  name: AllowedTypes.string,
  value: AllowedTypes.string,
  multiple: AllowedTypes.boolean,
  required: AllowedTypes.boolean,
  loading: AllowedTypes.boolean,
  disabled: AllowedTypes.boolean,
  pattern: AllowedTypes.string,
  maxLength: AllowedTypes.number,
  minLength: AllowedTypes.number,
  form: AllowedTypes.string,
  autoComplete: AllowedTypes.oneOf<InputEmailAutoComplete>([...INPUT_EMAIL_AUTO_COMPLETE, undefined]),
  state: AllowedTypes.oneOf<InputEmailState>(FORM_STATES),
  message: AllowedTypes.string,
  hideLabel: AllowedTypes.breakpoint('boolean'),
  indicator: AllowedTypes.boolean,
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
  tag: 'p-input-email',
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class InputEmail {
  @Element() public host!: HTMLElement;

  /** The label text. */
  @Prop() public label?: string = '';

  /** The description text. */
  @Prop() public description?: string = '';

  /** Displays as a compact version. */
  @Prop() public compact?: boolean = false;

  /** The name of the text input. */
  @Prop({ reflect: true }) public name: string;
  // The "name" property is reflected as an attribute to ensure compatibility with native form submission.
  // In the React wrapper, all props are synced as properties on the element ref, so reflecting "name" as an attribute ensures it is properly handled in the form submission process.

  /** The text input value. */
  @Prop({ mutable: true }) public value?: string = '';

  /** Specifies whether the input can be autofilled by the browser */
  @Prop() public autoComplete?: InputEmailAutoComplete;

  /** Specifies whether the text input should be read-only. */
  @Prop() public readOnly?: boolean = false;

  /** The id of a form element the text input should be associated with. */
  @Prop({ reflect: true }) public form?: string; // The ElementInternals API automatically detects the form attribute

  /** The max length of the text input. */
  @Prop() public maxLength?: number;

  /** The min length of the text input. */
  @Prop() public minLength?: number;

  /** The placeholder text. */
  @Prop() public placeholder?: string = '';

  /** Marks the text input as disabled. */
  @Prop() public disabled?: boolean = false;

  /** Marks the text input as required. */
  @Prop() public required?: boolean = false;

  /** @experimental Shows a loading indicator. */
  @Prop() public loading?: boolean = false;

  /** The validation state. */
  @Prop() public state?: InputEmailState = 'none';

  /** Show email indicator icon */
  @Prop() public indicator?: boolean = false;

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Show or hide label and description text. For better accessibility, it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Adapts the color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** A boolean value that, if present, it allows the user to enter a list of multiple email addresses, separated by commas (and optional whitespace). The browser will validate each email address in the list. */
  @Prop() public multiple?: boolean = false;

  /** Specifies a regular expression that the input's value must match for the value to pass constraint validation. This allows for more specific email validation rules than the browser's default (e.g., restricting to a specific domain). If provided, it overrides the browser's default email validation. */
  @Prop() public pattern?: string;

  /** Emitted when the text input loses focus after its value was changed. */
  @Event({ bubbles: true }) public change: EventEmitter<InputEmailChangeEventDetail>;

  /** Emitted when the text input has lost focus. */
  @Event({ bubbles: false }) public blur: EventEmitter<InputEmailBlurEventDetail>;

  /** Emitted when the value has been changed as a direct result of a user action. */
  @Event({ bubbles: true }) public input: EventEmitter<InputEmailInputEventDetail>;

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
        id="input-email"
        refElement={(el: HTMLInputElement) => (this.inputElement = el)}
        onWheel={(e) => (e.target as HTMLInputElement).blur()} // prevent React default scroll-to-[increment|decrement] on text inputs
        onInput={this.onInput}
        onChange={this.onChange}
        onBlur={this.onBlur}
        name={this.name}
        form={this.form}
        type="email"
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
        theme={this.theme}
        loading={this.loading}
        pattern={this.pattern}
        multiple={this.multiple}
        initialLoading={this.initialLoading}
        {...(this.indicator && {
          start: <PrefixedTagNames.pIcon aria-hidden="true" name="email" color="state-disabled" theme={this.theme} />,
        })}
      />
    );
  }

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
