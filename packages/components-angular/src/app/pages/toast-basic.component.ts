import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ToastManager } from '@porsche-design-system/components-angular';

@Component({
  selector: 'toast-basic',
  styles: [
    `
      .playground {
        transform: translateX(0);
        height: 150px;
        padding: 0;
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
