import { Component, Element, Event, type EventEmitter, h, Host, type JSX, Prop, Watch } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes, SelectedAriaAttributes } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  hasNamedSlot,
  hasPropValueChanged,
  parseAndGetAriaAttributes,
  setFocusTrap,
  setScrollLock,
  validateProps,
  warnIfDeprecatedPropIsUsed,
} from '../../utils';
import type { ModalAriaAttribute } from './modal-utils';
import {
  MODAL_ARIA_ATTRIBUTES,
  warnIfAriaAndHeadingPropsAreUndefined,
  clickStartedInScrollbarTrack,
} from './modal-utils';
import { footerShadowClass, getComponentCss } from './modal-styles';
import { throttle } from 'throttle-debounce';

const propTypes: PropTypes<typeof Modal> = {
  open: AllowedTypes.boolean,
  disableCloseButton: AllowedTypes.boolean,
  dismissButton: AllowedTypes.boolean,
  disableBackdropClick: AllowedTypes.boolean,
  heading: AllowedTypes.string,
  fullscreen: AllowedTypes.breakpoint('boolean'),
  aria: AllowedTypes.aria<ModalAriaAttribute>(MODAL_ARIA_ATTRIBUTES),
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
   * @deprecated since v3.0.0, will be removed with next major release, use `dismissButton` instead.
   * If true, the modal will not have a dismiss button. */
  @Prop() public disableCloseButton?: boolean;

  /** If false, the modal will not have a dismiss button. */
  @Prop() public dismissButton?: boolean = true;

  /** If true, the modal will not be closable via backdrop click. */
  @Prop() public disableBackdropClick?: boolean = false;

  /** The title of the modal */
  @Prop() public heading?: string;

  /** If true the modal uses max viewport height and width. Should only be used for mobile. */
  @Prop() public fullscreen?: BreakpointCustomizable<boolean> = false;

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<ModalAriaAttribute>;

  /**
   * @deprecated since v3.0.0, will be removed with next major release, use `dismiss` event instead.
   * Emitted when the component requests to be dismissed. */
  @Event({ bubbles: false }) public close?: EventEmitter<void>;

  /** Emitted when the component requests to be dismissed. */
  @Event({ bubbles: false }) public dismiss?: EventEmitter<void>;

  private focusedElBeforeOpen: HTMLElement;
  private dismissBtn: HTMLElement;
  private hasHeader: boolean;
  private hasFooter: boolean;
  private footer: HTMLElement;
  private dialog: HTMLElement;

  private get hasDismissButton(): boolean {
    return this.disableCloseButton ? false : this.dismissButton;
  }

  @Watch('open')
  public openChangeHandler(isOpen: boolean): void {
    this.updateFocusTrap(isOpen);

    if (isOpen) {
      this.focusedElBeforeOpen = document.activeElement as HTMLElement;
    } else {
      this.focusedElBeforeOpen?.focus();
    }
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public componentDidLoad(): void {
    // in case modal is rendered with open prop
    if (this.open) {
      this.updateFocusTrap(true);
    }
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
    this.updateFocusTrap(false);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    warnIfDeprecatedPropIsUsed<typeof Modal>(this, 'disableCloseButton', 'Please use dismissButton prop instead.');
    if (this.open) {
      warnIfAriaAndHeadingPropsAreUndefined(this.host, this.heading, this.aria);
    }
    this.hasHeader = !!this.heading || hasNamedSlot(this.host, 'heading');
    this.hasFooter = hasNamedSlot(this.host, 'footer');

    attachComponentCss(
      this.host,
      getComponentCss,
      this.open,
      this.fullscreen,
      this.hasDismissButton,
      this.hasHeader,
      this.hasFooter
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host onMouseDown={!this.disableBackdropClick && this.onMouseDown} onScroll={this.hasFooter && this.onScroll}>
        <div
          class="root"
          role="dialog"
          {...parseAndGetAriaAttributes({
            'aria-modal': true,
            'aria-label': this.heading,
            'aria-hidden': !this.open,
            ...parseAndGetAriaAttributes(this.aria),
          })}
          tabIndex={-1}
          ref={(el) => (this.dialog = el)}
        >
          {this.hasDismissButton && (
            <PrefixedTagNames.pButtonPure
              class="dismiss"
              type="button"
              ref={(el) => (this.dismissBtn = el)}
              hideLabel
              icon="close"
              onClick={this.dismissModal}
            >
              Dismiss modal
            </PrefixedTagNames.pButtonPure>
          )}
          {this.hasHeader && (
            <div class="header">{this.heading ? <h2>{this.heading}</h2> : <slot name="heading" />}</div>
          )}
          <div class="content">
            <slot onSlotchange={this.onSlotChange} />
          </div>
          {this.hasFooter && (
            <div class="footer" ref={(el) => (this.footer = el)}>
              <slot name="footer" />
            </div>
          )}
        </div>
      </Host>
    );
  }

  private updateFocusTrap(isOpen: boolean): void {
    setFocusTrap(this.host, isOpen, !this.disableCloseButton && this.dismissBtn, this.dismissModal);
    setScrollLock(isOpen);
  }

  private onSlotChange = (): void => {
    if (this.open) {
      // 1 tick delay is needed so that web components can be bootstrapped
      setTimeout(() => {
        this.updateFocusTrap(true);
        this.dialog.focus(); // set initial focus
      });
    }
  };

  // eslint-disable-next-line @typescript-eslint/member-ordering
  private onScroll = throttle(100, () => {
    // using an intersection observer would be so much easier but very tricky with the current layout
    // also transform scale3d has an impact on the intersection observer, causing it to trigger
    // initially and after the transition which makes the shadow appear later
    // using an invisible element after the dialog div would work
    // but layout with position: fixed and flex for vertical/horizontal centering scrollable content
    // causes tons of problems, also considering fullscreen mode, etc.
    // see https://stackoverflow.com/questions/33454533/cant-scroll-to-top-of-flex-item-that-is-overflowing-container
    const { scrollHeight, clientHeight, scrollTop } = this.host;
    if (scrollHeight > clientHeight) {
      const shouldApplyShadow =
        scrollHeight - clientHeight > scrollTop + parseInt(getComputedStyle(this.dialog).marginBottom, 10);
      this.footer.classList.toggle(footerShadowClass, shouldApplyShadow);
    }
  });

  private onMouseDown = (e: MouseEvent): void => {
    if ((e.composedPath() as HTMLElement[])[0] === this.host && !clickStartedInScrollbarTrack(this.host, e)) {
      this.dismissModal();
    }
  };

  private dismissModal = (): void => {
    if (this.hasDismissButton) {
      this.dismiss.emit();
      this.close.emit();
    }
  };
}
