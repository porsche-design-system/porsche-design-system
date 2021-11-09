import { Component, Element, h, Host, JSX, Method } from '@stencil/core';
import { addComponentCss } from './toast-styles';
import { toastManager, ToastManagerInstance } from './toast-manager';

@Component({
  tag: 'p-toast',
  shadow: true,
})
export class Toast {
  @Element() public host!: HTMLElement;

  @Method()
  async getManager(): Promise<ToastManagerInstance> {
    return this.manager;
  }

  private manager: ToastManagerInstance;

  public connectedCallback(): void {
    addComponentCss(this.host);
    this.manager = toastManager.register(this.host);
    console.log('connectedCallback', this.manager);
  }

  public componentDidLoad(): void {
    console.log('componentDidLoad', this.manager);
    this.host.shadowRoot.addEventListener('close', this.manager.dismissToast);
  }

  public disconnectedCallback(): void {
    toastManager.unregister();
    console.log('disconnectedCallback', this.manager);
  }

  public render(): JSX.Element {
    console.log('render', this.manager);
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
