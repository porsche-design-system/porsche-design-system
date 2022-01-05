import { Component, Element, h, JSX, Prop } from '@stencil/core';
import { attachComponentCss } from '../../../utils';
import type { Theme } from '../../../types';
import type { DividerColor, DividerOrientation } from './divider-utils';
import { getComponentCss } from './divider-styles';

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
    attachComponentCss(this.host, getComponentCss, this.color, this.orientation, this.theme);
  }

  public render(): JSX.Element {
    return <hr />;
  }
}
