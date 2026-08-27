import { Component, Element, Event, type EventEmitter, forceUpdate, h, type JSX, Prop } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes, SelectedAriaAttributes } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  createTopLayerController,
  getSlotTextContent,
  hasNamedSlot,
  hasPropValueChanged,
  isDialogBackdropTarget,
  observeChildren,
  onCancelDialog,
  onClickDialog,
  parseAndGetAriaAttributes,
  setScrollLock,
  showDialog,
  type TopLayerController,
  unobserveChildren,
  validateProps,
} from '../../utils';
import { onTransitionEnd } from '../../utils/dialog/dialog';
import { observeStickyArea } from '../../utils/dialog/observer';
import { DialogBase } from '../common/dialog-base/dialog-base';
import { BACKDROPS } from '../common/dialog-base/dialog-base-styles';
import { getComponentCss } from './flyout-styles';
import {
  addStickyTopCssVarStyleSheet,
  FLYOUT_ARIA_ATTRIBUTES,
  FLYOUT_BACKGROUNDS,
  FLYOUT_FOOTER_BEHAVIOR,
  FLYOUT_POSITIONS,
  type FlyoutAriaAttribute,
  type FlyoutBackdrop,
  type FlyoutBackground,
  type FlyoutDismissEventDetail,
  type FlyoutFooterBehavior,
  type FlyoutMotionHiddenEndEventDetail,
  type FlyoutMotionVisibleEndEventDetail,
  type FlyoutPosition,
  handleUpdateStickyTopCssVar,
} from './flyout-utils';

const propTypes: PropTypes<typeof Flyout> = {
  open: AllowedTypes.boolean,
  background: AllowedTypes.oneOf<FlyoutBackground>(FLYOUT_BACKGROUNDS),
  position: AllowedTypes.oneOf<FlyoutPosition>(FLYOUT_POSITIONS),
  disableBackdropClick: AllowedTypes.boolean,
  backdrop: AllowedTypes.oneOf<FlyoutBackdrop>(BACKDROPS),
  fullscreen: AllowedTypes.breakpoint('boolean'),
  footerBehavior: AllowedTypes.oneOf<FlyoutFooterBehavior>(FLYOUT_FOOTER_BEHAVIOR),
  aria: AllowedTypes.aria<FlyoutAriaAttribute>(FLYOUT_ARIA_ATTRIBUTES),
};

/**
 * @slot {"name": "header", "description": "Renders a sticky header section above the content area." }
 * @slot {"name": "", "description": "Default slot for the main content." }
 * @slot {"name": "footer", "description": "Shows a sticky footer section, flowing under the content area when scrollable." }
 * @slot {"name": "sub-footer", "description": "Renders additional content below the footer, such as legal information or FAQs. It appears when the flyout has enough space or when the user scrolls to the end." }
 *
 * @controlled {"props": ["open"], "event": "dismiss"}
 */
@Component({
  tag: 'p-flyout',
  shadow: true,
})
export class Flyout {
  @Element() public host!: HTMLElement;

  /** Controls whether the flyout panel is visible. */
  @Prop() public open: boolean = false;

  /** Sets the side the flyout slides in from — `start` for left or `end` for right in LTR layouts. */
  @Prop() public position?: FlyoutPosition = 'end';

  /** When enabled, clicking the backdrop will not close the flyout. */
  @Prop() public disableBackdropClick?: boolean = false;

  /** Sets the background color of the flyout panel (`canvas` or `surface`). */
  @Prop() public background?: FlyoutBackground = 'canvas';

  /** Sets the backdrop style. Use `blur` when background content is irrelevant; use `shading` when users still need visual context. */
  @Prop() public backdrop?: FlyoutBackdrop = 'blur';

  /** Controls footer behavior. `fixed` keeps it anchored at the bottom; `sticky` pins it only when content overflows. */
  @Prop() public footerBehavior?: FlyoutFooterBehavior = 'sticky';

  /** If true the flyout stretches to the full viewport width with squared corners. Useful for smaller viewports where the flyout would otherwise fill the screen but still show rounded corners. */
  @Prop() public fullscreen?: BreakpointCustomizable<boolean> = false;

  /** Sets ARIA attributes on the flyout dialog element for improved screen reader accessibility. */
  @Prop() public aria?: SelectedAriaAttributes<FlyoutAriaAttribute>;

  /** Emitted when the user closes the flyout via the dismiss button, backdrop click, or Escape key. The event detail identifies which of the three was used. */
  @Event({ bubbles: false }) public dismiss?: EventEmitter<FlyoutDismissEventDetail>;

  /** Emitted after the flyout's open transition completes and the panel is fully visible. */
  @Event({ bubbles: false }) public motionVisibleEnd?: EventEmitter<FlyoutMotionVisibleEndEventDetail>;

  /** Emitted after the flyout's close transition completes and the panel is fully hidden. */
  @Event({ bubbles: false }) public motionHiddenEnd?: EventEmitter<FlyoutMotionHiddenEndEventDetail>;

