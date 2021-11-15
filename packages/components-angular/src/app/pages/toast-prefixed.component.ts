import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ToastManager } from '@porsche-design-system/components-angular';

@Component({
  selector: 'toast-prefixed',
  styles: [
    `
      my-prefix-p-toast {
        --p-toast-position: static;
        --p-toast-skip-timeout: true;
      }
    `,
  ],
  template: `
    <div class="playground light" title="should render prefixed toast neutral on light background">
      <my-prefix-p-toast p-toast></my-prefix-p-toast>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastPrefixedComponent implements OnInit {
  constructor(private toastManager: ToastManager) {}

  ngOnInit() {
    this.toastManager.addMessage({ message: 'Some message' });
  }
}
