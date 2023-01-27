import { Component, Element, h, Prop } from '@stencil/core';
import type { IconAriaAttribute } from './icon-utils';
import { buildIconUrl, ICON_ARIA_ATTRIBUTES } from './icon-utils';
import {
  AllowedTypes,
  attachComponentCss,
  parseAndGetAriaAttributes,
  TEXT_COLORS,
  TEXT_SIZES,
  THEMES,
  validateProps,
} from '../../utils';
import type { IconName, PropTypes, SelectedAriaAttributes, TextColor, TextSize, Theme } from '../../types';
import { getComponentCss } from './icon-styles';
import { ICON_NAMES } from '@porsche-design-system/icons';

const propTypes: PropTypes<typeof Icon> = {
  name: AllowedTypes.oneOf<IconName>(ICON_NAMES),
  source: AllowedTypes.string,
  color: AllowedTypes.oneOf<TextColor>(TEXT_COLORS),
  size: AllowedTypes.oneOf<TextSize>(TEXT_SIZES),
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
  @Prop() public color?: TextColor = 'primary';

  /** The size of the icon. */
  @Prop() public size?: TextSize = 'small';

  /**
   * Has no effect anymore
   * @deprecated since v3.0.0, will be removed with next major release
   */
  @Prop() public lazy?: boolean = false;

  /** Adapts the color depending on the theme. Has no effect when "inherit" is set as color prop. */
  @Prop() public theme?: Theme = 'light';

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<IconAriaAttribute>;

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.color, this.size, this.theme);

    // TODO: add validation, which warns if a deprecated color is used
    // TODO: wouldn't it be better to set alt attribute instead of aria-label?
    return <img src={buildIconUrl(this.source || this.name)} {...parseAndGetAriaAttributes(this.aria)} alt="" />;
  }
}
