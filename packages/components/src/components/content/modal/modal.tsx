import { Component, Event, EventEmitter, Element, h, JSX, Prop, Watch, Host } from '@stencil/core';
import type { BreakpointCustomizable } from '../../../types';
import { attachComponentCss, getPrefixedTagNames } from '../../../utils';
import { getFirstAndLastElement, getFocusableElements, getScrollTopOnTouch, setScrollLock } from './modal-utils';
import { getComponentCss } from './modal-styles';

@Component({
  tag: 'p-modal',
  styleUrl: 'modal.scss',
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
  /** Emitted when the component requests to be closed. */
  @Event({ bubbles: false }) public close?: EventEmitter<void>;

  private focusedElBeforeOpen: HTMLElement;
  private focusableElements: HTMLElement[] = [];
  private closeBtn: HTMLElement;

  @Watch('open')
  public openChangeHandler(isOpen: boolean): void {
    this.setKeyboardListener(isOpen);
    setScrollLock(this.host, isOpen, this.setScrollTop);

    if (isOpen) {
      this.focusableElements = getFocusableElements(this.host, this.closeBtn);
      this.focusedElBeforeOpen = document.activeElement as HTMLElement;
    } else {
      this.focusedElBeforeOpen?.focus();
    }
  }

  public connectedCallback(): void {
    if (this.open) {
      // in case modal is rendered with open prop
      this.setKeyboardListener(true);
      setScrollLock(this.host, true, this.setScrollTop);
    }
  }

  public componentDidLoad(): void {
    // in case modal is rendered with open prop
    this.focusableElements = getFocusableElements(this.host, this.closeBtn);
  }

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, this.open, this.fullscreen);
  }

  public componentDidUpdate(): void {
    if (this.open) {
      /* the close button is not immediately visible when the  @Watch('open') triggers,
       so we focus it in componentDidUpdate() */
      this.focusableElements[0]?.focus();
    }
  }

  public disconnectedCallback(): void {
    this.setKeyboardListener(false);
    setScrollLock(this.host, false, this.setScrollTop);
  }

  public render(): JSX.Element {
    const hasHeader = this.heading || !this.disableCloseButton;
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host onMouseDown={!this.disableBackdropClick && this.onMouseDown}>
        <aside
          class="root"
          role="dialog"
          aria-modal="true"
          aria-label={this.heading}
          aria-hidden={!this.open ? 'true' : 'false'}
        >
          {hasHeader && (
            <header>
              {this.heading && (
                <PrefixedTagNames.pHeadline variant={{ base: 'medium', m: 'large' }}>
                  {this.heading}
                </PrefixedTagNames.pHeadline>
              )}
              {!this.disableCloseButton && (
                <div class="close">
                  <PrefixedTagNames.pButtonPure
                    type="button"
                    ref={(el) => (this.closeBtn = el)}
                    hideLabel
                    icon="close"
                    onClick={this.closeModal}
                  >
                    Close modal
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

  private setScrollTop = (e: TouchEvent): void => {
    this.host.scrollTop = getScrollTopOnTouch(this.host, e);
  };

  private setKeyboardListener = (active: boolean): void => {
    document[active ? 'addEventListener' : 'removeEventListener']('keydown', this.onKeyboardEvent);
  };

  private onKeyboardEvent = (e: KeyboardEvent): void => {
    const { key, shiftKey } = e;
    if (!this.disableCloseButton && (key === 'Esc' || key === 'Escape')) {
      this.closeModal();
    } else if (key === 'Tab') {
      // cycle focus within modal elements
      if (this.focusableElements.length <= 1) {
        e.preventDefault();
        this.focusableElements[0]?.focus();
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

  private onMouseDown = (e: MouseEvent): void => {
    const [firstEl] = e.composedPath() as HTMLElement[];
    if (firstEl === this.host) {
      this.closeModal();
    }
  };
}
