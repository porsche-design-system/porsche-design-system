import { Component, Element, forceUpdate, h, Host, JSX, Prop, State } from '@stencil/core';
import {
  attachComponentCss,
  attachSlottedCss,
  getHTMLElementAndThrowIfUndefined,
  getPrefixedTagNames,
  handleButtonEvent,
  hasDescription,
  hasLabel,
  hasMessage,
  isRequiredAndParentNotRequired,
  observeAttributes,
  setAriaAttributes,
  unobserveAttributes,
} from '../../../utils';
import type { BreakpointCustomizable, FormState } from '../../../types';
import { getComponentCss, getSlottedCss } from './text-field-wrapper-styles';
import { StateMessage } from '../../common/state-message';
import { UnitPositionType } from './text-field-wrapper-utils';

@Component({
  tag: 'p-text-field-wrapper',
  styleUrl: 'text-field-wrapper.scss',
  shadow: true,
})
export class TextFieldWrapper {
  @Element() public host!: HTMLElement;

  /** The label text. */
  @Prop() public label?: string = '';

  /** The unit text. */
  @Prop() public unit?: string = '';

  /** The unit text. */
  @Prop() public unitPosition?: UnitPositionType = 'prefix';

  /** The description text. */
  @Prop() public description?: string = '';

  /** The validation state. */
  @Prop() public state?: FormState = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Show or hide label and description text. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  @State() private showPassword = false;

  private input: HTMLInputElement;
  private unitElement: HTMLElement;
  private isPassword: boolean;
  private unitElementWidth: number;

  public connectedCallback(): void {
    attachSlottedCss(this.host, getSlottedCss);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.hideLabel,
      this.state,
      this.isPassword,
      this.unit,
      this.unitPosition
    );
    this.observeAttributes();
  }

  public componentWillLoad(): void {
    this.setInput();
    this.observeAttributes();
    this.isPassword = this.input.type === 'password';
  }

  public componentDidRender(): void {
    // needs to happen after render in order to have unitElement defined
    this.setUnitElementWidth();
    attachComponentCss(
      this.host,
      getComponentCss,
      this.hideLabel,
      this.state,
      this.isPassword,
      this.unit,
      this.unitPosition,
      this.unitElementWidth
    );
    /*
     * This is a workaround to improve accessibility because the input and the label/description/message text are placed in different DOM.
     * Referencing ID's from outside the component is impossible because the web component’s DOM is separate.
     * We have to wait for full support of the Accessibility Object Model (AOM) to provide the relationship between shadow DOM and slots
     */
    setAriaAttributes(this.input, {
      label: this.label,
      message: this.message || this.description,
      state: this.state,
    });
  }

  public disconnectedCallback(): void {
    unobserveAttributes(this.input);
  }

  public render(): JSX.Element {
    const { readOnly, disabled } = this.input;
    const labelClasses = {
      ['label']: true,
      ['label--disabled']: disabled,
    };

    const unitClasses = {
      ['unit']: true,
      ['unit--disabled']: disabled,
    };

    const textProps = { tag: 'span', color: 'inherit' };
    const labelProps = { ...textProps, onClick: this.onLabelClick };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <div class="root">
          <label class={labelClasses}>
            {hasLabel(this.host, this.label) && (
              <PrefixedTagNames.pText class="label__text" {...labelProps}>
                {this.label || <slot name="label" />}
                {isRequiredAndParentNotRequired(this.host, this.input) && <span class="required" />}
              </PrefixedTagNames.pText>
            )}
            {hasDescription(this.host, this.description) && (
              <PrefixedTagNames.pText class="label__text label__text--description" {...labelProps} size="x-small">
                {this.description || <slot name="description" />}
              </PrefixedTagNames.pText>
            )}
            <slot />
          </label>
          {this.isPassword ? (
            <button
              type="button"
              onClick={this.togglePassword}
              disabled={disabled}
              aria-pressed={this.showPassword ? 'true' : 'false'}
            >
              <span class="sr-only">Toggle password visibility</span>
              <PrefixedTagNames.pIcon
                name={this.showPassword ? 'view-off' : 'view'}
                color="inherit"
                aria-hidden="true"
              />
            </button>
          ) : this.input.type === 'search' ? (
            <button type="submit" onClick={this.onSubmit} disabled={disabled || readOnly}>
              <span class="sr-only">Search</span>
              <PrefixedTagNames.pIcon name="search" color="inherit" aria-hidden="true" />
            </button>
          ) : (
            this.input.type === 'number' &&
            !!this.unit && (
              <PrefixedTagNames.pText
                class={unitClasses}
                color="inherit"
                ref={(el) => {
                  this.unitElement = el;
                }}
              >
                {this.unit.substr(0, 5)}
              </PrefixedTagNames.pText>
            )
          )}
        </div>
        {hasMessage(this.host, this.message, this.state) && (
          <StateMessage state={this.state} message={this.message} host={this.host} />
        )}
      </Host>
    );
  }

  private setInput(): void {
    const selector = ['text', 'number', 'email', 'tel', 'search', 'url', 'date', 'time', 'month', 'week', 'password']
      .map((type) => `input[type=${type}]`)
      .join(',');

    this.input = getHTMLElementAndThrowIfUndefined(this.host, selector);
  }

  private onLabelClick = (): void => {
    this.input.focus();
  };

  private togglePassword = (): void => {
    this.input.type = this.input.type === 'password' ? 'text' : 'password';
    this.showPassword = !this.showPassword;
    this.onLabelClick();
  };

  private onSubmit = (event: MouseEvent): void => {
    handleButtonEvent(
      event,
      this.host,
      () => 'submit',
      () => this.input.disabled
    );
  };

  private observeAttributes = (): void => {
    observeAttributes(this.input, ['disabled', 'readonly', 'required'], () => forceUpdate(this.host));
  };

  private setUnitElementWidth = (): void => {
    this.unitElementWidth = this.unitElement?.offsetWidth;
  };
}
