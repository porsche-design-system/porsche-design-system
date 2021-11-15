import { forceUpdate } from '@stencil/core';
import { throwIfValueIsInvalid } from '../../../../utils';
import { TOAST_STATES } from './toast-utils';
import type { ToastState } from './toast-utils';

export const TOAST_DEFAULT_TIMEOUT = 6000;

// css variable names for overriding behaviour in tests
const TOAST_CSS_SKIP_TIMEOUT_VAR = '--p-toast-skip-timeout';
const TOAST_CSS_TIMEOUT_OVERRIDE_VAR = '--p-toast-timeout-override';

export type ToastMessage = {
  message: string;
  state?: ToastState;
};

class ToastManagerClass {
  private messages: ToastMessage[] = [];
  private toastEl: HTMLElement;
  private timeout: NodeJS.Timeout;

  public register(toastElement: HTMLElement): ToastManager {
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
    this.messages = [];
    clearTimeout(this.timeout);
  }

  public addMessage(message: ToastMessage): void {
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

  public dismissToastItem = (): void => {
    // eslint-disable-next-line no-console
    console.log('-> dismissing toast', new Date().toISOString());
    clearTimeout(this.timeout);
    this.messages.shift();
    forceUpdate(this.toastEl);
  };

  public getToast(): ToastMessage {
    return this.messages[0];
  }

  public startTimeout(): void {
    if (this.messages.length) {
      if (ROLLUP_REPLACE_IS_STAGING === 'production') {
        this.timeout = setTimeout(this.dismissToastItem, TOAST_DEFAULT_TIMEOUT);
      } else {
        // skip setting timeout if --p-toast-skip-timeout css variable is set in dev build
        if (!getComputedStyle(this.toastEl).getPropertyValue(TOAST_CSS_SKIP_TIMEOUT_VAR)) {
          this.timeout = setTimeout(
            this.dismissToastItem,
            // override timeout if --p-toast-timeout-override css variable is set
            parseInt(getComputedStyle(this.toastEl).getPropertyValue(TOAST_CSS_TIMEOUT_OVERRIDE_VAR), 10) ??
              TOAST_DEFAULT_TIMEOUT
          );
        }
      }
    }
  }
}

export const toastManager = new ToastManagerClass();
export type ToastManager = typeof toastManager;
