import { Component, Element, h, Prop } from '@stencil/core';
import {
  buildIconUrl,
  ICON_ARIA_ATTRIBUTES,
  ICON_COLORS,
  type IconAriaAttribute,
  type IconColor,
  type IconColorDeprecated,
  type IconSize,
} from './icon-utils';
import {
  AllowedTypes,
  attachComponentCss,
  hasPropValueChanged,
  parseAndGetAriaAttributes,
  TEXT_SIZES,
  THEMES,
  validateProps,
  warnIfDeprecatedPropIsUsed,
  warnIfDeprecatedPropValueIsUsed,
} from '../../utils';
import type { IconName, PropTypes, SelectedAriaAttributes, Theme } from '../../types';
import { getComponentCss } from './icon-styles';
import { ICONS_MANIFEST } from '@porsche-design-system/icons';

const propTypes: PropTypes<typeof Icon> = {
  name: AllowedTypes.oneOf<IconName>(Object.keys(ICONS_MANIFEST) as IconName[]),
  source: AllowedTypes.string,
  color: AllowedTypes.oneOf<IconColor>(ICON_COLORS),
  size: AllowedTypes.oneOf<IconSize>(TEXT_SIZES),
  lazy: AllowedTypes.boolean,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  aria: AllowedTypes.aria<IconAriaAttribute>(ICON_ARIA_ATTRIBUTES),
};

@Component({
  tag: 'p-icon',
  shadow: true,
})
export class Icon {
  @Element() public host!: HTMLElement;

  /** Specifies which icon to use. */
  @Prop() public name?: IconName = 'arrow-right';

  /** Specifies a whole icon path which can be used for custom icons. */
  @Prop() public source?: string;

  /** Basic color variations depending on theme property. */
  @Prop() public color?: IconColor = 'primary';

  /** The size of the icon. */
  @Prop() public size?: IconSize = 'small';

  /**
   * Has no effect anymore
   * @deprecated since v3.0.0, will be removed with next major release
   */
  @Prop() public lazy?: boolean;

  /** Adapts the color depending on the theme. Has no effect when "inherit" is set as color prop. */
  @Prop() public theme?: Theme = 'light';

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<IconAriaAttribute>;

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    warnIfDeprecatedPropIsUsed<typeof Icon>(this, 'lazy');
    const deprecationMap: Record<IconColorDeprecated, Exclude<IconColor, IconColorDeprecated>> = {
      brand: 'primary',
      default: 'primary',
      'neutral-contrast-low': 'contrast-low',
      'neutral-contrast-medium': 'contrast-medium',
      'neutral-contrast-high': 'contrast-high',
      'notification-neutral': 'notification-info',
    };
    warnIfDeprecatedPropValueIsUsed<typeof Icon, IconColorDeprecated, IconColor>(this, 'color', deprecationMap);
    attachComponentCss(
      this.host,
      getComponentCss,
      (deprecationMap[this.color] || this.color) as Exclude<IconColor, IconColorDeprecated>,
      this.size,
      this.theme
    );

    // TODO: wouldn't it be better to set alt attribute instead of aria-label?
    return (
      <img
        src={buildIconUrl(this.source || this.name)}
        {...parseAndGetAriaAttributes(this.aria)}
        {...(!this.source && { width: 24, height: 24 })}
        alt=""
      />
    );
  }
}
