import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-inline-notification-example-events',
  template: `
    <p-button (click)="onShow()">Show InlineNotification</p-button>
    <p-inline-notification
      *ngIf="isActive"
      [heading]="'Some inline-notification heading'"
      [description]="'Some inline-notification description.'"
      (dismiss)="onDismiss()"
    ></p-inline-notification>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineNotificationExampleEventsComponent {
  isActive = false;

  onShow() {
    this.isActive = true;
  }
  onDismiss() {
    this.isActive = false;
  }
}
