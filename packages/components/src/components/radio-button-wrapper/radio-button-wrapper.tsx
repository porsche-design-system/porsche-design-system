import { Component, Element, type JSX, Prop, forceUpdate, h } from '@stencil/core';
import { getSlottedAnchorStyles } from '../../styles';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../types';
import {
  AllowedTypes,
  FORM_STATES,
  THEMES,
  applyConstructableStylesheetStyles,
  attachComponentCss,
  getOnlyChildOfKindHTMLElementOrThrow,
  getPrefixedTagNames,
  hasPropValueChanged,
  observeAttributes,
  setAriaAttributes,
  unobserveAttributes,
  validateProps,
} from '../../utils';
import { getCheckboxRadioButtonSafariRenderingFix } from '../../utils/form/applyCheckboxRadioButtonSafariRenderingFix';
import { LegacyLabel } from '../common/legacy-label/legacy-label';
import { LoadingMessage } from '../common/loading-message/loading-message';
import { StateMessage } from '../common/state-message/state-message';
import { getComponentCss } from './radio-button-wrapper-styles';
import type { RadioButtonWrapperState } from './radio-button-wrapper-utils';

const propTypes: PropTypes<typeof RadioButtonWrapper> = {
  label: AllowedTypes.string,
  state: AllowedTypes.oneOf<RadioButtonWrapperState>(FORM_STATES),
  message: AllowedTypes.string,
  hideLabel: AllowedTypes.breakpoint('boolean'),
  loading: AllowedTypes.boolean,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "", "description": "Default slot for the input." }
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 */
@Component({
  tag: 'p-radio-button-wrapper',
  shadow: true,
})
export class RadioButtonWrapper {
  @Element() public host!: HTMLElement;

  /** The label text. */
  @Prop() public label?: string = '';

  /** The validation state. */
  @Prop() public state?: RadioButtonWrapperState = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Show or hide label. For better accessibility it's recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** @experimental Disables the radio button and shows a loading indicator. */
  @Prop() public loading?: boolean = false;

  /** Adapts the color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  private initialLoading: boolean = false;
  private input: HTMLInputElement;

  public connectedCallback(): void {
    this.initialLoading = this.loading;
    applyConstructableStylesheetStyles(this.host, getSlottedAnchorStyles, getCheckboxRadioButtonSafariRenderingFix);
    this.observeAttributes(); // on every reconnect
  }

  public componentWillLoad(): void {
    this.initialLoading = this.loading;
    this.input = getOnlyChildOfKindHTMLElementOrThrow(this.host, 'input[type=radio]');
    this.observeAttributes(); // once initially
  }

  public componentWillUpdate(): void {
    if (this.loading) {
      this.initialLoading = true;
    }
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

    const { disabled } = this.input;
    const isLoading = this.loading && !this.input.checked; // spinner is only displayed when radio is not checked already

    attachComponentCss(this.host, getComponentCss, this.hideLabel, this.state, disabled, isLoading, this.theme);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <div class="root">
        <LegacyLabel
          host={this.host}
          label={this.label}
          isLoading={isLoading}
          isDisabled={disabled}
          formElement={this.input}
        />
        <div class="wrapper">
          <slot />
          {isLoading && (
            <PrefixedTagNames.pSpinner class="spinner" size="inherit" theme={this.theme} aria-hidden="true" />
          )}
        </div>
        <StateMessage state={this.state} message={this.message} theme={this.theme} host={this.host} />
        <LoadingMessage loading={isLoading} initialLoading={this.initialLoading} />
      </div>
    );
  }

  private observeAttributes = (): void => {
    observeAttributes(this.input, ['disabled', 'required'], () => forceUpdate(this.host));
  };
}
