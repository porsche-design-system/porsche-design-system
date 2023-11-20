import { forceUpdate } from '@stencil/core';
import type { ToastState } from './toast-utils';
import { ANIMATION_DURATION } from './toast-styles';
import { throwException } from '../../../utils';
import { cssVariableAnimationDuration } from '../../../styles';

const TOAST_DEFAULT_TIMEOUT = 6000;
const MOTION_DURATION = parseFloat(ANIMATION_DURATION) * 1000;

// css variable names for overriding behaviour in tests
const TEMPORARY_TOAST_SKIP_TIMEOUT = '--p-temporary-toast-skip-timeout';
const TEMPORARY_TOAST_TIMEOUT = '--p-temporary-toast-timeout';

export type ToastMessage = {
  text: string;
  state?: ToastState;
};

export class ToastManagerClass {
  private message: ToastMessage;
  private toastEl: HTMLElement;
  private timeout: NodeJS.Timeout;
  private onDismissCallback: () => void;

  public register(toastElement: HTMLElement, onDismiss: () => void): void {
    if (this.toastEl) {
      throwException('p-toast was rendered multiple times.');
    }
    this.toastEl = toastElement;
    this.onDismissCallback = onDismiss;
  }

  public unregister(): void {
    this.toastEl = null;
    this.message = undefined;
    this.removeTimeout();
  }

  public addMessage(message: ToastMessage): void {
    if (!this.toastEl) {
      throwException('missing p-toast element.');
    }

    if (!message.text) {
      throwException('p-toast empty text provided to addMessage().');
    }

    const msg: ToastMessage = {
      state: message.state || 'info', // info is our default state
      text: message.text.replace(/<(?!br)[^>]*>/g, ''), // strip all html tags except linebreaks
    };
    if (!this.message) {
      forceUpdate(this.toastEl);
    } else if (this.message.text !== message.text) {
      this.dismissToastItem();
    }

    this.message = msg;
  }

  public dismissToastItem = (): void => {
    this.removeTimeout();
    this.message = undefined;
    this.onDismissCallback();
    setTimeout(
      () => forceUpdate(this.toastEl),
      // respect --p-temporary-toast-timeout css variable to override timeout during e2e and vrt tests
      ROLLUP_REPLACE_IS_STAGING === 'production' || process.env.NODE_ENV === 'test'
        ? MOTION_DURATION
        : parseInt(getComputedStyle(this.toastEl).getPropertyValue(cssVariableAnimationDuration), 10) || MOTION_DURATION
    );
  };

  public getToast(): ToastMessage {
    this.startTimeout();
    return this.message;
  }

  public startTimeout(): void {
    if (this.message) {
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
