import { Component, Element, h, Host, JSX, Method, State } from '@stencil/core';
import { addComponentCss } from './toast-b-styles';
import { CallToAction, ToastState } from './toast-b-types';
import { timeout } from './toast-item-b-styles';

export type MessageOptions = {
  message: string;
  state?: ToastState;
  action?: CallToAction;
};
export type Message = MessageOptions & { timeout: any };

@Component({
  tag: 'p-toast-b',
  shadow: true,
})
export class ToastB {
  @Element() public host!: HTMLElement;

  @State() private messages: Message[] = [];

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility,@typescript-eslint/require-await
  @Method()
  async addMessage(options: MessageOptions): Promise<void> {
    const { message, state, action } = options;

    this.messages = [
      ...this.messages,
      {
        message,
        state,
        action,
        timeout: setTimeout(() => {
          this.messages = this.messages.slice(1);
        }, timeout),
      },
    ];
  }

  public connectedCallback(): void {
    addComponentCss(this.host);
  }

  public render(): JSX.Element {
    return (
      <Host>
        {this.messages.map((message) => (
          <p-toast-item-b state={message.state} action={message.action}>
            <p-text>{message.message}</p-text>
          </p-toast-item-b>
        ))}
      </Host>
    );
  }
}
