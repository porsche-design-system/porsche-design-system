import { Component, Event, EventEmitter, Element, h, JSX, Prop, Watch, Host } from '@stencil/core';
import { getPrefixedTagNames, prefix } from '../../../utils';

@Component({
  tag: 'p-modal',
  styleUrl: 'modal.scss',
  shadow: true
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
  /** Emitted when the component requests to be closed. */
  @Event({ bubbles: false }) public close?: EventEmitter<void>;

  private focusedElBeforeOpen: HTMLElement;
  private focusableElements: HTMLElement[] = [];
  private closeBtn: HTMLElement;
  private isClosedViaEnter = false;

  @Watch('open')
  public openChangeHandler(isOpen: boolean): void {
    this.setKeyboardListener(isOpen);
    this.setScrollLock(isOpen);

    if (isOpen) {
      this.setFocusableElements();
      this.focusedElBeforeOpen = document.activeElement as HTMLElement;
      this.isClosedViaEnter = false;

      // timeout is needed to focus close button which only appears after render and trick blurOnFocus
      setTimeout(() =>
        this.focusableElements[this.disableCloseButton || this.focusableElements.length === 1 ? 0 : 1]?.focus()
      );
    } else {
      if (this.isClosedViaEnter) {
        // timeout is needed to focus previously focused button reliably because of blurOnFocus
        setTimeout(() => this.focusedElBeforeOpen?.focus());
      } else {
        this.focusedElBeforeOpen?.focus();
      }
    }
  }

  public connectedCallback(): void {
    if (this.open) {
      this.setKeyboardListener(true);
    }
  }

  public componentDidLoad(): void {
    this.setFocusableElements();
  }

  public disconnectedCallback(): void {
    this.setKeyboardListener(false);
  }

  public render(): JSX.Element {
    const hasHeader = this.heading || !this.disableCloseButton;
    const rootClasses = prefix('modal');
    const headerClasses = prefix('modal__header');
    const btnCloseClasses = prefix('modal__close');

    const ariaLabelledBy = this.heading && 'modal-title';
    const PrefixedTagNames = getPrefixedTagNames(this.host, ['p-headline', 'p-button-pure']);

    return (
      <Host onClick={!this.disableBackdropClick && this.handleHostClick}>
        <aside class={rootClasses} role="dialog" aria-modal="true" aria-labelledby={ariaLabelledBy}>
          {hasHeader && (
            <header class={headerClasses}>
              {this.heading && (
                <PrefixedTagNames.pHeadline id={ariaLabelledBy} variant="headline-2">
                  {this.heading}
                </PrefixedTagNames.pHeadline>
              )}
              {!this.disableCloseButton && (
                <div class={btnCloseClasses}>
                  <PrefixedTagNames.pButtonPure
                    ref={(el) => (this.closeBtn = el)}
                    hideLabel
                    icon="close"
                    aria-label="Close"
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
    const PrefixedTagNames = getPrefixedTagNames(this.host, [
      'p-button',
      'p-button-pure',
      'p-link',
      'p-link-pure',
      'p-link-social'
    ]);

    const notDisabled = ':not([disabled])';
    const selector =
      Object.values(PrefixedTagNames).join(',') +
      `,a[href],area[href],input${notDisabled},select${notDisabled},textarea${notDisabled},button${notDisabled},[tabindex="0"]`;

    this.focusableElements = [this.closeBtn].concat(Array.from(this.host.querySelectorAll(selector)));
  };

  private setScrollLock = (lock: boolean): void => {
    document.body.style.overflow = lock ? 'hidden' : '';
  };

  private setKeyboardListener = (active: boolean): void => {
    document[active ? 'addEventListener' : 'removeEventListener']('keydown', this.handleKeyboardEvents);
  };

  private handleKeyboardEvents = (e: KeyboardEvent): void => {
    const { key, shiftKey } = e;
    if (!this.disableCloseButton && (key === 'Esc' || key === 'Escape')) {
      this.closeModal();
    } else if (key === 'Enter' && this.closeBtn === this.host.shadowRoot.activeElement) {
      this.isClosedViaEnter = true;
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
    // TODO: fallback for Edge18 https://stackoverflow.com/questions/58344817/alternative-to-composedpath-for-edge
    const [firstEl] = e.composedPath() as HTMLElement[];
    if (firstEl === this.host) {
      this.closeModal();
    }
  };
}
