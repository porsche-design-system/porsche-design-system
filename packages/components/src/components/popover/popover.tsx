import { arrow, autoUpdate, computePosition, flip, limitShift, offset, shift } from '@floating-ui/dom';
import {
  Component,
  Element,
  Event,
  type EventEmitter,
  forceUpdate,
  Host,
  h,
  type JSX,
  Listen,
  Prop,
  State,
} from '@stencil/core';
import type { PropTypes, SelectedAriaAttributes } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  createTopLayerController,
  hasNamedSlot,
  hasPropValueChanged,
  isClickOutside,
  observeChildren,
  parseAndGetAriaAttributes,
  type TopLayerController,
  unobserveChildren,
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
// The panel is a native `[popover="manual"]` element that the component promotes to the `#top-layer` itself, so it
// always renders above surrounding content regardless of ancestor stacking contexts. The component supports two modes:
// - uncontrolled: `open` is omitted and the component owns visibility via the internal `isOpen` state (toggled by the
//   default info button or a slotted trigger); dismissal closes it directly.
// - controlled: `open` is a boolean and the consumer owns visibility via a slotted `button`; dismissal only emits
//   `dismiss` and the consumer flips `open`. See `isControlled` / `effectiveOpen` for how the two are reconciled.
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

  // The `[popover]` panel element on the #top-layer that holds the content and the arrow.
  private refPopover: HTMLDivElement;
  // The default info button rendered in the Shadow DOM (only present when no `button` slot is used).
  private refButton: HTMLButtonElement;
  // The `<slot name="button">` element (only present when a custom trigger is projected); its assigned element is the
  // actual trigger, see `triggerElement`.
  private refSlotButton: HTMLElement;
  // The visual arrow pointing from the panel to the trigger; positioned by Floating UI's `arrow` middleware.
  private refArrow: HTMLDivElement;
  // Teardown for the active Floating UI `autoUpdate` subscription; `undefined` while not positioning.
  private cleanUpAutoUpdate: () => void;
  // The trigger element `autoUpdate` is currently anchored to, so it can be rebound when the trigger identity changes.
  private boundTriggerElement: HTMLElement;
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
    // Controlled mode is opted into purely by passing a boolean `open`; an omitted (`undefined`) prop means the
    // component manages its own visibility.
    return typeof this.open === 'boolean';
  }

  private get effectiveOpen(): boolean {
    // Single source of truth for "is the panel currently open", regardless of mode: the consumer-owned `open` prop in
    // controlled mode, the internal `isOpen` state otherwise. All render/positioning/dismissal logic reads this.
    return this.isControlled ? this.open : this.isOpen;
  }

  private get triggerElement(): HTMLElement {
    // Resolves the element that actually acts as the trigger: the default info button in the Shadow DOM, or — when a
    // custom trigger is projected through the `button` slot — the assigned light-DOM element itself (not the `<slot>`).
    // Using the assigned element gives Floating UI an accurate anchor rect and lets `:host` use `display: contents`.
    // Kept correct across dynamic slot changes by the `observeChildren` re-render in `connectedCallback`.
    return this.refButton ?? ((this.refSlotButton as HTMLSlotElement)?.assignedElements()[0] as HTMLElement);
  }

  @Listen('click')
  public onClick(e: MouseEvent): void {
    // Toggle open state when the custom slotted button is clicked (uncontrolled mode only; in controlled mode the
    // consumer owns the trigger). The `closest('[slot="button"]')` match already implies a slotted button was clicked —
    // clicks on the default shadow button retarget to the host at the shadow boundary, so `closest(...)` is `null` there
    // and this does not double-toggle (that button toggles via its own inline `onClick`).
    if (!this.isControlled && (e.target as HTMLElement).closest('[slot="button"]') !== null) {
      this.isOpen = !this.isOpen;
    }
  }

  @Listen('focusout')
  public onFocusout(e: FocusEvent): void {
    // Close when keyboard focus leaves the popover entirely (e.g. Tab / Shift+Tab onto another element such as a second
    // popover's trigger). `relatedTarget` is the element receiving focus; only dismiss when it is a real element outside
    // both the host and the panel. A `null` `relatedTarget` means focus was lost without moving to another focusable
    // element (e.g. a mouse click on non-focusable panel content) and must NOT dismiss the popover — those cases are
    // covered by `onClickOutside` / `onEscape`. This keeps keyboard-opening another popover working without any
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

  public connectedCallback(): void {
    // Observe dynamic light-DOM child changes so a slotted `button` being added, removed or replaced re-renders the
    // component (switching between the default info button and the custom trigger). This watches the host's children
    // directly rather than the shadow `slot`, so it also fires for the first button added to an empty popover.
    // Scope is intentionally `childList`-only: `render()` only derives whether a slotted button exists via `hasNamedSlot`,
    // which depends on a direct child carrying `slot="button"` — i.e. an add/remove (as frameworks do when conditionally
    // rendering the trigger). Toggling the `slot` attribute on a persistent element isn't covered on purpose to avoid
    // broadening the observer to `subtree`/`attributes`; matches `p-flyout` / `p-banner` / `p-accordion`.
    observeChildren(
      this.host,
      () => {
        forceUpdate(this.host);
      },
      undefined,
      { subtree: false, childList: true, attributes: false }
    );
  }

  public disconnectedCallback(): void {
    // ensures the deferred top-layer hide is canceled and floating ui event listeners are removed in case popover is removed from DOM
    this.topLayer.cancel();
    this.syncAutoUpdate(false);
    this.syncDismissListeners(false);
    unobserveChildren(this.host);
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.compact, this.effectiveOpen);

    const hasSlottedButton = hasNamedSlot(this.host, 'button');
    const id = 'popover';

    return (
      <Host>
        {hasSlottedButton ? (
          <slot name="button" ref={(el: HTMLElement) => (this.refSlotButton = el)} />
        ) : (
          <button
            type="button"
            onClick={() => !this.isControlled && (this.isOpen = !this.isOpen)}
            {...parseAndGetAriaAttributes({
              ...{ 'aria-label': 'More information' },
              ...{ 'aria-details': id },
              ...parseAndGetAriaAttributes(this.aria),
              ...{ 'aria-expanded': this.effectiveOpen },
            })}
            ref={(el) => (this.refButton = el)}
          />
        )}
        {/* The panel uses `popover="manual"` so the component fully owns open/close timing (no native light-dismiss).
            It stays mounted so it can transition (fade-out) when closing; visibility is driven by `effectiveOpen` via
            CSS and the top-layer controller. Dismissal on outside-click, Escape, and focus leaving the popover is
            handled via `onClickOutside` / `onEscape` / `onFocusout`, keeping the panel on the #top-layer during
            the fade-out. */}
        {/* `inert` (not `aria-hidden`) removes the panel from the a11y tree AND prevents focus while closed / during the
            fade-out. Using `aria-hidden` here triggers a browser warning when a focusable descendant still holds focus
            during the closing transition ("Blocked aria-hidden on an element because its descendant retained focus").
            `inert` avoids that and mirrors the pattern used by `p-modal` / `p-sheet` / `p-drilldown`. */}
        <div id={id} popover="manual" inert={!this.effectiveOpen} ref={(el) => (this.refPopover = el)}>
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
    this.syncAutoUpdate(this.effectiveOpen);
    // Register/unregister the document-level dismiss listeners based on the current open state (idempotent).
    this.syncDismissListeners(this.effectiveOpen);
  }

  private syncAutoUpdate = (active: boolean): void => {
    const triggerElement = this.triggerElement;
    // Rebind if the trigger element identity changed while active. This happens when the children observer swaps
    // between the default shadow button and the slotted `button` (e.g. a `slot="button"` child added/removed/replaced
    // while the popover is already open); `autoUpdate` captured the previous reference at setup and would otherwise stay
    // anchored to the removed element.
    if (active && this.cleanUpAutoUpdate && this.boundTriggerElement !== triggerElement) {
      this.cleanUpAutoUpdate();
      this.cleanUpAutoUpdate = undefined;
    }
    // `triggerElement` can be momentarily undefined (e.g. a slotted button not yet projected), so only bind once it
    // resolves to a real element; the next render (forced by `observeChildren`) re-runs this and binds then.
    if (active && triggerElement && !this.cleanUpAutoUpdate) {
      this.cleanUpAutoUpdate = autoUpdate(triggerElement, this.refPopover, this.positionPopover);
      this.boundTriggerElement = triggerElement;
    } else if (!active && this.cleanUpAutoUpdate) {
      this.cleanUpAutoUpdate();
      this.cleanUpAutoUpdate = undefined;
      this.boundTriggerElement = undefined;
    }
  };

  private positionPopover = async (): Promise<void> => {
    const { x, y, placement, middlewareData } = await computePosition(this.triggerElement, this.refPopover, {
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
    });

    const placementVertical = placement === 'top' || placement === 'bottom';
    const placementTopLeft = placement === 'top' || placement === 'left';

    Object.assign(this.refPopover.style, {
      left: `${x}px`,
      top: `${y}px`,
    });

    const { x: xArrow, y: yArrow } = middlewareData.arrow;

    // Position and orient the arrow so it points from the panel edge towards the trigger. Floating UI's `arrow`
    // middleware only provides the offset along the panel edge (`xArrow` for horizontal edges, `yArrow` for vertical
    // ones); the perpendicular side is pinned to `-12px` so the arrow sits flush against the panel, and its shape is
    // rotated to face the trigger.
    Object.assign(this.refArrow.style, {
      // Triangle shape: pointing down for top/bottom placements, pointing sideways for left/right placements.
      clipPath: placementVertical ? 'polygon(50% 0, 100% 110%, 0 110%)' : 'polygon(0 50%, 110% 0, 110% 100%)',
      // Swap width/height so the base always spans the panel edge the arrow attaches to.
      width: placementVertical ? '24px' : '12px',
      height: placementVertical ? '12px' : '24px',
      // Flip 180° for `top`/`left` so the tip points away from the panel (towards a trigger above/left of it).
      transform: `rotate(${placementTopLeft ? '180deg' : '0'}`,
      // Offset along the edge (`xArrow`) for placements whose arrow lives on a horizontal edge; pinned otherwise.
      left: ['right', 'bottom', 'top'].includes(placement) ? (xArrow != null ? `${xArrow}px` : '-12px') : '',
      right: placement === 'left' ? (xArrow != null ? `${xArrow}px` : '-12px') : '',
      // Offset along the edge (`yArrow`) for placements whose arrow lives on a vertical edge; pinned otherwise.
      top: ['bottom', 'left', 'right'].includes(placement) ? (yArrow != null ? `${yArrow}px` : '-12px') : '',
      bottom: placement === 'top' ? (yArrow != null ? `${yArrow}px` : '-12px') : '',
    });
  };

  private syncDismissListeners = (active: boolean): void => {
    if (active && !this.hasDismissListeners) {
      // capture phase so dismissal happens before focus shifts on outside `mousedown`
      document.addEventListener('mousedown', this.onClickOutside, true);
      document.addEventListener('keydown', this.onEscape);
      this.hasDismissListeners = true;
    } else if (!active && this.hasDismissListeners) {
      document.removeEventListener('mousedown', this.onClickOutside, true);
      document.removeEventListener('keydown', this.onEscape);
      this.hasDismissListeners = false;
    }
  };

  private onClickOutside = (e: MouseEvent): void => {
    // Light-dismiss on outside click. Clicks on the trigger button or inside the panel must not close it; the trigger
    // toggles its own state via the button/`onClick` handlers.
    if (this.effectiveOpen && isClickOutside(e, this.triggerElement) && isClickOutside(e, this.refPopover)) {
      this.dismissPopover();
    }
  };

  private onEscape = (e: KeyboardEvent): void => {
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
    // Move focus to the actually rendered trigger (default info button or the projected custom button).
    this.triggerElement?.focus();
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
}
