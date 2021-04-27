import { Host, Component, Element, h, JSX, Prop, Listen } from '@stencil/core';
import {
  calcLineHeightForElement,
  getPrefixedTagNames,
  hasNamedSlot,
  improveButtonHandlingForCustomElement,
  improveFocusHandlingForCustomElement,
  isDark,
  mapBreakpointPropToClasses,
  transitionListener,
} from '../../../utils';
import type { BreakpointCustomizable, ButtonType, IconName, TextSize, TextWeight, Theme } from '../../../types';
import { isSizeInherit } from '../../basic/typography/text/text-utils';
import { isDisabledOrLoading } from '../switch/switch-utils';

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
    if (isDisabledOrLoading(this.disabled, this.loading)) {
      e.stopPropagation();
    }
  }

  public componentDidLoad(): void {
    improveFocusHandlingForCustomElement(this.host);
    improveButtonHandlingForCustomElement(
      this.host,
      () => this.type,
      () => isDisabledOrLoading(this.disabled, this.loading)
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
    const buttonPureClasses = {
      ['root']: true,
      ['root--theme-dark']: isDark(this.theme),
      ...mapBreakpointPropToClasses('root--size', this.size),
      ...mapBreakpointPropToClasses('root-', this.hideLabel, ['without-label', 'with-label']),
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
          class={buttonPureClasses}
          type={this.type}
          disabled={isDisabledOrLoading(this.disabled, this.loading)}
          tabindex={this.tabbable ? 0 : -1}
          ref={(el) => (this.buttonTag = el)}
          aria-busy={this.loading ? 'true' : null}
        >
          {this.loading ? (
            <PrefixedTagNames.pSpinner {...iconProps} />
          ) : (
            <PrefixedTagNames.pIcon
              {...iconProps}
              color="inherit"
              name={this.icon}
              source={this.iconSource}
              aria-hidden="true"
            />
          )}
          <PrefixedTagNames.pText class="label" tag="span" color="inherit" size="inherit" weight={this.weight}>
            <slot />
          </PrefixedTagNames.pText>
        </button>
        {hasNamedSlot(this.host, 'subline') && (
          <PrefixedTagNames.pText class="subline" tag="div" color="inherit" size="inherit">
            <slot name="subline" />
          </PrefixedTagNames.pText>
        )}
      </Host>
    );
  }
}
