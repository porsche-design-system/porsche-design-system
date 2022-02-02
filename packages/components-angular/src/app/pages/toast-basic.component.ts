/* Auto Generated File */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ToastManager } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-toast-basic',
  styles: [
    `
      .playground {
        height: 300px;
        padding: 0;
        transform: translateX(0);
        border: 1px solid deeppink;
      }
    `,
  ],
  template: `
    <div class="playground light" title="should render toast neutral on light background">
      <p-toast></p-toast>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastBasicComponent implements OnInit {
  constructor(private toastManager: ToastManager) {}

  ngOnInit() {
    this.toastManager.addMessage({ text: 'Some message' });
  }
}
