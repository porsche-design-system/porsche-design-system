import { Component, Element, h, Host, JSX } from '@stencil/core';
import { addComponentCss } from './toast-a-styles';
import { ToastController } from './toast-a-manager';

@Component({
  tag: 'p-toast-a',
  shadow: true,
})
export class ToastA {
  @Element() public host!: HTMLElement;

  public connectedCallback(): void {
    ToastController.registerToastElement(this.host);
    addComponentCss(this.host);
  }

  public render(): JSX.Element {
    return (
      <Host>
        {ToastController.getMessages().map((message) => (
          <p-toast-item-a state={message.state} action={message.action}>
            <p-text>{message.message}</p-text>
          </p-toast-item-a>
        ))}
      </Host>
    );
  }
}
