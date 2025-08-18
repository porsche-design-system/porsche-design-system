import { Component, Element, type JSX, Listen, Prop, forceUpdate, h } from '@stencil/core';
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
  isDisabledOrLoading,
  observeAttributes,
  setAriaAttributes,
  unobserveAttributes,
  validateProps,
} from '../../utils';
import { getCheckboxRadioButtonSafariRenderingFix } from '../../utils/form/applyCheckboxRadioButtonSafariRenderingFix';
import { LegacyLabel } from '../common/label/legacy-label';
import { LoadingMessage } from '../common/loading-message/loading-message';
import { StateMessage } from '../common/state-message/state-message';
import { getComponentCss } from './checkbox-wrapper-styles';
import type { CheckboxWrapperState } from './checkbox-wrapper-utils';

const propTypes: PropTypes<typeof CheckboxWrapper> = {
  label: AllowedTypes.string,
  state: AllowedTypes.oneOf<CheckboxWrapperState>(FORM_STATES),
  message: AllowedTypes.string,
  hideLabel: AllowedTypes.breakpoint('boolean'),
  loading: AllowedTypes.boolean,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "", "description": "Default slot for the input." }
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 *
 * @deprecated since v3.29.0, will be removed with next major release. Please use "p-checkbox" instead.
 */
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

  /** @experimental Disables the checkbox and shows a loading indicator. */
  @Prop() public loading?: boolean = false;

  /** Adapts the color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  private initialLoading: boolean = false;
  private input: HTMLInputElement;

  @Listen('keydown')
  public onKeydown(e: KeyboardEvent): void {
    const { key } = e;
    if ((key === ' ' || key === 'Spacebar') && isDisabledOrLoading(this.input.disabled, this.loading)) {
      e.preventDefault();
    }
  }

  public connectedCallback(): void {
    this.initialLoading = this.loading;
    applyConstructableStylesheetStyles(this.host, getSlottedAnchorStyles, getCheckboxRadioButtonSafariRenderingFix);
    this.observeAttributes(); // on every reconnect
  }

  public componentWillLoad(): void {
    this.initialLoading = this.loading;
    this.input = getOnlyChildOfKindHTMLElementOrThrow(this.host, 'input[type=checkbox]');
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

    attachComponentCss(this.host, getComponentCss, this.hideLabel, this.state, disabled, this.loading, this.theme);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <div class="root">
        <LegacyLabel
          host={this.host}
          label={this.label}
          isLoading={this.loading}
          isDisabled={disabled}
          formElement={this.input}
        />
        <div class="wrapper">
          <slot />
          {this.loading && (
            <PrefixedTagNames.pSpinner class="spinner" size="inherit" theme={this.theme} aria-hidden="true" />
          )}
        </div>
        <StateMessage state={this.state} message={this.message} theme={this.theme} host={this.host} />
        <LoadingMessage loading={this.loading} initialLoading={this.initialLoading} />
      </div>
    );
  }

  private observeAttributes = (): void => {
    observeAttributes(this.input, ['disabled', 'required'], () => forceUpdate(this.host));
  };
}
