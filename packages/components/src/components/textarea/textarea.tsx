import { AttachInternals, Component, Element, Event, type EventEmitter, type JSX, Prop, Watch, h } from '@stencil/core';
import { getSlottedAnchorStyles } from '../../styles';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../types';
import {
  AllowedTypes,
  FORM_STATES,
  THEMES,
  applyConstructableStylesheetStyles,
  attachComponentCss,
  debounce,
  hasPropValueChanged,
  validateProps,
} from '../../utils';
import { Label, descriptionId } from '../common/label/label';
import { StateMessage, messageId } from '../common/state-message/state-message';
import { getComponentCss } from './textarea-styles';
import {
  AUTO_COMPLETE,
  TEXTAREA_RESIZE,
  TEXTAREA_WRAPS,
  type TextareaAutoComplete,
  type TextareaBlurEventDetail,
  type TextareaChangeEventDetail,
  type TextareaInputEventDetail,
  type TextareaResize,
  type TextareaState,
  type TextareaWrap,
} from './textarea-utils';

const propTypes: PropTypes<typeof Textarea> = {
  label: AllowedTypes.string,
  description: AllowedTypes.string,
  name: AllowedTypes.string,
  value: AllowedTypes.string,
  state: AllowedTypes.oneOf<TextareaState>(FORM_STATES),
  message: AllowedTypes.string,
  hideLabel: AllowedTypes.breakpoint('boolean'),
  showCounter: AllowedTypes.boolean,
  placeholder: AllowedTypes.string,
  required: AllowedTypes.boolean,
  disabled: AllowedTypes.boolean,
  maxLength: AllowedTypes.number,
  minLength: AllowedTypes.number,
  form: AllowedTypes.string,
  rows: AllowedTypes.number,
  autoComplete: AllowedTypes.oneOf<TextareaAutoComplete>(AUTO_COMPLETE),
  spellCheck: AllowedTypes.boolean,
  wrap: AllowedTypes.oneOf<TextareaWrap>(TEXTAREA_WRAPS),
  resize: AllowedTypes.oneOf<TextareaResize>(TEXTAREA_RESIZE),
  readOnly: AllowedTypes.boolean,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "description", "description": "Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 */
@Component({
  tag: 'p-textarea',
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class Textarea {
  @Element() public host!: HTMLElement;

  /** The label text. */
  @Prop() public label?: string = '';

  /** The description text. */
  @Prop() public description?: string = '';

  /** The name of the textarea. */
  @Prop({ reflect: true }) public name: string;
  // The "name" property is reflected as an attribute to ensure compatibility with native form submission.
  // In the React wrapper, all props are synced as properties on the element ref, so reflecting "name" as an attribute ensures it is properly handled in the form submission process.

  /** The textarea value. */
  @Prop({ mutable: true }) public value?: string = '';

  /** The validation state. */
  @Prop() public state?: TextareaState = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Show or hide max character count. */
  @Prop() public showCounter?: boolean = true;

  /** The placeholder text. */
  @Prop() public placeholder?: string = '';

  /** Marks the textarea as required. */
  @Prop() public required?: boolean = false;

  /** Marks the textarea as disabled. */
  @Prop() public disabled?: boolean = false;

  /** The max length of the textarea. */
  @Prop() public maxLength?: number;

  /** The min length of the textarea. */
  @Prop() public minLength?: number;

  /** The id of a form element the textarea should be associated with. */
  @Prop({ reflect: true }) public form?: string; // The ElementInternals API automatically detects the form attribute

  /** The amount of rows of the textarea. */
  @Prop() public rows?: number = 7;

  /** Specifies whether the input can be autofilled by the browser */
  @Prop() public autoComplete?: TextareaAutoComplete = '';

  /** Specifies whether the input should have its spelling and grammar checked */
  @Prop() public spellCheck?: boolean;

  /** Handles wrapping behaviour of elements. */
  @Prop() public wrap?: TextareaWrap = 'soft';

  /** Controls whether the textarea is resizable and in which direction. */
  @Prop() public resize?: TextareaResize = 'vertical';

  /** Specifies whether the textarea should be read-only. */
  @Prop() public readOnly?: boolean = false;

  /** Adapts the color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when the textarea loses focus after its value was changed. */
  @Event({ bubbles: true }) public change: EventEmitter<TextareaChangeEventDetail>;

  /** Emitted when the textarea has lost focus. */
  @Event({ bubbles: false }) public blur: EventEmitter<TextareaBlurEventDetail>;

  /** Emitted when the value has been changed as a direct result of a user action. */
  @Event({ bubbles: true }) public input: EventEmitter<TextareaInputEventDetail>;

  @AttachInternals() private internals: ElementInternals;

  private defaultValue: string;
  private textAreaElement: HTMLTextAreaElement;
  private counterElement: HTMLSpanElement;
  private hasCounter: boolean;
  private setCounterAriaTextDebounced = debounce(() => this.setCounterAriaText());

  @Watch('value')
  public onValueChange(newValue: string): void {
    this.internals?.setFormValue(newValue);
  }

  @Watch('maxLength')
  public onMaxLengthChange(): void {
    this.updateCounterVisibility();
  }

  @Watch('showCounter')
  public onShowCounterChange(): void {
    this.updateCounterVisibility();
  }

  public connectedCallback(): void {
    applyConstructableStylesheetStyles(this.host, getSlottedAnchorStyles);
  }

  public componentWillLoad(): void {
    this.defaultValue = this.value;
    this.updateCounterVisibility();
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
    if (this.hasCounter) {
      this.setCounterAriaTextDebounced();
    }
    this.internals?.setValidity(
      this.textAreaElement.validity,
      this.textAreaElement.validationMessage,
      this.textAreaElement
    );
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);

    attachComponentCss(
      this.host,
      getComponentCss,
      this.disabled,
      this.readOnly,
      this.hideLabel,
      this.state,
      this.hasCounter,
      this.resize,
      this.theme
    );

    const id = 'textarea';
    return (
      <div class="root">
        <Label
          host={this.host}
          htmlFor={id}
          label={this.label}
          description={this.description}
          isRequired={this.required}
          isDisabled={this.disabled}
        />
        <div class="wrapper">
          <textarea
            aria-describedby={`${descriptionId} ${messageId}`}
            aria-invalid={this.state === 'error' ? 'true' : null}
            id={id}
            ref={(el: HTMLTextAreaElement) => (this.textAreaElement = el)}
            onInput={this.onInput}
            onChange={this.onChange}
            onBlur={this.onBlur}
            name={this.name}
            value={this.value}
            form={this.form}
            disabled={this.disabled}
            required={this.required}
            placeholder={this.placeholder}
            maxlength={this.maxLength}
            minlength={this.minLength}
            rows={this.rows}
            readonly={this.readOnly}
            spellcheck={this.spellCheck}
            autocomplete={this.autoComplete}
            wrap={this.wrap}
          />
          {this.hasCounter && (
            <span class="counter" aria-hidden="true">
              {`${this.value.length}/${this.maxLength}`}
            </span>
          )}
          {this.hasCounter && <span class="sr-only" aria-live="polite" ref={(el) => (this.counterElement = el)} />}
        </div>
        <StateMessage state={this.state} message={this.message} theme={this.theme} host={this.host} />
      </div>
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
    const target = e.target as HTMLTextAreaElement;
    this.value = target.value; // triggers @Watch('value')
  };

  private updateCounterVisibility = (): void => {
    this.hasCounter = this.maxLength >= 0 && this.showCounter;
  };

  private setCounterAriaText = (): void => {
    if (this.counterElement) {
      this.counterElement.innerText = `You have ${this.maxLength - this.value.length} out of ${this.maxLength} characters left`;
    }
  };
}
