import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';
import { addComponentCss } from '../toast-a/toast-a-styles';
import { ToastManager, ToastManagerType } from './toast-manager';

@Component({
  tag: 'p-toast-d',
  shadow: true,
})
export class ToastD {
  @Element() public host!: HTMLElement;

  @Prop()
  public manager: ToastManagerType = ToastManager.registerToastElement(this.host);

  public connectedCallback(): void {
    console.log(this.manager);
    addComponentCss(this.host);
  }

  public componentDidLoad(): void {
    this.host.shadowRoot.addEventListener('close', () => {
      this.manager.dismissMessage();
    });
  }

  public render(): JSX.Element {
    const msg = this.manager.getMessage();

    return (
      <Host>
        {msg && (
          <p-toast-item-c key={msg.message} state={msg.state}>
            <p-text>{msg.message}</p-text>
          </p-toast-item-c>
        )}
      </Host>
    );
  }
}
