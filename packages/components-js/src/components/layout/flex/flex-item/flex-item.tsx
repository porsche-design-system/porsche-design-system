import { JSX, Component, Host, Prop, h } from '@stencil/core';
import cx from 'classnames';
import {
  BreakpointCustomizable,
  mapBreakpointPropToPrefixedClasses,
  prefix
} from '../../../../utils';

@Component({
  tag: 'p-flex-item',
  styleUrl: 'flex-item.scss'
})
export class FlexItem {
  /** The width of the flex item. You can also supply values for specific breakpoints, like {base: "full", l: "one-quarter"}. You always need to provide a base value when doing this. */
  @Prop() public width?: BreakpointCustomizable<
  'auto' | 'one-quarter' | 'one-third' | 'half' | 'two-thirds' | 'three-quarters' | 'full'
  > = 'auto';

  /** The offset of the column. You can also supply values for specific breakpoints, like {base: "none", l: "one-quarter"}. You always need to provide a base value when doing this. */
  @Prop() public offset?: BreakpointCustomizable<
  'none' | 'one-quarter' | 'one-third' | 'half' | 'two-thirds' | 'three-quarters'
  > = 'none';

  /** Defines how this flex item is aligned along the cross axis. This overwrites the cross axis alignment set by the container. Corresponds to the "alignSelf" css property. */
  @Prop() public alignSelf?: BreakpointCustomizable<'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'> =
  'auto';

  /** The ability to allow/disallow the flex child to grow. */
  @Prop() public grow?: BreakpointCustomizable<0 | 1> = 0;

  /** The ability to allow/disallow the flex child to shrink. */
  @Prop() public shrink?: BreakpointCustomizable<1 | 0> = 1;

  /** The shorthand property for the combined definition of "shrink", "grow" and "basis" */
  @Prop() public flex?: BreakpointCustomizable<'initial' | 'auto' | 'none' | 'equal'> = 'initial';

  public render(): JSX.Element {
    const flexItemClasses = cx(
      prefix('flex__item'),
      this.width !== 'auto' && mapBreakpointPropToPrefixedClasses('flex__item--width', this.width),
      this.offset !== 'none' && mapBreakpointPropToPrefixedClasses('flex__item--offset', this.offset),
      this.alignSelf !== 'auto' && mapBreakpointPropToPrefixedClasses('flex__item--align-self', this.alignSelf),
      this.grow !== 0 && mapBreakpointPropToPrefixedClasses('flex__item--grow', this.grow),
      this.shrink !== 1 && mapBreakpointPropToPrefixedClasses('flex__item--shrink', this.shrink),
      this.flex !== 'initial' && mapBreakpointPropToPrefixedClasses('flex__item-', this.flex)
    );

    return <Host class={flexItemClasses} />;
  }
}
