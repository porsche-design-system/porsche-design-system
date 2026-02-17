import { arrow, autoUpdate, computePosition, flip, limitShift, offset, shift } from '@floating-ui/dom';
import { Component, Element, Host, h, type JSX, Listen, Prop, State } from '@stencil/core';
import type { PropTypes, SelectedAriaAttributes } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getHasNativePopoverSupport,
  getPrefixedTagNames,
  hasNamedSlot,
  hasPropValueChanged,
  isClickOutside,
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
};

/**
 * @slot {"name": "", "description": "Default slot for the popover content." }
 * @slot {"name": "button", "description": "Slot for custom button." }
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

  @State() private isOpen = false;

  private popover: HTMLDivElement;
  private button: HTMLButtonElement;
  private slottedButton: HTMLElement;
  private arrow: HTMLDivElement;
  private cleanUpAutoUpdate: () => void;
  private hasNativePopoverSupport = getHasNativePopoverSupport();
  // TODO: This should be updated when slot is changed
  private hasSlottedButton: boolean;

  @Listen('click')
  public onClick(e: MouseEvent): void {
    // Handle opening when custom slotted button is clicked
    if (this.hasSlottedButton && (e.target as HTMLElement).closest('[slot="button"]') !== null) {
      this.isOpen = !this.isOpen;
    }
  }

  public connectedCallback(): void {
    if (!this.hasNativePopoverSupport) {
      document.addEventListener('mousedown', this.onClickOutside, true);
    }
  }

  public disconnectedCallback(): void {
    if (!this.hasNativePopoverSupport) {
      document.removeEventListener('mousedown', this.onClickOutside, true);
    }
    // ensures floating ui event listeners are removed in case popover is removed from DOM
    this.handlePopover(false);
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss);

    const PrefixedTagNames = getPrefixedTagNames(this.host);
    this.hasSlottedButton = hasNamedSlot(this.host, 'button');

    return (
      <Host onKeyDown={this.onHostKeydown}>
        {this.hasSlottedButton ? (
          <slot name="button" ref={(el: HTMLElement) => (this.slottedButton = el)} />
        ) : (
          <button
            type="button"
            onClick={() => (this.isOpen = !this.isOpen)}
            {...parseAndGetAriaAttributes({
              ...parseAndGetAriaAttributes(this.aria),
              ...{ 'aria-expanded': this.isOpen },
            })}
            ref={(el) => (this.button = el)}
          >
            <PrefixedTagNames.pIcon class="icon" name="information" />
            <span class="label">More information</span>
          </button>
        )}
        {this.isOpen && (
          <div popover="auto" onToggle={this.onToggle} ref={(el) => (this.popover = el)}>
            <div class="arrow" ref={(el) => (this.arrow = el)} />
            <div class="content">{this.description ? <p>{this.description}</p> : <slot />}</div>
          </div>
        )}
      </Host>
    );
  }

  public componentDidRender(): void {
    // needs to be called after render cycle to be able to render the popover conditionally
    this.handlePopover(this.isOpen);
  }

  private handlePopover = (open: boolean): void => {
    if (open) {
      this.hasNativePopoverSupport && this.popover.showPopover();
      if (!this.cleanUpAutoUpdate) {
        this.cleanUpAutoUpdate = autoUpdate(this.button || this.slottedButton, this.popover, this.updatePosition);
      }
    } else {
      this.cleanUpAutoUpdate?.();
      this.cleanUpAutoUpdate = undefined;
    }
  };

  private onClickOutside = (e: MouseEvent): void => {
    // Only called in case of no native popover support
    if (this.isOpen && isClickOutside(e, this.button || this.slottedButton) && isClickOutside(e, this.popover)) {
      this.isOpen = false;
    }
  };

  private onToggle = (e: ToggleEvent): void => {
    this.isOpen = e.newState === 'open';
  };

  private onHostKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && this.isOpen) {
      // TODO: How to handle focus when button is slotted?
      if (!this.hasSlottedButton) {
        this.button.focus();
      }
      // Only necessary in case of no native popover support
      if (!this.hasNativePopoverSupport) {
        this.isOpen = false;
      }
    }
  };

  private updatePosition = async (): Promise<void> => {
    const { x, y, placement, middlewareData } = await computePosition(this.button || this.slottedButton, this.popover, {
      placement: this.direction,
      middleware: [
        offset(16),
        shift({
          padding: POPOVER_SAFE_ZONE,
          limiter: limitShift({
            // ensures that the popover is placed to the right if the button is smaller than 34px. This fixes correct placement of arrow.
            offset: ({ rects }) => (rects.reference.width > 33 ? 0 : rects.reference.width),
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
