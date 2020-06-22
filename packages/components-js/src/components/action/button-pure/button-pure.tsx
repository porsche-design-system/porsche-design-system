import { Component, Element, h, JSX, Listen, Prop } from '@stencil/core';
import cx from 'classnames';
import {
  BreakpointCustomizable,
  calcLineHeightForElement,
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
  @Element() public element!: HTMLElement;

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

  public componentDidLoad(): void {
    improveFocusHandlingForCustomElement(this.element);
    improveButtonHandlingForCustomElement(
      this.element,
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

    return (
      <button
        class={buttonPureClasses}
        type={this.type}
        disabled={this.isDisabled()}
        tabindex={this.tabbable ? 0 : -1}
        ref={(el) => (this.buttonTag = el as HTMLElement)}
        aria-busy={this.loading && 'true'}
      >
        {this.loading ? (
          <p-spinner
            class={iconClasses}
            size="inherit"
            theme={this.theme}
            ref={(el) => (this.iconTag = el as HTMLElement)}
          />
        ) : (
          <p-icon
            class={iconClasses}
            color="inherit"
            size="inherit"
            name={this.icon}
            source={this.iconSource}
            ref={(el) => (this.iconTag = el as HTMLElement)}
            aria-hidden="true"
          />
        )}
        <p-text class={labelClasses} tag="span" color="inherit" size="inherit" weight={this.weight}>
          <slot />
        </p-text>
      </button>
    );
  }

  // this stops click events when button is disabled
  @Listen('click', { capture: true })
  public handleOnClick(e) {
    if (this.isDisabled()) {
      e.stopPropagation();
    }
  }

  private isDisabled(): boolean {
    return this.disabled || this.loading;
  }
}
