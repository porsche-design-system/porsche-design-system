import { forceUpdate } from '@stencil/core';
import type { ToastState } from './toast-types';

export const timeout = 6000;

type MessageOptions = {
  message: string;
  state?: ToastState;
  action?: {
    label: string;
    callback: () => void;
  };
};
type Message = MessageOptions & { timeout: any };

class ToastManager {
  private toast: HTMLElement;
  private messages: Message[] = [];

  public registerToastElement(toast: HTMLElement): void {
    if (this.toast) {
      throw new Error('<p-toast/> was bootstrapped multiple times but its ref can only be registered once.');
    }
    this.toast = toast;
  }

  public addMessage(options: MessageOptions): void {
    if (!this.toast) {
      throw new Error('No toast ref provided. <p-toast/> needs to be bootstrapped before the closing <body/> tag.');
    }

    const { message, state, action } = options;

    this.messages.push({
      message,
      state,
      action,
      timeout: setTimeout(() => {
        this.messages.shift();
        forceUpdate(this.toast);
      }, timeout),
    });
    forceUpdate(this.toast);
  }

  public getMessages(): Message[] {
    return this.messages;
  }
}

export const ToastController = new ToastManager();
(window as any).ToastController = ToastController;
