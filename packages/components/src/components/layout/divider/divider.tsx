import { Component, Element, h, JSX, Prop } from '@stencil/core';
import { AllowedTypes, attachComponentCss, THEMES, validateProps } from '../../../utils';
import type { PropTypes, Theme } from '../../../types';
import type { DividerColor, DividerOrientation, DividerOrientationType } from './divider-utils';
import { DIVIDER_COLORS, DIVIDER_ORIENTATIONS } from './divider-utils';
import { getComponentCss } from './divider-styles';

const propTypes: PropTypes<typeof Divider> = {
  color: AllowedTypes.oneOf<DividerColor>(DIVIDER_COLORS),
  orientation: AllowedTypes.breakpoint<DividerOrientationType>(DIVIDER_ORIENTATIONS),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

@Component({
  tag: 'p-divider',
  shadow: true,
})
export class Divider {
  @Element() public host!: HTMLElement;

  /** Defines color depending on theme. */
  @Prop() public color?: DividerColor = 'neutral-contrast-low';

  /** Defines orientation. */
  @Prop() public orientation?: DividerOrientation = 'horizontal';

  /** Adapts color depending on theme. */
  @Prop() public theme?: Theme = 'light';

  public componentWillRender(): void {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.color, this.orientation, this.theme);
  }

  public render(): JSX.Element {
    return <hr />;
  }
}
