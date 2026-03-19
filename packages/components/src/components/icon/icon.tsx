import { ICONS_MANIFEST } from '@porsche-design-system/assets';
import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import type { BreakpointCustomizable, IconName, PropTypes, SelectedAriaAttributes } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  hasPropValueChanged,
  parseAndGetAriaAttributes,
  validateProps,
} from '../../utils';
import { getComponentCss } from './icon-styles';
import {
  buildIconUrl,
  ICON_ARIA_ATTRIBUTES,
  ICON_COLORS,
  ICON_SIZES,
  type IconAriaAttribute,
  type IconColor,
  type IconSize,
} from './icon-utils';

const propTypes: PropTypes<typeof Icon> = {
  name: AllowedTypes.oneOf<IconName>(Object.keys(ICONS_MANIFEST) as IconName[]),
  source: AllowedTypes.string,
  color: AllowedTypes.oneOf<IconColor>(ICON_COLORS),
  size: AllowedTypes.breakpoint<IconSize>(ICON_SIZES),
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

  /** Basic color variations. */
  @Prop() public color?: IconColor = 'primary';

  /** Defines the size of the icon, aligned with the typographic scale used by components such as p-spinner, p-flag, p-text, and p-heading. When set to `inherit`, the size is derived from a custom font-size defined on a parent element, calculated against the global line-height (based on `ex`-unit) to remain visually consistent with other typographic-scale-based components. */
  @Prop() public size?: BreakpointCustomizable<IconSize> = 'sm';

  /** Sets ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<IconAriaAttribute>;

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.name, this.source, this.color, this.size);

    return (
      <img
        src={buildIconUrl(this.source || this.name)}
        width={24} // improve bootstrapping behaviour
        height={24} // improve bootstrapping behaviour
        loading="lazy"
        alt={parseAndGetAriaAttributes(this.aria)?.['aria-label'] ?? ''}
      />
    );
  }
}
