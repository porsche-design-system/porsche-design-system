import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ToastManager } from '@porsche-design-system/components-angular';

@Component({
  selector: 'toast-basic-long-text',
  styles: [
    `
      .playground {
        width: 240px;
      }
      p-toast {
        --p-toast-position: static;
        --p-toast-skip-timeout: true;
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
    this.toastManager.addMessage({ message: 'Some message with a very long text across multiple lines' });
  }
}
