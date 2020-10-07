import { Component, Event, EventEmitter, Element, h, JSX, Prop, Watch, Host } from '@stencil/core';
import { getPrefixedTagNames, prefix } from '../../../utils';

@Component({
  tag: 'p-modal',
  styleUrl: 'modal.scss',
  shadow: true
})
export class Modal {
  @Element() public host!: HTMLElement;

  /** If true, the modal is open. **/
  @Prop() public open?: boolean = false;
  /** If true, the modal will not have a close button. **/
  @Prop() public disableCloseButton?: boolean = false;
  /** If true, the modal will not be closable via backdrop click. **/
  @Prop() public disableBackdropClick?: boolean = false;
  /** If true, the modal will not be closable via Escape key. **/
  @Prop() public disableEscapeKey?: boolean = false;
  /** The title of the modal **/
  @Prop() public subject?: string;
  /** Emitted when the component requests to be closed. **/
  @Event() public close?: EventEmitter<void>;

  private focusedElBeforeOpen: HTMLElement;

  @Watch('open')
  openChangeHandler(val: boolean) {
    !this.disableEscapeKey && this.setKeyboardListener(val);
    this.setScrollLock(val);

    if (val) {
      this.focusedElBeforeOpen = document.activeElement as HTMLElement;

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

      const focusableEl: HTMLElement =
        this.host.querySelector(selector) ?? this.host.shadowRoot.querySelector(selector);
      focusableEl?.focus();
    } else {
      this.focusedElBeforeOpen.focus();
    }
  }

  public connectedCallback(): void {
    this.open && !this.disableEscapeKey && this.setKeyboardListener(true);
  }

  public disconnectedCallback(): void {
    this.setKeyboardListener(false);
  }

  private setScrollLock = (lock: boolean): void => {
    document.body.style.overflow = lock ? 'hidden' : '';
  };

  private setKeyboardListener = (active: boolean): void => {
    document[active ? 'addEventListener' : 'removeEventListener']('keydown', this.handleKeyboardEvents);
  };

  private handleKeyboardEvents = ({ key }: KeyboardEvent): void => {
    if (key === 'Esc' || key === 'Escape') {
      this.closeModal();
    }
  };

  private closeModal = (): void => {
    this.close.emit();
  };

  private handleHostClick = (e: MouseEvent): void => {
    // TODO: fallback for Edge18 https://stackoverflow.com/questions/58344817/alternative-to-composedpath-for-edge
    const [firstEl] = e.composedPath() as HTMLElement[];
    firstEl === this.host && this.closeModal();
  };

  public render(): JSX.Element {
    const hasHeader = this.subject || !this.disableCloseButton;
    const rootClasses = {
      [prefix('modal')]: true
    };
    const headerClasses = {
      [prefix('modal__header')]: true,
      [prefix('modal__header--closable')]: !this.disableCloseButton
    };
    const bodyClasses = prefix('modal__body');
    const footerClasses = prefix('modal__footer');
    const btnCloseClasses = prefix('modal__close');

    const ariaLabelledBy = this.subject && 'modal-title';
    const ariaDescribedBy = 'modal-body';

    return (
      <Host
        role="dialog"
        onClick={!this.disableBackdropClick && this.handleHostClick}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
      >
        <div class={rootClasses} role="presentation" aria-modal="true">
          {hasHeader && (
            <div class={headerClasses}>
              {this.subject && (
                <p-headline id={ariaLabelledBy} variant="headline-2">
                  {this.subject}
                </p-headline>
              )}
              {!this.disableCloseButton && (
                <div class={btnCloseClasses}>
                  <p-button-pure hideLabel icon="close" aria-label="Close" onClick={this.closeModal}>
                    Close
                  </p-button-pure>
                </div>
              )}
            </div>
          )}

          <div class={bodyClasses} id={ariaDescribedBy}>
            <slot />
          </div>

          {this.isFooterDefined && (
            <div class={footerClasses}>
              <slot name="footer" />
            </div>
          )}
        </div>
      </Host>
    );
  }

  private get isFooterDefined(): boolean {
    return !!this.host.querySelector('[slot="footer"]');
  }
}
