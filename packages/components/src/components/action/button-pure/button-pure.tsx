import { Host, Component, Element, h, JSX, Prop, Listen } from '@stencil/core';
import {
  calcLineHeightForElement,
  getPrefixedTagNames,
  hasVisibleIcon,
  hasSlottedSubline,
  improveButtonHandlingForCustomElement,
  improveFocusHandlingForCustomElement,
  isDark,
  isDisabledOrLoading,
  mapBreakpointPropToClasses,
  transitionListener,
  attachComponentCss,
  parseAndGetAriaAttributes,
  isLightElectric,
} from '../../../utils';
import type {
  SelectedAriaAttributes,
  AlignLabel,
  BreakpointCustomizable,
  ButtonType,
  LinkButtonPureIconName,
  TextSize,
  TextWeight,
  ThemeExtendedElectric,
} from '../../../types';
import { isSizeInherit } from '../../basic/typography/text/text-utils';
import { warnIfIsLoadingAndIconIsNone } from './button-pure-utils';
import { getComponentCss } from './button-pure-styles';
import type { ButtonAriaAttributes } from '../button/button-utils';
import { BUTTON_ARIA_ATTRIBUTES } from '../button/button-utils';

@Component({
  tag: 'p-button-pure',
  styleUrl: 'button-pure.scss',
  shadow: true,
})
export class ButtonPure {
  @Element() public host!: HTMLElement;

  /** To remove the element from tab order. */
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
  @Prop() public theme?: ThemeExtendedElectric = 'light';

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<ButtonAriaAttributes>;

  private buttonTag: HTMLElement;
  private iconTag: HTMLElement;

  // this stops click events when button is disabled
  @Listen('click', { capture: true })
  public onClick(e: MouseEvent): void {
    if (this.isDisabledOrLoading) {
      e.stopPropagation();
    }
  }

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, hasSlottedSubline(this.host) ? false : this.stretch);
    warnIfIsLoadingAndIconIsNone(this.host, this.loading, this.icon);
  }

  public componentDidLoad(): void {
    improveFocusHandlingForCustomElement(this.host);
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

    const rootClasses = {
      ['root']: true,
      ['root--loading']: this.loading && hasIcon,
      ['root--theme-dark']: isDark(this.theme),
      ['root--theme-light-electric']: isLightElectric(this.theme),
      ['root--active']: this.active,
      ['root--with-icon']: hasIcon,
      ...mapBreakpointPropToClasses('root--size', this.size),
      ...(!hasSubline && {
        ...mapBreakpointPropToClasses('root-', this.stretch, ['stretch-on', 'stretch-off']),
        ...mapBreakpointPropToClasses('root--label-align', this.alignLabel),
      }),
      ...(hasIcon && mapBreakpointPropToClasses('root-', this.hideLabel, ['without-label', 'with-label'])),
    };

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
          class={rootClasses}
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

  private get isDisabledOrLoading(): boolean {
    return isDisabledOrLoading(this.disabled, this.loading);
  }
}
