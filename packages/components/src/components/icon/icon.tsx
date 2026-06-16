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

  /** Selects an icon from the built-in PDS icon library by name (e.g. `arrow-right`, `close`). */
  @Prop() public name?: IconName = 'arrow-right';

  /** Sets a path to a custom SVG icon, used instead of the built-in icon library. */
  @Prop() public source?: string;

  /** Sets the fill color of the icon using PDS color tokens. */
  @Prop() public color?: IconColor = 'primary';

  /** Sets the icon size using the PDS typographic scale. Use `inherit` to derive size from the parent element. Supports responsive breakpoint values. */
  @Prop() public size?: BreakpointCustomizable<IconSize> = 'sm';

  /** Sets ARIA attributes on the icon — use `aria-label` to make the icon meaningful to screen readers when it conveys information. */
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
