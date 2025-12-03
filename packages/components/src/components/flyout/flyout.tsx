import { Component, Element, Event, type EventEmitter, forceUpdate, h, type JSX, Prop } from '@stencil/core';
import { BACKDROPS } from '../../styles/dialog-styles';
import type { PropTypes, SelectedAriaAttributes } from '../../types';
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
} from '../../utils';
import { onTransitionEnd } from '../../utils/dialog/dialog';
import { observeStickyArea } from '../../utils/dialog/observer';
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
  footerBehavior: AllowedTypes.oneOf<FlyoutFooterBehavior>(FLYOUT_FOOTER_BEHAVIOR),
  aria: AllowedTypes.aria<FlyoutAriaAttribute>(FLYOUT_ARIA_ATTRIBUTES),
};

/**
 * @slot {"name": "header", "description": "Renders a sticky header section above the content area." }
 * @slot {"name": "", "description": "Default slot for the main content." }
 * @slot {"name": "footer", "description": "Shows a sticky footer section, flowing under the content area when scrollable." }
 * @slot {"name": "sub-footer", "description": "Shows a sub-footer section to display additional information below the footer. This slot is ideal for less critical content, such as legal information or FAQs, which provides further details to the user. It appears when scrolling to the end of the flyout or when there is available space to accommodate the content." }
 *
 * @controlled {"props": ["open"], "event": "dismiss"}
 */
@Component({
  tag: 'p-flyout',
  shadow: true,
})
export class Flyout {
  @Element() public host!: HTMLElement;

  /** If true, the flyout is open. */
  @Prop() public open: boolean = false; // eslint-disable-line @typescript-eslint/no-inferrable-types

  /** The position of the flyout */
  @Prop() public position?: FlyoutPosition = 'end';

  /** If true, the flyout will not be closable via backdrop click. */
  @Prop() public disableBackdropClick?: boolean = false;

  /** Defines the background color */
  @Prop() public background?: FlyoutBackground = 'canvas';

  /** Defines the backdrop, 'blur' (should be used when the underlying content is not relevant for users) and 'shading' (should be used when the user still needs a visual connection to the underlying content). */
  @Prop() public backdrop?: FlyoutBackdrop = 'blur';

  /** Determines the footer's position behavior. When set to "fixed," the flyout content stretches to fill the full height, keeping the footer permanently at the bottom. When set to "sticky," the footer flows beneath the content and only becomes fixed if the content overflows. */
  @Prop() public footerBehavior?: FlyoutFooterBehavior = 'sticky';

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<FlyoutAriaAttribute>;

  /** Emitted when the component requests to be dismissed. */
  @Event({ bubbles: false }) public dismiss?: EventEmitter<void>;

  /** Emitted when the flyout is opened and the transition is finished. */
  @Event({ bubbles: false }) public motionVisibleEnd?: EventEmitter<FlyoutMotionVisibleEndEventDetail>;

  /** Emitted when the flyout is closed and the transition is finished. */
  @Event({ bubbles: false }) public motionHiddenEnd?: EventEmitter<FlyoutMotionHiddenEndEventDetail>;

  private dialog: HTMLDialogElement;
  private scroller: HTMLDivElement;
  private header: HTMLSlotElement;
  private footer: HTMLSlotElement;
  private hasHeader: boolean;
  private hasFooter: boolean;
  private hasSubFooter: boolean;

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
      this.footerBehavior
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <dialog
        tabIndex={-1} // needed for programmatic focus
        ref={(el) => (this.dialog = el)}
        onCancel={(e) => onCancelDialog(e, this.dismissDialog)}
        // Previously done with onMouseDown to change the click behavior (not closing when pressing mousedown on flyout and mouseup on backdrop) but changed back to native behavior
        onClick={(e) => onClickDialog(e, this.dismissDialog, this.disableBackdropClick)}
        onTransitionEnd={(e) => onTransitionEnd(e, this.open, this.motionVisibleEnd, this.motionHiddenEnd)}
        {...parseAndGetAriaAttributes({
          'aria-modal': true,
          ...{ 'aria-label': this.hasHeader ? getSlotTextContent(this.host, 'header') : 'Flyout' },
          ...parseAndGetAriaAttributes(this.aria),
        })}
      >
        <div class="scroller" ref={(el) => (this.scroller = el)}>
          <div class="flyout">
            <PrefixedTagNames.pButton
              variant="secondary"
              class="dismiss"
              type="button"
              hideLabel={true}
              icon="close"
              onClick={this.dismissDialog}
            >
              Dismiss flyout
            </PrefixedTagNames.pButton>
            {this.hasHeader && <slot name="header" ref={(el: HTMLSlotElement) => (this.header = el)} />}
            <slot />
            {this.hasFooter && <slot name="footer" ref={(el: HTMLSlotElement) => (this.footer = el)} />}
            {this.hasSubFooter && <slot name="sub-footer" />}
          </div>
        </div>
      </dialog>
    );
  }

  private dismissDialog = (): void => {
    this.dismiss.emit();
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
