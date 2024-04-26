import { Component, Element, Event, type EventEmitter, h, type JSX, Prop } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes, SelectedAriaAttributes, Theme } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  hasHeading,
  hasNamedSlot,
  hasPropValueChanged,
  parseAndGetAriaAttributes,
  setScrollLock,
  THEMES,
  validateProps,
  warnIfAriaAndHeadingPropsAreUndefined,
  warnIfDeprecatedPropIsUsed,
} from '../../utils';
import type { ModalAriaAttribute, ModalBackdrop } from './modal-utils';
import { MODAL_ARIA_ATTRIBUTES } from './modal-utils';
import { getComponentCss } from './modal-styles';
import { BACKDROPS } from '../../styles';

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

  /** The title of the modal */
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

  public componentDidLoad(): void {
    const io = new IntersectionObserver(
      (entries) => {
        for (const { target, isIntersecting } of entries) {
          target.toggleAttribute('data-stuck', !isIntersecting);
        }
      },
      {
        root: this.scroller,
        threshold: 1,
      }
    );

    if (this.hasFooter) {
      io.observe(this.footer);
    }
  }

  public componentWillRender(): void {
    setScrollLock(this.open);
  }

  public componentDidRender(): void {
    // showModal needs to be called after render cycle to prepare visibility states of dialog in order to focus the dismiss button correctly
    this.setDialogVisibility(this.open);
  }

  public disconnectedCallback(): void {
    setScrollLock(false);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    warnIfDeprecatedPropIsUsed<typeof Modal>(this, 'disableCloseButton', 'Please use dismissButton prop instead.');
    // TODO: why do we validate only when opened?
    if (this.open) {
      warnIfAriaAndHeadingPropsAreUndefined(this.host, this.hasHeader, this.aria);
    }

    this.hasHeader = hasHeading(this.host, this.heading) || hasNamedSlot(this.host, 'header');
    this.hasFooter = hasNamedSlot(this.host, 'footer');

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
        inert={this.open ? null : true} // prevents focusable elements during fade-out transition + prevents focusable elements within nested open accordion
        tabIndex={-1} // dialog always has a dismiss button to be focused
        ref={(el) => (this.dialog = el)}
        onCancel={this.onCancelDialog}
        onClick={this.onClickDialog}
        {...parseAndGetAriaAttributes({
          'aria-modal': true,
          'aria-label': this.heading,
          'aria-hidden': !this.open,
          ...parseAndGetAriaAttributes(this.aria),
        })}
      >
        <div class="scroller" ref={(el) => (this.scroller = el)}>
          <div class="modal">
            {this.hasDismissButton && (
              <PrefixedTagNames.pButtonPure
                class="dismiss"
                type="button"
                hideLabel
                icon="close"
                onClick={this.dismissDialog}
                theme={this.theme}
              >
                Dismiss modal
              </PrefixedTagNames.pButtonPure>
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

  private onClickDialog = (e: MouseEvent & { target: HTMLElement }): void => {
    if (!this.disableBackdropClick && e.target.className === 'scroller') {
      // dismiss dialog when clicked on backdrop
      this.dismissDialog();
    }
  };

  private onCancelDialog = (e: Event): void => {
    // prevent closing the dialog uncontrolled by ESC
    e.preventDefault();
    this.dismissDialog();
  };

  private dismissDialog = (): void => {
    this.dismiss.emit();
    this.close.emit();
  };

  private setDialogVisibility(isOpen: boolean): void {
    // Only call showModal/close on dialog when state changes
    if (isOpen === true && !this.dialog.open) {
      this.scroller.scrollTo(0, 0);
      this.dialog.showModal();
    } else if (isOpen === false && this.dialog.open) {
      this.dialog.close();
    }
  }
}
