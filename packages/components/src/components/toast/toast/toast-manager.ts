import { forceUpdate } from '@stencil/core';
import type { ToastState } from './toast-utils';
import { ANIMATION_DURATION } from '../../banner/banner-styles-shared';

const TOAST_DEFAULT_TIMEOUT = 6000;

// css variable names for overriding behaviour in tests
const TEMPORARY_TOAST_SKIP_TIMEOUT = '--p-temporary-toast-skip-timeout';
const TEMPORARY_TOAST_TIMEOUT = '--p-temporary-toast-timeout';

export type ToastMessage = {
  text: string;
  state?: ToastState;
};

export class ToastManagerClass {
  private messages: ToastMessage[] = [];
  private toastEl: HTMLElement;
  private timeout: NodeJS.Timeout;
  private onDismissCallback: () => void;

  public register(toastElement: HTMLElement, onDismiss: () => void): void {
    if (this.toastEl) {
      throw new Error('<p-toast> was rendered multiple times.');
    }
    this.toastEl = toastElement;
    this.onDismissCallback = onDismiss;
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

    if (!message.text) {
      throw new Error('Empty text provided to addMessage.');
    }

    const msg: ToastMessage = { state: 'info', ...message }; // info is our default state

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
    setTimeout(
      () => forceUpdate(this.toastEl),
      // respect --p-temporary-toast-timeout css variable to override timeout during e2e and vrt tests
      ROLLUP_REPLACE_IS_STAGING === 'production' || process.env.NODE_ENV === 'test'
        ? ANIMATION_DURATION
        : parseInt(getComputedStyle(this.toastEl).getPropertyValue('--p-animation-duration'), 10) || ANIMATION_DURATION
    );
  };

  public getToast(): ToastMessage {
    this.startTimeout();
    return this.messages[0];
  }

  public startTimeout(): void {
    if (this.messages.length) {
      if (ROLLUP_REPLACE_IS_STAGING === 'production' || process.env.NODE_ENV === 'test') {
        this.timeout = setTimeout(this.dismissToastItem, TOAST_DEFAULT_TIMEOUT);
      } else {
        // skip setting timeout if --p-temporary-toast-skip-timeout css variable is set in dev build
        if (getComputedStyle(this.toastEl).getPropertyValue(TEMPORARY_TOAST_SKIP_TIMEOUT)?.trim() !== 'true') {
          this.timeout = setTimeout(
            this.dismissToastItem,
            // override timeout if --p-temporary-toast-timeout css variable is set
            parseInt(getComputedStyle(this.toastEl).getPropertyValue(TEMPORARY_TOAST_TIMEOUT), 10) ||
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
