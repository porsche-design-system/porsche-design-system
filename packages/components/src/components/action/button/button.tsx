import { JSX, Component, Prop, h, Element, Listen } from '@stencil/core';
import {
  BreakpointCustomizable,
  getPrefixedTagNames,
  improveButtonHandlingForCustomElement,
  improveFocusHandlingForCustomElement,
  mapBreakpointPropToPrefixedClasses,
  prefix
} from '../../../utils';
import { ButtonType, IconName, Theme } from '../../../types';

@Component({
  tag: 'p-button',
  styleUrl: 'button.scss',
  shadow: true
})
export class Button {
  @Element() public element!: HTMLElement;

  /** To remove the element from tab order. */
  @Prop() public tabbable?: boolean = true;

  /** Specifies the type of the button. */
  @Prop() public type?: ButtonType = 'button';

  /** Disables the button. No events will be triggered while disabled state is active. */
  @Prop({ reflect: true }) public disabled?: boolean = false;

  /** Disables the button and shows a loading indicator. No events will be triggered while loading state is active. */
  @Prop() public loading?: boolean = false;

  /** The style variant of the button. */
  @Prop() public variant?: 'primary' | 'secondary' | 'tertiary' = 'secondary';

  /** The icon shown. */
  @Prop() public icon?: IconName = 'arrow-head-right';

  /** A custom URL path to a custom icon. */
  @Prop() public iconSource?: string = undefined;

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Adapts the button color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  @Listen('click', { capture: true })
  public handleOnClick(e: MouseEvent): void {
    if (this.isDisabled()) {
      e.stopPropagation();
    }
  }

  public componentDidLoad(): void {
    improveFocusHandlingForCustomElement(this.element);
    improveButtonHandlingForCustomElement(
      this.element,
      () => this.type,
      () => this.isDisabled()
    );
  }

  public render(): JSX.Element {
    const buttonClasses = {
      [prefix('button')]: true,
      [prefix(`button--${this.variant}`)]: true,
      [prefix(`button--theme-${this.theme}`)]: true,
      ...mapBreakpointPropToPrefixedClasses('button-', this.hideLabel, ['without-label', 'with-label'])
    };
    const iconClasses = prefix('button__icon');
    const labelClasses = prefix('button__label');
    const PrefixedTagNames = getPrefixedTagNames(this.element, ['p-icon', 'p-spinner', 'p-text']);

    return (
      <button
        class={buttonClasses}
        type={this.type}
        disabled={this.isDisabled()}
        tabindex={this.tabbable ? 0 : -1}
        aria-busy={this.loading && 'true'}
      >
        {this.loading ? (
          <PrefixedTagNames.pSpinner
            class={iconClasses}
            size="inherit"
            theme={(this.variant === 'tertiary' && this.theme) || 'dark'}
          />
        ) : (
          <PrefixedTagNames.pIcon
            class={iconClasses}
            size="inherit"
            name={this.icon}
            source={this.iconSource}
            color="inherit"
            aria-hidden="true"
          />
        )}
        <PrefixedTagNames.pText class={labelClasses} tag="span" color="inherit">
          <slot />
        </PrefixedTagNames.pText>
      </button>
    );
  }

  private isDisabled(): boolean {
    return this.disabled || this.loading;
  }
}
