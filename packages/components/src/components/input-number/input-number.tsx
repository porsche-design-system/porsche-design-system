import { AttachInternals, Component, Element, Event, type EventEmitter, type JSX, Prop, Watch, h } from '@stencil/core';
import { getSlottedAnchorStyles } from '../../styles';
import { getSlottedInputIndicatorStyles } from '../../styles/global/slotted-input-indicator-styles';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../types';
import {
  AllowedTypes,
  FORM_STATES,
  THEMES,
  applyConstructableStylesheetStyles,
  attachComponentCss,
  hasPropValueChanged,
  validateProps,
  getPrefixedTagNames,
} from '../../utils';
import { getComponentCss } from './input-number-styles';
import {
  applyStep,
  INPUT_NUMBER_AUTO_COMPLETE,
  INPUT_NUMBER_UNIT_POSITIONS,
  type InputNumberAutoComplete,
  type InputNumberBlurEventDetail,
  type InputNumberChangeEventDetail,
  type InputNumberInputEventDetail,
  type InputNumberState,
  type InputNumberUnitPosition,
} from './input-number-utils';
import { InputBase } from '../common/input-base/input-base';

const propTypes: PropTypes<typeof InputNumber> = {
  label: AllowedTypes.string,
  unit: AllowedTypes.string,
  unitPosition: AllowedTypes.oneOf<InputNumberUnitPosition>(INPUT_NUMBER_UNIT_POSITIONS),
  description: AllowedTypes.string,
  placeholder: AllowedTypes.string,
  name: AllowedTypes.string,
  value: AllowedTypes.string,
  step: AllowedTypes.number,
  controls: AllowedTypes.boolean,
  required: AllowedTypes.boolean,
  disabled: AllowedTypes.boolean,
  max: AllowedTypes.number,
  min: AllowedTypes.number,
  form: AllowedTypes.string,
  autoComplete: AllowedTypes.oneOf<InputNumberAutoComplete>(INPUT_NUMBER_AUTO_COMPLETE),
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
 * @slot {"name": "start", "description": "Shows content at the start of the input (e.g. unit prefix). Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed."}
 * @slot {"name": "end", "description": "Shows content at the end of the input (e.g. toggle button, unit suffix). Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed."}
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

  /** The unit text. */
  @Prop() public unit?: string = '';

  /** The unit position. */
  @Prop() public unitPosition?: InputNumberUnitPosition = 'prefix';

  /** The granularity that the value must adhere to. */
  @Prop() public step?: number = 1;

  /** The description text. */
  @Prop() public description?: string = '';

  /** Displays as compact version. */
  @Prop() public compact?: boolean = false;

  /** The name of the number input. */
  @Prop({ reflect: true }) public name: string;
  // The "name" property is reflected as an attribute to ensure compatibility with native form submission.
  // In the React wrapper, all props are synced as properties on the element ref, so reflecting "name" as an attribute ensures it is properly handled in the form submission process.

  /** The number input value. */
  @Prop({ mutable: true }) public value?: string = '';

  /** Specifies whether the input can be autofilled by the browser */
  @Prop() public autoComplete?: InputNumberAutoComplete = '';

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

  /** The validation state. */
  @Prop() public state?: InputNumberState = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Show or hide label and description text. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Adapts the color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Show or hide the increment/decrement stepper controls for `input type="number"`. */
  @Prop() public controls?: boolean = false;

  /** Emitted when the number input loses focus after its value was changed. */
  @Event({ bubbles: true }) public change: EventEmitter<InputNumberChangeEventDetail>;

  /** Emitted when the number input has lost focus. */
  @Event({ bubbles: false }) public blur: EventEmitter<InputNumberBlurEventDetail>;

  /** Emitted when the value has been changed as a direct result of a user action. */
  @Event({ bubbles: true }) public input: EventEmitter<InputNumberInputEventDetail>;

  @AttachInternals() private internals: ElementInternals;

  private inputElement: HTMLInputElement;
  private defaultValue: string;

  @Watch('value')
  public onValueChange(newValue: string): void {
    this.internals?.setFormValue(newValue);
  }

  public connectedCallback(): void {
    applyConstructableStylesheetStyles(this.host, getSlottedAnchorStyles, getSlottedInputIndicatorStyles);
  }

  public componentWillLoad(): void {
    this.defaultValue = this.value;
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

  public render(): JSX.Element {
    validateProps(this, propTypes);

    attachComponentCss(
      this.host,
      getComponentCss,
      this.disabled,
      this.hideLabel,
      this.state,
      this.compact,
      this.readOnly,
      this.theme,
      this.unitPosition,
      this.controls
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    const unitElement = this.unit ? (
      <span class="unit-counter" aria-hidden="true">
        {this.unit}
      </span>
    ) : null;

    const { canIncrement, canDecrement } = this.nextStepValues;

    const stepperElements = this.controls
      ? [
          <PrefixedTagNames.pButtonPure
            tabIndex={-1}
            hideLabel={true}
            theme={this.theme}
            class="button"
            type="button"
            icon="minus"
            disabled={this.disabled || this.readOnly || !canDecrement}
            onClick={() => this.updateValue('decrement')}
          >
            Decrement value by {this.step}
          </PrefixedTagNames.pButtonPure>,
          <PrefixedTagNames.pButtonPure
            tabIndex={-1}
            hideLabel={true}
            theme={this.theme}
            class="button"
            type="button"
            icon="plus"
            disabled={this.disabled || this.readOnly || !canIncrement}
            onClick={() => this.updateValue('increment')}
          >
            Increment value by {this.step}
          </PrefixedTagNames.pButtonPure>,
        ]
      : null;

    const slotProps: Record<string, JSX.Element | JSX.Element[]> = {};

    if (unitElement && this.unitPosition === 'prefix') {
      slotProps.start = unitElement;
    }

    if (unitElement && this.unitPosition === 'suffix') {
      slotProps.end = [unitElement];
    }
    if (stepperElements) {
      const endItems: JSX.Element[] = Array.isArray(slotProps.end) ? [...slotProps.end] : [];
      endItems.push(...stepperElements);
      slotProps.end = endItems;
    }

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
        {...slotProps}
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

  private get nextStepValues() {
    const current = Number.parseFloat(this.value ?? '') || 0;

    const nextUp = applyStep(this.value, this.step, 'increment', this.min, this.max);
    const nextDown = applyStep(this.value, this.step, 'decrement', this.min, this.max);

    return {
      current,
      nextUp,
      nextDown,
      canIncrement: nextUp !== String(current),
      canDecrement: nextDown !== String(current),
    };
  }

  private updateValue(direction: 'increment' | 'decrement'): void {
    const { nextUp, nextDown } = this.nextStepValues;
    this.value = direction === 'increment' ? nextUp : nextDown;
    this.inputElement.focus();
  }
}
