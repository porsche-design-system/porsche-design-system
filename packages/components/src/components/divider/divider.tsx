import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../types';
import { AllowedTypes, attachComponentCss, hasPropValueChanged, THEMES, validateProps } from '../../utils';
import { getComponentCss } from './divider-styles';
import { DIVIDER_COLORS, DIVIDER_DIRECTIONS, type DividerColor, type DividerDirection } from './divider-utils';

const propTypes: PropTypes<typeof Divider> = {
  color: AllowedTypes.oneOf<DividerColor>(DIVIDER_COLORS),
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

  /** Defines direction. */
  @Prop() public direction?: BreakpointCustomizable<DividerDirection> = 'horizontal';

  /** Adapts color depending on theme. */
  @Prop() public theme?: Theme = 'light';

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.color, this.direction, this.theme);

    return <hr />;
  }
}
