import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ToastManager } from '@porsche-design-system/components-angular';

@Component({
  selector: 'toast-offset',
  styles: [
    `
      p-toast {
        --p-toast-position: relative;
        display: block;
        margin-left: -7vw;
        margin-right: 7vw;
      }
    `,
  ],
  template: `
    <div class="playground light" title="should render toast neutral on light background with offset {bottom: 0}">
      <p-toast [offsetBottom]="0"></p-toast>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastOffsetComponent implements OnInit {
  constructor(private toastManager: ToastManager) {}

  ngOnInit() {
    this.toastManager.addMessage({ message: 'Some message' });
  }
}
