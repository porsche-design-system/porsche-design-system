import { arrow, autoUpdate, computePosition, flip, limitShift, offset, shift } from '@floating-ui/dom';
import { Component, Element, Event, type EventEmitter, Host, h, type JSX, Listen, Prop, State } from '@stencil/core';
import type { PropTypes, SelectedAriaAttributes } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  createTopLayerController,
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
  private refSlotButton: HTMLElement;
  private refArrow: HTMLDivElement;
  private cleanUpAutoUpdate: () => void;
  // TODO: This should be updated when slot is changed
  private hasSlottedButton: boolean;
  // Tracks whether the document-level dismiss listeners (outside click / Escape) are currently registered.
  private hasDismissListeners = false;
  // Keeps the panel on the #top-layer during its fade-out (Chromium via `overlay`; Safari/Firefox via a deferred hide).
  private topLayer: TopLayerController = createTopLayerController({
    getElement: () => this.refPopover,
    isShown: () => !!this.refPopover?.matches(':popover-open'),
    show: () => this.refPopover?.showPopover(),
    hide: () => this.refPopover?.hidePopover(),
  });

  private get isControlled(): boolean {
    return typeof this.open === 'boolean';
  }

  private get effectiveOpen(): boolean {
    return this.isControlled ? this.open : this.isOpen;
  }

  @Listen('click')
  public onClick(e: MouseEvent): void {
    // Handle opening when custom slotted button is clicked (uncontrolled mode only; in controlled mode the consumer owns
    // the trigger)
    if (!this.isControlled && this.hasSlottedButton && (e.target as HTMLElement).closest('[slot="button"]') !== null) {
      this.isOpen = !this.isOpen;
    }
  }

  @Listen('focusout')
  public onFocusout(e: FocusEvent): void {
    // Close when keyboard focus leaves the popover entirely (e.g. Tab / Shift+Tab onto another element such as a second
    // popover's trigger). `relatedTarget` is the element receiving focus; only dismiss when it is a real element outside
    // both the host and the panel. A `null` `relatedTarget` means focus was lost without moving to another focusable
    // element (e.g. a mouse click on non-focusable panel content) and must NOT dismiss the popover — those cases are
    // covered by `onClickOutside` / `onKeyboardEvent`. This keeps keyboard-opening another popover working without any
    // document-level coordination.
    const relatedTarget = e.relatedTarget as HTMLElement | null;
    if (
      this.effectiveOpen &&
      relatedTarget &&
      !this.host.contains(relatedTarget) &&
      !this.refPopover?.contains(relatedTarget)
    ) {
      this.dismissPopover();
    }
  }

  public disconnectedCallback(): void {
    // ensures the deferred top-layer hide is cancelled and floating ui event listeners are removed in case popover is removed from DOM
    this.topLayer.cancel();
    this.handlePopover(false);
    this.updateDismissListeners(false);
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.compact, this.effectiveOpen);

    this.hasSlottedButton = hasNamedSlot(this.host, 'button');

    return (
      <Host>
        {this.hasSlottedButton ? (
          <slot name="button" ref={(el: HTMLElement) => (this.refSlotButton = el)} />
        ) : (
          <button
            type="button"
            onClick={() => !this.isControlled && (this.isOpen = !this.isOpen)}
            {...parseAndGetAriaAttributes({
              ...{ 'aria-label': 'More information' },
              ...parseAndGetAriaAttributes(this.aria),
              ...{ 'aria-expanded': this.effectiveOpen },
            })}
            ref={(el) => (this.refButton = el)}
          />
        )}
        {/* The panel uses `popover="manual"` so the component fully owns open/close timing (no native light-dismiss).
            It stays mounted so it can transition (fade-out) when closing; visibility is driven by `effectiveOpen` via
            CSS and the top-layer controller. Dismissal on outside-click, Escape, and focus leaving the popover is
            handled via `onClickOutside` / `onKeyboardEvent` / `onFocusout`, keeping the panel on the #top-layer during
            the fade-out. */}
        {/* `inert` (not `aria-hidden`) removes the panel from the a11y tree AND prevents focus while closed / during the
            fade-out. Using `aria-hidden` here triggers a browser warning when a focusable descendant still holds focus
            during the closing transition ("Blocked aria-hidden on an element because its descendant retained focus").
            `inert` avoids that and mirrors the pattern used by `p-modal` / `p-sheet` / `p-drilldown`. */}
        <div popover="manual" inert={!this.effectiveOpen} ref={(el) => (this.refPopover = el)}>
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
    // Register/unregister the document-level dismiss listeners based on the current open state (idempotent).
    this.updateDismissListeners(this.effectiveOpen);
  }

  private handlePopover = (open: boolean): void => {
    if (open) {
      if (!this.cleanUpAutoUpdate) {
        this.cleanUpAutoUpdate = autoUpdate(
          this.refButton || this.refSlotButton,
          this.refPopover,
          this.updatePosition
        );
      }
    } else {
      this.cleanUpAutoUpdate?.();
      this.cleanUpAutoUpdate = undefined;
    }
  };


  private dismissPopover = (): void => {
    // Centralizes the dismissal behavior: in controlled mode the consumer owns the open state, so only emit `dismiss`;
    // in uncontrolled mode the component closes itself. The fade-out and top-layer removal are handled by the
    // top-layer controller on the next render.
    if (this.isControlled) {
      this.dismiss.emit();
    } else {
      this.isOpen = false;
    }
  };

  private onClickOutside = (e: MouseEvent): void => {
    // Light-dismiss on outside click. Clicks on the trigger button or inside the panel must not close it; the trigger
    // toggles its own state via the button/`onClick` handlers.
    if (
      this.effectiveOpen &&
      isClickOutside(e, this.refButton || this.refSlotButton) &&
      isClickOutside(e, this.refPopover)
    ) {
      this.dismissPopover();
    }
  };

  private onKeyboardEvent = (e: KeyboardEvent): void => {
    // `popover="manual"` does not light-dismiss, so Escape is handled manually (mirrors `p-banner`).
    if (e.key === 'Escape' && this.effectiveOpen) {
      // Return focus to the trigger before closing so keyboard users are not stranded on the (about to be `inert`)
      // panel content. Focus must move synchronously here: the closing re-render marks the panel `inert`, which would
      // otherwise drop focus to `<body>`. Mirrors the focus-restore behavior of native `<dialog>` (`p-modal` / `p-flyout`).
      this.focusTrigger();
      this.dismissPopover();
    }
  };

  private focusTrigger = (): void => {
    // Default (info) button lives in the Shadow DOM; the custom trigger is projected through the `button` slot, so
    // resolve the actually rendered element to move focus to.
    const trigger =
      this.refButton ?? ((this.refSlotButton as HTMLSlotElement)?.assignedElements()[0] as HTMLElement | undefined);
    trigger?.focus();
  };

  private updateDismissListeners = (open: boolean): void => {
    if (open && !this.hasDismissListeners) {
      // capture phase so dismissal happens before focus shifts on outside `mousedown`
      document.addEventListener('mousedown', this.onClickOutside, true);
      document.addEventListener('keydown', this.onKeyboardEvent);
      this.hasDismissListeners = true;
    } else if (!open && this.hasDismissListeners) {
      document.removeEventListener('mousedown', this.onClickOutside, true);
      document.removeEventListener('keydown', this.onKeyboardEvent);
      this.hasDismissListeners = false;
    }
  };

  private updatePosition = async (): Promise<void> => {
    const { x, y, placement, middlewareData } = await computePosition(
      this.refButton || this.refSlotButton,
      this.refPopover,
      {
        placement: this.direction,
        // Use the `fixed` strategy because the panel is promoted to the `#top-layer` via `showPopover()`. Safari does
        // not resolve a top-layer element's `offsetParent` synchronously after `showPopover()`, so the default
        // `absolute` strategy computes offsets against a wrong/zero origin and mis-places the panel at the top-left
        // until a resize re-triggers `autoUpdate`. `fixed` positions relative to the viewport and avoids this.
        strategy: 'fixed',
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
