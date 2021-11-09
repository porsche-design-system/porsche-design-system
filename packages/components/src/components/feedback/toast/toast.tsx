import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';
import { addComponentCss } from './toast-styles';
import { toastManager, ToastManagerInstance } from './toast-manager';

@Component({
  tag: 'p-toast',
  shadow: true,
})
export class Toast {
  @Element() public host!: HTMLElement;

  @Prop()
  public manager: ToastManagerInstance;

  public connectedCallback(): void {
    console.log('connectedCallback');
    addComponentCss(this.host);
    this.manager = toastManager.register(this.host);
  }

  public componentDidLoad(): void {
    this.host.shadowRoot.addEventListener('close', this.manager.dismissToast);
  }

  public disconnectedCallback(): void {
    console.log('disconnectedCallback');
    toastManager.unregister();
  }

  public render(): JSX.Element {
    const toast = this.manager.getToast();

    return (
      <Host>
        {toast && (
          <p-toast-item key={toast.message} state={toast.state}>
            <p-text>{toast.message}</p-text>
          </p-toast-item>
        )}
      </Host>
    );
  }
}
