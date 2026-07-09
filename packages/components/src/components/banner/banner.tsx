import { Component, Element, Event, type EventEmitter, forceUpdate, h, type JSX, Prop } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  createTopLayerController,
  getSlotTextContent,
  hasNamedSlot,
  hasPropValueChanged,
  observeChildren,
  type TopLayerController,
  unobserveChildren,
  validateProps,
} from '../../utils';
import { FCDismissButton } from '../common/fc-dismiss-button/fc-dismiss-button';
import { NotificationBase } from '../common/notification-base/notification-base';
import { getComponentCss } from './banner-styles';
import {
  BANNER_HEADING_TAGS,
  BANNER_POSITIONS,
  BANNER_STATES,
  type BannerHeadingTag,
  type BannerPosition,
  type BannerState,
  getBannerAriaAttributes,
} from './banner-utils';

const propTypes: Omit<PropTypes<typeof Banner>, 'width'> = {
  open: AllowedTypes.boolean,
  heading: AllowedTypes.string,
  headingTag: AllowedTypes.oneOf<BannerHeadingTag>(BANNER_HEADING_TAGS),
  description: AllowedTypes.string,
  position: AllowedTypes.breakpoint<BannerPosition>(BANNER_POSITIONS),
  state: AllowedTypes.oneOf<BannerState>(BANNER_STATES),
  dismissButton: AllowedTypes.boolean,
};

/**
 * @slot {"name": "heading", "description": "Defines the heading of the banner. Can be used as an alternative to the `heading` prop for rich content." }
 * @slot {"name": "", "description": "Default slot for the banner description content." }
 * @slot {"name": "description", "description": "Deprecated: Use the default slot instead.", "isDeprecated": true }
 *
 * @controlled {"props": ["open"], "event": "dismiss"}
 */
@Component({
  tag: 'p-banner',
  shadow: true,
})
export class Banner {
  @Element() public host!: HTMLElement;

  /** Controls whether the banner is visible. Set to `true` to show it and `false` to hide it. */
  @Prop() public open: boolean = false;

  /** Sets the heading text displayed at the top of the banner. */
  @Prop() public heading?: string = '';

  /** Sets the HTML heading tag (e.g. h2, h3) to maintain correct document structure for the heading. */
  @Prop() public headingTag?: BannerHeadingTag = 'h5';

  /** Sets the supporting description text shown below the heading. */
  @Prop() public description?: string = '';

  /** Sets the position of the banner on screen — `top` or `bottom`. Supports responsive breakpoint values. */
  @Prop() public position?: BreakpointCustomizable<BannerPosition> = { base: 'bottom', s: 'top' };

  /** Sets the visual state of the banner — controls the icon and color scheme (`info`, `warning`, `error`, `success`). */
  @Prop() public state?: BannerState = 'info';

  /** Shows a dismiss button so the user can manually close the banner. */
  @Prop() public dismissButton?: boolean = true;

  /** Emitted when the user closes the banner via the dismiss button or Escape key. */
  @Event({ bubbles: false }) public dismiss?: EventEmitter<void>;

  private refPopover: HTMLElement;
  private refDismiss: HTMLElement;
  private hasHeadingSlot: boolean;
  private hasDescriptionSlot: boolean;
  // Tracks whether the document-level Escape listener is currently registered (guards the idempotent sync below).
  private hasKeydownListener = false;
  // Tracks the component's first render. While `true`, the entry transition (`@starting-style`) is suppressed so an
  // initially-open banner (`open=true` on page load) appears instantly instead of sliding/fading in; flipped to `false`
  // in `componentDidLoad`, so every later (user-triggered) open keeps the entry animation.
  private isInitialRender = true;
  private topLayer: TopLayerController = createTopLayerController({
    getElement: () => this.refPopover,
    isShown: () => !!this.refPopover?.matches(':popover-open'),
    show: () => this.refPopover?.showPopover(),
    hide: () => this.refPopover?.hidePopover(),
  });

  public connectedCallback(): void {
    // Observe dynamic slot changes (only needed until :has-slotted CSS pseudo-class gets better support)
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
    // ensures the deferred top-layer hide is canceled and the Escape listener is removed in case banner is removed from DOM
    this.topLayer.cancel();
    this.syncEscapeListener(false);
    unobserveChildren(this.host);
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public componentDidRender(): void {
    // showPopover/hidePopover needs to be called after render cycle to prepare visibility states of popover in order to focus the dismiss button correctly.
    // `componentDidRender` runs on every render (not only when `open` changes); both controller methods are idempotent.
    if (this.open) {
      this.topLayer.requestShow();
    } else {
      this.topLayer.requestHide();
    }
    // Register/unregister the document-level Escape listener based on the current open state (idempotent). Escape only
    // dismisses when a dismiss button is present, so the listener is gated on `dismissButton` too.
    this.syncEscapeListener(this.open && this.dismissButton);
    this.refDismiss?.focus();
  }

  public componentDidLoad(): void {
    // After the first render the initial-open entry animation has been (intentionally) suppressed; clear the flag so any
    // subsequent user-triggered open renders with `@starting-style` and animates in normally.
    this.isInitialRender = false;
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);

    this.hasHeadingSlot = hasNamedSlot(this.host, 'heading');
    this.hasDescriptionSlot = hasNamedSlot(this.host, 'description');

    attachComponentCss(
      this.host,
      getComponentCss,
      this.open,
      this.position,
      this.state,
      this.dismissButton,
      !!(this.heading || this.hasHeadingSlot),
      this.isInitialRender
    );

    const headingText = this.heading ? this.heading : getSlotTextContent(this.host, 'heading');

    return (
      <div
        popover="manual"
        // `inert` (not `aria-hidden`) removes the panel from the a11y tree AND prevents focus while closed / during the
        // fade-out. Using `aria-hidden` here triggers a browser warning when a focusable descendant still holds focus
        // during the closing transition ("Blocked aria-hidden on an element because its descendant retained focus").
        // `inert` avoids that and mirrors the pattern used by `p-modal` / `p-popover` / `p-drilldown`.
        inert={!this.open}
        {...getBannerAriaAttributes(this.state, headingText)}
        ref={(el: HTMLElement) => (this.refPopover = el)}
      >
        <NotificationBase
          heading={this.heading}
          headingTag={this.headingTag}
          hasHeadingSlot={this.hasHeadingSlot}
          description={this.description}
          hasDescriptionSlot={this.hasDescriptionSlot}
          {...(this.dismissButton && {
            dismissButton: (
              <FCDismissButton
                label="Close banner"
                onClick={this.dismissBanner}
                ariaDescription={headingText || undefined}
                refCallback={(el) => (this.refDismiss = el)}
              />
            ),
          })}
        />
      </div>
    );
  }

  private syncEscapeListener = (active: boolean): void => {
    if (active && !this.hasKeydownListener) {
      document.addEventListener('keydown', this.onEscape);
      this.hasKeydownListener = true;
    } else if (!active && this.hasKeydownListener) {
      document.removeEventListener('keydown', this.onEscape);
      this.hasKeydownListener = false;
    }
  };

  private onEscape = (e: KeyboardEvent): void => {
    // Guarded by `this.open` (mirrors `p-popover`) so it never emits `dismiss` for an already-closed banner, even
    // though the listener is only registered while open — defense-in-depth against transitional windows.
    if (e.key === 'Escape' && this.open) {
      this.dismissBanner();
    }
  };

  private dismissBanner = (): void => {
    this.dismiss.emit();
  };
}
