import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToastManager } from '@porsche-design-system/components-angular';

@Component({
  selector: 'toast-example',
  template: `
    <button type="button" (click)="onButtonClick()">Queue Toast</button>
    <p-toast></p-toast>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastExample {
  private counter = 1;

  constructor(private toastManager: ToastManager) {}

  onButtonClick() {
    this.toastManager.addMessage({ text: `Some message ${this.counter}`, state: 'success' });
    this.counter++;
  }
}
