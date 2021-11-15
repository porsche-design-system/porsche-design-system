import { Injectable } from '@angular/core';
import { componentsReady, ToastMessage } from './public-api';

@Injectable({
  providedIn: 'root',
})
export class ToastManager {
  public addMessage(msg: ToastMessage): void {
    const toast: HTMLElement & { addMessage(msg: ToastMessage): Promise<void> } =
      document.querySelector('p-toast,[p-toast]');
    componentsReady(toast.parentElement).then(() => toast.addMessage(msg));
  }
}
