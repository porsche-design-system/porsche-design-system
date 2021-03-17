import { Component, Event, EventEmitter, Element, h, JSX, Prop, Watch, Host } from '@stencil/core';
import type { BreakpointCustomizable } from '../../../types';
import {
  getHTMLElements,
  getPrefixedTagNames,
  isIos,
  mapBreakpointPropToPrefixedClasses,
  prefix,
} from '../../../utils';

@Component({
  tag: 'p-modal',
  styleUrl: 'modal.scss',
  shadow: true,
})
export class Modal {
  @Element() public host!: HTMLElement;

  /** If true, the modal is open. */
  @Prop({ reflect: true }) public open = false;
  /** If true, the modal will not have a close button. */
  @Prop() public disableCloseButton?: boolean = false;
  /** If true, the modal will not be closable via backdrop click. */
  @Prop() public disableBackdropClick?: boolean = false;
  /** The title of the modal */
  @Prop() public heading?: string;
  /** If true the modal uses max viewport height and width. Should only be used for mobile. */
  @Prop() public fullScreen?: BreakpointCustomizable<boolean> = false;
  /** Emitted when the component requests to be closed. */
  @Event({ bubbles: false }) public close?: EventEmitter<void>;

  private focusedElBeforeOpen: HTMLElement;
  private focusableElements: HTMLElement[] = [];
  private closeBtn: HTMLElement;

  @Watch('open')
  public openChangeHandler(isOpen: boolean): void {
    this.setKeyboardListener(isOpen);
    this.setScrollLock(isOpen);

    if (isOpen) {
      this.setFocusableElements();
      this.focusedElBeforeOpen = document.activeElement as HTMLElement;
      this.focusableElements[0]?.focus();
    } else {
      this.focusedElBeforeOpen?.focus();
    }
  }

  public connectedCallback(): void {
    if (this.open) {
      // in case modal is rendered with open prop
      this.setKeyboardListener(true);
      this.setScrollLock(true);
    }
  }

  public componentDidLoad(): void {
    // in case modal is rendered with open prop
    this.setFocusableElements();
  }

  public disconnectedCallback(): void {
    this.setKeyboardListener(false);
    this.setScrollLock(false);
  }

  public render(): JSX.Element {
    const hasHeader = this.heading || !this.disableCloseButton;
    const rootClasses = {
      [prefix('modal')]: true,
      ...mapBreakpointPropToPrefixedClasses('modal-', this.fullScreen, ['full-screen-on', 'full-screen-off']),
    };
    const headerClasses = prefix('modal--header');
    const btnCloseWrapperClasses = prefix('modal--close');
    const btnCloseClasses = prefix('modal--close-button');

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host onClick={!this.disableBackdropClick && this.handleHostClick}>
        <aside
          class={rootClasses}
          role="dialog"
          aria-modal="true"
          aria-label={this.heading}
          aria-hidden={!this.open ? 'true' : 'false'}
        >
          {hasHeader && (
            <header class={headerClasses}>
              {this.heading && (
                <PrefixedTagNames.pHeadline variant={{ base: 'medium', m: 'large' }}>
                  {this.heading}
                </PrefixedTagNames.pHeadline>
              )}
              {!this.disableCloseButton && (
                <div class={btnCloseWrapperClasses}>
                  <PrefixedTagNames.pButtonPure
                    class={btnCloseClasses}
                    ref={(el) => (this.closeBtn = el)}
                    hideLabel
                    icon="close"
                    onClick={this.closeModal}
                  >
                    Close
                  </PrefixedTagNames.pButtonPure>
                </div>
              )}
            </header>
          )}

          <slot />
        </aside>
      </Host>
    );
  }

  private setFocusableElements = (): void => {
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    const notDisabled = ':not([disabled])';
    const selector =
      Object.values(PrefixedTagNames).join(',') +
      `,a[href],area[href],input${notDisabled},select${notDisabled},textarea${notDisabled},button${notDisabled},[tabindex="0"]`;

    this.focusableElements = [this.closeBtn].concat(getHTMLElements(this.host, selector));
  };

  private setScrollLock = (lock: boolean): void => {
    document.body.style.overflow = lock ? 'hidden' : '';

    // prevent scrolling of background on iOS
    if (isIos()) {
      const addOrRemoveEventListener = lock ? 'addEventListener' : 'removeEventListener';
      document[addOrRemoveEventListener]('touchmove', this.handleDocumentTouchMove, false);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      this.host[addOrRemoveEventListener]('touchmove', this.handleHostTouchMove);
    }
  };

  private setKeyboardListener = (active: boolean): void => {
    document[active ? 'addEventListener' : 'removeEventListener']('keydown', this.handleKeyboardEvents);
  };

  private handleDocumentTouchMove = (e: TouchEvent): void => {
    e.preventDefault();
  };

  private handleHostTouchMove = function (e: TouchEvent): void {
    // Source: https://stackoverflow.com/a/43860705
    const { scrollTop, scrollHeight, offsetHeight } = this as HTMLElement;
    const currentScroll = scrollTop + offsetHeight;

    if (scrollTop === 0 && currentScroll === scrollHeight) {
      e.preventDefault();
    } else if (scrollTop === 0) {
      this.scrollTop = 1;
    } else if (currentScroll === scrollHeight) {
      this.scrollTop = scrollTop - 1;
    }
  };

  private handleKeyboardEvents = (e: KeyboardEvent): void => {
    const { key, shiftKey } = e;
    if (!this.disableCloseButton && (key === 'Esc' || key === 'Escape')) {
      this.closeModal();
    } else if (key === 'Tab') {
      // cycle focus within modal elements
      if (this.focusableElements.length <= 1) {
        this.focusableElements[0]?.focus();
        e.preventDefault();
      } else {
        const [firstEl] = this.focusableElements;
        const [lastEl] = this.focusableElements.slice(-1);

        const { activeElement: activeElLight } = document;
        const { activeElement: activeElShadow } = this.host.shadowRoot;

        if (shiftKey) {
          if (activeElLight === firstEl || activeElShadow === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (activeElLight === lastEl || activeElShadow === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    }
  };

  private closeModal = (): void => {
    this.close.emit();
  };

  private handleHostClick = (e: MouseEvent): void => {
    const [firstEl] = e.composedPath() as HTMLElement[];
    if (firstEl === this.host) {
      this.closeModal();
    }
  };
}
