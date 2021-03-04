import { JSX, Component, Host, Prop, h } from '@stencil/core';
import type { BreakpointCustomizable } from '../../../../types';

@Component({
  tag: 'p-grid',
  styleUrl: 'grid.scss',
  shadow: true,
})
export class Grid {
  /** Defines the direction of the main and cross axis. The default "row" defines the main axis as horizontal left to right. Also defines the direction for specific breakpoints, like {base: "column", l: "row"}. You always need to provide a base value when doing this. */
  @Prop() public direction?: BreakpointCustomizable<'row' | 'row-reverse' | 'column' | 'column-reverse'> = 'row';

  public render(): JSX.Element {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
