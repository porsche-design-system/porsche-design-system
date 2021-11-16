import { Injectable } from '@angular/core';
import type { ToastMessage } from './public-api';

@Injectable({
  providedIn: 'root',
})
export class ToastManager {
  public addMessage(msg: ToastMessage): void {
    customElements.whenDefined('p-toast').then(() => {
      const toast: HTMLElement & {
        componentOnReady: () => Promise<void>;
        addMessage(msg: ToastMessage): Promise<void>;
      } = document.querySelector('p-toast,[p-toast]');
      toast.componentOnReady().then(() => toast.addMessage(msg));
    });
  }
}
