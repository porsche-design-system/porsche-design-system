import { Component, Element, forceUpdate, h, type JSX, Prop } from '@stencil/core';
import {
  addChangeListener,
  AllowedTypes,
  attachComponentCss,
  FORM_STATES,
  getOnlyChildOfKindHTMLElementOrThrow,
  getPrefixedTagNames,
  hasPropValueChanged,
  observeAttributes,
  setAriaAttributes,
  THEMES,
  unobserveAttributes,
  validateProps,
} from '../../utils';
import { type BreakpointCustomizable, type PropTypes, type Theme } from '../../types';
import { getComponentCss } from './radio-button-wrapper-styles';
import { type RadioButtonWrapperState } from './radio-button-wrapper-utils';
import { StateMessage } from '../common/state-message/state-message';
import { Label } from '../common/label/label';

const propTypes: PropTypes<typeof RadioButtonWrapper> = {
  label: AllowedTypes.string,
  state: AllowedTypes.oneOf<RadioButtonWrapperState>(FORM_STATES),
  message: AllowedTypes.string,
  hideLabel: AllowedTypes.breakpoint('boolean'),
  loading: AllowedTypes.boolean,
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
  @Prop() public state?: RadioButtonWrapperState = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Show or hide label. For better accessibility it's recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** __Experimental__: Disables the radio button and shows a loading indicator. */
  @Prop() public loading?: boolean = false;

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
        <Label
          host={this.host}
          label={this.label}
          isLoading={isLoading}
          isDisabled={disabled}
          formElement={this.input}
        />
        <div class="wrapper">
          <slot />
          {isLoading && (
            <PrefixedTagNames.pSpinner
              class="spinner"
              size="inherit"
              theme={this.theme}
              aria={{ 'aria-label': `Loading state of ${this.label}` }}
            />
          )}
        </div>
        <StateMessage state={this.state} message={this.message} theme={this.theme} host={this.host} />
      </div>
    );
  }

  private observeAttributes = (): void => {
    observeAttributes(this.input, ['disabled', 'required'], () => forceUpdate(this.host));
  };
}
