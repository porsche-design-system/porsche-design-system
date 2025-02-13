import { arrow, autoUpdate, computePosition, flip, limitShift, offset, shift } from '@floating-ui/dom';
import { Component, Element, Host, type JSX, Prop, State, h } from '@stencil/core';
import type { PropTypes, SelectedAriaAttributes, Theme } from '../../types';
import {
  AllowedTypes,
  THEMES,
  attachComponentCss,
  getHasNativePopoverSupport,
  getPrefixedTagNames,
  hasPropValueChanged,
  parseAndGetAriaAttributes,
  validateProps,
} from '../../utils';
import { getComponentCss } from './popover-styles';
import {
  POPOVER_ARIA_ATTRIBUTES,
  POPOVER_DIRECTIONS,
  POPOVER_SAFE_ZONE,
  type PopoverAriaAttribute,
  type PopoverDirection,
} from './popover-utils';

const propTypes: PropTypes<typeof Popover> = {
  direction: AllowedTypes.oneOf<PopoverDirection>(POPOVER_DIRECTIONS),
  description: AllowedTypes.string,
  aria: AllowedTypes.aria<PopoverAriaAttribute>(POPOVER_ARIA_ATTRIBUTES),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

/**
 * @slot {"name": "", "description": "Default slot for the popover content." }
 */
@Component({
  tag: 'p-popover',
  shadow: true,
})
export class Popover {
  @Element() public host!: HTMLElement;

  /** Preferred direction in which popover should open, given there is enough space in viewport.
   * Otherwise, it will be opened in the direction with most available space. */
  @Prop() public direction?: PopoverDirection = 'bottom';

  /** Descriptive text to show additional information when popover is open  */
  @Prop() public description?: string;

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<PopoverAriaAttribute>;

  /** Adapts the popover color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  @State() private open = false;

  private popover: HTMLDivElement;
  private button: HTMLButtonElement;
  private arrow: HTMLDivElement;
  private cleanUp: () => void;
  private hasNativePopoverSupport = getHasNativePopoverSupport();

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public disconnectedCallback(): void {
    // ensures floating ui event listeners are removed in case popover is removed from DOM
    this.handlePopover(false);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.theme);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host onKeydown={(e: KeyboardEvent) => e.key === 'Escape' && this.button.focus()}>
        <button
          type="button"
          onClick={() => (this.open = !this.open)}
          {...parseAndGetAriaAttributes({
            ...parseAndGetAriaAttributes(this.aria),
            ...{ 'aria-expanded': this.open },
          })}
          ref={(el) => (this.button = el)}
        >
          <PrefixedTagNames.pIcon class="icon" name="information" theme={this.theme} />
          <span class="label">More information</span>
        </button>
        {this.open && (
          <div
            class="popover"
            popover="auto"
            onToggle={(e: ToggleEvent) => (this.open = e.newState === 'open')}
            ref={(el) => (this.popover = el)}
          >
            <div class="arrow" ref={(el) => (this.arrow = el)} />
            <div class="content">{this.description ? <p>{this.description}</p> : <slot />}</div>
          </div>
        )}
      </Host>
    );
  }

  public componentDidRender(): void {
    // needs to be called after render cycle to be able to render the popover conditionally
    this.handlePopover(this.open);
  }

  private handlePopover = (open: boolean): void => {
    if (open && typeof this.cleanUp === 'undefined') {
      if (this.hasNativePopoverSupport) {
        this.popover.showPopover();
      }
      // ensures floating ui event listeners are added when popover is opened
      this.cleanUp = autoUpdate(this.button, this.popover, this.updatePosition);
    } else if (!open && typeof this.cleanUp === 'function') {
      // ensures floating ui event listeners are removed when popover is closed
      this.cleanUp();
      this.cleanUp = undefined;
    }
  };

  private updatePosition = async (): Promise<void> => {
    const { x, y, placement, middlewareData } = await computePosition(this.button, this.popover, {
      placement: this.direction,
      middleware: [
        offset(16),
        shift({
          padding: POPOVER_SAFE_ZONE,
          limiter: limitShift({
            offset: ({ rects }) => rects.reference.width,
          }),
        }),
        flip({
          padding: POPOVER_SAFE_ZONE,
          fallbackAxisSideDirection: 'end',
        }),
        arrow({ element: this.arrow }),
      ],
    });

    const placementVertical = placement === 'top' || placement === 'bottom';
    const placementTopLeft = placement === 'top' || placement === 'left';

    Object.assign(this.popover.style, {
      left: `${x}px`,
      top: `${y}px`,
    });

    const { x: xArrow, y: yArrow } = middlewareData.arrow;

    Object.assign(this.arrow.style, {
      clipPath: placementVertical ? 'polygon(50% 0, 100% 110%, 0 110%)' : 'polygon(0 50%, 110% 0, 110% 100%)',
      width: placementVertical ? '24px' : '12px',
      height: placementVertical ? '12px' : '24px',
      transform: `rotate(${placementTopLeft ? '180deg' : '0'}`,
      left: ['right', 'bottom', 'top'].includes(placement) ? (xArrow != null ? `${xArrow}px` : '-12px') : '',
      right: placement === 'left' ? (xArrow != null ? `${xArrow}px` : '-12px') : '',
      top: ['bottom', 'left', 'right'].includes(placement) ? (yArrow != null ? `${yArrow}px` : '-12px') : '',
      bottom: placement === 'top' ? (yArrow != null ? `${yArrow}px` : '-12px') : '',
    });
  };
}
