import { Injectable } from '@angular/core';
import { componentsReady, ToastManagerInstance, ToastMessage } from './public-api';

@Injectable({
  providedIn: 'root',
})
export class ToastManager {
  public addToast(msg: ToastMessage): void {
    const toast: HTMLElement & { getManager(): Promise<ToastManagerInstance> } = document.querySelector('p-toast');
    componentsReady(toast.parentElement).then(() => {
      toast.getManager().then((manager) => manager.addToast(msg));
    });
  }
}
