import { JSX, Component, Prop, h, Element, Host, State } from '@stencil/core';
import { getAutoDirection, getOffsetX, getOffsetY, isClickInsideHost, isWithinViewport } from './popover-utils';
import { attachComponentCss, getPrefixedTagNames } from '../../../utils';
import { getComponentCss } from './popover-styles';
import type { PopoverDirection } from './popover-utils';
import type { Theme } from '../../../types';

@Component({
  tag: 'p-popover',
  shadow: true,
})
export class Popover {
  @Element() public host!: HTMLElement;

  /** Preferred direction in which popover should open, given there is enough space in viewport. */
  @Prop() public direction: PopoverDirection = 'bottom';

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
        direction = getAutoDirection(this.host, this.popover);
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
          break;
      }
    }
  }

  public componentDidLoad(): void {
    document.addEventListener('click', this.onClick);
  }

  public disconnectedCallback(): void {
    document.removeEventListener('click', this.onClick);
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <PrefixedTagNames.pButtonPure icon="information" hideLabel="true" onClick={() => (this.open = !this.open)}>
          Open Popover
        </PrefixedTagNames.pButtonPure>
        {this.open && (
          <div class="popover">
            <div class="content" ref={(el) => (this.popover = el)}>
              <slot />
            </div>
          </div>
        )}
      </Host>
    );
  }

  //todo: test for composedPath or onClick to ensure its only called when open
  private onClick = (e: MouseEvent): void => {
    if (!isClickInsideHost(this.host, this.open, e)) {
      this.open = false;
    }
  };
}
