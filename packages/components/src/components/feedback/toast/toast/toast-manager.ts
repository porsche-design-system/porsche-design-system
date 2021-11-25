import { forceUpdate } from '@stencil/core';
import { throwIfValueIsInvalid } from '../../../../utils';
import { TOAST_STATES } from './toast-utils';
import type { ToastState } from './toast-utils';
import { ANIMATION_DURATION } from '../../banner/banner-styles';

const TOAST_DEFAULT_TIMEOUT = 6000;

// css variable names for overriding behaviour in tests
const TOAST_CSS_SKIP_TIMEOUT_VAR = '--p-override-toast-skip-timeout';
const TOAST_CSS_TIMEOUT_OVERRIDE_VAR = '--p-override-toast-timeout';
export const TOAST_ANIMATION_DURATION_VAR = '--p-override-toast-animation-duration';

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
    setTimeout(
      () => forceUpdate(this.toastEl),
      // respect --p-override-toast-animation-duration css variable to override timeout during e2e and vrt tests
      ROLLUP_REPLACE_IS_STAGING === 'production' || process.env.NODE_ENV === 'test'
        ? ANIMATION_DURATION
        : parseInt(getComputedStyle(this.toastEl).getPropertyValue(TOAST_ANIMATION_DURATION_VAR), 10) ||
            ANIMATION_DURATION
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
        // skip setting timeout if --p-override-toast-skip-timeout css variable is set in dev build
        if (getComputedStyle(this.toastEl).getPropertyValue(TOAST_CSS_SKIP_TIMEOUT_VAR)?.trim() !== 'true') {
          this.timeout = setTimeout(
            this.dismissToastItem,
            // override timeout if --p-override-toast-timeout css variable is set
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
