import { AttachInternals, Component, Element, Host, type JSX, Listen, Prop, Watch, h } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes, SelectedAriaAttributes, Theme } from '../../types';
import {
  ALIGN_LABELS,
  AllowedTypes,
  BUTTON_ARIA_ATTRIBUTES,
  BUTTON_TYPES,
  TEXT_SIZES,
  THEMES,
  TYPOGRAPHY_TEXT_WEIGHTS,
  attachComponentCss,
  getPrefixedTagNames,
  hasPropValueChanged,
  hasVisibleIcon,
  improveButtonHandlingForCustomElement,
  isDisabledOrLoading,
  validateProps,
  warnIfDeprecatedPropValueIsUsed,
} from '../../utils';
import { LoadingMessage, loadingId } from '../common/loading-message/loading-message';
import { getComponentCss } from './button-pure-styles';
import {
  type ButtonPureAlignLabel,
  type ButtonPureAlignLabelDeprecated,
  type ButtonPureAriaAttribute,
  type ButtonPureIcon,
  type ButtonPureSize,
  type ButtonPureType,
  type ButtonPureWeight,
  getButtonPureAriaAttributes,
  warnIfIsLoadingAndIconIsNone,
} from './button-pure-utils';

const propTypes: PropTypes<typeof ButtonPure> = {
  type: AllowedTypes.oneOf<ButtonPureType>(BUTTON_TYPES),
  name: AllowedTypes.string,
  value: AllowedTypes.string,
  disabled: AllowedTypes.boolean,
  loading: AllowedTypes.boolean,
  size: AllowedTypes.breakpoint<ButtonPureSize>(TEXT_SIZES),
  weight: AllowedTypes.oneOf<ButtonPureWeight>(TYPOGRAPHY_TEXT_WEIGHTS),
  icon: AllowedTypes.string,
  iconSource: AllowedTypes.string,
  underline: AllowedTypes.boolean,
  active: AllowedTypes.boolean,
  hideLabel: AllowedTypes.breakpoint('boolean'),
  alignLabel: AllowedTypes.breakpoint<ButtonPureAlignLabel>(ALIGN_LABELS),
  stretch: AllowedTypes.breakpoint('boolean'),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  aria: AllowedTypes.aria<ButtonPureAriaAttribute>(BUTTON_ARIA_ATTRIBUTES),
  form: AllowedTypes.string,
};

/**
 * @slot {"name": "", "description": "Default slot for the button label." }
 */
