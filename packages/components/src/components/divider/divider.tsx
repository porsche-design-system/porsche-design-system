import { Component, Element, h, JSX, Prop } from '@stencil/core';
import { AllowedTypes, attachComponentCss, THEMES, validateProps, warnIfDeprecatedPropValueIsUsed } from '../../utils';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../types';
import type { DividerColor, DividerOrientation } from './divider-utils';
import { DIVIDER_COLORS, DIVIDER_ORIENTATIONS } from './divider-utils';
import { getComponentCss } from './divider-styles';

const propTypes: PropTypes<typeof Divider> = {
  color: AllowedTypes.oneOf<DividerColor>(DIVIDER_COLORS),
  orientation: AllowedTypes.breakpoint<DividerOrientation>(DIVIDER_ORIENTATIONS),
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

  /** Defines orientation. */
  @Prop() public orientation?: BreakpointCustomizable<DividerOrientation> = 'horizontal';

  /** Adapts color depending on theme. */
  @Prop() public theme?: Theme = 'light';

  public render(): JSX.Element {
    validateProps(this, propTypes);
    const deprecatedColorMap: Partial<Record<DividerColor, DividerColor>> = {
      'neutral-contrast-low': 'contrast-low',
      'neutral-contrast-medium': 'contrast-medium',
      'neutral-contrast-high': 'contrast-high',
    };
    warnIfDeprecatedPropValueIsUsed(this.host, 'color', deprecatedColorMap);
    attachComponentCss(this.host, getComponentCss, this.color, this.orientation, this.theme);

    return <hr />;
  }
}
