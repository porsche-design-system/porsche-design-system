import { JSX, Component, Prop, h, Element, Host, State } from '@stencil/core';
import { getPopoverPosition } from './popover-utils';
import { attachComponentCss, getPrefixedTagNames } from '../../../utils';
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

  @State() private open = false;

  private popover: HTMLDivElement;

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss);
  }

  public componentDidRender(): void {
    if (this.open) {
      const { verticalDirection, popoverPositionLeft } = getPopoverPosition(this.popover);
      this.popover.style.left = `${popoverPositionLeft}px`;
      if (verticalDirection === 'top') {
        this.popover.style.setProperty('top', 'initial');
        this.popover.style.bottom = '2rem';
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
