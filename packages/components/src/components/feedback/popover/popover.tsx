import { JSX, Component, Prop, h, Element, Host, State } from '@stencil/core';
import { getPopoverPosition } from './popover-utils';
import { attachComponentCss } from '../../../utils';
import { getComponentCss } from './popover-styles';
import type { Theme } from '../../../types';

@Component({
  tag: 'p-popover',
  shadow: true,
})
export class Popover {
  @Element() public host!: HTMLElement;

  /** Theme. */
  @Prop() public theme?: Theme = 'light';

  @State() open: boolean = true;

  private popover: HTMLDivElement;

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss);
  }

  public componentDidRender(): void {
    if (this.open) {
      const position: number = getPopoverPosition(this.popover);
      this.popover.style.left = `${position}px`;
      console.log(position);
    }
  }

  public render(): JSX.Element {
    return (
      <Host>
        <p-button-pure
          icon="information"
          hideLabel="true"
          onFocus={() => (this.open = true)}
          onBlur={() => (this.open = false)}
        >
          Open Popover
        </p-button-pure>
        {this.open && (
          <div class="popover" ref={(el) => (this.popover = el)}>
            <slot />
          </div>
        )}
      </Host>
    );
  }
}
