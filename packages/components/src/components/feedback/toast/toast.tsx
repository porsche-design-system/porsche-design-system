import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';
import { addComponentCss } from './toast-styles';
import { ToastManager } from './toast-manager';

@Component({
  tag: 'p-toast',
  shadow: true,
})
export class Toast {
  @Element() public host!: HTMLElement;

  @Prop()
  public readonly manager = new ToastManager(this.host);

  public connectedCallback(): void {
    addComponentCss(this.host);
  }

  public componentDidLoad(): void {
    this.host.shadowRoot.addEventListener('close', this.manager.dismissMessage);
  }

  public render(): JSX.Element {
    const msg = this.manager.getMessage();

    return (
      <Host>
        {msg && (
          <p-toast-item key={msg.message} state={msg.state}>
            <p-text>{msg.message}</p-text>
          </p-toast-item>
        )}
      </Host>
    );
  }
}
