import { Component, Element, Event, type EventEmitter, h, type JSX, Prop } from '@stencil/core';
import type { PropTypes, SelectedAriaAttributes } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  createTopLayerController,
  getSlotTextContent,
  hasNamedSlot,
  hasPropValueChanged,
  isDialogBackdropTarget,
  onCancelDialog,
  onClickDialog,
  parseAndGetAriaAttributes,
  setScrollLock,
  showDialog,
  type TopLayerController,
  validateProps,
  warnIfAriaAndHeadingPropsAreUndefined,
} from '../../utils';
import { onTransitionEnd } from '../../utils/dialog/dialog';
import { DialogBase } from '../common/dialog-base/dialog-base';
import { getComponentCss } from './sheet-styles';
import {
  createSheetSwipeController,
  SHEET_ARIA_ATTRIBUTES,
  SHEET_BACKGROUNDS,
  type SheetAriaAttribute,
  type SheetBackground,
  type SheetDismissEventDetail,
  type SheetMotionHiddenEndEventDetail,
  type SheetMotionVisibleEndEventDetail,
  type SheetSwipeController,
} from './sheet-utils';

const propTypes: PropTypes<typeof Sheet> = {
  open: AllowedTypes.boolean,
  dismissButton: AllowedTypes.boolean,
  disableBackdropClick: AllowedTypes.boolean,
  background: AllowedTypes.oneOf<SheetBackground>(SHEET_BACKGROUNDS),
  swipeHandle: AllowedTypes.boolean,
  aria: AllowedTypes.aria<SheetAriaAttribute>(SHEET_ARIA_ATTRIBUTES),
};

/**
 * @slot {"name": "header", "description": "Renders a header section above the content area." }
 * @slot {"name": "", "description": "Default slot for the main content." }
 *
 * @controlled {"props": ["open"], "event": "dismiss"}
 */
@Component({
  tag: 'p-sheet',
  shadow: true,
})
export class Sheet {
  @Element() public host!: HTMLElement;

  /** Controls whether the sheet panel slides in from the bottom and is visible to the user. */
  @Prop() public open: boolean = false;

  /** Shows a dismiss button in the sheet header so users can manually close it. */
  @Prop() public dismissButton?: boolean = true;

  /**When enabled, clicking the backdrop will not close the sheet. */
  @Prop() public disableBackdropClick?: boolean = false;

  /** Sets the background color of the sheet panel (`canvas` or `surface`). */
  @Prop() public background?: SheetBackground = 'canvas';

  /** Shows a swipe handle and lets a downward drag close the sheet when its content is scrolled to the top. */
  @Prop() public swipeHandle?: boolean = false;

  /** Sets ARIA attributes on the sheet dialog element for improved accessibility when the default `aria-label` is insufficient. */
  @Prop() public aria?: SelectedAriaAttributes<SheetAriaAttribute>;

  /** Emitted when the user closes the sheet via the dismiss button, swipe handle, backdrop click, Escape key, or a downward swipe. The event detail identifies which was used. */
  @Event({ bubbles: false }) public dismiss?: EventEmitter<SheetDismissEventDetail>;

  /** Emitted after the sheet's open transition has fully completed and the panel is visible. */
  @Event({ bubbles: false }) public motionVisibleEnd?: EventEmitter<SheetMotionVisibleEndEventDetail>;

  /** Emitted after the sheet's close transition has fully completed and the panel is hidden. */
  @Event({ bubbles: false }) public motionHiddenEnd?: EventEmitter<SheetMotionHiddenEndEventDetail>;

