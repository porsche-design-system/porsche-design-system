import { Component, Element, Event, EventEmitter, Host, JSX, Prop, Watch, h } from '@stencil/core';
import type { BreakpointCustomizable, SelectedAriaAttributes } from '../../../types';
import { attachComponentCss, attachSlottedCss, getPrefixedTagNames, parseAndGetAriaAttributes } from '../../../utils';
import type { ModalAriaAttributes } from './modal-utils';
import {
  getFirstAndLastElement,
  getFocusableElements,
  getScrollTopOnTouch,
  hasSlottedHeading,
  MODAL_ARIA_ATTRIBUTES,
  setScrollLock,
  warnIfAriaAndHeadingPropsAreUndefined,
} from './modal-utils';
import { getComponentCss, getSlottedCss } from './modal-styles';

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
  private focusableElements: HTMLElement[] = [];
  private closeBtn: HTMLElement;
  private ariaLabelAttribute: SelectedAriaAttributes<ModalAriaAttributes>;

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
    attachSlottedCss(this.host, getSlottedCss);
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
    attachComponentCss(this.host, getComponentCss, this.open, this.fullscreen, this.disableCloseButton);
    warnIfAriaAndHeadingPropsAreUndefined(this.host, this.heading, this.aria);
    this.ariaLabelAttribute =
      parseAndGetAriaAttributes(this.aria, MODAL_ARIA_ATTRIBUTES)?.['aria-label'] ?? this.heading;
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
    const hasHeader = this.heading || hasSlottedHeading(this.host);
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host onMouseDown={!this.disableBackdropClick && this.onMouseDown}>
        <div
          class="root"
          role="dialog"
          aria-modal="true"
          aria-label={this.ariaLabelAttribute}
          aria-hidden={!this.open ? 'true' : 'false'}
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
          {hasHeader && (
            <div class="header">
              {this.heading && (
                <PrefixedTagNames.pHeadline variant={{ base: 'medium', m: 'large' }}>
                  {this.heading}
                </PrefixedTagNames.pHeadline>
              )}
              {!this.heading && hasSlottedHeading(this.host) && <slot name="heading" />}
            </div>
          )}
          <slot />
        </div>
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
