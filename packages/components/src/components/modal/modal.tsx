import { Component, Element, Event, type EventEmitter, type JSX, Prop, forceUpdate, h } from '@stencil/core';
import { BACKDROPS } from '../../styles/dialog-styles';
import type { BreakpointCustomizable, PropTypes, SelectedAriaAttributes, Theme } from '../../types';
import {
  AllowedTypes,
  THEMES,
  attachComponentCss,
  consoleWarn,
  getPrefixedTagNames,
  getSlotTextContent,
  hasHeading,
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
  warnIfDeprecatedPropIsUsed,
} from '../../utils';
import { onTransitionEnd } from '../../utils/dialog/dialog';
import { observeStickyArea } from '../../utils/dialog/observer';
import { getDeprecatedPropOrSlotWarningMessage } from '../../utils/log/helper';
import { getComponentCss } from './modal-styles';
import {
  MODAL_ARIA_ATTRIBUTES,
  type ModalAriaAttribute,
  type ModalBackdrop,
  type ModalMotionHiddenEndEventDetail,
  type ModalMotionVisibleEndEventDetail,
} from './modal-utils';

const propTypes: PropTypes<typeof Modal> = {
  open: AllowedTypes.boolean,
  disableCloseButton: AllowedTypes.boolean,
  dismissButton: AllowedTypes.boolean,
  disableBackdropClick: AllowedTypes.boolean,
  heading: AllowedTypes.string,
  backdrop: AllowedTypes.oneOf<ModalBackdrop>(BACKDROPS),
  fullscreen: AllowedTypes.breakpoint('boolean'),
  aria: AllowedTypes.aria<ModalAriaAttribute>(MODAL_ARIA_ATTRIBUTES),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

/**
 * @slot {"name": "heading", "description": "Renders a heading section above the content area.", "isDeprecated": true }
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

  /**
   * If true, the modal will not have a dismiss button.
   * @deprecated since v3.0.0, will be removed with next major release, use `dismissButton` instead. */
  @Prop() public disableCloseButton?: boolean;

  /** If false, the modal will not have a dismiss button. */
  @Prop() public dismissButton?: boolean = true;

  /** If true, the modal will not be closable via backdrop click. */
  @Prop() public disableBackdropClick?: boolean = false;

  /**
   * @deprecated since v3.0.0, will be removed with next major release, use `header` slot instead
   * The title of the modal */
  @Prop() public heading?: string;

  /** Defines the backdrop, 'blur' (should be used when Modal is opened by user interaction, e.g. after a click on a button) and 'shading' (should be used when Modal gets opened automatically, e.g. Cookie Consent). */
  @Prop() public backdrop?: ModalBackdrop = 'blur';

  /** If true the modal uses max viewport height and width. Should only be used for mobile. */
  @Prop() public fullscreen?: BreakpointCustomizable<boolean> = false;

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<ModalAriaAttribute>;

  /** Adapts the modal color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /**
   * @deprecated since v3.0.0, will be removed with next major release, use `dismiss` event instead.
   * Emitted when the component requests to be dismissed. */
  @Event({ bubbles: false }) public close?: EventEmitter<void>;

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

  private get hasDismissButton(): boolean {
    return this.disableCloseButton ? false : this.dismissButton;
  }

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
    warnIfDeprecatedPropIsUsed<typeof Modal>(this, 'disableCloseButton', 'Please use dismissButton prop instead.');
    warnIfDeprecatedPropIsUsed<typeof Modal>(this, 'heading', 'Please use the slot="header" instead.');

    if (hasNamedSlot(this.host, 'heading')) {
      consoleWarn(
        getDeprecatedPropOrSlotWarningMessage(this.host, 'slot="heading"'),
        'Please use the slot="header" instead.'
      );
    }

    this.hasHeader = hasHeading(this.host, this.heading) || hasNamedSlot(this.host, 'header');
    this.hasFooter = hasNamedSlot(this.host, 'footer');

    // TODO: why do we validate only when opened?
    if (this.open) {
      warnIfAriaAndHeadingPropsAreUndefined(this.host, this.hasHeader, this.aria);
    }

    attachComponentCss(
      this.host,
      getComponentCss,
      this.open,
      this.backdrop,
      this.fullscreen,
      this.hasDismissButton,
      this.hasHeader,
      this.hasFooter,
      this.theme
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <dialog
        // "inert" will be known from React 19 onwards, see https://github.com/facebook/react/pull/24730
        // eslint-disable-next-line
        /* @ts-ignore */
        inert={this.open ? null : true} // prevents focusable elements during fade-out transition + prevents focusable elements within nested open accordion
        tabIndex={-1} // dialog always has a dismiss button to be focused
        ref={(el) => (this.dialog = el)}
        onCancel={(e) => onCancelDialog(e, this.dismissDialog, !this.hasDismissButton)}
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
            {this.hasDismissButton && (
              <PrefixedTagNames.pButton
                variant="ghost"
                class="dismiss"
                type="button"
                hideLabel={true}
                icon="close"
                onClick={this.dismissDialog}
                theme={this.theme}
              >
                Dismiss modal
              </PrefixedTagNames.pButton>
            )}
            {this.hasHeader &&
              (this.heading ? (
                <h2>{this.heading}</h2>
              ) : hasNamedSlot(this.host, 'heading') ? (
                <slot name="heading" />
              ) : (
                <slot name="header" />
              ))}
            <slot />
            {this.hasFooter && <slot name="footer" ref={(el: HTMLSlotElement) => (this.footer = el)} />}
          </div>
        </div>
      </dialog>
    );
  }

  private dismissDialog = (): void => {
    this.dismiss.emit();
    this.close.emit();
  };

  private ariaLabel = (): string => {
    return (
      this.heading ||
      (hasNamedSlot(this.host, 'heading') && getSlotTextContent(this.host, 'heading')) ||
      (hasNamedSlot(this.host, 'header') && getSlotTextContent(this.host, 'header'))
    );
  };
}
