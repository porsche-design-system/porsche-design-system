import { arrow, autoUpdate, computePosition, flip, limitShift, offset, shift } from '@floating-ui/dom';
import { Component, Event, Element, Host, type JSX, Prop, h, type EventEmitter } from '@stencil/core';
import type { PropTypes, SelectedAriaAttributes, Theme } from '../../types';
import {
  AllowedTypes,
  THEMES,
  attachComponentCss,
  getHasNativePopoverSupport,
  getPrefixedTagNames,
  hasPropValueChanged,
  isClickOutside,
  parseAndGetAriaAttributes,
  validateProps,
  hasNamedSlot,
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
  open: AllowedTypes.boolean,
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

  /** Adapts the popover color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** If true, the popover is open. */
  @Prop({ mutable: true }) public open?: boolean = false;

  /** Emitted when the component requests to be dismissed. */
  @Event({ bubbles: false }) public dismiss?: EventEmitter<void>;

  private popover: HTMLDivElement;
  private button: HTMLButtonElement;
  private slottedButton: HTMLElement;
  private arrow: HTMLDivElement;
  private cleanUpAutoUpdate: () => void;
  private hasNativePopoverSupport = getHasNativePopoverSupport();
  private hasSlottedButton: boolean;

  public connectedCallback(): void {
    document.addEventListener('mousedown', this.onClickOutside, true);
  }

  public disconnectedCallback(): void {
    document.removeEventListener('mousedown', this.onClickOutside, true);
    // ensures floating ui event listeners are removed in case popover is removed from DOM
    this.handlePopover(false);
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.theme);

    const PrefixedTagNames = getPrefixedTagNames(this.host);
    this.hasSlottedButton = hasNamedSlot(this.host, 'button');

    return (
      <Host onKeyDown={this.onHostKeydown}>
        {this.hasSlottedButton ? (
          <div ref={(el) => (this.slottedButton = el)}>
            <slot name="button" />
          </div>
        ) : (
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
        )}
        {this.open && (
          <div
            popover={this.hasSlottedButton ? "manual" : "auto"}
            onToggle={(e: ToggleEvent) => {
              this.onTogglePopover(e);
            }}
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
    // Native support, uncontrolled => native popover handles click outside itself & calls onTogglePopover to update open state
    // Native support, controlled => click outside must send dismiss event. If clicked on the button itself, it must be handled from outside.
    // No native support, uncontrolled => only handle if not clicked on button or popover
    // No native support, controlled => click outside must send dismiss event. If clicked on the button itself, it must be handled from outside.
    if (this.hasNativePopoverSupport && !this.hasSlottedButton) return;
    if (this.open && isClickOutside(e, this.button || this.slottedButton) && isClickOutside(e, this.popover)) {
      this.hasSlottedButton ? this.dismissPopover() : (this.open = false);
    }
  };

  private onHostKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && this.open) {
      e.preventDefault();
      if (this.hasSlottedButton) {
        this.dismissPopover();
      } else {
        this.button.focus();
        this.open = false;
      }
    }
  };

  private onTogglePopover = (e: ToggleEvent): void => {
    if (!this.hasSlottedButton) {
      (this.open = e.newState === 'open');
    }
  };

  private dismissPopover = (): void => {
    this.dismiss.emit();
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
