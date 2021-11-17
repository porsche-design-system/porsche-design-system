import { JSX, Component, Prop, h, Element, Host, State } from '@stencil/core';
import { getAutoDirection, getOffsetX, getOffsetY, isWithinViewport } from './popover-utils';
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

  @State() private open = true;

  private popover: HTMLDivElement;
  private arrow: HTMLSpanElement;

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, this.direction);
  }

  public componentDidRender(): void {
    if (this.open) {
      let direction = this.direction;
      if (!isWithinViewport(this.popover, this.direction)) {
        direction = getAutoDirection(this.host, this.popover);
        attachComponentCss(this.host, getComponentCss, direction);
      }

      switch (direction) {
        case 'top':
        case 'bottom':
          const offsetX = getOffsetX(this.popover);
          this.popover.style.margin = `0 0 0 ${offsetX}px`;
          this.arrow.style.margin = `0 0 0 ${-offsetX}px`;
          break;
        case 'left':
        case 'right':
          const offsetY = getOffsetY(this.popover);
          this.popover.style.margin = `${offsetY}px 0 0 0`;
          this.arrow.style.margin = `${-offsetY}px 0 0 0`;
          break;
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
            <span class="arrow" ref={(el) => (this.arrow = el)} />
            <div class="content">
              <slot />
            </div>
          </div>
        )}
      </Host>
    );
  }
}
