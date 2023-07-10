import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  hasPropValueChanged,
  THEMES,
  validateProps,
  warnIfDeprecatedPropIsUsed,
  warnIfDeprecatedPropValueIsUsed,
} from '../../utils';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../types';
import type { DividerColor, DividerColorDeprecated, DividerDirection, DividerOrientation } from './divider-utils';
import { DIVIDER_COLORS, DIVIDER_DIRECTIONS } from './divider-utils';
import { getComponentCss } from './divider-styles';

const propTypes: PropTypes<typeof Divider> = {
  color: AllowedTypes.oneOf<DividerColor>(DIVIDER_COLORS),
  orientation: AllowedTypes.breakpoint<DividerOrientation>([undefined, ...DIVIDER_DIRECTIONS]),
  direction: AllowedTypes.breakpoint<DividerDirection>(DIVIDER_DIRECTIONS),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

@Component({
  tag: 'p-divider',
  shadow: true,
})
export class Divider {
  @Element() public host!: HTMLElement;

  /** Defines color depending on theme. */
  @Prop() public color?: DividerColor = 'contrast-low';

  /**
   * @deprecated since v3.0.0, will be removed with next major release, use `direction` instead.
   * Defines orientation. */
  @Prop() public orientation?: BreakpointCustomizable<DividerOrientation>;

  /** Defines direction. */
  @Prop() public direction?: BreakpointCustomizable<DividerDirection> = 'horizontal';

  /** Adapts color depending on theme. */
  @Prop() public theme?: Theme = 'light';

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    const deprecationMap: Record<DividerColorDeprecated, Exclude<DividerColor, DividerColorDeprecated>> = {
      'neutral-contrast-low': 'contrast-low',
      'neutral-contrast-medium': 'contrast-medium',
      'neutral-contrast-high': 'contrast-high',
    };
    warnIfDeprecatedPropValueIsUsed<typeof Divider, DividerColorDeprecated, DividerColor>(
      this,
      'color',
      deprecationMap
    );
    warnIfDeprecatedPropIsUsed<typeof Divider>(this, 'orientation', 'Please use direction prop instead.');
    attachComponentCss(
      this.host,
      getComponentCss,
      (deprecationMap[this.color] || this.color) as Exclude<DividerColor, DividerColorDeprecated>,
      this.orientation || this.direction,
      this.theme
    );

    return <hr />;
  }
}
