import { JSX, Component, Prop, h, Element, Host, State } from '@stencil/core';
import {
  getAutoDirection,
  getOffset,
  isWithinViewport,
  observeClickOutside,
  unobserveClickOutside,
} from './popover-utils';
import { attachComponentCss, attachSlottedCss, getPrefixedTagNames, parseAriaAttributes } from '../../../utils';
import { getComponentCss } from './popover-styles';
import type { PopoverDirection } from './popover-utils';
import type { SelectedAriaAttributes } from '../../../types';
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

  @Prop() public aria?: SelectedAriaAttributes<'aria-label'>;

  @State() open = false;

  private spacer: HTMLDivElement;
  private popover: HTMLDivElement;
  private button: HTMLButtonElement;

  public connectedCallback(): void {
    attachSlottedCss(this.host, getSlottedCss);
    observeClickOutside(this);
  }

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, this.direction);
  }

  public componentDidRender(): void {
    if (this.open) {
      this.popover.style.margin = '0';

      let direction = this.direction;
      if (!isWithinViewport(this.spacer, this.popover, this.direction)) {
        direction = getAutoDirection(this.spacer, this.popover);
        if (direction !== this.direction) {
          attachComponentCss(this.host, getComponentCss, direction);
        }
      }

      this.popover.style.margin = getOffset(this.spacer, this.popover, direction);
    }
  }

  public disconnectedCallback(): void {
    unobserveClickOutside(this);
  }
  //TODO: test aria expanded in e2e
  //TODO: test aria prop with accessibility tree
  //TODO: test keyboard navigation

  //TODO: Behavior on ESC click -> implement
  //TODO: Close other Popovers on Enter press

  //TODO: Do we need close button since popover only opens when clicked?
  //TODO: Solution if Popover overlapps next focusable element
  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <PrefixedTagNames.pButtonPure
          type="button"
          icon="information"
          hideLabel="true"
          onClick={() => (this.open = !this.open)}
          onKeyDown={this.handleEscapeClick}
          aria={{
            'aria-expanded': this.open === true ? 'true' : 'false',
            ...parseAriaAttributes(this.aria),
          }}
          ref={(el) => (this.button = el)}
        >
          {!this.aria && 'More information'}
        </PrefixedTagNames.pButtonPure>
        {this.open && (
          <div class="spacer" ref={(el) => (this.spacer = el)}>
            <div class="popover" onKeyDown={this.handleEscapeClick} ref={(el) => (this.popover = el)}>
              <slot />
            </div>
          </div>
        )}
      </Host>
    );
  }
  // Add e2e test when focus stays on button & when focus is inside content
  private handleEscapeClick = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      this.button.focus();
      this.open = false;
    }
  };
}
