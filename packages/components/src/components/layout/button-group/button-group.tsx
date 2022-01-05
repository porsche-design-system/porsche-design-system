import { Component, Element, h, Prop } from '@stencil/core';
import { attachComponentCss } from '../../../utils';
import { getComponentCss } from './button-group-styles';
import type { ButtonGroupDirection } from './button-group-utils';

@Component({
  tag: 'p-button-group',
  shadow: true,
})
export class ButtonGroup {
  @Element() public host!: HTMLElement;

  /** Defines the direction of the main and cross axis. The default is ’{base: ‘column’, xs: ‘row’}' showing buttons vertically stacked on mobile viewports and side-by-side in a horizontal row from breakpoint ‘xs’. You always need to provide a base value when using breakpoints. */
  @Prop() public direction?: ButtonGroupDirection = {
    base: 'column',
    xs: 'row',
  };

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, this.direction);
  }

  public render(): JSX.Element {
    return (
      <div role="group">
        <slot />
      </div>
    );
  }
}
