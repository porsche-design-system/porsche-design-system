import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ToastManager } from '@porsche-design-system/components-angular';

@Component({
  selector: 'toast-basic-long-text',
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
    <div class="playground light" title="should render toast multiline message on light background">
      <p-toast></p-toast>
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
