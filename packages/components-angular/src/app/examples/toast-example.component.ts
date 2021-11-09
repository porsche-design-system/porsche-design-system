import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToastManager } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-toast-example',
  template: `
    <button (click)="onButtonClick()">Add Toast</button>
    <p-toast></p-toast>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastExampleComponent {
  constructor(private toastManager: ToastManager) {}

  onButtonClick() {
    this.toastManager.addToast({ message: 'some message ' + new Date().toISOString(), state: 'success' });
  }
}
