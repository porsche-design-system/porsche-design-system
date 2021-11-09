import { forceUpdate } from '@stencil/core';

export const TOAST_DEFAULT_TIMEOUT = 6000;
export type ToastState = 'neutral' | 'success';

type ToastMessage = {
  message: string;
  state?: ToastState;
};

class ToastManager {
  private messages: ToastMessage[] = [];
  private toastEl: HTMLElement;
  private timeout: NodeJS.Timeout;

  public register(toastElement: HTMLElement): ToastManagerInstance {
    // eslint-disable-next-line no-console
    console.log('ToastManager.register()');
    if (this.toastEl) {
      throw new Error('<p-toast> was rendered multiple times.');
    }

    this.toastEl = toastElement;
    return this;
  }

  public unregister(): void {
    // eslint-disable-next-line no-console
    console.log('ToastManager.unregister()');
    this.toastEl = null;
    clearTimeout(this.timeout);
  }

  public addToast(message: ToastMessage): void {
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

  public getToast(): ToastMessage {
    const [message] = this.messages;

    if (message) {
      this.timeout = setTimeout(this.dismissToast, TOAST_DEFAULT_TIMEOUT);
    }
    return message;
  }
}

export const toastManager = new ToastManager();
export type ToastManagerInstance = typeof toastManager;
