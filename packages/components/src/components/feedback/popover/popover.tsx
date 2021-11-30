import { JSX, Component, Prop, h, Element, Host, State } from '@stencil/core';
import {
  getAutoDirection,
  getOffset,
  isWithinViewport,
  observeClickOutside,
  unobserveClickOutside,
} from './popover-utils';
import { attachComponentCss, attachSlottedCss, getPrefixedTagNames, parseAndGetAriaAttributes } from '../../../utils';
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

  @State() public open = false;

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

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host onKeydown={this.handleEscapeClick}>
        <PrefixedTagNames.pButtonPure
          type="button"
          icon="information"
          hideLabel="true"
          onClick={() => (this.open = !this.open)}
          aria={{
            'aria-expanded': this.open === true ? 'true' : 'false',
            ...parseAndGetAriaAttributes(this.aria),
          }}
          ref={(el) => (this.button = el)}
        >
          {!this.aria && 'More information'}
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

  private handleEscapeClick = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      this.button.focus();
    }
  };
}
