import { forceUpdate } from '@stencil/core';

export const TOAST_DEFAULT_TIMEOUT = 6000;
export type ToastState = 'neutral' | 'success';

type Message = {
  message: string;
  state?: ToastState;
};

let isInitialized = false;

export class ToastManager {
  private messages: Message[] = [];
  private timeout: NodeJS.Timeout;

  constructor(private toastEl: HTMLElement) {
    if (isInitialized) {
      throw new Error('<p-toast> was rendered multiple times.');
    }
    isInitialized = true;
  }

  public addToast(message: Message): void {
    if (!this.toastEl) {
      throw new Error('Missing <p-toast> element.');
    }

    const { length } = this.messages;
    this.messages.push(message);

    if (!length) {
      forceUpdate(this.toastEl);
    }
  }

  public dismissToast = (): void => {
    clearTimeout(this.timeout);
    this.messages.shift();
    forceUpdate(this.toastEl);
  };

  public getToast(): Message {
    const [message] = this.messages;

    if (message) {
      this.timeout = setTimeout(this.dismissToast, TOAST_DEFAULT_TIMEOUT);
    }
    return message;
  }
}

export type ToastManagerInstance = Omit<ToastManager, 'prototype'>;
