import { JSX, Component, Prop, h, Element, Host, State } from '@stencil/core';
import { getPopoverDirection } from './popover-utils';
import { attachComponentCss } from '../../../utils';
import { getComponentCss } from './popover-styles';
import type { Theme } from '../../../types';
import type { PopoverDirection } from './popover-utils';

@Component({
  tag: 'p-popover',
  shadow: true,
})
export class Popover {
  @Element() public host!: HTMLElement;

  /** Theme. */
  @Prop() public theme?: Theme = 'light';

  @State() open: boolean = false;

  private direction: PopoverDirection;

  public componentWillRender(): void {
    this.setDirection();
    attachComponentCss(this.host, getComponentCss, this.direction.x, this.direction.y);
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
          <div class="popover">
            <slot />
          </div>
        )}
      </Host>
    );
  }

  private setDirection = () => {
    this.direction = getPopoverDirection(this.host);
  };
}
