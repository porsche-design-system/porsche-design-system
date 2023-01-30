import { Component, Element, Host, JSX, h, Prop, forceUpdate } from '@stencil/core';
import {
  getClosestHTMLElement,
  getOnlyChildOfKindHTMLElementOrThrow,
  hasLabel,
  hasMessage,
  setAriaAttributes,
  observeAttributes,
  unobserveAttributes,
  isRequiredAndParentNotRequired,
  attachComponentCss,
  AllowedTypes,
  validateProps,
  THEMES,
} from '../../utils';
import type { BreakpointCustomizable, PropTypes } from '../../types';
import { getComponentCss } from './radio-button-wrapper-styles';
import { StateMessage } from '../common/state-message/state-message';
import { Required } from '../common/required/required';
import { FORM_STATES } from '../../utils';
import type { FormState } from '../../utils/form/form-state';
import { addChangeListener } from './radio-button-wrapper-utils';
import { Theme } from '../../types';

const propTypes: PropTypes<typeof RadioButtonWrapper> = {
  label: AllowedTypes.string,
  state: AllowedTypes.oneOf<FormState>(FORM_STATES),
  message: AllowedTypes.string,
  hideLabel: AllowedTypes.breakpoint('boolean'),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

@Component({
  tag: 'p-radio-button-wrapper',
  shadow: true,
})
export class RadioButtonWrapper {
  @Element() public host!: HTMLElement;

  /** The label text. */
  @Prop() public label?: string = '';

  /** The validation state. */
  @Prop() public state?: FormState = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Show or hide label. For better accessibility it's recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Adapts the color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  private input: HTMLInputElement;

  public connectedCallback(): void {
    this.observeAttributes(); // on every reconnect
  }

  public componentWillLoad(): void {
    this.input = getOnlyChildOfKindHTMLElementOrThrow(this.host, 'input[type=radio]');
    addChangeListener(this.input);
    this.observeAttributes(); // once initially
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
    attachComponentCss(this.host, getComponentCss, this.hideLabel, this.state, this.input.disabled, this.theme);

    return (
      <Host>
        <label>
          {hasLabel(this.host, this.label) && (
            <span class="text" onClick={this.onLabelClick}>
              {this.label || <slot name="label" />}
              {isRequiredAndParentNotRequired(this.host, this.input) && <Required />}
            </span>
          )}
          <slot />
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
