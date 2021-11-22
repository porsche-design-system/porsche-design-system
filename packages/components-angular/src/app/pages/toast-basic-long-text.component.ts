import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ToastManager } from '@porsche-design-system/components-angular';

@Component({
  selector: 'toast-basic-long-text',
  styles: [
    `
      .inner {
        transform: translateX(0);
        height: 150px;
      }
    `,
  ],
  template: `
    <div class="playground light" title="should render toast multiline message on light background">
      <div class="inner">
        <p-toast [offsetBottom]="0"></p-toast>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastBasicLongTextComponent implements OnInit {
  constructor(private toastManager: ToastManager) {}

  ngOnInit() {
    this.toastManager.addMessage({
      text: 'Some message with a very long text across multiple lines that will break once the max width of 42rem is exceeded.',
    });
  }
}
