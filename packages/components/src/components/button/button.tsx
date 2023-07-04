import type {
  BreakpointCustomizable,
  ButtonAriaAttribute,
  ButtonType,
  ButtonVariant,
  PropTypes,
  SelectedAriaAttributes,
  Theme,
} from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  BUTTON_ARIA_ATTRIBUTES,
  BUTTON_TYPES,
  getPrefixedTagNames,
  hasVisibleIcon,
  improveButtonHandlingForCustomElement,
  hasPropValueChanged,
  isDisabledOrLoading,
  LINK_BUTTON_VARIANTS,
  THEMES,
  validateProps,
  getLinkButtonThemeForIcon,
} from '../../utils';
import { Component, Element, h, type JSX, Listen, Prop } from '@stencil/core';
import { getButtonAriaAttributes } from './button-utils';
import type { ButtonIcon } from './button-utils';
import { getComponentCss } from './button-styles';

const propTypes: PropTypes<typeof Button> = {
  type: AllowedTypes.oneOf<ButtonType>(BUTTON_TYPES),
  variant: AllowedTypes.oneOf<ButtonVariant>(LINK_BUTTON_VARIANTS),
  disabled: AllowedTypes.boolean,
  loading: AllowedTypes.boolean,
  icon: AllowedTypes.string,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  iconSource: AllowedTypes.string,
  hideLabel: AllowedTypes.breakpoint('boolean'),
  aria: AllowedTypes.aria<ButtonAriaAttribute>(BUTTON_ARIA_ATTRIBUTES),
};

@Component({
  tag: 'p-button',
  shadow: { delegatesFocus: true },
})
export class Button {
  @Element() public host!: HTMLElement;

  /** Specifies the type of the button. */
  @Prop() public type?: ButtonType = 'submit';

  /** Disables the button. No events will be triggered while disabled state is active. */
  @Prop() public disabled?: boolean = false;

  /** Disables the button and shows a loading indicator. No events will be triggered while loading state is active. */
  @Prop() public loading?: boolean = false;

  /** The style variant of the button. */
  @Prop() public variant?: ButtonVariant = 'primary';

  /** The icon shown. By choosing 'none', no icon is displayed. */
  @Prop() public icon?: ButtonIcon = 'none';

  /** A URL path to a custom icon. */
  @Prop() public iconSource?: string;

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Adapts the button color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<ButtonAriaAttribute>;

  @Listen('click', { capture: true })
  public onClick(e: MouseEvent): void {
    if (isDisabledOrLoading(this.disabled, this.loading)) {
      e.stopPropagation();
    }
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public componentDidLoad(): void {
    improveButtonHandlingForCustomElement(
      this.host,
      () => this.type,
      () => isDisabledOrLoading(this.disabled, this.loading)
    );
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.icon,
      this.iconSource,
      this.variant,
      this.hideLabel,
      this.disabled,
      this.loading,
      this.theme
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <button {...getButtonAriaAttributes(this.disabled, this.loading, this.aria)} class="root" type={this.type}>
        {this.loading && (
          <PrefixedTagNames.pSpinner
            class="spinner"
            size="inherit"
            theme={getLinkButtonThemeForIcon(this.variant, this.theme)}
            aria={{ 'aria-label': 'Loading state:' }}
          />
        )}
        {hasVisibleIcon(this.icon, this.iconSource) && (
          <PrefixedTagNames.pIcon
            class="icon"
            size="inherit"
            name={this.iconSource ? undefined : this.icon}
            source={this.iconSource}
            color={this.disabled ? (this.variant === 'primary' ? 'contrast-high' : 'state-disabled') : 'primary'}
            theme={!this.disabled ? getLinkButtonThemeForIcon(this.variant, this.theme) : this.theme}
            aria-hidden="true"
          />
        )}
        <span class="label">
          <slot />
        </span>
      </button>
    );
  }
}
