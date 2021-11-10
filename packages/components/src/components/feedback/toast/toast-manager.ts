import { forceUpdate } from '@stencil/core';
import { throwIfValueIsInvalid } from '../../../utils';
import { TOAST_STATES } from './toast-utils';

export const TOAST_DEFAULT_TIMEOUT = 6000;
export type ToastState = 'neutral' | 'success';

type ToastMessage = {
  message: string;
  state?: ToastState;
};
export type ToastManager = {
  addToast: (message: ToastMessage) => void;
};

class ToastManagerClass implements ToastManager {
  private messages: ToastMessage[] = [];
  private toastEl: HTMLElement;
  private timeout: NodeJS.Timeout;

  public register(toastElement: HTMLElement): ToastManagerInternal {
    // eslint-disable-next-line no-console
    console.log('ToastManagerClass.register()');
    if (this.toastEl) {
      throw new Error('<p-toast> was rendered multiple times.');
    }

    this.toastEl = toastElement;
    return this;
  }

  public unregister(): void {
    // eslint-disable-next-line no-console
    console.log('ToastManagerClass.unregister()');
    this.toastEl = null;
    clearTimeout(this.timeout);
  }

  public addToast(message: ToastMessage): void {
    if (!this.toastEl) {
      throw new Error('Missing <p-toast> element.');
    }
    if (!message.state) {
      message.state = 'neutral';
    }
    throwIfValueIsInvalid(message.state, TOAST_STATES, 'state');

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
    return this.messages[0];
  }

  public startToast(): void {
    if (this.messages.length) {
      this.timeout = setTimeout(this.dismissToast, TOAST_DEFAULT_TIMEOUT);
    }
  }
}

export const toastManager = new ToastManagerClass();
export type ToastManagerInternal = typeof toastManager;
