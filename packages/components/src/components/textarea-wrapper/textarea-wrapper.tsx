import { Component, Element, forceUpdate, h, type JSX, Prop } from '@stencil/core';
import { type BreakpointCustomizable, type PropTypes, type Theme } from '../../types';
import {
  addInputEventListenerForCounter,
  AllowedTypes,
  attachComponentCss,
  FORM_STATES,
  getOnlyChildOfKindHTMLElementOrThrow,
  hasCounter,
  hasPropValueChanged,
  observeAttributes,
  setAriaAttributes,
  THEMES,
  unobserveAttributes,
  validateProps,
  warnIfDeprecatedPropIsUsed,
} from '../../utils';
import { type TextareaWrapperState } from './textarea-wrapper-utils';
import { getComponentCss } from './textarea-wrapper-styles';
import { StateMessage } from '../common/state-message/state-message';
import { Label } from '../common/label/label';

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

  public connectedCallback(): void {
    this.observeAttributes(); // on every reconnect
  }

  public componentWillLoad(): void {
    this.textarea = getOnlyChildOfKindHTMLElementOrThrow(this.host, 'textarea');
    this.observeAttributes(); // once initially
    this.hasCounter =
      hasCounter(this.textarea) &&
      (typeof this.showCharacterCount === 'undefined' ? this.showCounter : this.showCharacterCount);
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public componentDidLoad(): void {
    if (this.hasCounter) {
      addInputEventListenerForCounter(this.textarea, this.ariaElement, this.counterElement);
    }
  }

  public componentDidRender(): void {
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
    attachComponentCss(
      this.host,
      getComponentCss,
      this.textarea.disabled,
      this.hideLabel,
      this.state,
      this.hasCounter,
      this.theme
    );

    return (
      <div class="root">
        <Label host={this.host} label={this.label} description={this.description} formElement={this.textarea} />
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
    observeAttributes(this.textarea, ['disabled', 'readonly', 'required'], () => forceUpdate(this.host));
  };
}
