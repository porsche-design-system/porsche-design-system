import { JSX, Component, Prop, h, Element, Host, State } from '@stencil/core';
import {
  addDocumentEventListener,
  POPOVER_DIRECTIONS,
  removeDocumentEventListener,
  updatePopoverStyles,
} from './popover-utils';
import {
  AllowedTypes,
  attachComponentCss,
  attachSlottedCss,
  getPrefixedTagNames,
  parseAndGetAriaAttributes,
  validateProps,
} from '../../utils';
import { getComponentCss, getSlottedCss } from './popover-styles';
import type { PopoverDirection } from './popover-utils';
import type { PropTypes, SelectedAriaAttributes } from '../../types';

const propTypes: PropTypes<typeof Popover> = {
  direction: AllowedTypes.oneOf<PopoverDirection>(POPOVER_DIRECTIONS),
  description: AllowedTypes.string,
  aria: AllowedTypes.aria<'aria-label'>(['aria-label']),
};

@Component({
  tag: 'p-popover',
  shadow: true,
})
export class Popover {
  @Element() public host!: HTMLElement;

  /** Preferred direction in which popover should open, given there is enough space in viewport.
   * Otherwise it will be opened in the direction with most available space. */
  @Prop() public direction?: PopoverDirection = 'bottom';

  /** Descriptive text to show additional information when popover is open  */
  @Prop() public description?: string;

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<'aria-label'>;

  @State() private open = false;

  private spacer: HTMLDivElement;
  private popover: HTMLDivElement;
  private button: HTMLButtonElement;

  public connectedCallback(): void {
    attachSlottedCss(this.host, getSlottedCss);
    addDocumentEventListener(this);
  }

  public componentWillRender(): void {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.direction);
  }

  public componentDidRender(): void {
    if (this.open) {
      // calculate / update position only possible after render
      updatePopoverStyles(this.host, this.spacer, this.popover, this.direction);
    }
  }

  public disconnectedCallback(): void {
    removeDocumentEventListener(this);
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host onKeydown={this.onKeydown}>
        <PrefixedTagNames.pButtonPure
          type="button"
          icon="information"
          hideLabel="true"
          onClick={() => (this.open = !this.open)}
          // pass string to avoid another update on p-button on each render because of new object reference
          aria={JSON.stringify({
            'aria-expanded': this.open,
            ...parseAndGetAriaAttributes(this.aria),
          })}
          ref={(el) => (this.button = el)}
        >
          More information
        </PrefixedTagNames.pButtonPure>
        {this.open && (
          <div class="spacer" ref={(el) => (this.spacer = el)}>
            <div class="popover" ref={(el) => (this.popover = el)}>
              {this.description ? <p>{this.description}</p> : <slot />}
            </div>
          </div>
        )}
      </Host>
    );
  }

  private onKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      this.button.focus();
    }
  };
}
