import { Component, Event, EventEmitter, Element, h, JSX, Prop, Watch, Host } from '@stencil/core';
import type { BreakpointCustomizable } from '../../../types';
import { getPrefixedTagNames, mapBreakpointPropToPrefixedClasses, prefix } from '../../../utils';
import { getFirstAndLastElement, getFocusableElements, setScrollLock } from './modal-utils';

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
  @Prop() public fullscreen?: BreakpointCustomizable<boolean> = false;
  /** Emitted when the component requests to be closed. */
  @Event({ bubbles: false }) public close?: EventEmitter<void>;

  private focusedElBeforeOpen: HTMLElement;
  private focusableElements: HTMLElement[] = [];
  private closeBtn: HTMLElement;

  @Watch('open')
  public openChangeHandler(isOpen: boolean): void {
    this.setKeyboardListener(isOpen);
    setScrollLock(this.host, isOpen);

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
      setScrollLock(this.host, true);
    }
  }

  public componentDidLoad(): void {
    // in case modal is rendered with open prop
    this.setFocusableElements();
  }

  public disconnectedCallback(): void {
    this.setKeyboardListener(false);
    setScrollLock(this.host, false);
  }

  public render(): JSX.Element {
    const hasHeader = this.heading || !this.disableCloseButton;
    const rootClasses = {
      [prefix('modal')]: true,
      ...mapBreakpointPropToPrefixedClasses('modal-', this.fullscreen, ['fullscreen-on', 'fullscreen-off']),
    };
    const headerClasses = prefix('modal__header');
    const headlineClasses = prefix('modal__headline');
    const btnCloseWrapperClasses = prefix('modal__close');
    const btnCloseClasses = prefix('modal__close-button');

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
                <div class={headlineClasses}>
                  <PrefixedTagNames.pHeadline variant={{ base: 'medium', m: 'large' }}>
                    {this.heading}
                  </PrefixedTagNames.pHeadline>
                </div>
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
    this.focusableElements = getFocusableElements(this.host, this.closeBtn);
  };

  private setKeyboardListener = (active: boolean): void => {
    document[active ? 'addEventListener' : 'removeEventListener']('keydown', this.handleKeyboardEvents);
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
        const [firstEl, lastEl] = getFirstAndLastElement(this.focusableElements);

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
