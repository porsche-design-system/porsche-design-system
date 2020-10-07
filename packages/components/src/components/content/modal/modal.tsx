import { Component, Event, EventEmitter, Element, h, JSX, Prop, Watch, Host } from '@stencil/core';
import { prefix } from '../../../utils';

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

  @Watch('open')
  openChangeHandler(val: boolean) {
    !this.disableEscapeKey && (val ? this.initKeyboardListener() : this.removeKeyboardListener());
  }

  public connectedCallback(): void {
    this.open && !this.disableEscapeKey && this.initKeyboardListener();
  }

  public disconnectedCallback(): void {
    this.removeKeyboardListener();
  }

  private initKeyboardListener = (): void => {
    document.addEventListener('keydown', this.handleKeyboardEvents);
  };
  private removeKeyboardListener = (): void => {
    document.removeEventListener('keydown', this.handleKeyboardEvents);
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

    return (
      <Host role="presentation" onClick={!this.disableBackdropClick && this.handleHostClick}>
        <div class={rootClasses} role="presentation" aria-modal="true">
          {hasHeader && (
            <div class={headerClasses}>
              {this.subject && <p-headline variant="headline-2">{this.subject}</p-headline>}
              {!this.disableCloseButton && (
                <div class={btnCloseClasses}>
                  <p-button-pure hideLabel icon="close" aria-label="Close" onClick={this.closeModal}>
                    Close
                  </p-button-pure>
                </div>
              )}
            </div>
          )}

          <div class={bodyClasses}>
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