  private dialog: HTMLDialogElement;
  private scroller: HTMLDivElement;
  private sheet: HTMLDivElement;
  private swipeHandleButton: HTMLButtonElement;
  private hasHeader: boolean;
  // Tracks whether the current pointer gesture started inside the panel (not on the backdrop). Lets `onClickDialog`
  // skip dismissal when a selection is dragged out of the panel and released on the backdrop.
  private isPointerDownInside = false;
  private topLayer: TopLayerController = createTopLayerController({
    getElement: () => this.dialog,
    isShown: () => !!this.dialog?.open,
    show: () => showDialog(this.dialog, this.scroller),
    hide: () => this.dialog?.close(),
  });
  private swipeController: SheetSwipeController = createSheetSwipeController({
    getDialog: () => this.dialog,
    getScroller: () => this.scroller,
    getSheet: () => this.sheet,
    getSwipeHandle: () => this.swipeHandleButton,
    isOpen: () => this.open,
    hasSwipeHandle: () => !!this.swipeHandle,
    onSwipeDismiss: () => this.dismissDialog('swipe'),
  });

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public componentWillRender(): void {
    setScrollLock(this.open);
  }

  public componentDidRender(): void {
    this.swipeController.sync();
    if (this.open) {
      this.topLayer.requestShow();
    } else {
      this.topLayer.requestHide();
    }
  }

  public disconnectedCallback(): void {
    setScrollLock(false);
    this.topLayer.cancel();
    this.swipeController.destroy();
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);

    this.hasHeader = hasNamedSlot(this.host, 'header');

    if (this.open) {
      warnIfAriaAndHeadingPropsAreUndefined(this.host, this.hasHeader, this.aria);
    }

    attachComponentCss(this.host, getComponentCss, this.open, this.background, this.dismissButton, this.swipeHandle);

    return (
      <DialogBase
        // `inert` (not `aria-hidden`) removes the panel from the a11y tree AND prevents focus while closed / during the
        // fade-out. Using `aria-hidden` here triggers a browser warning when a focusable descendant still holds focus
        // during the closing transition ("Blocked aria-hidden on an element because its descendant retained focus").
        // `inert` avoids that and mirrors the pattern used by `p-modal` / `p-popover` / `p-drilldown`.
        inert={!this.open}
        dialogRef={(el) => (this.dialog = el)}
        scrollerRef={(el) => (this.scroller = el)}
        containerRef={(el) => (this.sheet = el)}
        dismissable={this.dismissButton ?? undefined}
        swipeHandle={
          this.swipeHandle ? (
            <button
              class="swipe-handle"
              type="button"
              ref={(el) => (this.swipeHandleButton = el)}
              tabIndex={this.dismissButton ? -1 : undefined}
              onClick={this.onDismissButtonClick}
            >
              <span>Dismiss sheet</span>
            </button>
          ) : undefined
        }
        onCancel={this.onDialogCancel}
        onMouseDown={(e) => (this.isPointerDownInside = !isDialogBackdropTarget(e))}
        onClick={this.onDialogBackdropClick}
        onTransitionEnd={(e) => onTransitionEnd(e, this.open, this.motionVisibleEnd, this.motionHiddenEnd)}
        onDismiss={this.dismissButton ? this.onDismissButtonClick : undefined}
        containerClass="sheet"
        header={this.hasHeader ? <slot name="header" /> : undefined}
        ariaAttributes={parseAndGetAriaAttributes({
          'aria-modal': true,
          ...(this.hasHeader && {
            'aria-label': hasNamedSlot(this.host, 'header') && getSlotTextContent(this.host, 'header'),
          }),
          ...parseAndGetAriaAttributes(this.aria),
        })}
      >
        <slot />
      </DialogBase>
    );
  }

  private onDialogCancel = (e: Event): void =>
    onCancelDialog(e, () => this.dismissDialog('escape'), !this.dismissButton && !this.swipeHandle);

  private onDialogBackdropClick = (e: MouseEvent): void =>
    onClickDialog(e, () => this.dismissDialog('backdrop'), this.disableBackdropClick, this.isPointerDownInside);

  private onDismissButtonClick = (): void => this.dismissDialog('dismiss-button');

  private dismissDialog = (reason: SheetDismissEventDetail['reason']): void => {
    this.dismiss.emit({ reason });
  };
}
