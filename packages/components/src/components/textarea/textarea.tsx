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
  hasDescription,
  hasMessage,
  hasPropValueChanged,
  setAriaIDREF,
  syncFormState,
  validateProps,
} from '../../utils';
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
  value: AllowedTypes.oneOf<ValidatorFunction>([AllowedTypes.string, AllowedTypes.null]),
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

  /** Sets the visible label text displayed above the textarea to identify its purpose. */
  @Prop() public label?: string = '';

  /** Sets a supplementary description displayed below the label to give users additional guidance about the textarea. */
  @Prop() public description?: string = '';

  /** Reduces the textarea's initial height and padding for use in dense layouts where vertical space is limited. */
  @Prop() public compact?: boolean = false;

  /** Sets the name of the textarea submitted with the form data to identify this field's value on the server. */
  @Prop({ reflect: true }) public name: string;
  // The "name" property is reflected as an attribute to ensure compatibility with native form submission.
  // In the React wrapper, all props are synced as properties on the element ref, so reflecting "name" as an attribute ensures it is properly handled in the form submission process.

  /** Sets the current multi-line text value of the textarea and reflects any changes made by the user. */
  @Prop({ mutable: true }) public value?: string | null = '';

  /** Sets the validation state of the textarea, which controls its visual appearance and feedback message style (`none`, `success`, `error`). */
  @Prop() public state?: TextareaState = 'none';

  /** Sets the validation feedback message displayed below the textarea when `state` is `success` or `error`. */
  @Prop() public message?: string = '';

  /** Hides the visible label while keeping it accessible to screen readers. Supports responsive breakpoint values. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Shows a live character counter below the textarea indicating how many characters the user has typed relative to `maxLength`. */
  @Prop() public counter?: boolean = false;

  /** Sets placeholder text displayed inside the textarea when it is empty to hint at the expected content format. */
  @Prop() public placeholder?: string = '';

  /** Marks the textarea as required so the form cannot be submitted while this field is empty. */
  @Prop() public required?: boolean = false;

  /** Prevents user interaction with the textarea and excludes its value from form submissions. */
  @Prop({ mutable: true }) public disabled?: boolean = false;

  /** Sets the maximum number of characters the user is allowed to enter into the textarea. */
  @Prop() public maxLength?: number;

  /** Sets the minimum number of characters required for the textarea's value to pass constraint validation. */
  @Prop() public minLength?: number;

  /** Associates the textarea with a form element by its ID when the textarea is not a direct descendant of that form. */
  @Prop({ reflect: true }) public form?: string; // The ElementInternals API automatically detects the form attribute

  /** Sets the initial visible height of the textarea in lines of text. Has no effect when the `--p-textarea-field-sizing` CSS variable is set to `content`. */
  @Prop() public rows?: number = 7;

  /** Provides the browser with a hint to enable text autofill suggestions for the textarea (e.g. `autocomplete='on'`). */
  @Prop() public autoComplete?: string;

  /** Controls whether the browser's built-in spell-checking and grammar checking is enabled for the textarea content. */
  @Prop() public spellCheck?: boolean;

  /** Controls how the submitted text wraps in the form data: `soft` wraps only visually, `hard` inserts line breaks at the textarea width. */
  @Prop() public wrap?: TextareaWrap = 'soft';

  /** Controls whether and in which direction the user can resize the textarea (`horizontal`, `vertical`, `both`, or `none`). */
  @Prop() public resize?: TextareaResize = 'vertical';

  /** Makes the textarea read-only so users cannot modify the value, while still including it in form submissions. */
  @Prop() public readOnly?: boolean = false;

  /** Emitted when the textarea loses focus after its value was changed, equivalent to the native `change` event. */
  @Event({ bubbles: true }) public change: EventEmitter<TextareaChangeEventDetail>;

  /** Emitted when the textarea element loses focus, regardless of whether the value changed. */
  @Event({ bubbles: false }) public blur: EventEmitter<TextareaBlurEventDetail>;

  /** Emitted on every keystroke or value change as a direct result of user interaction, equivalent to the native `input` event. */
  @Event({ bubbles: true }) public input: EventEmitter<TextareaInputEventDetail>;

  @AttachInternals() private internals: ElementInternals;

  private defaultValue: string | null;
  private textAreaElement: HTMLTextAreaElement;

  // Native input.value is always a string; coerce null/undefined to mirror native behavior.
  private get parsedValue(): string {
    return String(this.value ?? '');
  }

  @Watch('value')
  public onValueChange(): void {
    if (this.textAreaElement && this.textAreaElement.value !== this.parsedValue) {
      this.textAreaElement.value = this.parsedValue;
    }
  }

  public componentWillLoad(): void {
    this.defaultValue = this.value; // preserve original type so reset can restore the consumer's exact input
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
    syncFormState(this.internals, this.textAreaElement, {
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
      this.readOnly,
      this.hideLabel,
      this.state,
      this.compact,
      this.counter,
      this.resize
    );

    const id = 'textarea';
    const textareaDescriptionId = hasDescription(this.host, this.description) ? descriptionId : undefined;
    const textareaMessageId = hasMessage(this.host, this.message, this.state) ? messageId : undefined;

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
            aria-describedby={setAriaIDREF(textareaMessageId, textareaDescriptionId)}
            aria-invalid={this.state === 'error' ? 'true' : null}
            id={id}
            ref={(el: HTMLTextAreaElement) => (this.textAreaElement = el)}
            onInput={this.onInput}
            onChange={this.onChange}
            onBlur={this.onBlur}
            name={this.name}
            value={this.parsedValue}
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
                  ? `You have ${this.maxLength - this.parsedValue.length} out of ${this.maxLength} characters left`
                  : `${this.parsedValue.length} characters entered`}
              </span>
              <span class="counter" aria-hidden="true">
                {this.maxLength ? `${this.parsedValue.length}/${this.maxLength}` : `${this.parsedValue.length}`}
              </span>
            </Fragment>
          )}
        </div>
        <StateMessage state={this.state} message={this.message} host={this.host} />
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
