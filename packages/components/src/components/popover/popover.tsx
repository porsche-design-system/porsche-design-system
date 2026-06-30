import { arrow, autoUpdate, computePosition, flip, limitShift, offset, shift } from '@floating-ui/dom';
import { Component, Element, Event, type EventEmitter, Host, h, type JSX, Listen, Prop, State } from '@stencil/core';
import type { PropTypes, SelectedAriaAttributes } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  createTopLayerController,
  getHasNativePopoverSupport,
  hasNamedSlot,
  hasPropValueChanged,
  isClickOutside,
  parseAndGetAriaAttributes,
  type TopLayerController,
  validateProps,
} from '../../utils';
import { getComponentCss } from './popover-styles';
import {
  getPopoverBorderRadius,
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
  compact: AllowedTypes.boolean,
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

  /** Reduces padding and spacing for a more compact layout, useful in space-constrained interfaces. */
  @Prop() public compact?: boolean;

  /** Sets ARIA attributes on the popover panel to improve accessibility for screen readers. */
  @Prop() public aria?: SelectedAriaAttributes<PopoverAriaAttribute>;

  /** Emitted in controlled mode when the user requests to close the popover via the Escape key or an outside click. */
  @Event({ bubbles: false }) public dismiss?: EventEmitter<void>;

  @State() private isOpen = false;

  private refPopover: HTMLDivElement;
  private refButton: HTMLButtonElement;
  private refSlottedButton: HTMLElement;
  private refArrow: HTMLDivElement;
  private cleanUpAutoUpdate: () => void;
  private hasNativePopoverSupport = getHasNativePopoverSupport();
  // TODO: This should be updated when slot is changed
  private hasSlottedButton: boolean;
  // Keeps the panel on the #top-layer during its fade-out (Chromium via `overlay`; Safari/Firefox via a deferred hide).
  private topLayer: TopLayerController = createTopLayerController({
    getElement: () => this.refPopover,
    isShown: () => this.hasNativePopoverSupport && !!this.refPopover?.matches(':popover-open'),
    show: () => this.hasNativePopoverSupport && this.refPopover?.showPopover(),
    hide: () => this.hasNativePopoverSupport && this.refPopover?.hidePopover(),
  });

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
    // The panel always uses `popover="manual"`, which never light-dismisses, so closing (outside click) is handled here in every mode.
    document.addEventListener('mousedown', this.onClickOutside, true);
  }

  public disconnectedCallback(): void {
    document.removeEventListener('mousedown', this.onClickOutside, true);
    // ensures the deferred top-layer hide is cancelled and floating ui event listeners are removed in case popover is removed from DOM
    this.topLayer.cancel();
    this.handlePopover(false);
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.compact, this.effectiveOpen);

    this.hasSlottedButton = hasNamedSlot(this.host, 'button');

    return (
      <Host onKeyDown={this.onHostKeydown}>
        {this.hasSlottedButton ? (
          <slot name="button" ref={(el: HTMLElement) => (this.refSlottedButton = el)} />
        ) : (
          <button
            type="button"
            onClick={() => !this.isControlled && (this.isOpen = !this.isOpen)}
            {...parseAndGetAriaAttributes({
              ...parseAndGetAriaAttributes(this.aria),
              ...{ 'aria-expanded': this.effectiveOpen },
            })}
            ref={(el) => (this.refButton = el)}
          >
            <span>More information</span>
          </button>
        )}
        {/* The panel stays mounted so it can transition (fade-out) when closing; visibility is driven by `effectiveOpen` via CSS and the top-layer controller. Always `manual` so closing always flows through the controller for a consistent fade-out. */}
        <div popover="manual" aria-hidden={this.effectiveOpen ? 'false' : 'true'} ref={(el) => (this.refPopover = el)}>
          <div class="arrow" ref={(el) => (this.refArrow = el)} />
          {this.description ? <p>{this.description}</p> : <slot />}
        </div>
      </Host>
    );
  }

  public componentDidRender(): void {
    // needs to be called after render cycle so the panel reference exists and visibility can be toggled
    if (this.effectiveOpen) {
      this.topLayer.requestShow();
    } else {
      this.topLayer.requestHide();
    }
    this.handlePopover(this.effectiveOpen);
  }

  private handlePopover = (open: boolean): void => {
    if (open) {
      if (!this.cleanUpAutoUpdate) {
        this.cleanUpAutoUpdate = autoUpdate(
          this.refButton || this.refSlottedButton,
          this.refPopover,
          this.updatePosition
        );
      }
    } else {
      this.cleanUpAutoUpdate?.();
      this.cleanUpAutoUpdate = undefined;
    }
  };

  private onClickOutside = (e: MouseEvent): void => {
    // `popover="manual"` never light-dismisses, so outside clicks are handled here in both controlled and uncontrolled mode
    if (
      this.effectiveOpen &&
      isClickOutside(e, this.refButton || this.refSlottedButton) &&
      isClickOutside(e, this.refPopover)
    ) {
      this.requestClose();
    }
  };

  private onHostKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && this.effectiveOpen) {
      // TODO: How to handle focus when button is slotted?
      if (!this.hasSlottedButton) {
        this.refButton?.focus();
      }
      // `popover="manual"` never light-dismisses, so Escape is handled here for both modes (emits `dismiss` when controlled, otherwise closes)
      this.requestClose();
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
    const { x, y, placement, middlewareData } = await computePosition(
      this.refButton || this.refSlottedButton,
      this.refPopover,
      {
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
          arrow({ element: this.refArrow, padding: getPopoverBorderRadius(this.refPopover) }),
        ],
      }
    );

    const placementVertical = placement === 'top' || placement === 'bottom';
    const placementTopLeft = placement === 'top' || placement === 'left';

    Object.assign(this.refPopover.style, {
      left: `${x}px`,
      top: `${y}px`,
    });

    const { x: xArrow, y: yArrow } = middlewareData.arrow;

    Object.assign(this.refArrow.style, {
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
