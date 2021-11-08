import { Component, Element, Event, EventEmitter, Host, JSX, h } from '@stencil/core';
import { addComponentCss } from './toast-c-styles';
import { CallToAction, ToastState } from './toast-c-types';

export type MessageOptions = {
  message: string;
  state?: ToastState;
  action?: CallToAction;
};
export type Message = MessageOptions & { timeout: any };

@Component({
  tag: 'p-toast-c',
  shadow: true,
})
export class ToastC {
  @Element() public host!: HTMLElement;

  // For docs typing, child bubbles
  @Event() public dismiss?: EventEmitter<string>;

  public connectedCallback(): void {
    addComponentCss(this.host);
  }
  public componentDidLoad(): void {
    this.host.shadowRoot.querySelector('slot').addEventListener('slotchange', (e) => {
      // eslint-disable-next-line no-console
      console.log('-> slotchange triggered', e);

      // eslint-disable-next-line no-console
      console.log(
        'id of element',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        e.path[0].assignedNodes()[0]?.toastId
      );
    });
    this.host.shadowRoot.querySelector('slot').addEventListener('close', (e) => {
      // eslint-disable-next-line no-console
      console.log('-> closing toast by button', e);
    });
  }

  // {this.messages.map((message) => (
  // <p-toast-item-b state={message.state} action={message.action}>
  // <p-text>{message.message}</p-text>
  // </p-toast-item-b>
  // ))}
  public render(): JSX.Element {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
