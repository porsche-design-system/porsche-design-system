import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ToastManager } from '@porsche-design-system/components-angular';

@Component({
  selector: 'toast-basic-dark',
  styles: [
    `
      .inner {
        transform: translateX(0);
        height: 56px;
      }
    `,
  ],
  template: `
    <div class="playground dark" title="should render toast neutral on dark background">
      <div class="inner">
        <p-toast [theme]="'dark'" [offsetBottom]="0"></p-toast>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastBasicDarkComponent implements OnInit {
  constructor(private toastManager: ToastManager) {}

  ngOnInit() {
    this.toastManager.addMessage({ text: 'Some message' });
  }
}
