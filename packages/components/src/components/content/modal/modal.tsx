import { Component, Element, Event, EventEmitter, h, Host, JSX, Prop, Watch } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes, SelectedAriaAttributes } from '../../../types';
import {
  AllowedTypes,
  attachComponentCss,
  attachSlottedCss,
  getPrefixedTagNames,
  getShadowRootHTMLElement,
  hasNamedSlot,
  parseAndGetAriaAttributes,
  validateProps,
} from '../../../utils';
import type { ModalAriaAttributes } from './modal-utils';
import { MODAL_ARIA_ATTRIBUTES, setScrollLock, warnIfAriaAndHeadingPropsAreUndefined } from './modal-utils';
import { getComponentCss, getSlottedCss } from './modal-styles';

const propTypes: PropTypes<typeof Modal> = {
  open: AllowedTypes.boolean,
  disableCloseButton: AllowedTypes.boolean,
  disableBackdropClick: AllowedTypes.boolean,
  heading: AllowedTypes.string,
  fullscreen: AllowedTypes.breakpoint('boolean'),
  aria: AllowedTypes.aria<ModalAriaAttributes>(MODAL_ARIA_ATTRIBUTES),
};

@Component({
  tag: 'p-modal',
  shadow: true,
})
export class Modal {
  @Element() public host!: HTMLElement;

  /** If true, the modal is open. */
  @Prop() public open = false;

  /** If true, the modal will not have a close button. */
  @Prop() public disableCloseButton?: boolean = false;

  /** If true, the modal will not be closable via backdrop click. */
  @Prop() public disableBackdropClick?: boolean = false;

  /** The title of the modal */
  @Prop() public heading?: string;

  /** If true the modal uses max viewport height and width. Should only be used for mobile. */
  @Prop() public fullscreen?: BreakpointCustomizable<boolean> = false;

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<ModalAriaAttributes>;

  /** Emitted when the component requests to be closed. */
  @Event({ bubbles: false }) public close?: EventEmitter<void>;

  private focusedElBeforeOpen: HTMLElement;
  private closeBtn: HTMLElement;
  private hasHeader: boolean;
  private dialog: HTMLElement;

  @Watch('open')
  public openChangeHandler(isOpen: boolean): void {
    this.updateScrollLock(isOpen);

    if (isOpen) {
      this.focusedElBeforeOpen = document.activeElement as HTMLElement;
    } else {
      this.focusedElBeforeOpen?.focus();
    }
  }

  public connectedCallback(): void {
    attachSlottedCss(this.host, getSlottedCss);
  }

  public componentDidLoad(): void {
    // in case modal is rendered with open prop
    if (this.open) {
      this.updateScrollLock(true);
    }

    getShadowRootHTMLElement(this.host, 'slot').addEventListener('slotchange', () => {
      if (this.open) {
        // 1 tick delay is needed so that web components can be bootstrapped
        setTimeout(() => {
          this.updateScrollLock(true);
          this.dialog.focus(); // set initial focus
        });
      }
    });
  }

  public componentWillRender(): void {
    validateProps(this, propTypes);
    if (this.open) {
      warnIfAriaAndHeadingPropsAreUndefined(this.host, this.heading, this.aria);
    }
    this.hasHeader = !!this.heading || hasNamedSlot(this.host, 'heading');
    console.log('-> cC PRE attach visibility', getComputedStyle(this.host).visibility);
    attachComponentCss(this.host, getComponentCss, this.open, this.fullscreen, this.disableCloseButton, this.hasHeader);
    console.log('-> cC POST attach visibility', getComputedStyle(this.host).visibility);
  }

  public componentDidRender(): void {
    if (this.open) {
      // reset scroll top to zero in case content is longer than viewport height, - some timeout is needed although it shouldn't
      for (let i = 0; i < 4; i++) {
        setTimeout(() => (this.host.scrollTop = 0), i * 5);
      }
      this.dialog.focus(); // needs to happen after render
    }
  }

  public disconnectedCallback(): void {
    setScrollLock(this.host, false);
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);
    console.log('-> render visibility', getComputedStyle(this.host).visibility);
    this.host.style.setProperty('visibility', `${this.open ? 'inherit' : 'hidden'}`, 'important');
    this.host.style.setProperty('opacity', `${this.open ? 1 : 0}`, 'important');
    return (
      <Host onMouseDown={!this.disableBackdropClick && this.onMouseDown}>
        <div
          class="root"
          role="dialog"
          aria-modal="true"
          {...{ 'aria-label': this.heading, ...parseAndGetAriaAttributes(this.aria) }}
          aria-hidden={!this.open ? 'true' : 'false'}
          tabIndex={-1}
          ref={(el) => (this.dialog = el)}
        >
          {!this.disableCloseButton && (
            <PrefixedTagNames.pButtonPure
              class="close"
              type="button"
              ref={(el) => (this.closeBtn = el)}
              hideLabel
              icon="close"
              onClick={this.closeModal}
            >
              Close modal
            </PrefixedTagNames.pButtonPure>
          )}
          {this.hasHeader && (
            <div class="header">
              {this.heading ? (
                <PrefixedTagNames.pHeadline variant={{ base: 'medium', m: 'large' }}>
                  {this.heading}
                </PrefixedTagNames.pHeadline>
              ) : (
                <slot name="heading" />
              )}
            </div>
          )}
          <slot />
        </div>
      </Host>
    );
  }

  private updateScrollLock(isOpen: boolean): void {
    setScrollLock(this.host, isOpen, !this.disableCloseButton && this.closeBtn, this.closeModal);
  }

  private onMouseDown = (e: MouseEvent): void => {
    if ((e.composedPath() as HTMLElement[])[0] === this.host) {
      this.closeModal();
    }
  };

  private closeModal = (): void => {
    if (!this.disableCloseButton) {
      this.close.emit();
    }
  };
}
