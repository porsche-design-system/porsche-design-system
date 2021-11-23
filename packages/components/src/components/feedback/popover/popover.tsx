import { JSX, Component, Prop, h, Element, Host, State } from '@stencil/core';
import {
  getAutoDirection,
  getOffset,
  isWithinViewport,
  observeClickOutside,
  unobserveClickOutside,
} from './popover-utils';
import { attachComponentCss, attachSlottedCss, getPrefixedTagNames, getThemeDarkAttribute } from '../../../utils';
import { getComponentCss } from './popover-styles';
import type { PopoverDirection } from './popover-utils';
import type { Theme } from '../../../types';
import { getSlottedCss } from '../../basic/typography/text/text-styles';

@Component({
  tag: 'p-popover',
  shadow: true,
})
export class Popover {
  @Element() public host!: HTMLElement;

  /** Preferred direction in which popover should open, given there is enough space in viewport.
   * Otherwise it will be opened in the direction with most available space. */
  @Prop() public direction: PopoverDirection = 'bottom';

  /** Theme. */
  @Prop() public theme?: Theme = 'light';

  @State() open = false;

  private spacer: HTMLDivElement;
  private popover: HTMLDivElement;

  public connectedCallback(): void {
    attachSlottedCss(this.host, getSlottedCss);
    observeClickOutside(this);
  }

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, this.direction, this.theme);
  }

  public componentDidRender(): void {
    if (this.open) {
      this.popover.style.margin = '0';

      let direction = this.direction;
      if (!isWithinViewport(this.spacer, this.popover, this.direction)) {
        direction = getAutoDirection(this.spacer, this.popover);
        if (direction !== this.direction) {
          attachComponentCss(this.host, getComponentCss, direction, this.theme);
        }
      }

      this.popover.style.margin = getOffset(this.spacer, this.popover, direction);
    }
  }

  public disconnectedCallback(): void {
    unobserveClickOutside(this);
  }
  //TODO: test aria expanded in e2e
  //TODO: Set focus inside popover when opened
  //TODO: Behavior on ESC click?
  //TODO: Focus trap inside?
  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host {...getThemeDarkAttribute(this.theme)}>
        <PrefixedTagNames.pButtonPure
          icon="information"
          hideLabel="true"
          theme={this.theme}
          onClick={() => (this.open = !this.open)}
          aria-expanded={this.open === true ? 'true' : 'false'}
        >
          Open Popover
        </PrefixedTagNames.pButtonPure>
        {this.open && (
          <div class="spacer" ref={(el) => (this.spacer = el)}>
            <div class="popover" ref={(el) => (this.popover = el)}>
              <slot />
            </div>
          </div>
        )}
      </Host>
    );
  }
}
