import { Component, Element, h, Host, JSX } from '@stencil/core';
import { addComponentCss } from './toast-styles';
import { ToastController } from './toast-manager';

@Component({
  tag: 'p-toast',
  shadow: true,
})
export class Toast {
  @Element() public host!: HTMLElement;

  // use method to expose ToastController

  public connectedCallback(): void {
    ToastController.registerToastElement(this.host);
    addComponentCss(this.host);
  }

  public render(): JSX.Element {
    return (
      <Host>
        {ToastController.getMessages().map((message) => (
          <p-toast-item state={message.state} action={message.action}>
            <p-text>{message.message}</p-text>
          </p-toast-item>
        ))}
      </Host>
    );
  }
}
