import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ToastManager } from '@porsche-design-system/components-angular';

@Component({
  selector: 'toast-prefixed',
  styles: [
    `
      .inner {
        transform: translateX(0);
        height: 56px;
      }
    `,
  ],
  template: `
    <div class="playground light" title="should render prefixed toast neutral on light background">
      <div class="inner">
        <my-prefix-p-toast p-toast [offsetBottom]="0"></my-prefix-p-toast>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastPrefixedComponent implements OnInit {
  constructor(private toastManager: ToastManager) {}

  ngOnInit() {
    this.toastManager.addMessage({ text: 'Some message' });
  }
}
