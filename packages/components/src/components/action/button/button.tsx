import type {
  SelectedAriaAttributes,
  BreakpointCustomizable,
  ButtonType,
  ButtonVariant,
  IconName,
  ThemeExtendedElectric,
} from '../../../types';
import type { ButtonAriaAttributes } from '../../../utils';
import { JSX, Component, Prop, h, Element, Listen } from '@stencil/core';
import {
  attachComponentCss,
  getPrefixedTagNames,
  improveButtonHandlingForCustomElement,
  isDisabledOrLoading,
} from '../../../utils';
import { getButtonAriaAttributes } from './button-utils';
import { getComponentCss } from './button-styles';
import * as PropTypes from 'prop-types';
import type { BreakpointKey } from '../../../types';
import { AllowedTypes, CustomComponentPropTypes, validateProps } from '../../../utils/validation/validateProps';

type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type Class<T> = Function & {
  new (...args: any[]): T;
};

type ComponentPropTypes<T extends Class<any>> = Required<{
  [Property in keyof Omit<
    InstanceType<T>,
    'host' | FunctionPropertyNames<InstanceType<T>>
  >]: PropTypes.Requireable<any>;
}>;

const propTypes: ComponentPropTypes<typeof Button> = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  tabbable: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  icon: PropTypes.string,
  theme: PropTypes.string,
  iconSource: PropTypes.string,
  hideLabel: PropTypes.oneOfType([
    PropTypes.shape<{ [key in BreakpointKey]: PropTypes.Validator<boolean> }>({
      base: PropTypes.bool.isRequired,
      xs: PropTypes.bool,
      s: PropTypes.bool,
      m: PropTypes.bool,
      l: PropTypes.bool,
      xl: PropTypes.bool,
    }),
    PropTypes.bool,
    PropTypes.string,
  ]),
  aria: PropTypes.oneOfType([
    PropTypes.shape<{ [key in ButtonAriaAttributes]: PropTypes.Validator<string | boolean> }>({
      'aria-label': PropTypes.string,
      'aria-expanded': PropTypes.bool,
      'aria-haspopup': PropTypes.bool,
      'aria-pressed': PropTypes.bool,
    }),
    PropTypes.string,
  ]),
};

const customPropTypes: CustomComponentPropTypes<typeof Button> = {
  type: AllowedTypes.oneOf<ButtonType>(['button', 'submit', 'reset']),
  variant: AllowedTypes.oneOf<ButtonVariant>(['primary', 'secondary', 'tertiary']),
  tabbable: AllowedTypes.boolean,
  disabled: AllowedTypes.boolean,
  loading: AllowedTypes.boolean,
  icon: AllowedTypes.string,
  theme: AllowedTypes.oneOf<ThemeExtendedElectric>(['light', 'dark', 'light-electric']),
  iconSource: AllowedTypes.string,
  hideLabel: AllowedTypes.breakpointCustomizable('boolean'),
  // hideLabel: PropTypes.oneOfType([
  //   PropTypes.shape<{ [key in BreakpointKey]: PropTypes.Validator<boolean> }>({
  //     base: PropTypes.bool.isRequired,
  //     xs: PropTypes.bool,
  //     s: PropTypes.bool,
  //     m: PropTypes.bool,
  //     l: PropTypes.bool,
  //     xl: PropTypes.bool,
  //   }),
  //   PropTypes.bool,
  //   PropTypes.string,
  // ]),
  aria: AllowedTypes.string,
  // aria: PropTypes.oneOfType([
  //   PropTypes.shape<{ [key in ButtonAriaAttributes]: PropTypes.Validator<string | boolean> }>({
  //     'aria-label': PropTypes.string,
  //     'aria-expanded': PropTypes.bool,
  //     'aria-haspopup': PropTypes.bool,
  //     'aria-pressed': PropTypes.bool,
  //   }),
  //   PropTypes.string,
  // ]),
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

  public componentWillLoad(): void {
    console.log('this.loading', this.loading);
    PropTypes.checkPropTypes(propTypes, this, 'property', 'p-button');
    validateProps(this, customPropTypes, 'p-button');
  }

  public componentDidLoad(): void {
    improveButtonHandlingForCustomElement(
      this.host,
      () => this.type,
      () => this.isDisabledOrLoading
    );
  }

  public componentWillRender(): void {
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
