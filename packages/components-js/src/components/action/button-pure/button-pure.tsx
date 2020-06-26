import { Host, Component, Element, h, JSX, Prop, Listen } from '@stencil/core';
import cx from 'classnames';
import {
  BreakpointCustomizable,
  calcLineHeightForElement, getPrefixedTagNames,
  mapBreakpointPropToPrefixedClasses,
  prefix,
  transitionListener
} from '../../../utils';
import { ButtonType, IconName, TextSize, TextWeight, Theme } from '../../../types';
import { improveFocusHandlingForCustomElement } from '../../../utils/focusHandling';
import { improveButtonHandlingForCustomElement } from '../../../utils/buttonHandling';

@Component({
  tag: 'p-button-pure',
  styleUrl: 'button-pure.scss',
  shadow: true
})
export class ButtonPure {
  @Element() public host!: HTMLElement;

  /** To remove the element from tab order. */
  @Prop() public tabbable?: boolean = true;

  /** Specifies the type of the button. */
  @Prop() public type?: ButtonType = 'button';

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
  private subline: HTMLElement;

  // this stops click events when button is disabled
  @Listen('click', { capture: true })
  public handleOnClick(e: MouseEvent): void {
    if (this.isDisabled()) {
      e.stopPropagation();
    }
  }
  public componentWillLoad(): void {
    this.setSubline();
  }

  public componentDidLoad(): void {
    improveFocusHandlingForCustomElement(this.host);
    improveButtonHandlingForCustomElement(
      this.host,
      () => this.type,
      () => this.isDisabled()
    );

    transitionListener(this.buttonTag, 'font-size', () => {
      const size = calcLineHeightForElement(this.buttonTag);
      this.iconTag.style.width = `${size}em`;
      this.iconTag.style.height = `${size}em`;
    });
  }

  public render(): JSX.Element {
    const buttonPureClasses = cx(
      prefix('button-pure'),
      mapBreakpointPropToPrefixedClasses('button-pure--size', this.size),
      prefix(`button-pure--theme-${this.theme}`)
    );

    const iconClasses = cx(prefix('button-pure__icon'));

    const labelClasses = cx(
      prefix('button-pure__label'),
      mapBreakpointPropToPrefixedClasses('button-pure__label-', this.hideLabel, ['hidden', 'visible'])
    );

    const sublineClasses = cx(
      prefix('button-pure__subline'),
      mapBreakpointPropToPrefixedClasses('button-pure__subline-', this.hideLabel, ['hidden', 'visible'])
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host, ['p-icon', 'p-text', 'p-spinner']);

    return (
      <Host>
        <button
          class={buttonPureClasses}
          type={this.type}
          disabled={this.isDisabled()}
          tabindex={this.tabbable ? 0 : -1}
          ref={(el) => (this.buttonTag = el as HTMLElement)}
          aria-busy={this.loading && 'true'}
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
        {this.subline && (
          <PrefixedTagNames.pText class={sublineClasses} color="inherit" size="inherit" tag="div">
            <slot name="subline" />
          </PrefixedTagNames.pText>
        )}
      </Host>
    );
  }

  private setSubline(): void {
    this.subline = this.host.querySelector('[slot="subline"]');
  }

  private isDisabled(): boolean {
    return this.disabled || this.loading;
  }
}
