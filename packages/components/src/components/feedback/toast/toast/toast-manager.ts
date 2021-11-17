import { forceUpdate } from '@stencil/core';
import { throwIfValueIsInvalid } from '../../../../utils';
import { TOAST_STATES } from './toast-utils';
import type { ToastState } from './toast-utils';
import { toastCloseClassName, toastVisibleClassName } from './toast-styles';

export const TOAST_DEFAULT_TIMEOUT = 6000;

// css variable names for overriding behaviour in tests
const TOAST_CSS_SKIP_TIMEOUT_VAR = '--p-toast-skip-timeout';
const TOAST_CSS_TIMEOUT_OVERRIDE_VAR = '--p-toast-timeout-override';

export type ToastMessage = {
  message: string;
  state?: ToastState;
};

export class ToastManagerClass {
  private messages: ToastMessage[] = [];
  private toastEl: HTMLElement;
  private timeout: NodeJS.Timeout;

  public register(toastElement: HTMLElement): ToastManager {
    if (this.toastEl) {
      throw new Error('<p-toast> was rendered multiple times.');
    }

    this.toastEl = toastElement;
    return this;
  }

  public unregister(): void {
    this.toastEl = null;
    this.messages = [];
    this.toastEl.classList.remove(toastVisibleClassName);
    this.removeTimeout();
  }

  public addMessage(message: ToastMessage): void {
    if (!this.toastEl) {
      throw new Error('Missing <p-toast> element.');
    }
    const msg: ToastMessage = { state: 'neutral', ...message }; // neutral is our default state
    throwIfValueIsInvalid(msg.state, TOAST_STATES, 'state');

    const { length } = this.messages;
    this.messages.push(msg);

    if (!length) {
      forceUpdate(this.toastEl);
    }
  }

  public dismissToastItem = (): void => {
    this.removeTimeout();
    this.messages.shift();
    this.toastEl.classList.remove(toastVisibleClassName);

    this.toastEl.classList.add(toastCloseClassName);
    setTimeout(() => {
      this.toastEl.classList.remove(toastCloseClassName);
      forceUpdate(this.toastEl);
    }, 600);
  };

  public getToast(): ToastMessage {
    return this.messages[0];
  }

  public startTimeout(): void {
    if (this.messages.length) {
      if (ROLLUP_REPLACE_IS_STAGING === 'production' || process.env.NODE_ENV === 'test') {
        this.toastEl.classList.add(toastVisibleClassName);
        this.timeout = setTimeout(this.dismissToastItem, TOAST_DEFAULT_TIMEOUT);
      } else {
        // skip setting timeout if --p-toast-skip-timeout css variable is set in dev build
        if (getComputedStyle(this.toastEl).getPropertyValue(TOAST_CSS_SKIP_TIMEOUT_VAR)?.trim() !== 'true') {
          this.toastEl.classList.add(toastVisibleClassName);
          this.timeout = setTimeout(
            this.dismissToastItem,
            // override timeout if --p-toast-timeout-override css variable is set
            parseInt(getComputedStyle(this.toastEl).getPropertyValue(TOAST_CSS_TIMEOUT_OVERRIDE_VAR), 10) ||
              TOAST_DEFAULT_TIMEOUT
          );
        }
      }
    }
  }

  private removeTimeout(): void {
    clearTimeout(this.timeout);
    this.timeout = null;
  }
}

export const toastManager = new ToastManagerClass();
export type ToastManager = typeof toastManager;
