import type {
  BreakpointCustomizable,
  ButtonType,
  ButtonVariant,
  IconName,
  SelectedAriaAttributes,
  ThemeExtendedElectric,
} from '../../../types';
import type { ButtonAriaAttributes, CustomComponentPropTypes } from '../../../utils';
import {
  AllowedTypes,
  attachComponentCss,
  BUTTON_ARIA_ATTRIBUTES,
  getPrefixedTagNames,
  improveButtonHandlingForCustomElement,
  isDisabledOrLoading,
  validateProps,
} from '../../../utils';
import { Component, Element, h, JSX, Listen, Prop } from '@stencil/core';
import { getButtonAriaAttributes } from './button-utils';
import { getComponentCss } from './button-styles';

const propTypes: CustomComponentPropTypes<typeof Button> = {
  type: AllowedTypes.oneOf<ButtonType>(['button', 'submit', 'reset']),
  variant: AllowedTypes.oneOf<ButtonVariant>(['primary', 'secondary', 'tertiary']),
  tabbable: AllowedTypes.boolean,
  disabled: AllowedTypes.boolean,
  loading: AllowedTypes.boolean,
  icon: AllowedTypes.string,
  theme: AllowedTypes.oneOf<ThemeExtendedElectric>(['light', 'dark', 'light-electric']),
  iconSource: AllowedTypes.string,
  hideLabel: AllowedTypes.breakpointCustomizable('boolean'),
  aria: AllowedTypes.aria<ButtonAriaAttributes>(BUTTON_ARIA_ATTRIBUTES),
};

@Component({
  tag: 'p-button',
  shadow: { delegatesFocus: true },
})
export class Button {
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

  /** The style variant of the button. */
  @Prop() public variant?: ButtonVariant = 'secondary';

  /** The icon shown. */
  @Prop() public icon?: IconName = 'arrow-head-right';

  /** A URL path to a custom icon. */
  @Prop() public iconSource?: string;

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Adapts the button color depending on the theme. */
  @Prop() public theme?: ThemeExtendedElectric = 'light';

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<ButtonAriaAttributes>;

  private get isDisabledOrLoading(): boolean {
    return isDisabledOrLoading(this.disabled, this.loading);
  }

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

  public componentWillRender(): void {
    validateProps(this, propTypes, 'p-button');
    attachComponentCss(this.host, getComponentCss, this.variant, this.hideLabel, this.isDisabledOrLoading, this.theme);
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const iconProps = {
      class: 'icon',
      size: 'inherit',
    };

    return (
      <button
        {...getButtonAriaAttributes(this.disabled, this.loading, this.aria)}
        class="root"
        type={this.type}
        tabindex={this.tabbable ? 0 : -1}
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
        <span>
          <slot />
        </span>
      </button>
    );
  }
}
