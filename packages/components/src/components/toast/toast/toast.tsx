import { Component, Element, Host, h, type JSX, Method } from '@stencil/core';
import { attachComponentCss, getPrefixedTagNames } from '../../../utils';
import { type ToastMessage, toastManager } from './toast-manager';
import { getComponentCss, toastCloseClassName } from './toast-styles';

@Component({
  tag: 'p-toast',
  shadow: true,
})
export class Toast {
  @Element() public host!: HTMLElement;

  private toastItemElement: HTMLPToastItemElement;

  @Method()
  public addMessage(message: ToastMessage): void {
    toastManager.addMessage(message);
  }

  public connectedCallback(): void {
    toastManager.register(this.host, () => this.toastItemElement.classList.add(toastCloseClassName));
  }

  public componentDidLoad(): void {
    this.host.addEventListener('dismiss', (e) => {
      e.stopPropagation(); // to cancel bubbling chain from toast-item
      toastManager.dismissToastItem();
    });
  }

  public disconnectedCallback(): void {
    toastManager.unregister();
  }

  public render(): JSX.Element {
    attachComponentCss(this.host, getComponentCss);

    this.toastItemElement?.classList.remove(toastCloseClassName);

    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const toast = toastManager.getToast();

    return (
      <Host role="status">
        {toast && (
          <PrefixedTagNames.pToastItem {...toast} ref={(el: HTMLPToastItemElement) => (this.toastItemElement = el)} />
        )}
      </Host>
    );
  }
}
