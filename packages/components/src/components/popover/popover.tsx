import { arrow, autoUpdate, computePosition, flip, limitShift, offset, shift } from '@floating-ui/dom';
import { Component, Element, Event, type EventEmitter, Host, h, type JSX, Listen, Prop, State } from '@stencil/core';
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
  open: AllowedTypes.boolean,
  direction: AllowedTypes.oneOf<PopoverDirection>(POPOVER_DIRECTIONS),
  description: AllowedTypes.string,
  aria: AllowedTypes.aria<PopoverAriaAttribute>(POPOVER_ARIA_ATTRIBUTES),
};

/**
 * @slot {"name": "", "description": "Default slot for the popover content." }
 * @slot {"name": "button", "description": "Renders a custom trigger button. When used, the default info button is replaced." }
 *
 * @controlled {"props": ["open"], "event": "dismiss"}
 */
@Component({
  tag: 'p-popover',
  shadow: true,
})
export class Popover {
  @Element() public host!: HTMLElement;

  /**
   * Controls whether the popover is visible. When set (controlled mode), visibility follows this prop and the consumer
   * owns the open state via a slotted `button`. When omitted (uncontrolled mode), the component manages visibility itself.
   */
  @Prop() public open?: boolean;

  /** Sets the preferred direction for the popover to open relative to its trigger button. Falls back to the direction with the most available viewport space. */
  @Prop() public direction?: PopoverDirection = 'bottom';

  /** Sets the text content displayed inside the popover panel when it is open, providing contextual help or information. */
  @Prop() public description?: string;

  /** Sets ARIA attributes on the popover panel to improve accessibility for screen readers. */
  @Prop() public aria?: SelectedAriaAttributes<PopoverAriaAttribute>;

  /** Emitted in controlled mode when the user requests to close the popover via the Escape key or an outside click. */
  @Event({ bubbles: false }) public dismiss?: EventEmitter<void>;

  @State() private isOpen = false;

  private popover: HTMLDivElement;
  private button: HTMLButtonElement;
  private slottedButton: HTMLElement;
  private arrow: HTMLDivElement;
  private cleanUpAutoUpdate: () => void;
  private hasNativePopoverSupport = getHasNativePopoverSupport();
  // TODO: This should be updated when slot is changed
  private hasSlottedButton: boolean;

  private get isControlled(): boolean {
    return typeof this.open === 'boolean';
  }

  private get effectiveOpen(): boolean {
    return this.isControlled ? this.open : this.isOpen;
  }

  @Listen('click')
  public onClick(e: MouseEvent): void {
    // Handle opening when custom slotted button is clicked (uncontrolled mode only; in controlled mode the consumer owns the trigger)
    if (!this.isControlled && this.hasSlottedButton && (e.target as HTMLElement).closest('[slot="button"]') !== null) {
      this.isOpen = !this.isOpen;
    }
  }

  public connectedCallback(): void {
    // In controlled mode the panel uses `popover="manual"`, which doesn't light-dismiss, so the outside-click listener is required regardless of native support.
    if (this.isControlled || !this.hasNativePopoverSupport) {
      document.addEventListener('mousedown', this.onClickOutside, true);
    }
  }

  public disconnectedCallback(): void {
    if (this.isControlled || !this.hasNativePopoverSupport) {
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
            onClick={() => !this.isControlled && (this.isOpen = !this.isOpen)}
            {...parseAndGetAriaAttributes({
              ...parseAndGetAriaAttributes(this.aria),
              ...{ 'aria-expanded': this.effectiveOpen },
            })}
            ref={(el) => (this.button = el)}
          >
            <PrefixedTagNames.pIcon class="icon" name="information" />
            <span class="label">More information</span>
          </button>
        )}
        {this.effectiveOpen && (
          <div
            popover={this.isControlled ? 'manual' : 'auto'}
            onToggle={this.onToggle}
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
    this.handlePopover(this.effectiveOpen);
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
    // Called when there is no native popover support or in controlled mode (where `popover="manual"` doesn't light-dismiss)
    if (this.effectiveOpen && isClickOutside(e, this.button || this.slottedButton) && isClickOutside(e, this.popover)) {
      this.requestClose();
    }
  };

  private onToggle = (e: ToggleEvent): void => {
    // Only relevant in uncontrolled mode (`popover="auto"`); in controlled mode visibility is owned by the `open` prop
    if (!this.isControlled) {
      this.isOpen = e.newState === 'open';
    }
  };

  private onHostKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && this.effectiveOpen) {
      // TODO: How to handle focus when button is slotted?
      if (!this.hasSlottedButton) {
        this.button?.focus();
      }
      if (this.isControlled) {
        // `popover="manual"` doesn't light-dismiss, so emit the close request and let the consumer update `open`
        this.dismiss.emit();
      } else if (!this.hasNativePopoverSupport) {
        // Only necessary in case of no native popover support
        this.isOpen = false;
      }
    }
  };

  private requestClose = (): void => {
    if (this.isControlled) {
      this.dismiss.emit();
    } else {
      this.isOpen = false;
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
