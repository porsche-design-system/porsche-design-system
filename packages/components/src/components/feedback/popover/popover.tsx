import { JSX, Component, Prop, h, Element, Host, State } from '@stencil/core';
import { getAutoPosition, getOffsetX, getOffsetY, isWithinViewport } from './popover-utils';
import { attachComponentCss, getPrefixedTagNames } from '../../../utils';
import { getComponentCss } from './popover-styles';
import type { Direction } from './popover-utils';
import type { Theme } from '../../../types';

@Component({
  tag: 'p-popover',
  shadow: true,
})
export class Popover {
  @Element() public host!: HTMLElement;

  /** Preferred direction in which popover should open, given there is enough space in viewport. */
  @Prop() public direction: Direction = 'bottom';

  /** Theme. */
  @Prop() public theme?: Theme = 'light';

  @State() private open = false;

  private popover: HTMLDivElement;

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, this.direction);
  }

  public componentDidRender(): void {
    if (this.open) {
      let direction = this.direction;
      if (!isWithinViewport(this.popover, this.direction)) {
        direction = getAutoPosition(this.host, this.popover);
        attachComponentCss(this.host, getComponentCss, direction);
      }

      switch (direction) {
        case 'top':
        case 'bottom':
          this.popover.style.margin = `0 0 0 ${getOffsetX(this.popover)}px`;
          break;
        case 'left':
        case 'right':
          this.popover.style.margin = `${getOffsetY(this.popover)}px 0 0 0`;
      }
    }
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <PrefixedTagNames.pButtonPure
          icon="information"
          hideLabel="true"
          onFocus={() => (this.open = true)}
          onBlur={() => (this.open = false)}
        >
          Open Popover
        </PrefixedTagNames.pButtonPure>
        {this.open && (
          <div class="popover" ref={(el) => (this.popover = el)}>
            <slot />
          </div>
        )}
      </Host>
    );
  }
}