  private dialog: HTMLDialogElement;
  private scroller: HTMLDivElement;
  private header: HTMLSlotElement;
  private footer: HTMLSlotElement;
  private hasHeader: boolean;
  private hasFooter: boolean;
  private hasSubFooter: boolean;
  // Tracks whether the current pointer gesture started inside the panel (not on the backdrop). Lets `onClickDialog`
  // skip dismissal when a selection is dragged out of the panel and released on the backdrop.
  private isPointerDownInside = false;
  private topLayer: TopLayerController = createTopLayerController({
    getElement: () => this.dialog,
    isShown: () => !!this.dialog?.open,
    show: () => showDialog(this.dialog, this.scroller),
    hide: () => this.dialog?.close(),
  });

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public connectedCallback(): void {
    // Observe dynamic slot changes
    observeChildren(
      this.host,
      () => {
        forceUpdate(this.host);
      },
      undefined,
      { subtree: false, childList: true, attributes: false }
    );
  }

  public componentWillRender(): void {
    setScrollLock(this.open);
  }

  public componentDidRender(): void {
    if (this.open) {
      this.topLayer.requestShow();
    } else {
      this.topLayer.requestHide();
    }
  }

  public componentDidLoad(): void {
    addStickyTopCssVarStyleSheet(this.host);
    // Has to be called here instead of render to assure that the slot references are available
    this.updateSlotObserver();
  }

  public componentDidUpdate(): void {
    // Has to be called here instead of render to assure that the slot references are available
    this.updateSlotObserver();
  }

  public disconnectedCallback(): void {
    setScrollLock(false);
    this.topLayer.cancel();
    unobserveChildren(this.host);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);

    this.hasHeader = hasNamedSlot(this.host, 'header');
    this.hasFooter = hasNamedSlot(this.host, 'footer');
    this.hasSubFooter = hasNamedSlot(this.host, 'sub-footer');

    attachComponentCss(
      this.host,
      getComponentCss,
      this.open,
      this.background,
      this.backdrop,
      this.position,
      this.hasHeader,
      this.hasFooter,
      this.hasSubFooter,
      this.footerBehavior,
      this.fullscreen
    );

    return (
      <DialogBase
        // `inert` (not `aria-hidden`) removes the panel from the a11y tree AND prevents focus while closed / during the
        // fade-out. Using `aria-hidden` here triggers a browser warning when a focusable descendant still holds focus
        // during the closing transition ("Blocked aria-hidden on an element because its descendant retained focus").
        // `inert` avoids that and mirrors the pattern used by `p-modal` / `p-popover` / `p-drilldown`.
        inert={!this.open}
        dialogRef={(el) => (this.dialog = el)}
        scrollerRef={(el) => (this.scroller = el)}
        dismissable={true}
        onCancel={this.onDialogCancel}
        onMouseDown={(e) => (this.isPointerDownInside = !isDialogBackdropTarget(e))}
        onClick={this.onDialogBackdropClick}
        onTransitionEnd={(e) => onTransitionEnd(e, this.open, this.motionVisibleEnd, this.motionHiddenEnd)}
        onDismiss={this.onDismissButtonClick}
        containerClass="flyout"
        header={this.hasHeader ? <slot name="header" ref={(el: HTMLSlotElement) => (this.header = el)} /> : undefined}
        footer={this.hasFooter ? <slot name="footer" ref={(el: HTMLSlotElement) => (this.footer = el)} /> : undefined}
        subFooter={this.hasSubFooter ? <slot name="sub-footer" /> : undefined}
        ariaAttributes={parseAndGetAriaAttributes({
          'aria-modal': true,
          ...{ 'aria-label': this.hasHeader ? getSlotTextContent(this.host, 'header') : 'Flyout' },
          ...parseAndGetAriaAttributes(this.aria),
        })}
      >
        <slot />
      </DialogBase>
    );
  }

  private onDialogCancel = (e: Event): void => onCancelDialog(e, () => this.dismissDialog('escape'));

  private onDialogBackdropClick = (e: MouseEvent): void =>
    onClickDialog(e, () => this.dismissDialog('backdrop'), this.disableBackdropClick, this.isPointerDownInside);

  private onDismissButtonClick = (): void => this.dismissDialog('dismiss-button');

  private dismissDialog = (reason: FlyoutDismissEventDetail['reason']): void => {
    this.dismiss.emit({ reason });
  };

  private updateSlotObserver = (): void => {
    if (this.hasHeader) {
      // When slots change dynamically the intersection observer for the scroll shadows has to be added
      observeStickyArea(this.scroller, this.header);
    }
    if (this.hasFooter) {
      // When slots change dynamically the intersection observer for the scroll shadows has to be added
      observeStickyArea(this.scroller, this.footer);
    }
    // When header slot changes dynamically the resize observer and adopted stylesheet for the CSS custom property --p-flyout-sticky-top has to be updated
    handleUpdateStickyTopCssVar(this.host, this.hasHeader, this.header);
  };
}
