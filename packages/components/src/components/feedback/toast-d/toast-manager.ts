import { forceUpdate } from '@stencil/core';

export type ToastState = 'neutral' | 'success';

type MessageOptions = {
  message: string;
  state?: ToastState;
};

export type Message = MessageOptions & { timeout: number };

class ToastManagerClass {
  private toast: HTMLElement;
  private messages: Message[] = [];

  public registerToastElement(toast: HTMLElement): typeof ToastManager {
    if (this.toast) {
      throw new Error('<p-toast/> was bootstrapped multiple times but its ref can only be registered once.');
    }
    this.toast = toast;

    return this;
  }

  public addMessage(options: MessageOptions): void {
    if (!this.toast) {
      throw new Error('No toast ref provided. <p-toast/> needs to be bootstrapped before the closing <body/> tag.');
    }

    const { message, state } = options;

    this.messages.push({
      message,
      state,
      timeout: 6000,
    });
    forceUpdate(this.toast);
  }

  public dismissMessage = (): void => {
    this.messages.shift();
    forceUpdate(this.toast);
  };

  public getMessage(): Message {
    const message = this.messages[0];

    if (message) {
      setTimeout(() => {
        this.messages.shift();
        forceUpdate(this.toast);
      }, message.timeout);
    }

    return message;
  }
}

export const ToastManager = new ToastManagerClass();
export type ToastManagerType = typeof ToastManager;
