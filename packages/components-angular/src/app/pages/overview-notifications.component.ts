/* Auto Generated File */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ToastManager } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-overview-notifications',
  styles: [
    `
      .playground {
        height: 400px;
        padding: 0;
        margin: 0 7vw;
        transform: translateX(0);
        border: 4px solid deeppink;
      }
    `,
  ],
  template: `
    <div class="playground light" title="should render notifications in correct stacking order">
      <p-toast></p-toast>

      <p-modal [heading]="'The quick brown fox jumps over the lazy dog'" [open]="true">Some Content</p-modal>

      <p-banner [open]="true">
        <span slot="title">Default banner component</span>
        <span slot="description">Some slotted banner description</span>
      </p-banner>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewNotificationsComponent implements OnInit {
  constructor(private toastManager: ToastManager) {}

  ngOnInit() {
    this.toastManager.addMessage({ text: 'The quick brown fox jumps over the lazy dog' });
  }
}