@Component({
  tag: 'p-button-pure',
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class ButtonPure {
  @Element() public host!: HTMLElement;

  /** Specifies the type of the button. */
  @Prop() public type?: ButtonPureType = 'submit';

  /** The name of the button, submitted as a pair with the button's value as part of the form data, when that button is used to submit the form. */
  @Prop({ reflect: true }) public name?: string;

  /** Defines the value associated with the button's name when it's submitted with the form data. This value is passed to the server in params when the form is submitted using this button. */
  @Prop() public value?: string;

  /** Disables the button. No events will be triggered while disabled state is active. */
  @Prop() public disabled?: boolean = false;

  /** Disables the button and shows a loading indicator. No events will be triggered while loading state is active. */
  @Prop() public loading?: boolean = false;

  /** Size of the button. */
  @Prop() public size?: BreakpointCustomizable<ButtonPureSize> = 'small';

  /**
   * The weight of the text (only has effect with visible label).
   * @deprecated since v3.0.0, will be removed with next major release
   */
  @Prop() public weight?: ButtonPureWeight = 'regular';

  /** The icon shown. */
  @Prop() public icon?: ButtonPureIcon = 'arrow-right';

  /** A URL path to a custom icon. */
  @Prop() public iconSource?: string;

  /** Shows an underline under the label. */
  @Prop() public underline?: boolean = false;

  /** Display button in active state. */
  @Prop() public active?: boolean = false;

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Aligns the label. */
  @Prop() public alignLabel?: BreakpointCustomizable<ButtonPureAlignLabel> = 'end';

  /** Stretches the area between icon and label to max available space. */
  @Prop() public stretch?: BreakpointCustomizable<boolean> = false;

  /** Adapts the button color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<ButtonPureAriaAttribute>;

  /** The id of a form element the button should be associated with. */
  @Prop({ reflect: true }) public form?: string;
  // In the React wrapper, all props are synced as properties on the element ref, so reflecting "form" as an attribute ensures it is properly handled in the form submission process.

  @AttachInternals() private internals: ElementInternals;

  private initialLoading: boolean = false;

  private get isDisabledOrLoading(): boolean {
    return isDisabledOrLoading(this.disabled, this.loading);
  }

  // this stops click events when button is disabled
  @Listen('click', { capture: true })
  public onClick(e: MouseEvent): void {
    if (this.isDisabledOrLoading) {
      e.stopPropagation();
      return;
    }

    if (this.form && this.internals?.form) {
      e.preventDefault();
      if (this.type === 'submit') {
        // Submitter is null because the button can't be passed from the shadow DOM https://github.com/WICG/webcomponents/issues/814
        this.internals?.form.requestSubmit();
      } else if (this.type === 'reset') {
        this.internals?.form.reset();
      }
    }
  }

  @Watch('value')
  public onValueChange(newValue: string): void {
    if (this.form) {
      this.internals?.setFormValue(newValue);
    }
  }

  public connectedCallback(): void {
    this.initialLoading = this.loading;
  }

  public componentWillLoad(): void {
    if (this.form) {
      this.internals?.setFormValue(this.value);
    }
    this.initialLoading = this.loading;
  }

  public componentWillUpdate(): void {
    if (this.loading) {
      this.initialLoading = true;
    }
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public componentDidLoad(): void {
    if (!this.form) {
      improveButtonHandlingForCustomElement(
        this.host,
        () => this.type,
        () => this.isDisabledOrLoading,
        () => this.name,
        () => this.value
      );
    }
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    warnIfIsLoadingAndIconIsNone(this.host, this.loading, this.icon, this.iconSource);

    const alignLabelDeprecationMap: Record<
      ButtonPureAlignLabelDeprecated,
      Exclude<ButtonPureAlignLabel, ButtonPureAlignLabelDeprecated>
    > = {
      left: 'start',
      right: 'end',
    };
    warnIfDeprecatedPropValueIsUsed<typeof ButtonPure, ButtonPureAlignLabelDeprecated, ButtonPureAlignLabel>(
      this,
      'alignLabel',
      alignLabelDeprecationMap
    );

    attachComponentCss(
      this.host,
      getComponentCss,
      this.icon,
      this.iconSource,
      this.active,
      this.loading,
      this.isDisabledOrLoading,
      this.stretch,
      this.size,
      this.hideLabel,
      this.alignLabel,
      this.underline,
      this.theme
    );

    const hasIcon = hasVisibleIcon(this.icon, this.iconSource);

    const iconProps = {
      class: 'icon',
      size: 'inherit',
      theme: this.theme,
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <button
          {...getButtonPureAriaAttributes(this.disabled, this.loading, this.aria)}
          class="root"
          type={this.type}
          name={this.name}
          value={this.value}
          aria-describedby={this.loading ? loadingId : undefined}
        >
          {this.loading ? (
            <PrefixedTagNames.pSpinner {...iconProps} aria-hidden="true" />
          ) : (
            hasIcon && (
              <PrefixedTagNames.pIcon
                {...iconProps}
                name={this.icon}
                source={this.iconSource}
                color={this.isDisabledOrLoading ? 'state-disabled' : 'primary'}
                theme={this.theme}
                aria-hidden="true"
              />
            )
          )}
          <span class="label">
            <slot />
          </span>
        </button>
        <LoadingMessage loading={this.loading} initialLoading={this.initialLoading} />
      </Host>
    );
  }
}
