import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ToastManager } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-toast-example',
  template: `
    <button (click)="onButtonClick()">Add Toast</button>
    <p-toast></p-toast>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastExampleComponent implements OnInit {
  constructor(private toastManager: ToastManager) {}

  ngOnInit() {
    this.toastManager.addToast({ message: 'asd', state: 'success' });
    this.toastManager.addToast({ message: 'asd2', state: 'success' });
  }

  onButtonClick() {
    this.toastManager.addToast({ message: 'some message ' + new Date().toISOString(), state: 'success' });
  }
}
