import { Component, Element, Event, type EventEmitter, forceUpdate, h, type JSX, Prop } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes, SelectedAriaAttributes } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  createTopLayerController,
  getSlotTextContent,
  hasNamedSlot,
  hasPropValueChanged,
  observeChildren,
  onCancelDialog,
  onClickDialog,
  parseAndGetAriaAttributes,
  setScrollLock,
  showDialog,
  type TopLayerController,
  unobserveChildren,
  validateProps,
  warnIfAriaAndHeadingPropsAreUndefined,
} from '../../utils';
import { onTransitionEnd } from '../../utils/dialog/dialog';
import { observeStickyArea } from '../../utils/dialog/observer';
import { DialogBase } from '../common/dialog-base/dialog-base';
import { BACKDROPS } from '../common/dialog-base/dialog-base-styles';
import { getComponentCss } from './modal-styles';
import {
  MODAL_ARIA_ATTRIBUTES,
  MODAL_BACKGROUNDS,
  type ModalAriaAttribute,
  type ModalBackdrop,
  type ModalBackground,
  type ModalMotionHiddenEndEventDetail,
  type ModalMotionVisibleEndEventDetail,
} from './modal-utils';

const propTypes: PropTypes<typeof Modal> = {
  open: AllowedTypes.boolean,
  dismissButton: AllowedTypes.boolean,
  disableBackdropClick: AllowedTypes.boolean,
  background: AllowedTypes.oneOf<ModalBackground>(MODAL_BACKGROUNDS),
  backdrop: AllowedTypes.oneOf<ModalBackdrop>(BACKDROPS),
  fullscreen: AllowedTypes.breakpoint('boolean'),
  aria: AllowedTypes.aria<ModalAriaAttribute>(MODAL_ARIA_ATTRIBUTES),
};

/**
 * @slot {"name": "header", "description": "Renders a header section above the content area." }
 * @slot {"name": "", "description": "Default slot for the main content." }
 * @slot {"name": "footer", "description": "Shows a sticky footer section, flowing under the content area when scrollable." }
 *
 * @controlled {"props": ["open"], "event": "dismiss"}
 */
@Component({
  tag: 'p-modal',
  shadow: true,
})
export class Modal {
  @Element() public host!: HTMLElement;

  /** Controls whether the modal dialog is visible. */
  @Prop() public open: boolean = false;

  /** Shows a dismiss button in the modal header so the user can manually close it. */
  @Prop() public dismissButton?: boolean = true;

  /** When enabled, clicking the backdrop will not close the modal. */
  @Prop() public disableBackdropClick?: boolean = false;

  /** Sets the backdrop style. Use `blur` when the modal is opened by user interaction; use `shading` when opened automatically (e.g. Cookie Consent). */
  @Prop() public backdrop?: ModalBackdrop = 'blur';

  /** Sets the background color of the modal panel (`canvas` or `surface`). */
  @Prop() public background?: ModalBackground = 'canvas';

  /** Expands the modal to the full viewport size, intended for mobile use cases. Supports responsive breakpoint values. */
  @Prop() public fullscreen?: BreakpointCustomizable<boolean> = false;

  /** Sets ARIA attributes on the dialog element for improved accessibility when no visible heading is present. */
  @Prop() public aria?: SelectedAriaAttributes<ModalAriaAttribute>;

  /** Emitted when the user closes the modal via the dismiss button, backdrop click, or Escape key. */
  @Event({ bubbles: false }) public dismiss?: EventEmitter<void>;

  /** Emitted after the modal's open transition completes and the dialog is fully visible. */
  @Event({ bubbles: false }) public motionVisibleEnd?: EventEmitter<ModalMotionVisibleEndEventDetail>;

  /** Emitted after the modal's close transition completes and the dialog is fully hidden. */
  @Event({ bubbles: false }) public motionHiddenEnd?: EventEmitter<ModalMotionHiddenEndEventDetail>;

  private dialog: HTMLDialogElement;
  private scroller: HTMLDivElement;
  private footer: HTMLSlotElement;
  private hasHeader: boolean;
  private hasFooter: boolean;
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
    if (this.hasFooter) {
      // Has to be called here instead of render to assure that the slot references are available
      observeStickyArea(this.scroller, this.footer);
    }
  }

  public componentDidUpdate(): void {
    if (this.hasFooter) {
      // Has to be called here instead of render to assure that the slot references are available
      // When slots change dynamically the intersection observer for the scroll shadows has to be added
      observeStickyArea(this.scroller, this.footer);
    }
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

    // TODO: why do we validate only when opened?
    if (this.open) {
      warnIfAriaAndHeadingPropsAreUndefined(this.host, this.hasHeader, this.aria);
    }

    attachComponentCss(
      this.host,
      getComponentCss,
      this.open,
      this.background,
      this.backdrop,
      this.fullscreen,
      this.dismissButton,
      this.hasHeader,
      this.hasFooter
    );

    return (
      <DialogBase
        host={this.host}
        // `inert` (not `aria-hidden`) removes the panel from the a11y tree AND prevents focus while closed / during the
        // fade-out. Using `aria-hidden` here triggers a browser warning when a focusable descendant still holds focus
        // during the closing transition ("Blocked aria-hidden on an element because its descendant retained focus").
        // `inert` avoids that and mirrors the pattern used by `p-flyout` / `p-popover` / `p-drilldown`.
        inert={!this.open}
        dialogRef={(el) => (this.dialog = el)}
        scrollerRef={(el) => (this.scroller = el)}
        dismissable={this.dismissButton ?? undefined}
        containerClass="modal"
        onCancel={(e) => onCancelDialog(e, this.dismissDialog, !this.dismissButton)}
        onClick={(e) => onClickDialog(e, this.dismissDialog, this.disableBackdropClick)}
        onTransitionEnd={(e) => onTransitionEnd(e, this.open, this.motionVisibleEnd, this.motionHiddenEnd)}
        onDismiss={this.dismissButton ? this.dismissDialog : undefined}
        header={this.hasHeader ? <slot name="header" /> : undefined}
        footer={this.hasFooter ? <slot name="footer" ref={(el: HTMLSlotElement) => (this.footer = el)} /> : undefined}
        ariaAttributes={parseAndGetAriaAttributes({
          'aria-modal': true,
          ...(this.hasHeader && { 'aria-label': this.ariaLabel() }),
          ...parseAndGetAriaAttributes(this.aria),
        })}
      >
        <slot />
      </DialogBase>
    );
  }

  private dismissDialog = (): void => {
    this.dismiss.emit();
  };

  private ariaLabel = (): string => {
    return hasNamedSlot(this.host, 'header') && getSlotTextContent(this.host, 'header');
  };
}
