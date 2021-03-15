import { Host, Component, Element, h, JSX, Prop, Listen } from '@stencil/core';
import {
  calcLineHeightForElement,
  getPrefixedTagNames,
  hasNamedSlot,
  improveButtonHandlingForCustomElement,
  improveFocusHandlingForCustomElement,
  isDark,
  mapBreakpointPropToPrefixedClasses,
  prefix,
  transitionListener,
} from '../../../utils';
import type { BreakpointCustomizable, ButtonType, IconName, TextSize, TextWeight, Theme } from '../../../types';

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
  @Prop({ reflect: true }) public disabled?: boolean = false;

  /** Disables the button and shows a loading indicator. No events will be triggered while loading state is active. */
  @Prop() public loading?: boolean = false;

  /** Size of the button. */
  @Prop() public size?: BreakpointCustomizable<TextSize> = 'small';

  /** The weight of the text (only has effect with visible label). */
  @Prop() public weight?: TextWeight = 'regular';

  /** The icon shown. */
  @Prop() public icon?: IconName = 'arrow-head-right';

  /** A custom URL path to a custom icon. */
  @Prop() public iconSource?: string = undefined;

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Adapts the button color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  private buttonTag: HTMLElement;
  private iconTag: HTMLElement;

  // this stops click events when button is disabled
  @Listen('click', { capture: true })
  public handleOnClick(e: MouseEvent): void {
    if (this.isDisabled) {
      e.stopPropagation();
    }
  }

  public componentDidLoad(): void {
    improveFocusHandlingForCustomElement(this.host);
    improveButtonHandlingForCustomElement(
      this.host,
      () => this.type,
      () => this.isDisabled
    );

    transitionListener(this.buttonTag, 'font-size', () => {
      const size = calcLineHeightForElement(this.buttonTag);
      this.iconTag.style.width = `${size}em`;
      this.iconTag.style.height = `${size}em`;
    });
  }

  public render(): JSX.Element {
    const buttonPureClasses = {
      [prefix('button-pure')]: true,
      [prefix('button-pure--theme-dark')]: isDark(this.theme),
      ...mapBreakpointPropToPrefixedClasses('button-pure--size', this.size),
    };

    const iconClasses = prefix('button-pure__icon');

    const labelClasses = {
      [prefix('button-pure__label')]: true,
      ...mapBreakpointPropToPrefixedClasses('button-pure__label-', this.hideLabel, ['hidden', 'visible']),
    };

    const sublineClasses = {
      [prefix('button-pure__subline')]: true,
      ...mapBreakpointPropToPrefixedClasses('button-pure__subline-', this.hideLabel, ['hidden', 'visible']),
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <button
          class={buttonPureClasses}
          type={this.type}
          disabled={this.isDisabled}
          tabindex={this.tabbable ? 0 : -1}
          ref={(el) => (this.buttonTag = el as HTMLElement)}
          aria-busy={this.loading ? 'true' : null}
        >
          {this.loading ? (
            <PrefixedTagNames.pSpinner
              class={iconClasses}
              size="inherit"
              theme={this.theme}
              ref={(el) => (this.iconTag = el as HTMLElement)}
            />
          ) : (
            <PrefixedTagNames.pIcon
              class={iconClasses}
              color="inherit"
              size="inherit"
              name={this.icon}
              source={this.iconSource}
              ref={(el) => (this.iconTag = el as HTMLElement)}
              aria-hidden="true"
            />
          )}
          <PrefixedTagNames.pText class={labelClasses} tag="span" color="inherit" size="inherit" weight={this.weight}>
            <slot />
          </PrefixedTagNames.pText>
        </button>
        {hasNamedSlot(this.host, 'subline') && (
          <PrefixedTagNames.pText class={sublineClasses} tag="div" color="inherit" size="inherit">
            <slot name="subline" />
          </PrefixedTagNames.pText>
        )}
      </Host>
    );
  }

  private get isDisabled(): boolean {
    return this.disabled || this.loading;
  }
}
