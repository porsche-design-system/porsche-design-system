import { Component, Element, h, Host, JSX } from '@stencil/core';
import { addComponentCss } from './toast-d-styles';
import { Message, ToastManager } from './toast-manager';

@Component({
  tag: 'p-toast-d',
  shadow: true,
})
export class ToastD {
  @Element() public host!: HTMLElement;

  public manager = ToastManager.registerToastElement(this.host);

  public connectedCallback(): void {
    addComponentCss(this.host);
  }

  public renderMessage({ state, message }: Message) {
    return (
      <p-toast-item-d state={state}>
        <p-text>{message}</p-text>
      </p-toast-item-d>
    );
  }

  public render(): JSX.Element {
    return (
      <Host>
        {this.renderMessage(this.manager.getMessage())}
        <div>BLA</div>
      </Host>
    );
  }
}
