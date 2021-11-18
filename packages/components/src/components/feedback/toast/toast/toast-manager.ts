import { forceUpdate } from '@stencil/core';
import { throwIfValueIsInvalid } from '../../../../utils';
import { TOAST_STATES } from './toast-utils';
import type { ToastState } from './toast-utils';
import { ANIMATION_DURATION } from '../../banner/banner-styles';

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
  private onDismissCallback: () => void;

  public register(toastElement: HTMLElement, onDismiss: () => void): ToastManager {
    if (this.toastEl) {
      throw new Error('<p-toast> was rendered multiple times.');
    }
    this.toastEl = toastElement;
    this.onDismissCallback = onDismiss;
    return this;
  }

  public unregister(): void {
    this.toastEl = null;
    this.messages = [];
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
    this.onDismissCallback();
    setTimeout(() => {
      forceUpdate(this.toastEl);
    }, ANIMATION_DURATION);
  };

  public getToast(): ToastMessage {
    return this.messages[0];
  }

  public startTimeout(): void {
    if (this.messages.length) {
      if (ROLLUP_REPLACE_IS_STAGING === 'production' || process.env.NODE_ENV === 'test') {
        this.timeout = setTimeout(this.dismissToastItem, TOAST_DEFAULT_TIMEOUT);
      } else {
        // skip setting timeout if --p-toast-skip-timeout css variable is set in dev build
        if (getComputedStyle(this.toastEl).getPropertyValue(TOAST_CSS_SKIP_TIMEOUT_VAR)?.trim() !== 'true') {
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
