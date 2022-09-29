import {
  ALIGN_LABELS,
  AllowedTypes,
  attachComponentCss,
  BUTTON_ARIA_ATTRIBUTES,
  calcLineHeightForElement,
  getPrefixedTagNames,
  hasSlottedSubline,
  hasVisibleIcon,
  improveButtonHandlingForCustomElement,
  isDisabledOrLoading,
  isSizeInherit,
  TEXT_SIZES,
  TEXT_WEIGHTS,
  THEMES_EXTENDED_ELECTRIC_DARK,
  transitionListener,
  validateProps,
  warnIfParentIsPTextAndIconIsNone,
} from '../../../utils';
import type {
  AlignLabel,
  BreakpointCustomizable,
  ButtonAriaAttributes,
  ButtonType,
  LinkButtonPureIconName,
  PropTypes,
  SelectedAriaAttributes,
  TextSize,
  TextWeight,
  ThemeExtendedElectricDark,
} from '../../../types';
import { Component, Element, h, Host, JSX, Listen, Prop } from '@stencil/core';
import { getButtonAriaAttributes, warnIfIsLoadingAndIconIsNone } from './button-pure-utils';
import { getComponentCss } from './button-pure-styles';

const propTypes: PropTypes<typeof ButtonPure> = {
  tabbable: AllowedTypes.boolean,
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
  theme: AllowedTypes.oneOf<ThemeExtendedElectricDark>(THEMES_EXTENDED_ELECTRIC_DARK),
  aria: AllowedTypes.aria<ButtonAriaAttributes>(BUTTON_ARIA_ATTRIBUTES),
};

@Component({
  tag: 'p-button-pure',
  shadow: { delegatesFocus: true },
})
export class ButtonPure {
  @Element() public host!: HTMLElement;

  /** To remove the element from tab order.
   * @deprecated since v2.8.0, use `tabindex="-1"` instead
   */
  @Prop() public tabbable?: boolean = true;

  /** Specifies the type of the button. */
  @Prop() public type?: ButtonType = 'submit';

  /** Disables the button. No events will be triggered while disabled state is active. */
  @Prop() public disabled?: boolean = false;

  /** Disables the button and shows a loading indicator. No events will be triggered while loading state is active. */
  @Prop() public loading?: boolean = false;

  /** Size of the button. */
  @Prop() public size?: BreakpointCustomizable<TextSize> = 'small';

  /** The weight of the text (only has effect with visible label). */
  @Prop() public weight?: TextWeight = 'regular';

  /** The icon shown. */
  @Prop() public icon?: LinkButtonPureIconName = 'arrow-head-right';

  /** A URL path to a custom icon. */
  @Prop() public iconSource?: string;

  /** Display button in active state. */
  @Prop() public active?: boolean = false;

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Aligns the label. */
  @Prop() public alignLabel?: AlignLabel = 'right';

  /** Stretches the area between icon and label to max available space. */
  @Prop() public stretch?: BreakpointCustomizable<boolean> = false;

  /** Adapts the button color depending on the theme. */
  @Prop() public theme?: ThemeExtendedElectricDark = 'light';

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<ButtonAriaAttributes>;

  private buttonTag: HTMLElement;
  private iconTag: HTMLElement;
  private labelTag: HTMLElement;
  private sublineTag: HTMLElement;

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

  public componentWillRender(): void {
    validateProps(this, propTypes);
    warnIfIsLoadingAndIconIsNone(this.host, this.loading, this.icon);
    warnIfParentIsPTextAndIconIsNone(this.host, this.icon);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.icon,
      this.active,
      this.isDisabledOrLoading,
      this.stretch,
      this.size,
      this.weight,
      this.hideLabel,
      this.alignLabel,
      hasSlottedSubline(this.host),
      this.theme
    );
  }

  public componentDidLoad(): void {
    improveButtonHandlingForCustomElement(
      this.host,
      () => this.type,
      () => this.isDisabledOrLoading
    );

    if (isSizeInherit(this.size)) {
      transitionListener(this.buttonTag, 'font-size', () => {
        const lineHeight = `${calcLineHeightForElement(this.buttonTag)}`;
        this.labelTag.style.lineHeight = lineHeight;

        if (this.sublineTag) {
          this.sublineTag.style.lineHeight = lineHeight;
        }

        if (hasVisibleIcon(this.icon)) {
          const size = `${lineHeight}em`;
          this.iconTag.style.width = size;
          this.iconTag.style.height = size;
        }
      });
    }
  }

  public render(): JSX.Element {
    const hasIcon = hasVisibleIcon(this.icon);
    const hasSubline = hasSlottedSubline(this.host);

    const iconProps = {
      class: 'icon',
      size: 'inherit',
      theme: this.theme,
      ref: (el: HTMLElement) => (this.iconTag = el),
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <button
          {...getButtonAriaAttributes(this.disabled, this.loading, hasSubline, this.aria)}
          class="root"
          type={this.type}
          tabindex={this.tabbable ? this.host.getAttribute('tabindex') : -1}
          ref={(el) => (this.buttonTag = el)}
        >
          {hasIcon &&
            (this.loading ? (
              <PrefixedTagNames.pSpinner aria={{ 'aria-label': 'Loading state' }} {...iconProps} />
            ) : (
              <PrefixedTagNames.pIcon
                {...iconProps}
                color="inherit"
                name={this.icon}
                source={this.iconSource}
                aria-hidden="true"
              />
            ))}
          <span class="label" ref={(el) => (this.labelTag = el)}>
            <slot />
          </span>
        </button>
        {hasSubline && (
          <div id="subline" class="subline" ref={(el) => (this.sublineTag = el)}>
            <slot name="subline" />
          </div>
        )}
      </Host>
    );
  }
}
