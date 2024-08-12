import { AttachInternals, Component, Element, Event, type EventEmitter, h, type JSX, Prop, Watch } from '@stencil/core';
import { type BreakpointCustomizable, type PropTypes, type Theme } from '../../types';
import {
  AllowedTypes,
  applyConstructableStylesheetStyles,
  attachComponentCss,
  FORM_STATES,
  hasPropValueChanged,
  THEMES,
  validateProps,
} from '../../utils';
import {
  AUTO_COMPLETE,
  type TextareaAutoComplete,
  TEXTAREA_WRAPS,
  type TextareaState,
  type TextareaWrap,
  type TextareaChangeEventDetail,
  type TextareaBlurEventDetail,
  type TextareaInputEventDetail,
} from './textarea-utils';
import { messageId, StateMessage } from '../common/state-message/state-message';
import { descriptionId, Label } from '../common/label/label';
import { getSlottedAnchorStyles } from '../../styles';
import { getComponentCss } from './textarea-styles';
import { setAriaElementInnerHtml } from '../../utils/form/form-utils';

const propTypes: PropTypes<typeof Textarea> = {
  label: AllowedTypes.string,
  description: AllowedTypes.string,
  state: AllowedTypes.oneOf<TextareaState>(FORM_STATES),
  message: AllowedTypes.string,
  hideLabel: AllowedTypes.breakpoint('boolean'),
  showCounter: AllowedTypes.boolean,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  placeholder: AllowedTypes.string,
  required: AllowedTypes.boolean,
  disabled: AllowedTypes.boolean,
  autoFocus: AllowedTypes.boolean,
  readOnly: AllowedTypes.boolean,
  name: AllowedTypes.string,
  value: AllowedTypes.string,
  form: AllowedTypes.string,
  maxLength: AllowedTypes.number,
  minLength: AllowedTypes.number,
  rows: AllowedTypes.number,
  wrap: AllowedTypes.oneOf<TextareaWrap>(TEXTAREA_WRAPS),
  spellCheck: AllowedTypes.boolean,
  autoComplete: AllowedTypes.oneOf<TextareaAutoComplete>(AUTO_COMPLETE),
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

  /** The validation state. */
  @Prop() public state?: TextareaState = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Show or hide max character count. */
  @Prop() public showCounter?: boolean = true;

  /** Adapts the color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** The placeholder text. */
  @Prop() public placeholder?: string = '';

  /** Marks the textarea as required. */
  @Prop() public required?: boolean = false;

  /** Marks the textarea as disabled. */
  @Prop() public disabled?: boolean = false;

  /** Enables automatic focus when the component is rendered. */
  @Prop() public autoFocus?: boolean = false;

  /** The name of the textarea. */
  @Prop() public name: string;

  /** The max length of the textarea. */
  @Prop() public maxLength?: number;

  /** The min length of the textarea. */
  @Prop() public minLength?: number;

  /** The id of a form element the textarea should be associated with. */
  @Prop() public form?: string;

  /** The amount of rows of the textarea. */
  @Prop() public rows?: number;

  /** Specifies whether the input can be autofilled by the browser */
  @Prop() public autoComplete?: TextareaAutoComplete = '';

  /** Specifies whether the input should have its spelling and grammar checked */
  @Prop() public spellCheck?: boolean;

  /** Handles wrapping behaviour of elements. */
  @Prop() public wrap?: TextareaWrap = 'soft';

  /** Specifies whether the textarea should be read-only. */
  @Prop() public readOnly?: boolean = false;

  /** The textarea value. */
  @Prop({ mutable: true }) public value?: string = '';

  /** Emitted when the textarea loses focus after its value was changed. */
  @Event({ bubbles: true }) public change: EventEmitter<TextareaChangeEventDetail>;

  /** Emitted when the textarea has lost focus. */
  @Event({ bubbles: false }) public blur: EventEmitter<TextareaBlurEventDetail>;

  /** Emitted when the value has been changed as a direct result of a user action. */
  @Event({ bubbles: true }) public input: EventEmitter<TextareaInputEventDetail>;

  @AttachInternals() private internals: ElementInternals;

  private textAreaElement: HTMLTextAreaElement;
  private ariaElement: HTMLSpanElement;
  private hasCounter: boolean;

  @Watch('showCounter')
  public onShowCounterChange(): void {
    this.updateCounterVisibility();
  }

  public connectedCallback(): void {
    applyConstructableStylesheetStyles(this.host, getSlottedAnchorStyles);
  }

  public componentWillLoad(): void {
    this.updateCounterVisibility();
  }

  public formResetCallback(): void {
    this.internals.setValidity({});
    this.internals.setFormValue('');
    this.textAreaElement.value = '';
    this.value = '';
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }
  public componentDidLoad(): void {
    if (this.hasCounter) {
      setAriaElementInnerHtml(this.textAreaElement, this.ariaElement);
    }
    this.internals.setFormValue(this.value);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    const disabled = false;

    attachComponentCss(this.host, getComponentCss, disabled, this.hideLabel, this.state, this.hasCounter, this.theme);

    const id = 'textarea';
    return (
      <div class="root">
        <Label
          host={this.host}
          htmlFor={id}
          label={this.label}
          description={this.description}
          isRequired={this.required}
          isDisabled={disabled}
          formElement={this.textAreaElement}
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
            autofocus={this.autoFocus}
            spellcheck={this.spellCheck}
            autocomplete={this.autoComplete}
            wrap={this.wrap}
          />
          {this.hasCounter && (
            <span class="counter" aria-hidden="true">
              {`${this.value.length}/${this.maxLength}`}
            </span>
          )}
          {this.hasCounter && <span class="sr-only" ref={(el) => (this.ariaElement = el)} aria-live="polite" />}
        </div>
        <StateMessage state={this.state} message={this.message} theme={this.theme} host={this.host} />
      </div>
    );
  }

  private onChange = (e: Event): void => {
    this.change.emit(e);
  };

  private onBlur = (e: Event): void => {
    this.blur.emit(e);
  };

  private onInput = (e: InputEvent): void => {
    this.input.emit(e);
    const target = e.target as HTMLTextAreaElement;
    this.value = target.value;
    if (this.hasCounter) {
      setAriaElementInnerHtml(this.textAreaElement, this.ariaElement);
    }
    this.internals.setFormValue(target.value);
  };

  private updateCounterVisibility = (): void => {
    this.hasCounter = this.maxLength >= 0 && this.showCounter;
  };
}
