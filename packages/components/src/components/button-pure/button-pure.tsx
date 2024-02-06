import {
  ALIGN_LABELS,
  AllowedTypes,
  attachComponentCss,
  BUTTON_ARIA_ATTRIBUTES,
  BUTTON_TYPES,
  getPrefixedTagNames,
  hasVisibleIcon,
  improveButtonHandlingForCustomElement,
  isDisabledOrLoading,
  TEXT_SIZES,
  TYPOGRAPHY_TEXT_WEIGHTS,
  THEMES,
  validateProps,
  warnIfDeprecatedPropValueIsUsed,
  warnIfParentIsPTextAndIconIsNone,
} from '../../utils';
import type { BreakpointCustomizable, PropTypes, SelectedAriaAttributes, Theme } from '../../types';
import { Component, Element, h, Host, type JSX, Listen, Prop } from '@stencil/core';
import type {
  ButtonPureAlignLabel,
  ButtonPureAlignLabelDeprecated,
  ButtonPureAriaAttribute,
  ButtonPureIcon,
  ButtonPureSize,
  ButtonPureType,
  ButtonPureWeight,
} from './button-pure-utils';
import { getButtonPureAriaAttributes, warnIfIsLoadingAndIconIsNone } from './button-pure-utils';
import { getComponentCss } from './button-pure-styles';
import { LoadingMessage, loadingId } from '../common/loading-message/loading-message';
import { use } from 'typescript-mix';
import { LoadingMixin } from '../../abstract-components';

// a bit messy now but should be solvable maybe via private/public check or so
const propTypes: Omit<PropTypes<typeof ButtonPure>, 'this' | 'initialLoading'> = {
  type: AllowedTypes.oneOf<ButtonPureType>(BUTTON_TYPES),
  name: AllowedTypes.string,
  value: AllowedTypes.string,
  disabled: AllowedTypes.boolean,
  loading: AllowedTypes.boolean,
  size: AllowedTypes.breakpoint<ButtonPureSize>(TEXT_SIZES),
  weight: AllowedTypes.oneOf<ButtonPureWeight>(TYPOGRAPHY_TEXT_WEIGHTS),
  icon: AllowedTypes.string,
  iconSource: AllowedTypes.string,
  active: AllowedTypes.boolean,
  hideLabel: AllowedTypes.breakpoint('boolean'),
  alignLabel: AllowedTypes.breakpoint<ButtonPureAlignLabel>(ALIGN_LABELS),
  stretch: AllowedTypes.breakpoint('boolean'),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  aria: AllowedTypes.aria<ButtonPureAriaAttribute>(BUTTON_ARIA_ATTRIBUTES),
};

// trick typing with interface inheritance and declaration merging
export interface ButtonPure extends Partial<LoadingMixin> {}

@Component({
  tag: 'p-button-pure',
  shadow: { delegatesFocus: true },
})
export class ButtonPure {
  @Element() public host!: HTMLElement;

  /** Specifies the type of the button. */
  @Prop() public type?: ButtonPureType = 'submit';

  /** The name of the button, submitted as a pair with the button's value as part of the form data, when that button is used to submit the form. */
  @Prop() public name?: string;

  /** Defines the value associated with the button's name when it's submitted with the form data. This value is passed to the server in params when the form is submitted using this button. */
  @Prop() public value?: string;

  /** Disables the button. No events will be triggered while disabled state is active. */
  @Prop() public disabled?: boolean = false;

  // @Prop decorator has to be used here for reactivity
  /** Disables the button and shows a loading indicator. No events will be triggered while loading state is active. */
  @Prop() public loading?: boolean = false;

  /** Size of the button. */
  @Prop() public size?: BreakpointCustomizable<ButtonPureSize> = 'small';

  /**
   * The weight of the text (only has effect with visible label).
   * @deprecated since v3.0.0, will be removed with next major release
   */
  @Prop() public weight?: ButtonPureWeight = 'regular';

  /** The icon shown. */
  @Prop() public icon?: ButtonPureIcon = 'arrow-right';

  /** A URL path to a custom icon. */
  @Prop() public iconSource?: string;

  /** Display button in active state. */
  @Prop() public active?: boolean = false;

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Aligns the label. */
  @Prop() public alignLabel?: BreakpointCustomizable<ButtonPureAlignLabel> = 'end';

  /** Stretches the area between icon and label to max available space. */
  @Prop() public stretch?: BreakpointCustomizable<boolean> = false;

  /** Adapts the button color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<ButtonPureAriaAttribute>;

  // this is where the magic happens
  @use(LoadingMixin) this: LoadingMixin;

  private get isDisabledOrLoading(): boolean {
    return isDisabledOrLoading(this.disabled, this.loading);
  }

  // this stops click events when button is disabled
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
      () => this.isDisabledOrLoading,
      () => this.name,
      () => this.value
    );
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    warnIfIsLoadingAndIconIsNone(this.host, this.loading, this.icon, this.iconSource);
    warnIfParentIsPTextAndIconIsNone(this.host, this.icon, this.iconSource);

    const alignLabelDeprecationMap: Record<
      ButtonPureAlignLabelDeprecated,
      Exclude<ButtonPureAlignLabel, ButtonPureAlignLabelDeprecated>
    > = {
      left: 'start',
      right: 'end',
    };
    warnIfDeprecatedPropValueIsUsed<typeof ButtonPure, ButtonPureAlignLabelDeprecated, ButtonPureAlignLabel>(
      this,
      'alignLabel',
      alignLabelDeprecationMap
    );

    attachComponentCss(
      this.host,
      getComponentCss,
      this.icon,
      this.iconSource,
      this.active,
      this.loading,
      this.isDisabledOrLoading,
      this.stretch,
      this.size,
      this.hideLabel,
      this.alignLabel,
      this.theme
    );

    const hasIcon = hasVisibleIcon(this.icon, this.iconSource);

    const iconProps = {
      class: 'icon',
      size: 'inherit',
      theme: this.theme,
      'aria-hidden': 'true',
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <button
          class="root"
          type={this.type}
          name={this.name}
          value={this.value}
          {...getButtonPureAriaAttributes(this.disabled, this.loading, this.aria)}
          aria-describedby={this.loading ? loadingId : undefined}
        >
          {/* TODO: different from p-button where there is no conditional rendering */}
          {this.loading ? (
            <PrefixedTagNames.pSpinner {...iconProps} />
          ) : (
            hasIcon && (
              <PrefixedTagNames.pIcon
                {...iconProps}
                name={this.icon}
                source={this.iconSource}
                color={this.isDisabledOrLoading ? 'state-disabled' : 'primary'}
              />
            )
          )}
          <span class="label">
            <slot />
          </span>
        </button>
        <LoadingMessage loading={this.loading} initialLoading={this.initialLoading} />
      </Host>
    );
  }
}
