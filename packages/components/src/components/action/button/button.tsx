import { JSX, Component, Prop, h, Element, Listen } from '@stencil/core';
import {
  getPrefixedTagNames,
  improveButtonHandlingForCustomElement,
  improveFocusHandlingForCustomElement,
  isDark,
  isDisabledOrLoading,
  mapBreakpointPropToClasses,
  parseAndGetAriaAttributes,
} from '../../../utils';
import type {
  SelectedAriaAttributes,
  BreakpointCustomizable,
  ButtonType,
  ButtonVariant,
  IconName,
  Theme,
} from '../../../types';
import type { ButtonAriaAttributes } from './button-utils';
import { BUTTON_ARIA_ATTRIBUTES } from './button-utils';

@Component({
  tag: 'p-button',
  styleUrl: 'button.scss',
  shadow: true,
})
export class Button {
  @Element() public host!: HTMLElement;

  /** To remove the element from tab order. */
  @Prop() public tabbable?: boolean = true;

  /** Specifies the type of the button. */
  @Prop() public type?: ButtonType = 'submit';

  /** Disables the button. No events will be triggered while disabled state is active. */
  @Prop() public disabled?: boolean = false;

  /** Disables the button and shows a loading indicator. No events will be triggered while loading state is active. */
  @Prop() public loading?: boolean = false;

  /** The style variant of the button. */
  @Prop() public variant?: ButtonVariant = 'secondary';

  /** The icon shown. */
  @Prop() public icon?: IconName = 'arrow-head-right';

  /** A custom URL path to a custom icon. */
  @Prop() public iconSource?: string;

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Adapts the button color depending on the theme. */
  @Prop() public theme?: Exclude<Theme, 'light-electric'> = 'light';

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<ButtonAriaAttributes>;

  @Listen('click', { capture: true })
  public onClick(e: MouseEvent): void {
    if (this.isDisabledOrLoading) {
      e.stopPropagation();
    }
  }

  public componentDidLoad(): void {
    improveFocusHandlingForCustomElement(this.host);
    improveButtonHandlingForCustomElement(
      this.host,
      () => this.type,
      () => this.isDisabledOrLoading
    );
  }

  public render(): JSX.Element {
    const rootClasses = {
      ['root']: true,
      ['root--loading']: this.loading,
      [`root--${this.variant}`]: this.variant !== 'secondary',
      ['root--theme-dark']: isDark(this.theme),
      ...mapBreakpointPropToClasses('root-', this.hideLabel, ['without-label', 'with-label']),
    };

    const iconProps = {
      class: 'icon',
      size: 'inherit',
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <button
        class={rootClasses}
        type={this.type}
        disabled={this.disabled}
        tabindex={this.tabbable ? 0 : -1}
        aria-busy={this.loading ? 'true' : null}
        {...parseAndGetAriaAttributes(this.aria, BUTTON_ARIA_ATTRIBUTES)}
      >
        {this.loading ? (
          <PrefixedTagNames.pSpinner
            {...iconProps}
            theme={this.variant === 'tertiary' ? this.theme : 'dark'}
            aria={{ 'aria-label': 'Loading state' }}
          />
        ) : (
          <PrefixedTagNames.pIcon
            {...iconProps}
            name={this.icon}
            source={this.iconSource}
            color="inherit"
            aria-hidden="true"
          />
        )}
        <PrefixedTagNames.pText class="label" tag="span" color="inherit">
          <slot />
        </PrefixedTagNames.pText>
      </button>
    );
  }

  private get isDisabledOrLoading(): boolean {
    return isDisabledOrLoading(this.disabled, this.loading);
  }
}
