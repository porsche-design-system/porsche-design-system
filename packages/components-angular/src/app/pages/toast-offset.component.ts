import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ToastManager } from '@porsche-design-system/components-angular';

@Component({
  selector: 'toast-offset',
  styles: [
    `
      .inner {
        transform: translateX(0);
        height: 56px;
      }
    `,
  ],
  template: `
    <div class="playground light" title="should render toast neutral on light background with offsetBottom">
      <div class="inner">
        <p-toast [offsetBottom]="{ base: 0, xs: 10, s: 0, m: 10, l: 0, xl: 0 }"></p-toast>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastOffsetComponent implements OnInit {
  constructor(private toastManager: ToastManager) {}

  ngOnInit() {
    this.toastManager.addMessage({ text: 'Some message' });
  }
}
