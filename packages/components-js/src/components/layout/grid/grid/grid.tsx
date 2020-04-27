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
  /** Defines the direction of the main and cross axis. The default "row" defines the main axis as horizontal left to right. Also defines the direction for specific breakpoints, like {base: "column", l: "row"}. You always need to provide a base value when doing this. */
  @Prop() public direction?: BreakpointCustomizable<'row' | 'row-reverse' | 'column' | 'column-reverse'> = 'row';

  /** Defines whether the outer grid margin should be applied which centers the grid and applies `overflow-x: hidden;` to prevent horizontal scrolling. Defaults to `false`. */
  @Prop() public safeZone?: boolean = false;

  public render(): JSX.Element {
    const gridClasses = cx(
      prefix('grid'),
      this.direction !== 'row' && mapBreakpointPropToPrefixedClasses('grid--direction', this.direction)
    );

    const gridSafeZoneClasses = cx(
      prefix('grid-safe-zone'),
    );

    return (<Host class={this.safeZone ? gridSafeZoneClasses : gridClasses}>
      {this.safeZone
        ? <div class={gridClasses}><slot /></div>
        : <slot />
      }
    </Host>);
  }
}
