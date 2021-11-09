import { componentsReady } from '@porsche-design-system/components-js';
import type { ToastMessage } from './lib/types';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastManagerService {
  constructor() {}
  addToast(msg: ToastMessage) {
    // TODO: typing of manager
    const toast: HTMLElement & { manager: any } = document.querySelector('p-toast');
    componentsReady(toast.parentElement).then((amount) => {
      console.log(amount);
      toast.manager.addToast(msg);
    });
  }
}
