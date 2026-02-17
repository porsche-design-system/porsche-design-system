import { Component, Element, Event, type EventEmitter, forceUpdate, h, type JSX, Prop } from '@stencil/core';
import { BACKDROPS } from '../../styles/dialog-styles';
import type { BreakpointCustomizable, PropTypes, SelectedAriaAttributes } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  getSlotTextContent,
  hasNamedSlot,
  hasPropValueChanged,
  observeChildren,
  onCancelDialog,
  onClickDialog,
  parseAndGetAriaAttributes,
  setDialogVisibility,
  setScrollLock,
  unobserveChildren,
  validateProps,
  warnIfAriaAndHeadingPropsAreUndefined,
} from '../../utils';
import { onTransitionEnd } from '../../utils/dialog/dialog';
import { observeStickyArea } from '../../utils/dialog/observer';
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

  /** If true, the modal is open. */
  @Prop() public open: boolean = false; // eslint-disable-line @typescript-eslint/no-inferrable-types

  /** If false, the modal will not have a dismiss button. */
  @Prop() public dismissButton?: boolean = true;

  /** If true, the modal will not be closable via backdrop click. */
  @Prop() public disableBackdropClick?: boolean = false;

  /** Defines the backdrop, 'blur' (should be used when Modal is opened by user interaction, e.g. after a click on a button) and 'shading' (should be used when Modal gets opened automatically, e.g. Cookie Consent). */
  @Prop() public backdrop?: ModalBackdrop = 'blur';

  /** Defines the background color */
  @Prop() public background?: ModalBackground = 'canvas';

  /** If true the modal uses max viewport height and width. Should only be used for mobile. */
  @Prop() public fullscreen?: BreakpointCustomizable<boolean> = false;

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<ModalAriaAttribute>;

  /** Emitted when the component requests to be dismissed. */
  @Event({ bubbles: false }) public dismiss?: EventEmitter<void>;

  /** Emitted when the modal is opened and the transition is finished. */
  @Event({ bubbles: false }) public motionVisibleEnd?: EventEmitter<ModalMotionVisibleEndEventDetail>;

  /** Emitted when the modal is closed and the transition is finished. */
  @Event({ bubbles: false }) public motionHiddenEnd?: EventEmitter<ModalMotionHiddenEndEventDetail>;

  private dialog: HTMLDialogElement;
  private scroller: HTMLDivElement;
  private footer: HTMLSlotElement;
  private hasHeader: boolean;
  private hasFooter: boolean;

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
    setDialogVisibility(this.open, this.dialog, this.scroller);
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

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <dialog
        inert={!this.open} // prevents focusable elements during fade-out transition + prevents focusable elements within nested open accordion
        tabIndex={-1} // dialog always has a dismiss button to be focused
        ref={(el) => (this.dialog = el)}
        onCancel={(e) => onCancelDialog(e, this.dismissDialog, !this.dismissButton)}
        // Previously done with onMouseDown to change the click behavior (not closing when pressing mousedown on modal and mouseup on backdrop) but changed back to native behavior
        onClick={(e) => onClickDialog(e, this.dismissDialog, this.disableBackdropClick)}
        onTransitionEnd={(e) => onTransitionEnd(e, this.open, this.motionVisibleEnd, this.motionHiddenEnd)}
        {...parseAndGetAriaAttributes({
          'aria-modal': true,
          ...(this.hasHeader && { 'aria-label': this.ariaLabel() }),
          ...parseAndGetAriaAttributes(this.aria),
        })}
      >
        <div class="scroller" ref={(el) => (this.scroller = el)}>
          <div class="modal">
            {this.dismissButton && (
              <PrefixedTagNames.pButton
                class="dismiss"
                variant="secondary"
                compact={true}
                type="button"
                hideLabel={true}
                icon="close"
                onClick={this.dismissDialog}
              >
                Dismiss modal
              </PrefixedTagNames.pButton>
            )}
            {this.hasHeader && <slot name="header" />}
            <slot />
            {this.hasFooter && <slot name="footer" ref={(el: HTMLSlotElement) => (this.footer = el)} />}
          </div>
        </div>
      </dialog>
    );
  }

  private dismissDialog = (): void => {
    this.dismiss.emit();
  };

  private ariaLabel = (): string => {
    return hasNamedSlot(this.host, 'header') && getSlotTextContent(this.host, 'header');
  };
}
