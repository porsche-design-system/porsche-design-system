/* Auto Generated File */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ToastManager } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-overview-notifications',
  styles: [
    `
      my-prefix-p-banner {
        --p-banner-position-top: 200px;
      }
    `,
  ],
  template: `
    <div title="should render notifications in correct stacking order">
      <p-toast></p-toast>

      <p-modal [heading]="'Some heading'" [open]="true">Some Content</p-modal>

      <p-banner>
        <span slot="title">Default banner component</span>
        <span slot="description">Some slotted banner description</span>
      </p-banner>

      <my-prefix-p-banner p-banner>
        <span slot="title">Prefixed banner component</span>
        <span slot="description">Some slotted banner description</span>
      </my-prefix-p-banner>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewNotificationsComponent implements OnInit {
  constructor(private toastManager: ToastManager) {}

  ngOnInit() {
    this.toastManager.addMessage({ text: 'Some message' });
  }
}
