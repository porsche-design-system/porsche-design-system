import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-inline-notification-example-action-button',
  template: `
    <p-inline-notification
      [heading]="'Some inline-notification heading'"
      [description]="'Some inline-notification description.'"
      [actionLabel]="'Retry'"
      [actionIcon]="'reset'"
      [actionLoading]="isLoading"
      (action)="onAction()"
    ></p-inline-notification>
    <p-button (click)="onAction()">Reset</p-button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineNotificationExampleActionButtonComponent {
  isLoading = false;

  onAction() {
    this.isLoading = !this.isLoading;
  }
}
