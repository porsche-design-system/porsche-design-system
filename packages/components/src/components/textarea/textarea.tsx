import { Component, Element, Event, type EventEmitter, forceUpdate, h, type JSX, Prop, Watch } from '@stencil/core';
import { type BreakpointCustomizable, type PropTypes, type Theme } from '../../types';
import {
  AllowedTypes,
  applyConstructableStylesheetStyles,
  attachComponentCss,
  FORM_STATES,
  hasCounter,
  hasPropValueChanged,
  observeAttributes,
  observeProperties,
  setAriaAttributes,
  THEMES,
  unobserveAttributes,
  updateCounter,
  validateProps,
} from '../../utils';
import {
  type TextareaUpdateEventDetail,
  AUTO_FILL,
  type AutoFillType,
  initNativeTextarea,
  INTERNAL_TEXTAREA_SLOT,
  TEXTAREA_WRAPS,
  textareaInputEventListenerCurry,
  type TextareaState,
  type TextareaWrapType,
} from './textarea-utils';
import { StateMessage } from '../common/state-message/state-message';
import { Label } from '../common/label/label';
import { getSlottedAnchorStyles } from '../../styles';
import { getComponentCss } from '../../styles/textarea-styles';

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
  dirName: AllowedTypes.string,
  readOnly: AllowedTypes.boolean,
  name: AllowedTypes.string,
  value: AllowedTypes.string,
  maxLength: AllowedTypes.number,
  minLength: AllowedTypes.number,
  wrap: AllowedTypes.oneOf<TextareaWrapType>(TEXTAREA_WRAPS),
  spellCheck: AllowedTypes.boolean,
  autoComplete: AllowedTypes.oneOf<AutoFillType>(AUTO_FILL),
};

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "description", "description": "Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 */
@Component({
  tag: 'p-textarea',
  shadow: true,
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

  /** Enables automatic focus when the component is rendered */
  @Prop() public autoFocus?: boolean = false;

  /** Indicates the text directionality of the element */
  @Prop() public dirName?: string;

  /** The name of the textarea. */
  @Prop() public name: string;

  /** The max length of the textarea. */
  @Prop() public maxLength?: number;

  /** The min length of the textarea. */
  @Prop() public minLength?: number;

  /** Specifies whether the input can be autofilled by the browser */
  @Prop() public autoComplete?: AutoFillType = '';

  /** Specifies whether the input should have its spelling and grammar checked */
  @Prop() public spellCheck?: boolean;

  /** Handles wrapping behaviour of elements. */
  @Prop() public wrap?: TextareaWrapType = 'off';

  /** Specifies whether the textarea should be read-only. */
  @Prop() public readOnly?: boolean = false;

  /** The textarea value. */
  @Prop({ mutable: true }) public value?: string;

  /** Emitted when textarea value is changed. */
  @Event({ bubbles: false }) public update: EventEmitter<TextareaUpdateEventDetail>;

  private nativeTextarea: HTMLTextAreaElement;
  private counterElement: HTMLSpanElement;
  private ariaElement: HTMLSpanElement;
  private hasCounter: boolean;

  private eventListener: EventListener;

  @Watch('showCounter')
  public onShowCounterChange(): void {
    this.updateCounterVisibility();
  }

  public connectedCallback(): void {
    applyConstructableStylesheetStyles(this.host, getSlottedAnchorStyles);
    this.observeAttributes(); // on every reconnect
  }

  public componentWillLoad(): void {
    // this.textarea = getOnlyChildOfKindHTMLElementOrThrow(this.host, 'textarea');
    this.nativeTextarea = initNativeTextarea(
      this.host,
      this.name,
      this.disabled,
      this.required,
      this.placeholder,
      this.maxLength,
      this.minLength,
      this.readOnly,
      this.autoFocus,
      this.spellCheck,
      this.autoComplete,
      this.wrap,
      this.value,
      this.dirName
    );

    this.observeAttributes(); // once initially
    this.updateCounterVisibility();
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public componentDidRender(): void {
    if (this.hasCounter) {
      this.addInputEventListenerForCounter(this.ariaElement, this.counterElement);
    }

    /*
     * This is a workaround to improve accessibility because the textarea and the label/description/message text are placed in different DOM.
     * Referencing ID's from outside the component is impossible because the web component’s DOM is separate.
     * We have to wait for full support of the Accessibility Object Model (AOM) to provide the relationship between shadow DOM and slots.
     */
    setAriaAttributes(this.nativeTextarea, {
      label: this.label,
      message: this.message || this.description,
      state: this.state,
    });
  }

  public disconnectedCallback(): void {
    unobserveAttributes(this.nativeTextarea);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    const disabled = false;

    attachComponentCss(this.host, getComponentCss, disabled, this.hideLabel, this.state, this.hasCounter, this.theme);

    return (
      <div class="root">
        <Label
          host={this.host}
          label={this.label}
          description={this.description}
          isDisabled={disabled}
          formElement={this.nativeTextarea}
        />
        d
        <div class="wrapper">
          <slot name={INTERNAL_TEXTAREA_SLOT} />
          {this.hasCounter && <span class="counter" aria-hidden="true" ref={(el) => (this.counterElement = el)} />}
          {this.hasCounter && <span class="sr-only" ref={(el) => (this.ariaElement = el)} aria-live="polite" />}
        </div>
        <StateMessage state={this.state} message={this.message} theme={this.theme} host={this.host} />
      </div>
    );
  }

  private observeAttributes = (): void => {
    observeAttributes(
      this.nativeTextarea,
      [
        'disabled',
        'readonly',
        'required',
        'maxlength',
        'minlength',
        'placeholder',
        'readonly',
        'autofocus',
        'spellcheck',
        'autocomplete',
        'wrap',
        'dirname',
      ],
      () => {
        forceUpdate(this.host);
        this.updateCounterVisibility();
      }
    );
  };

  private updateCounterVisibility = (): void => {
    this.hasCounter = hasCounter(this.nativeTextarea) && this.showCounter;
  };

  private addInputEventListenerForCounter = (
    characterCountElement: HTMLSpanElement,
    counterElement?: HTMLSpanElement,
    inputChangeCallback?: () => void
  ): void => {
    updateCounter(this.nativeTextarea, characterCountElement, counterElement); // Initial value

    // When value changes programmatically
    observeProperties(this.nativeTextarea, ['value'], () => {
      this.update.emit({ name: this.name, value: this.nativeTextarea.value });
      updateCounter(this.nativeTextarea, characterCountElement, counterElement, inputChangeCallback);
    });

    this.eventListener = textareaInputEventListenerCurry(
      this.nativeTextarea,
      this.update,
      characterCountElement,
      counterElement,
      inputChangeCallback
    );

    this.nativeTextarea.removeEventListener('input', this.eventListener);
    this.nativeTextarea.addEventListener('input', this.eventListener);
  };
}
