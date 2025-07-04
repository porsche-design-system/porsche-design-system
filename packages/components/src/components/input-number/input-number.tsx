import {
  AttachInternals,
  Component,
  Element,
  Event,
  type EventEmitter,
  Fragment,
  type JSX,
  Prop,
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
} from '../../utils';
import { InputBase } from '../common/input-base/input-base';
import { getComponentCss } from './input-number-styles';
import {
  INPUT_NUMBER_AUTO_COMPLETE,
  type InputNumberAutoComplete,
  type InputNumberBlurEventDetail,
  type InputNumberChangeEventDetail,
  type InputNumberInputEventDetail,
  type InputNumberState,
} from './input-number-utils';

const propTypes: PropTypes<typeof InputNumber> = {
  label: AllowedTypes.string,
  description: AllowedTypes.string,
  placeholder: AllowedTypes.string,
  name: AllowedTypes.string,
  value: AllowedTypes.string,
  step: AllowedTypes.number,
  controls: AllowedTypes.boolean,
  required: AllowedTypes.boolean,
  loading: AllowedTypes.boolean,
  disabled: AllowedTypes.boolean,
  max: AllowedTypes.number,
  min: AllowedTypes.number,
  form: AllowedTypes.string,
  autoComplete: AllowedTypes.oneOf<InputNumberAutoComplete>([...INPUT_NUMBER_AUTO_COMPLETE, undefined]),
  state: AllowedTypes.oneOf<InputNumberState>(FORM_STATES),
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
  tag: 'p-input-number',
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class InputNumber {
  @Element() public host!: HTMLElement;

  /** The label text. */
  @Prop() public label?: string = '';

  /** The granularity that the value must adhere to. */
  @Prop() public step?: number = 1;

  /** The description text. */
  @Prop() public description?: string = '';

  /** Displays as a compact version. */
  @Prop() public compact?: boolean = false;

  /** The name of the number input. */
  @Prop({ reflect: true }) public name: string;
  // The "name" property is reflected as an attribute to ensure compatibility with native form submission.
  // In the React wrapper, all props are synced as properties on the element ref, so reflecting "name" as an attribute ensures it is properly handled in the form submission process.

  /** The number input value. */
  @Prop({ mutable: true }) public value?: string = '';

  /** Specifies whether the input can be autofilled by the browser */
  @Prop() public autoComplete?: InputNumberAutoComplete;

  /** Specifies whether the number input should be read-only. */
  @Prop() public readOnly?: boolean = false;

  /** The id of a form element the number input should be associated with. */
  @Prop({ reflect: true }) public form?: string; // The ElementInternals API automatically detects the form attribute

  /** The max value of the number input. */
  @Prop() public max?: number;

  /** The min value of the number input. */
  @Prop() public min?: number;

  /** The placeholder text. */
  @Prop() public placeholder?: string = '';

  /** Marks the number input as disabled. */
  @Prop() public disabled?: boolean = false;

  /** Marks the number input as required. */
  @Prop() public required?: boolean = false;

  /** @experimental Shows a loading indicator. */
  @Prop() public loading?: boolean = false;

  /** The validation state. */
  @Prop() public state?: InputNumberState = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Show or hide label and description text. For better accessibility, it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Adapts the color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Show or hide the increment/decrement stepper controls. */
  @Prop() public controls?: boolean = false;

  /** Emitted when the number input loses focus after its value was changed. */
  @Event({ bubbles: true }) public change: EventEmitter<InputNumberChangeEventDetail>;

  /** Emitted when the number input has lost focus. */
  @Event({ bubbles: false }) public blur: EventEmitter<InputNumberBlurEventDetail>;

  /** Emitted when the value has been changed as a direct result of a user action. */
  @Event({ bubbles: true }) public input: EventEmitter<InputNumberInputEventDetail>;

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
      this.theme,
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
        name={this.name}
        form={this.form}
        type="number"
        required={this.required}
        placeholder={this.placeholder}
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
        {...(this.controls && {
          end: (
            <Fragment>
              <PrefixedTagNames.pButtonPure
                tabIndex={-1}
                hideLabel={true}
                theme={this.theme}
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
                theme={this.theme}
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
