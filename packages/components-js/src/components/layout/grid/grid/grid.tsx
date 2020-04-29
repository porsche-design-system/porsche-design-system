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

  /** Defines the outer spacings between the content area and the left and right screen sides, as well as centering its content and setting a max-width. */
  @Prop() public safeZone?: 'none' | 'basic' | 'enhance' = 'none';

  public render(): JSX.Element {
    const gridClasses = cx(
      prefix('grid'),
      this.direction !== 'row' && mapBreakpointPropToPrefixedClasses('grid--direction', this.direction)
    );

    const gridSafeZoneClasses = cx(
      prefix('grid-safe-zone'),
      prefix(`grid-safe-zone--${this.safeZone}`)
    );

    if (this.addSafeZoneWrapper()) {
      return (<Host class={gridSafeZoneClasses}>
        <div class={gridClasses}>
          <slot/>
        </div>
      </Host>);
    }

    return (<Host class={gridClasses}>
      <slot />
    </Host>);
  }

  private addSafeZoneWrapper(): boolean {
    return ['basic', 'enhance'].includes(this.safeZone);
  }
}
