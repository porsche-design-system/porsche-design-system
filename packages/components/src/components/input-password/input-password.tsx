import {
  AttachInternals,
  Component,
  Element,
  Event,
  type EventEmitter,
  type JSX,
  Prop,
  State,
  Watch,
  h,
} from '@stencil/core';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../types';
import {
  AllowedTypes,
  FORM_STATES,
  THEMES,
  attachComponentCss,
  getPrefixedTagNames,
  hasPropValueChanged,
  validateProps,
  isDisabledOrLoading,
} from '../../utils';
import { InputBase } from '../common/input-base/input-base';
import { getComponentCss } from './input-password-styles';
import {
  INPUT_PASSWORD_AUTO_COMPLETE,
  type InputPasswordAutoComplete,
  type InputPasswordBlurEventDetail,
  type InputPasswordChangeEventDetail,
  type InputPasswordInputEventDetail,
  type InputPasswordState,
} from './input-password-utils';

const propTypes: PropTypes<typeof InputPassword> = {
  label: AllowedTypes.string,
  description: AllowedTypes.string,
  placeholder: AllowedTypes.string,
  name: AllowedTypes.string,
  value: AllowedTypes.string,
  required: AllowedTypes.boolean,
  loading: AllowedTypes.boolean,
  disabled: AllowedTypes.boolean,
  maxLength: AllowedTypes.number,
  minLength: AllowedTypes.number,
  form: AllowedTypes.string,
  autoComplete: AllowedTypes.oneOf<InputPasswordAutoComplete>(INPUT_PASSWORD_AUTO_COMPLETE),
  state: AllowedTypes.oneOf<InputPasswordState>(FORM_STATES),
  message: AllowedTypes.string,
  hideLabel: AllowedTypes.breakpoint('boolean'),
  toggle: AllowedTypes.boolean,
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
  tag: 'p-input-password',
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class InputPassword {
  @Element() public host!: HTMLElement;

  /** The label text. */
  @Prop() public label?: string = '';

  /** The description text. */
  @Prop() public description?: string = '';

  /** Displays as compact version. */
  @Prop() public compact?: boolean = false;

  /** The name of the password input. */
  @Prop({ reflect: true }) public name: string;
  // The "name" property is reflected as an attribute to ensure compatibility with native form submission.
  // In the React wrapper, all props are synced as properties on the element ref, so reflecting "name" as an attribute ensures it is properly handled in the form submission process.

  /** The password input value. */
  @Prop({ mutable: true }) public value?: string = '';

  /** Specifies whether the input can be autofilled by the browser */
  @Prop() public autoComplete?: InputPasswordAutoComplete = '';

  /** Specifies whether the password input should be read-only. */
  @Prop() public readOnly?: boolean = false;

  /** The id of a form element the password input should be associated with. */
  @Prop({ reflect: true }) public form?: string; // The ElementInternals API automatically detects the form attribute

  /** The max length of the password input. */
  @Prop() public maxLength?: number;

  /** The min length of the password input. */
  @Prop() public minLength?: number;

  /** The placeholder text. */
  @Prop() public placeholder?: string = '';

  /** Marks the password input as disabled. */
  @Prop() public disabled?: boolean = false;

  /** Marks the password input as required. */
  @Prop() public required?: boolean = false;

  /** Shows a loading indicator. */
  @Prop() public loading?: boolean = false;

  /** The validation state. */
  @Prop() public state?: InputPasswordState = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Show or hide label and description text. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Show or hide password toggle for `input type="password"`. */
  @Prop() public toggle?: boolean = false;

  /** Adapts the color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when the password input loses focus after its value was changed. */
  @Event({ bubbles: true }) public change: EventEmitter<InputPasswordChangeEventDetail>;

  /** Emitted when the password input has lost focus. */
  @Event({ bubbles: false }) public blur: EventEmitter<InputPasswordBlurEventDetail>;

  /** Emitted when the value has been changed as a direct result of a user action. */
  @Event({ bubbles: true }) public input: EventEmitter<InputPasswordInputEventDetail>;

  @AttachInternals() private internals: ElementInternals;

  @State() private showPassword = false;

  private initialLoading: boolean = false;
  private inputElement: HTMLInputElement;
  private defaultValue: string;

  @Watch('value')
  public onValueChange(newValue: string): void {
    this.internals?.setFormValue(newValue);
  }

  public componentWillLoad(): void {
    this.defaultValue = this.value;
    this.initialLoading = this.loading;
  }

  public formResetCallback(): void {
    this.internals?.setFormValue(this.defaultValue);
    this.value = this.defaultValue;
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

  public connectedCallback(): void {
    this.initialLoading = this.loading;
  }

  public componentWillUpdate(): void {
    if (this.loading) {
      this.initialLoading = true;
    }
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);

    attachComponentCss(
      this.host,
      getComponentCss,
      isDisabledOrLoading(this.disabled, this.loading),
      this.hideLabel,
      this.state,
      this.toggle,
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
        id="input-password"
        refElement={(el: HTMLInputElement) => (this.inputElement = el)}
        onInput={this.onInput}
        onChange={this.onChange}
        onBlur={this.onBlur}
        name={this.name}
        form={this.form}
        type={this.showPassword ? 'text' : 'password'}
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
        initialLoading={this.initialLoading}
        end={
          this.toggle && (
            <PrefixedTagNames.pButtonPure
              hideLabel={true}
              theme={this.theme}
              class="button"
              type="button"
              icon={this.showPassword ? 'view-off' : 'view'}
              disabled={this.disabled}
              onClick={this.togglePassword}
              aria={{ 'aria-pressed': this.showPassword ? 'true' : 'false' }}
            >
              Toggle password visibility
            </PrefixedTagNames.pButtonPure>
          )
        }
      />
    );
  }

  private onChange = (e: Event): void => {
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
    this.input.emit(e);
    const target = e.target as HTMLInputElement;
    this.value = target.value; // triggers @Watch('value')
  };

  private togglePassword = (): void => {
    this.showPassword = !this.showPassword;
    this.inputElement.focus();
  };
}
