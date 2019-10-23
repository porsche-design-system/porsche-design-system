import { JSX, Element, Component, Host, Prop, h } from '@stencil/core';
import cx from 'classnames';
import {
  BreakpointCustomizable,
  mapBreakpointPropToPrefixedClasses,
  prefix
} from '../../../../utils';

@Component({
  tag: 'p-flex',
  styleUrl: 'flex.scss'
})
export class Flex {
  @Element() public host: HTMLDivElement;

  /** Defines the flex containers content flow if 2 or more containers are siblings of each other. */
  @Prop() public display?: BreakpointCustomizable<'block' | 'inline'> = 'block';

  /** If set, overflowing elements will wrap to a new line. */
  @Prop() public wrap?: BreakpointCustomizable<'nowrap' | 'wrap' | 'wrap-reverse'> = 'nowrap';

  /** Defines the direction of the main and cross axis. The default "row" defines the main axis as horizontal left to right. */
  @Prop() public direction?: BreakpointCustomizable<'row' | 'row-reverse' | 'column' | 'column-reverse'> = 'row';

  /** Defines how the flex items are aligned along the main axis. */
  @Prop() public justifyContent?: BreakpointCustomizable<
    'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  > = 'start';

  /** Defines how the flex items are aligned along the cross axis. */
  @Prop() public alignItems?: BreakpointCustomizable<'stretch' | 'start' | 'end' | 'center' | 'baseline'> = 'stretch';

  /** This aligns a flex container's individual lines when there is extra space in the cross-axis, similar to how "justifyContent" aligns individual items along the main axis. */
  @Prop() public alignContent?: BreakpointCustomizable<
    'stretch' | 'start' | 'end' | 'center' | 'space-between' | 'space-around'
  > = 'stretch';

  public render(): JSX.Element {
    const flexClasses = cx(
      prefix('flex'),
      this.display !== 'block' && mapBreakpointPropToPrefixedClasses('flex-', this.display),
      this.wrap !== 'nowrap' && mapBreakpointPropToPrefixedClasses('flex--wrap', this.wrap),
      this.direction !== 'row' && mapBreakpointPropToPrefixedClasses('flex--direction', this.direction),
      this.justifyContent !== 'start' && mapBreakpointPropToPrefixedClasses('flex--justify-content', this.justifyContent),
      this.alignItems !== 'stretch' && mapBreakpointPropToPrefixedClasses('flex--align-items', this.alignItems),
      this.alignContent !== 'stretch' && mapBreakpointPropToPrefixedClasses('flex--align-content', this.alignContent)
    );

    return (
      <Host class={flexClasses} />
    );
  }
}
