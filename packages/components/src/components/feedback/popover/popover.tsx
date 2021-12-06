import { JSX, Component, Prop, h, Element, Host, State } from '@stencil/core';
import {
  getAutoDirection,
  getPopoverMargin,
  isElementWithinViewport,
  addDocumentEventListener,
  removeDocumentEventListener,
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

  /** Descriptive text to show additional information when popover is open  */
  @Prop() public description?: string;

  @Prop() public aria?: SelectedAriaAttributes<'aria-label'>;

  @State() public open = false;

  private spacer: HTMLDivElement;
  private popover: HTMLDivElement;
  private button: HTMLButtonElement;

  public connectedCallback(): void {
    attachSlottedCss(this.host, getSlottedCss);
    addDocumentEventListener(this);
  }

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, this.direction);
  }

  public componentDidRender(): void {
    if (this.open) {
      this.popover.style.margin = '0';

      let direction = this.direction;
      if (!isElementWithinViewport(this.spacer, this.popover, this.direction)) {
        direction = getAutoDirection(this.spacer, this.popover);
        if (direction !== this.direction) {
          attachComponentCss(this.host, getComponentCss, direction);
        }
      }

      this.popover.style.margin = getPopoverMargin(this.spacer, this.popover, direction);
    }
  }

  public disconnectedCallback(): void {
    removeDocumentEventListener(this);
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host onKeydown={this.handleEscapePress}>
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
              {(this.description && <PrefixedTagNames.pText>{this.description}</PrefixedTagNames.pText>) || <slot />}
            </div>
          </div>
        )}
      </Host>
    );
  }
  // TODO: wrap description with p tag?
  // TODO: Z-Index into docu
  // TODO: document p tag if needed
  // TODO: remove styling when description is set
  private handleEscapePress = ({ key }: KeyboardEvent): void => {
    if (key === 'Escape' || key === 'Esc') {
      this.button.focus();
    }
  };
}
