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

  /** Defines whether the outer grid margin should be applied. Defaults to `false`. */
  @Prop() public safeZone?: boolean = false;

  public render(): JSX.Element {
    const gridClasses = prefix('grid');

    const gridInnerClasses = cx(
      prefix('grid__inner'),
      this.direction !== 'row' && mapBreakpointPropToPrefixedClasses('grid__inner--direction', this.direction),
      { [prefix('grid__inner--safe-zone')]: this.safeZone },
    );

    return (<Host class={gridClasses}>
      <div class={gridInnerClasses}>
        <slot />
      </div>
    </Host>);
  }
}
