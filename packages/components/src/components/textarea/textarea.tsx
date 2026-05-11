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
import type { BreakpointCustomizable, PropTypes, Theme } from '../../types';
import { AllowedTypes, attachComponentCss, FORM_STATES, hasPropValueChanged, THEMES, validateProps } from '../../utils';
import { Label } from '../common/label/label';
import { descriptionId } from '../common/label/label-utils';
import { messageId, StateMessage } from '../common/state-message/state-message';
import { getComponentCss } from './textarea-styles';
import {
  TEXTAREA_RESIZE,
  TEXTAREA_WRAPS,
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
  counter: AllowedTypes.boolean,
  placeholder: AllowedTypes.string,
  required: AllowedTypes.boolean,
  disabled: AllowedTypes.boolean,
  maxLength: AllowedTypes.number,
  minLength: AllowedTypes.number,
  form: AllowedTypes.string,
  rows: AllowedTypes.number,
  autoComplete: AllowedTypes.string,
  spellCheck: AllowedTypes.boolean,
  wrap: AllowedTypes.oneOf<TextareaWrap>(TEXTAREA_WRAPS),
  resize: AllowedTypes.oneOf<TextareaResize>(TEXTAREA_RESIZE),
  readOnly: AllowedTypes.boolean,
  compact: AllowedTypes.boolean,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "label-after", "description": "Places additional content after the label text (for content that should not be part of the label, e.g. external links or `p-popover`)."}
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

  /** Text content for a user-facing label. */
  @Prop() public label?: string = '';

  /** Supplementary text providing more context or explanation for the textarea. */
  @Prop() public description?: string = '';

  /** A boolean value that, if present, renders the textarea as a compact version. */
  @Prop() public compact?: boolean = false;

  /** The name of the textarea, used when submitting the form data. */
  @Prop({ reflect: true }) public name: string;
  // The "name" property is reflected as an attribute to ensure compatibility with native form submission.
  // In the React wrapper, all props are synced as properties on the element ref, so reflecting "name" as an attribute ensures it is properly handled in the form submission process.

  /** The textarea value. */
  @Prop({ mutable: true }) public value?: string = '';

  /** Indicates the validation or overall status of the textarea component. */
  @Prop() public state?: TextareaState = 'none';

  /** Dynamic feedback text for validation or status. */
  @Prop() public message?: string = '';

  /** Controls the visibility of the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Show or hide the character counter. */
  @Prop() public counter?: boolean = false;

  /** A string that provides a brief hint to the user about what kind of information is expected in the field (e.g., placeholder='Write your message here...'). This text is displayed when the textarea is empty. */
  @Prop() public placeholder?: string = '';

  /** A boolean value that, if present, indicates that the textarea must be filled out before the form can be submitted. */
  @Prop() public required?: boolean = false;

  /** A boolean value that, if present, makes the textarea unusable and unclickable. The value will not be submitted with the form. */
  @Prop({ mutable: true }) public disabled?: boolean = false;

  /** A non-negative integer specifying the maximum number of characters the user can enter into the textarea. */
  @Prop() public maxLength?: number;

  /** A non-negative integer specifying the minimum number of characters required for the textarea's value to be considered valid. */
  @Prop() public minLength?: number;

  /** Specifies the id of the <form> element that the textarea belongs to (useful if the textarea is not a direct descendant of the form). */
  @Prop({ reflect: true }) public form?: string; // The ElementInternals API automatically detects the form attribute

  /** The number of rows. Has no effect when field-sizing CSS Variable '--p-textarea-field-sizing' is set to 'content'. */
  @Prop() public rows?: number = 7;

  /** Provides a hint to the browser about what type of data the field expects, which can assist with autofill features (e.g., autocomplete='on'). */
  @Prop() public autoComplete?: string;

  /** Specifies whether the textarea should have its spelling and grammar checked */
  @Prop() public spellCheck?: boolean;

  /** Handles wrapping behavior of elements. */
  @Prop() public wrap?: TextareaWrap = 'soft';

  /** Controls whether the textarea is resizable and in which direction. */
  @Prop() public resize?: TextareaResize = 'vertical';

  /** A boolean value that, if present, makes the textarea uneditable by the user, but its value will still be submitted with the form. */
  @Prop() public readOnly?: boolean = false;

  /** Controls the visual appearance of the component. */
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

  @Watch('value')
  public onValueChange(newValue: string): void {
    this.internals?.setFormValue(newValue);
  }

  public componentWillLoad(): void {
    this.defaultValue = this.value;
  }

  public formResetCallback(): void {
    this.internals?.setFormValue(this.defaultValue);
    this.value = this.defaultValue;
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
        this.textAreaElement.validity,
        this.textAreaElement.validationMessage || ' ',
        this.textAreaElement
      );
    }
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
      this.compact,
      this.counter,
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
          {this.counter && (
            <Fragment>
              <span class="sr-only" aria-live="polite">
                {this.maxLength
                  ? `You have ${this.maxLength - this.value.length} out of ${this.maxLength} characters left`
                  : `${this.value.length} characters entered`}
              </span>
              <span class="counter" aria-hidden="true">
                {this.maxLength ? `${this.value.length}/${this.maxLength}` : `${this.value.length}`}
              </span>
            </Fragment>
          )}
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
    const target = e.target as HTMLTextAreaElement;
    this.value = target.value; // triggers @Watch('value')
    this.input.emit(e);
  };
}
