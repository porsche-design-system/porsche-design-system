import { Injectable } from '@angular/core';
import type { ToastMessage } from './public-api';

@Injectable({
  providedIn: 'root',
})
export class ToastManager {
  public addMessage(message: ToastMessage): void {
    const toast = document.querySelector('p-toast,[p-toast]') as HTMLElement & {
      addMessage(message: ToastMessage): void;
    };
    customElements.whenDefined(toast.tagName.toLowerCase()).then(() => toast.addMessage(message));
  }
}
