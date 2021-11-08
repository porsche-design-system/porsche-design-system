import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';
import { addComponentCss } from './toast-styles';
import { ToastManager, ToastManagerInstance } from './toast-manager';

@Component({
  tag: 'p-toast',
  shadow: true,
})
export class Toast {
  @Element() public host!: HTMLElement;

  @Prop()
  public readonly manager: ToastManagerInstance = new ToastManager(this.host);

  public connectedCallback(): void {
    addComponentCss(this.host);
  }

  public componentDidLoad(): void {
    this.host.shadowRoot.addEventListener('close', this.manager.dismissToast);
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
