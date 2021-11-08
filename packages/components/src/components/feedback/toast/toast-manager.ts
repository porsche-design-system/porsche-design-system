import { forceUpdate } from '@stencil/core';

export const TOAST_DEFAULT_TIMEOUT = 6000;
export type ToastState = 'neutral' | 'success';

type Message = {
  message: string;
  state?: ToastState;
};

class ToastManagerClass {
  private toast: HTMLElement;
  private messages: Message[] = [];
  private timeout: NodeJS.Timeout;

  public registerToastElement(toast: HTMLElement): typeof ToastManager {
    if (this.toast) {
      throw new Error('<p-toast/> was rendered multiple times.');
    }
    this.toast = toast;

    return this;
  }

  public addMessage(message: Message): void {
    if (!this.toast) {
      throw new Error('Missing <p-toast/> element.');
    }

    this.messages.push(message);
    forceUpdate(this.toast);
  }

  public dismissMessage = (): void => {
    clearTimeout(this.timeout);
    this.messages.shift();
    forceUpdate(this.toast);
  };

  public getMessage(): Message {
    const [message] = this.messages;

    if (message) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(this.dismissMessage, TOAST_DEFAULT_TIMEOUT);
    }
    return message;
  }
}

export const ToastManager = new ToastManagerClass();
export type ToastManagerType = typeof ToastManager;
