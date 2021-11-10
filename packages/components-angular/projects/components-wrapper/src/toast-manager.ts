import { Injectable } from '@angular/core';
import { componentsReady, ToastManager as ToastManagerType, ToastMessage } from './public-api';

@Injectable({
  providedIn: 'root',
})
export class ToastManager {
  public addToast(msg: ToastMessage): void {
    // TODO: use prefix
    const toast: HTMLElement & { getManager(): Promise<ToastManagerType> } = document.querySelector('p-toast');
    componentsReady(toast.parentElement).then(() => {
      toast.getManager().then((manager) => manager.addToast(msg));
    });
  }
}
