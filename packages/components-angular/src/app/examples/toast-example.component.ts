import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToastManager } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-toast-example',
  template: `
    <button type="button" (click)="onButtonClick()">Add Toast</button>
    <p-toast></p-toast>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastExampleComponent {
  counter = 1;

  constructor(private toastManager: ToastManager) {}

  onButtonClick() {
    this.toastManager.addToast({ message: `Some message ${this.counter}`, state: 'success' });
    this.counter++;
  }
}
