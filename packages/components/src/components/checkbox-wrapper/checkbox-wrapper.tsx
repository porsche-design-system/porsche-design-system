import { Component, Element, forceUpdate, h, Host, type JSX, Listen, Prop } from '@stencil/core';
import {
  addChangeListener,
  AllowedTypes,
  attachComponentCss,
  FORM_STATES,
  getClosestHTMLElement,
  getOnlyChildOfKindHTMLElementOrThrow,
  getPrefixedTagNames,
  hasLabel,
  hasMessage,
  hasPropValueChanged,
  isDisabledOrLoading,
  isRequiredAndParentNotRequired,
  observeAttributes,
  setAriaAttributes,
  THEMES,
  unobserveAttributes,
  validateProps,
} from '../../utils';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../types';
import { getComponentCss } from './checkbox-wrapper-styles';
import type { CheckboxWrapperState } from './checkbox-wrapper-utils';
import { StateMessage } from '../common/state-message/state-message';
import { Required } from '../common/required/required';

const propTypes: PropTypes<typeof CheckboxWrapper> = {
  label: AllowedTypes.string,
  state: AllowedTypes.oneOf<CheckboxWrapperState>(FORM_STATES),
  message: AllowedTypes.string,
  hideLabel: AllowedTypes.breakpoint('boolean'),
  loading: AllowedTypes.boolean,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

@Component({
  tag: 'p-checkbox-wrapper',
  shadow: true,
})
export class CheckboxWrapper {
  @Element() public host!: HTMLElement;

  /** The label text. */
  @Prop() public label?: string = '';

  /** The validation state. */
  @Prop() public state?: CheckboxWrapperState = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Show or hide label. For better accessibility it's recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** __Experimental__: Disables the checkbox and shows a loading indicator. */
  @Prop() public loading?: boolean = false;

  /** Adapts the color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  private input: HTMLInputElement;

  @Listen('click', { capture: true })
  public onClick(e: MouseEvent): void {
    if (isDisabledOrLoading(this.input.disabled, this.loading)) {
      e.stopPropagation();
    }
  }

  @Listen('keydown')
  public onKeydown(e: KeyboardEvent): void {
    if ((e.key === 'Spacebar' || e.key.trim() === '') && isDisabledOrLoading(this.input.disabled, this.loading)) {
      e.preventDefault();
    }
  }

  public connectedCallback(): void {
    this.observeAttributes(); // on every reconnect
  }

  public componentWillLoad(): void {
    this.input = getOnlyChildOfKindHTMLElementOrThrow(this.host, 'input[type=checkbox]');
    addChangeListener(this.input);
    this.observeAttributes(); // once initially
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public componentDidRender(): void {
    /*
     * This is a workaround to improve accessibility because the input and the label/description/message text are placed in different DOM.
     * Referencing ID's from outside the component is impossible because the web component’s DOM is separate.
     * We have to wait for full support of the Accessibility Object Model (AOM) to provide the relationship between shadow DOM and slots
     */
    setAriaAttributes(this.input, {
      label: this.label,
      message: this.message,
      state: this.state,
    });
  }

  public disconnectedCallback(): void {
    unobserveAttributes(this.input);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.hideLabel,
      this.state,
      this.input.disabled,
      this.loading,
      this.theme
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <label aria-disabled={this.loading ? 'true' : null}>
          {hasLabel(this.host, this.label) && (
            <span class="text" onClick={!this.loading && this.onLabelClick}>
              {this.label || <slot name="label" />}
              {isRequiredAndParentNotRequired(this.host, this.input) && <Required />}
            </span>
          )}
          <slot />
          {this.loading && (
            <PrefixedTagNames.pSpinner
              class="spinner"
              size="inherit"
              theme={this.theme}
              aria={{ 'aria-label': `Loading state of ${this.label}` }}
            />
          )}
        </label>
        {hasMessage(this.host, this.message, this.state) && (
          <StateMessage state={this.state} message={this.message} theme={this.theme} host={this.host} />
        )}
      </Host>
    );
  }

  private onLabelClick = (event: MouseEvent): void => {
    /**
     * we only want to simulate the input click by label click
     * also we don't want to click to the input, if a link is clicked.
     */
    if (getClosestHTMLElement(event.target as HTMLElement, 'a') === null) {
      this.input.click();
    }
  };

  private observeAttributes = (): void => {
    observeAttributes(this.input, ['disabled', 'required'], () => forceUpdate(this.host));
  };
}
