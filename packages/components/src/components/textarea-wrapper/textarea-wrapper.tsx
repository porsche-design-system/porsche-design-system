import { Component, Element, type JSX, Prop, Watch, forceUpdate, h } from '@stencil/core';
import { getSlottedAnchorStyles } from '../../styles';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../types';
import {
  AllowedTypes,
  FORM_STATES,
  THEMES,
  applyConstructableStylesheetStyles,
  attachComponentCss,
  getOnlyChildOfKindHTMLElementOrThrow,
  hasCounter,
  hasPropValueChanged,
  inputEventListenerCurry,
  observeAttributes,
  observeProperties,
  setAriaAttributes,
  unobserveAttributes,
  updateCounter,
  validateProps,
  warnIfDeprecatedPropIsUsed,
} from '../../utils';
import { Label } from '../common/label/label';
import { StateMessage } from '../common/state-message/state-message';
import { getComponentCss } from './textarea-wrapper-styles';
import type { TextareaWrapperState } from './textarea-wrapper-utils';

const propTypes: PropTypes<typeof TextareaWrapper> = {
  label: AllowedTypes.string,
  description: AllowedTypes.string,
  state: AllowedTypes.oneOf<TextareaWrapperState>(FORM_STATES),
  message: AllowedTypes.string,
  hideLabel: AllowedTypes.breakpoint('boolean'),
  showCharacterCount: AllowedTypes.boolean,
  showCounter: AllowedTypes.boolean,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "description", "description": "Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "", "description": "Default slot for the textarea." }
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 */
@Component({
  tag: 'p-textarea-wrapper',
  shadow: true,
})
export class TextareaWrapper {
  @Element() public host!: HTMLElement;

  /** The label text. */
  @Prop() public label?: string = '';

  /** The description text. */
  @Prop() public description?: string = '';

  /** The validation state. */
  @Prop() public state?: TextareaWrapperState = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /**
   * @deprecated since v3.0.0, will be removed with next major release, use `showCounter` instead.
   * Show or hide max character count. */
  @Prop() public showCharacterCount?: boolean;

  /** Show or hide max character count. */
  @Prop() public showCounter?: boolean = true;

  /** Adapts the color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  private textarea: HTMLTextAreaElement;
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
    this.textarea = getOnlyChildOfKindHTMLElementOrThrow(this.host, 'textarea');
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
    setAriaAttributes(this.textarea, {
      label: this.label,
      message: this.message || this.description,
      state: this.state,
    });
  }

  public disconnectedCallback(): void {
    unobserveAttributes(this.textarea);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    warnIfDeprecatedPropIsUsed<typeof TextareaWrapper>(
      this,
      'showCharacterCount',
      'Please use showCounter prop instead.'
    );

    const { disabled, readOnly } = this.textarea;

    attachComponentCss(
      this.host,
      getComponentCss,
      disabled,
      readOnly,
      this.hideLabel,
      this.state,
      this.hasCounter,
      this.theme
    );

    return (
      <div class="root">
        <Label
          host={this.host}
          label={this.label}
          description={this.description}
          isDisabled={disabled}
          formElement={this.textarea}
        />
        <div class="wrapper">
          <slot />
          {this.hasCounter && <span class="counter" aria-hidden="true" ref={(el) => (this.counterElement = el)} />}
          {this.hasCounter && <span class="sr-only" ref={(el) => (this.ariaElement = el)} aria-live="polite" />}
        </div>
        <StateMessage state={this.state} message={this.message} theme={this.theme} host={this.host} />
      </div>
    );
  }

  private observeAttributes = (): void => {
    observeAttributes(this.textarea, ['disabled', 'readonly', 'required', 'maxlength'], () => {
      forceUpdate(this.host);
      this.updateCounterVisibility();
    });
  };

  private updateCounterVisibility = (): void => {
    this.hasCounter =
      hasCounter(this.textarea) &&
      (typeof this.showCharacterCount === 'undefined' ? this.showCounter : this.showCharacterCount);
  };

  private addInputEventListenerForCounter = (
    characterCountElement: HTMLSpanElement,
    counterElement?: HTMLSpanElement,
    inputChangeCallback?: () => void
  ): void => {
    updateCounter(this.textarea, characterCountElement, counterElement); // Initial value

    // When value changes programmatically
    observeProperties(this.textarea, ['value'], () => {
      updateCounter(this.textarea, characterCountElement, counterElement, inputChangeCallback);
    });

    this.eventListener = inputEventListenerCurry(characterCountElement, counterElement, inputChangeCallback);

    this.textarea.removeEventListener('input', this.eventListener);
    this.textarea.addEventListener('input', this.eventListener);
  };
}
