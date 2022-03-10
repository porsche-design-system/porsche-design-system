import { Host, Component, Element, h, JSX, Prop, Listen } from '@stencil/core';
import {
  calcLineHeightForElement,
  getPrefixedTagNames,
  hasVisibleIcon,
  hasSlottedSubline,
  improveButtonHandlingForCustomElement,
  isDisabledOrLoading,
  transitionListener,
  attachComponentCss,
  parseAndGetAriaAttributes,
  warnIfParentIsPTextAndIconIsNone,
} from '../../../utils';
import type {
  SelectedAriaAttributes,
  AlignLabel,
  BreakpointCustomizable,
  ButtonType,
  LinkButtonPureIconName,
  TextSize,
  TextWeight,
  ThemeExtendedElectricDark,
} from '../../../types';
import { isSizeInherit } from '../../basic/typography/text/text-utils';
import { warnIfIsLoadingAndIconIsNone } from './button-pure-utils';
import { getComponentCss } from './button-pure-styles';
import type { ButtonAriaAttributes } from '../button/button-utils';
import { BUTTON_ARIA_ATTRIBUTES } from '../button/button-utils';

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

  /** A custom URL path to a custom icon. */
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
        const size = `${calcLineHeightForElement(this.buttonTag)}em`;
        this.iconTag.style.width = size;
        this.iconTag.style.height = size;
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
          class="root"
          type={this.type}
          disabled={this.disabled}
          tabindex={this.tabbable ? 0 : -1}
          ref={(el) => (this.buttonTag = el)}
          aria-busy={this.loading ? 'true' : null}
          aria-describedby={hasSubline ? 'subline' : null}
          {...parseAndGetAriaAttributes(this.aria, BUTTON_ARIA_ATTRIBUTES)}
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
          <PrefixedTagNames.pText class="label" tag="span" color="inherit" size="inherit" weight={this.weight}>
            <slot />
          </PrefixedTagNames.pText>
        </button>
        {hasSubline && (
          <PrefixedTagNames.pText id="subline" class="subline" tag="div" color="inherit" size="inherit">
            <slot name="subline" />
          </PrefixedTagNames.pText>
        )}
      </Host>
    );
  }
}
