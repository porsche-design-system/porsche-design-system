import {
  ALIGN_LABELS,
  AllowedTypes,
  attachComponentCss,
  BUTTON_ARIA_ATTRIBUTES,
  getPrefixedTagNames,
  hasVisibleIcon,
  improveButtonHandlingForCustomElement,
  isDisabledOrLoading,
  TEXT_SIZES,
  TEXT_WEIGHTS,
  THEMES,
  validateProps,
  warnIfParentIsPTextAndIconIsNone,
} from '../../utils';
import type {
  AlignLabel,
  BreakpointCustomizable,
  ButtonAriaAttributes,
  ButtonType,
  LinkButtonIconName,
  PropTypes,
  SelectedAriaAttributes,
  TextSize,
  TextWeight,
  Theme,
} from '../../types';
import { Component, Element, h, JSX, Listen, Prop } from '@stencil/core';
import { getButtonPureAriaAttributes, warnIfIsLoadingAndIconIsNone } from './button-pure-utils';
import { getComponentCss } from './button-pure-styles';

const propTypes: PropTypes<typeof ButtonPure> = {
  type: AllowedTypes.oneOf<ButtonType>(['button', 'submit', 'reset']),
  disabled: AllowedTypes.boolean,
  loading: AllowedTypes.boolean,
  size: AllowedTypes.breakpoint<TextSize>(TEXT_SIZES),
  weight: AllowedTypes.oneOf<TextWeight>(TEXT_WEIGHTS),
  icon: AllowedTypes.string,
  iconSource: AllowedTypes.string,
  active: AllowedTypes.boolean,
  hideLabel: AllowedTypes.breakpoint('boolean'),
  alignLabel: AllowedTypes.breakpoint<AlignLabel>(ALIGN_LABELS),
  stretch: AllowedTypes.breakpoint('boolean'),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  aria: AllowedTypes.aria<ButtonAriaAttributes>(BUTTON_ARIA_ATTRIBUTES),
};

@Component({
  tag: 'p-button-pure',
  shadow: { delegatesFocus: true },
})
export class ButtonPure {
  @Element() public host!: HTMLElement;

  /** Specifies the type of the button. */
  @Prop() public type?: ButtonType = 'submit';

  /** Disables the button. No events will be triggered while disabled state is active. */
  @Prop() public disabled?: boolean = false;

  /** Disables the button and shows a loading indicator. No events will be triggered while loading state is active. */
  @Prop() public loading?: boolean = false;

  /** Size of the button. */
  @Prop() public size?: BreakpointCustomizable<TextSize> = 'small';

  /**
   * The weight of the text (only has effect with visible label).
   * @deprecated since v3.0.0, will be removed with next major release
   */
  @Prop() public weight?: TextWeight = 'regular';

  /** The icon shown. */
  @Prop() public icon?: LinkButtonIconName = 'arrow-right';

  /** A URL path to a custom icon. */
  @Prop() public iconSource?: string;

  /** Display button in active state. */
  @Prop() public active?: boolean = false;

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Aligns the label. */
  @Prop() public alignLabel?: BreakpointCustomizable<AlignLabel> = 'right';

  /** Stretches the area between icon and label to max available space. */
  @Prop() public stretch?: BreakpointCustomizable<boolean> = false;

  /** Adapts the button color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<ButtonAriaAttributes>;

  private get isDisabledOrLoading(): boolean {
    return isDisabledOrLoading(this.disabled, this.loading);
  }

  // this stops click events when button is disabled
  @Listen('click', { capture: true })
  public onClick(e: MouseEvent): void {
    if (this.isDisabledOrLoading) {
      e.stopPropagation();
    }
  }

  public componentDidLoad(): void {
    improveButtonHandlingForCustomElement(
      this.host,
      () => this.type,
      () => this.isDisabledOrLoading
    );
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    warnIfIsLoadingAndIconIsNone(this.host, this.loading, this.icon, this.iconSource);
    warnIfParentIsPTextAndIconIsNone(this.host, this.icon, this.iconSource);
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
      <button {...getButtonPureAriaAttributes(this.disabled, this.loading, this.aria)} class="root" type={this.type}>
        {this.loading ? (
          <PrefixedTagNames.pSpinner aria={{ 'aria-label': 'Loading state' }} {...iconProps} />
        ) : (
          hasIcon && (
            <PrefixedTagNames.pIcon
              {...iconProps}
              color="inherit"
              name={this.icon}
              source={this.iconSource}
              aria-hidden="true"
            />
          )
        )}
        <span class="label">
          <slot />
        </span>
      </button>
    );
  }
}
