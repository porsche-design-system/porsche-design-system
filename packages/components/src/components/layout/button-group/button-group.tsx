import { Component, Element, h, Prop } from '@stencil/core';
import type { BreakpointCustomizable } from '../../../types';
import type { FlexDirectionType } from '../flex/flex/flex-utils';
import { getPrefixedTagNames, mapBreakpointPropToPrefixedClasses, prefix } from '../../../utils';

@Component({
  tag: 'p-button-group',
  styleUrl: 'button-group.scss',
  shadow: true,
})
export class ButtonGroup {
  @Element() public host!: HTMLElement;

  /** Defines the direction of the main and cross axis. The default "{    base: 'column',    s: 'row',  }" defines the main axis as horizontal left to right. Also defines the direction for specific breakpoints, like {base: "column", l: "row"}. You always need to provide a base value when doing this. */
  @Prop() public direction?: BreakpointCustomizable<Extract<FlexDirectionType, 'row' | 'column'>> = {
    base: 'column',
    s: 'row',
  };

  public render(): JSX.Element {
    const buttonGroupClasses = {
      [prefix('button-group')]: true,
      ...mapBreakpointPropToPrefixedClasses('button-group--direction', this.direction),
    };
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <PrefixedTagNames.pFlex class={buttonGroupClasses} direction={this.direction}>
        <slot />
      </PrefixedTagNames.pFlex>
    );
  }
}
