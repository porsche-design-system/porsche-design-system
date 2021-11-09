import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ToastManagerService } from '../../../projects/components-wrapper/src/ToastManager.service';

@Component({
  selector: 'page-toast-example',
  template: `
    <button (click)="onButtonClick()">Add Toast</button>
    <p-toast></p-toast>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastExampleComponent implements OnInit {
  constructor(private toastManager: ToastManagerService) {}

  ngOnInit() {
    this.toastManager.addToast({ message: 'asd', state: 'success' });
    this.toastManager.addToast({ message: 'asd2', state: 'success' });
    setTimeout(() => {
      this.toastManager.addToast({ message: 'asd3', state: 'success' });
    }, 10000);
  }

  onButtonClick() {
    this.toastManager.addToast({ message: 'some message ' + new Date().toISOString(), state: 'success' });
  }
}
