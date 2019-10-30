import { JSX, Component, Host, Prop, h } from '@stencil/core';
import cx from 'classnames';
import {
  BreakpointCustomizable,
  mapBreakpointPropToPrefixedClasses,
  prefix
} from '../../../../utils';

@Component({
  tag: 'p-grid',
  styleUrl: 'grid.scss'
})
export class Grid {
  /** Defines the direction of the main and cross axis. The default "row" defines the main axis as horizontal left to right. Also defines the direction for specific breakpoints, like {"base": "column", "l": "row"}. You always need to provide a base value when doing this. */
  @Prop() public direction?: BreakpointCustomizable<'row' | 'row-reverse' | 'column' | 'column-reverse'> = 'row';

  /** Defines the gap between contained children. The value "normal" (default) sets responsive grid spacings that should be used together with `grid-child`. Also defines the gap for specific breakpoints, like {"base": "zero", "l": "normal"}. You always need to provide a base value when doing this. */
  @Prop() public gap?: BreakpointCustomizable<'normal' | 'zero'> = 'normal';

  public render(): JSX.Element {
    const gridClasses = cx(
      prefix('grid'),
      this.direction !== 'row' && mapBreakpointPropToPrefixedClasses('grid--direction', this.direction),
      this.gap !== 'normal' && mapBreakpointPropToPrefixedClasses('grid--gap', this.gap)
    );

    return <Host class={gridClasses} />;
  }
}
