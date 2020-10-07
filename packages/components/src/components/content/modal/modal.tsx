import { Component, Element, h, JSX, Prop } from '@stencil/core';
import { prefix } from '../../../utils';

@Component({
  tag: 'p-modal',
  styleUrl: 'modal.scss',
  shadow: true
})
export class Modal {
  @Element() public host!: HTMLElement;

  @Prop() public open?: boolean;
  @Prop() public disableCloseButton?: boolean;

  public render(): JSX.Element {
    const baseClasses = {
      [prefix('modal')]: true
    };
    const containerClasses = {
      [prefix('modal__container')]: true
    };
    const headerClasses = {
      [prefix('modal__header')]: true
    };
    const bodyClasses = {
      [prefix('modal__body')]: true
    };
    const footerClasses = {
      [prefix('modal__footer')]: true
    };
    const btnCloseClasses = prefix('modal__close');

    return (
      this.open && (
        <div class={baseClasses} role="presentation">
          <div class={containerClasses} role="presentation" aria-modal="true" tabindex="-1">
            <div class={headerClasses}>
              {this.isTitleDefined && (
                <p-headline variant="headline-2">
                  <slot name="title" />
                </p-headline>
              )}
              {!this.disableCloseButton && (
                <div class={btnCloseClasses}>
                  <p-button-pure icon="close" hideLabel title="Close" aria-label="Close">
                    Close
                  </p-button-pure>
                </div>
              )}
            </div>

            <div class={bodyClasses}>
              <slot name="body" />
            </div>

            {this.isFooterDefined && (
              <div class={footerClasses}>
                <slot name="footer" />
              </div>
            )}
          </div>
        </div>
      )
    );
  }

  private get isTitleDefined(): boolean {
    return !!this.host.querySelector('[slot="title"]');
  }
  private get isFooterDefined(): boolean {
    return !!this.host.querySelector('[slot="footer"]');
  }
}
